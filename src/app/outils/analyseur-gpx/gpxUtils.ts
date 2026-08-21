// app/outils/analyseur-gpx/gpxUtils.ts

export interface RawPoint {
    lat: number;
    lon: number;
    ele: number;
}

export interface TrackPoint extends RawPoint {
    eleSmoothed: number;
    distKm: number;
}

export interface ElevationStats {
    distanceKm: number;
    gainM: number;
    lossM: number;
    minEle: number;
    maxEle: number;
}

export function parseGpx(xmlText: string): RawPoint[] {
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    if (doc.getElementsByTagName("parsererror").length > 0) {
        throw new Error("Fichier GPX invalide ou corrompu.");
    }

    const trkpts = Array.from(doc.getElementsByTagName("trkpt"));
    if (trkpts.length === 0) {
        throw new Error("Aucun point de trace (trkpt) trouvé dans ce fichier GPX.");
    }

    const points = trkpts
        .map((pt) => {
            const lat = parseFloat(pt.getAttribute("lat") || "");
            const lon = parseFloat(pt.getAttribute("lon") || "");
            const eleEl = pt.getElementsByTagName("ele")[0];
            const ele = eleEl ? parseFloat(eleEl.textContent || "0") : 0;
            return { lat, lon, ele: Number.isFinite(ele) ? ele : 0 };
        })
        .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lon));

    if (points.length < 2) {
        throw new Error("Ce fichier GPX ne contient pas assez de points exploitables.");
    }

    return points;
}

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Lissage sur une fenêtre de distance (pas un nombre de points fixe) pour rester
// pertinent quelle que soit la densité de points du GPX (trace enregistrée dense
// vs itinéraire planifié plus épars) — n'atténue que le bruit GPS/altimètre à courte
// échelle, sans aplatir un vrai relief.
export function buildTrack(raw: RawPoint[], smoothWindowKm = 0.03): TrackPoint[] {
    const points: TrackPoint[] = [];
    let cum = 0;
    for (let i = 0; i < raw.length; i++) {
        if (i > 0) {
            cum += haversineKm(raw[i - 1].lat, raw[i - 1].lon, raw[i].lat, raw[i].lon);
        }
        points.push({ ...raw[i], eleSmoothed: raw[i].ele, distKm: cum });
    }

    const half = smoothWindowKm / 2;
    const eles = points.map((p) => p.ele);
    let lo = 0;
    let hi = -1;
    let windowSum = 0;
    let windowCount = 0;

    for (let i = 0; i < points.length; i++) {
        while (hi + 1 < points.length && points[hi + 1].distKm - points[i].distKm <= half) {
            hi++;
            windowSum += eles[hi];
            windowCount++;
        }
        while (points[i].distKm - points[lo].distKm > half) {
            windowSum -= eles[lo];
            windowCount--;
            lo++;
        }
        points[i].eleSmoothed = windowSum / windowCount;
    }

    return points;
}

export function computeElevationStats(points: TrackPoint[]): ElevationStats {
    let gain = 0;
    let loss = 0;
    let minEle = Infinity;
    let maxEle = -Infinity;

    for (let i = 0; i < points.length; i++) {
        minEle = Math.min(minEle, points[i].ele);
        maxEle = Math.max(maxEle, points[i].ele);
        if (i > 0) {
            const d = points[i].eleSmoothed - points[i - 1].eleSmoothed;
            if (d > 0) gain += d;
            else loss += -d;
        }
    }

    return {
        distanceKm: points[points.length - 1]?.distKm ?? 0,
        gainM: gain,
        lossM: loss,
        minEle,
        maxEle,
    };
}

export function downsampleForChart(points: TrackPoint[], maxPoints = 220): { distKm: number; ele: number }[] {
    if (points.length <= maxPoints) {
        return points.map((p) => ({ distKm: p.distKm, ele: p.eleSmoothed }));
    }
    const step = points.length / maxPoints;
    const out: { distKm: number; ele: number }[] = [];
    for (let i = 0; i < maxPoints; i++) {
        const idx = Math.min(points.length - 1, Math.round(i * step));
        out.push({ distKm: points[idx].distKm, ele: points[idx].eleSmoothed });
    }
    return out;
}

// Minetti et al. (2002) — coût énergétique de la course à pied selon la pente (J/kg/m)
function minettiCost(gradient: number): number {
    const i = gradient;
    return 155.4 * i ** 5 - 30.4 * i ** 4 - 43.3 * i ** 3 + 46.3 * i ** 2 + 19.5 * i + 3.6;
}

function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v));
}

export function estimateRunTimeMin(points: TrackPoint[], flatPaceMinPerKm: number): number {
    const c0 = minettiCost(0);
    let equivKm = 0;

    for (let i = 1; i < points.length; i++) {
        const dKm = points[i].distKm - points[i - 1].distKm;
        if (dKm <= 0) continue;
        const dEleM = points[i].eleSmoothed - points[i - 1].eleSmoothed;
        const grade = clamp(dEleM / (dKm * 1000), -0.45, 0.45);
        const cost = minettiCost(grade);
        equivKm += dKm * (cost / c0);
    }

    return equivKm * flatPaceMinPerKm;
}

export interface BikeParams {
    totalMassKg: number;
    powerW: number;
    crr: number;
    cda: number;
}

const G = 9.81;
const AIR_DENSITY = 1.225;
const DRIVETRAIN_EFFICIENCY = 0.975;

function speedForGrade(grade: number, params: BikeParams): number {
    const theta = Math.atan(grade);
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    const gravityAndRolling = params.totalMassKg * G * (sinT + params.crr * cosT);
    const power = params.powerW * DRIVETRAIN_EFFICIENCY;

    const f = (v: number) => 0.5 * AIR_DENSITY * params.cda * v ** 3 + gravityAndRolling * v - power;

    let lo = 0.2;
    let hi = 30;
    for (let iter = 0; iter < 40; iter++) {
        const mid = (lo + hi) / 2;
        if (f(mid) > 0) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
}

export function estimateBikeTimeMin(points: TrackPoint[], params: BikeParams): { timeMin: number; avgSpeedKmh: number } {
    const bins = new Map<number, number>();

    for (let i = 1; i < points.length; i++) {
        const dKm = points[i].distKm - points[i - 1].distKm;
        if (dKm <= 0) continue;
        const dM = dKm * 1000;
        const dEleM = points[i].eleSmoothed - points[i - 1].eleSmoothed;
        const grade = clamp(dEleM / dM, -0.25, 0.25);
        const binKey = Math.round(grade * 50) / 50;
        bins.set(binKey, (bins.get(binKey) || 0) + dM);
    }

    let totalTimeS = 0;
    let totalDistM = 0;

    for (const [grade, distM] of bins) {
        const v = speedForGrade(grade, params);
        totalTimeS += distM / v;
        totalDistM += distM;
    }

    return {
        timeMin: totalTimeS / 60,
        avgSpeedKmh: totalTimeS > 0 ? totalDistM / 1000 / (totalTimeS / 3600) : 0,
    };
}

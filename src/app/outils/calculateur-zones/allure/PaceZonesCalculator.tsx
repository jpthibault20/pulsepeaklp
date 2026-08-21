// app/outils/calculateur-zones/allure/PaceZonesCalculator.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Footprints, Link2, Check } from "lucide-react";
import ZoneTable, { type ZoneRow } from "../components/ZoneTable";
import LeadCapture from "../../../components/LeadCapture";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

type Method = "vma" | "race" | "threshold";

const raceOptions = [
    { key: "1500", label: "1500 m", km: 1.5, pct: 1.03 },
    { key: "3000", label: "3000 m", km: 3, pct: 0.97 },
    { key: "5000", label: "5 km", km: 5, pct: 0.92 },
    { key: "10000", label: "10 km", km: 10, pct: 0.88 },
    { key: "21097", label: "Semi-marathon", km: 21.097, pct: 0.83 },
    { key: "42195", label: "Marathon", km: 42.195, pct: 0.78 },
];

const THRESHOLD_PCT_OF_VMA = 0.88;

function formatPace(minutesPerKm: number): string {
    if (!Number.isFinite(minutesPerKm) || minutesPerKm <= 0) return "—";
    let m = Math.floor(minutesPerKm);
    let s = Math.round((minutesPerKm - m) * 60);
    if (s === 60) {
        s = 0;
        m += 1;
    }
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function paceAtPct(vma: number, pct: number): number {
    const speed = vma * pct;
    return 60 / speed;
}

function paceZones(vma: number): ZoneRow[] {
    const p = (pct: number) => formatPace(paceAtPct(vma, pct));
    return [
        { n: 1, name: "Récupération", pct: "< 60 %", range: `> ${p(0.6)}`, color: "blue" },
        { n: 2, name: "Endurance fondamentale", pct: "60–75 %", range: `${p(0.75)}–${p(0.6)}`, color: "emerald" },
        { n: 3, name: "Endurance active / Tempo", pct: "75–85 %", range: `${p(0.85)}–${p(0.75)}`, color: "yellow" },
        { n: 4, name: "Seuil", pct: "85–90 %", range: `${p(0.9)}–${p(0.85)}`, color: "red" },
        { n: 5, name: "Résistance dure", pct: "90–100 %", range: `${p(1)}–${p(0.9)}`, color: "orange" },
        { n: 6, name: "VMA / PMA", pct: "100–110 %", range: `${p(1.1)}–${p(1)}`, color: "pink" },
        { n: 7, name: "Fractionné court", pct: "> 110 %", range: `< ${p(1.1)}`, color: "indigo" },
    ];
}

export default function PaceZonesCalculator() {
    const searchParams = useSearchParams();
    const initialMethod = (searchParams.get("method") as Method) || "vma";
    const validMethod: Method = ["vma", "race", "threshold"].includes(initialMethod) ? initialMethod : "vma";

    const [method, setMethod] = useState<Method>(validMethod);
    const [copied, setCopied] = useState(false);

    const [vmaInput, setVmaInput] = useState(() => searchParams.get("vma") || "16");

    const [raceKey, setRaceKey] = useState(() => searchParams.get("race") || "10000");
    const [h, setH] = useState(() => searchParams.get("h") || "0");
    const [m, setM] = useState(() => searchParams.get("m") || "42");
    const [s, setS] = useState(() => searchParams.get("s") || "0");

    const [thresholdMin, setThresholdMin] = useState(() => searchParams.get("tmin") || "4");
    const [thresholdSec, setThresholdSec] = useState(() => searchParams.get("tsec") || "30");

    const vma = useMemo(() => {
        if (method === "vma") {
            const v = parseFloat(vmaInput);
            return Number.isFinite(v) && v > 0 ? v : null;
        }

        if (method === "race") {
            const race = raceOptions.find((r) => r.key === raceKey);
            const hh = parseFloat(h) || 0;
            const mm = parseFloat(m) || 0;
            const ss = parseFloat(s) || 0;
            const totalSeconds = hh * 3600 + mm * 60 + ss;
            if (!race || totalSeconds <= 0) return null;
            const speed = race.km / (totalSeconds / 3600);
            return speed / race.pct;
        }

        const mm = parseFloat(thresholdMin) || 0;
        const ss = parseFloat(thresholdSec) || 0;
        const paceMinPerKm = mm + ss / 60;
        if (paceMinPerKm <= 0) return null;
        const thresholdSpeed = 60 / paceMinPerKm;
        return thresholdSpeed / THRESHOLD_PCT_OF_VMA;
    }, [method, vmaInput, raceKey, h, m, s, thresholdMin, thresholdSec]);

    const zones = vma !== null ? paceZones(vma) : [];

    return (
        <div className="space-y-8">
            <div className={`p-6 md:p-8 ${card}`}>
                <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Méthode
                </label>
                <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {([
                        { key: "vma", label: "Test VMA direct" },
                        { key: "race", label: "Résultat de course" },
                        { key: "threshold", label: "Allure seuil connue" },
                    ] as { key: Method; label: string }[]).map((opt) => (
                        <button
                            key={opt.key}
                            type="button"
                            onClick={() => setMethod(opt.key)}
                            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                                method === opt.key
                                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {method === "vma" && (
                    <div className="max-w-xs">
                        <label htmlFor="vma" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            <Footprints size={16} className="text-blue-600" />
                            VMA (km/h)
                        </label>
                        <input
                            id="vma"
                            type="number"
                            inputMode="decimal"
                            min={0}
                            value={vmaInput}
                            onChange={(e) => setVmaInput(e.target.value)}
                            className={inputClass}
                        />
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            Issue d&apos;un test VAMEVAL, demi-Cooper, 45-15 ou équivalent.
                        </p>
                    </div>
                )}

                {method === "race" && (
                    <div className="space-y-4">
                        <div className="max-w-xs">
                            <label htmlFor="race" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Distance
                            </label>
                            <select
                                id="race"
                                value={raceKey}
                                onChange={(e) => setRaceKey(e.target.value)}
                                className={inputClass}
                            >
                                {raceOptions.map((r) => (
                                    <option key={r.key} value={r.key}>
                                        {r.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Temps réalisé
                            </label>
                            <div className="grid max-w-xs grid-cols-3 gap-2">
                                <div>
                                    <input type="number" inputMode="decimal" min={0} value={h} onChange={(e) => setH(e.target.value)} className={inputClass} />
                                    <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">h</p>
                                </div>
                                <div>
                                    <input type="number" inputMode="decimal" min={0} value={m} onChange={(e) => setM(e.target.value)} className={inputClass} />
                                    <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">min</p>
                                </div>
                                <div>
                                    <input type="number" inputMode="decimal" min={0} value={s} onChange={(e) => setS(e.target.value)} className={inputClass} />
                                    <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">sec</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {"Estimation basée sur le % de VMA typiquement soutenu sur cette distance par un coureur entraîné — une approximation, pas une mesure directe."}
                        </p>
                    </div>
                )}

                {method === "threshold" && (
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Allure au seuil (par km)
                        </label>
                        <div className="grid max-w-xs grid-cols-2 gap-2">
                            <div>
                                <input type="number" inputMode="decimal" min={0} value={thresholdMin} onChange={(e) => setThresholdMin(e.target.value)} className={inputClass} />
                                <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">min</p>
                            </div>
                            <div>
                                <input type="number" inputMode="decimal" min={0} value={thresholdSec} onChange={(e) => setThresholdSec(e.target.value)} className={inputClass} />
                                <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">sec</p>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            {"On considère l'allure seuil ≈ 88% de la VMA pour en déduire les autres zones."}
                        </p>
                    </div>
                )}
            </div>

            <div className={`p-6 md:p-8 ${card}`}>
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">Vos zones d&apos;allure</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">En % de la VMA.</p>
                    </div>
                    {vma !== null && (
                        <button
                            type="button"
                            onClick={() => {
                                const params = new URLSearchParams();
                                params.set("method", method);
                                if (method === "vma") params.set("vma", vmaInput);
                                else if (method === "race") {
                                    params.set("race", raceKey);
                                    params.set("h", h);
                                    params.set("m", m);
                                    params.set("s", s);
                                } else {
                                    params.set("tmin", thresholdMin);
                                    params.set("tsec", thresholdSec);
                                }
                                navigator.clipboard
                                    .writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`)
                                    .then(() => {
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    });
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                        >
                            {copied ? <Check size={14} className="text-emerald-600" /> : <Link2 size={14} />}
                            {copied ? "Lien copié" : "Copier le lien"}
                        </button>
                    )}
                </div>

                {vma !== null ? (
                    <>
                        <div className="mb-6">
                            <p className="text-3xl font-black text-blue-600">{vma.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                VMA {method !== "vma" ? "estimée" : ""} (km/h)
                            </p>
                        </div>
                        <ZoneTable zones={zones} unit="min/km" />
                        <div className="mt-6">
                            <LeadCapture
                                tool="Zones d'allure"
                                summary={`VMA ${method !== "vma" ? "estimée" : ""} : ${vma.toFixed(1)} km/h\n\nZones d'allure :\n${zones.map((z) => `Z${z.n} ${z.name} : ${z.range} /km`).join("\n")}`}
                            />
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Renseignez les valeurs demandées pour afficher vos zones d&apos;allure.
                    </p>
                )}
            </div>
        </div>
    );
}

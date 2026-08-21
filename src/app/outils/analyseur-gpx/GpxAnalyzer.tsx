// app/outils/analyseur-gpx/GpxAnalyzer.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { Upload, FileUp, Mountain, ArrowUp, ArrowDown, Ruler } from "lucide-react";
import Badge from "../../components/Badge";
import LeadCapture from "../../components/LeadCapture";
import ElevationChart from "./ElevationChart";
import {
    parseGpx,
    buildTrack,
    computeElevationStats,
    downsampleForChart,
    estimateRunTimeMin,
    estimateBikeTimeMin,
    type TrackPoint,
    type ElevationStats,
} from "./gpxUtils";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

type Discipline = "course" | "velo";

function formatDuration(totalMinutes: number): string {
    if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return "—";
    const totalSeconds = Math.round(totalMinutes * 60);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h}h${m.toString().padStart(2, "0")}min`;
    return `${m}min${s.toString().padStart(2, "0")}`;
}

export default function GpxAnalyzer() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState<string | null>(null);
    const [points, setPoints] = useState<TrackPoint[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [discipline, setDiscipline] = useState<Discipline>("course");
    const [flatPaceMin, setFlatPaceMin] = useState("5");
    const [flatPaceSec, setFlatPaceSec] = useState("0");
    const [weightInput, setWeightInput] = useState("78");
    const [powerInput, setPowerInput] = useState("220");

    const handleFile = (file: File) => {
        setError(null);
        setLoading(true);
        setPoints(null);
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const text = String(reader.result || "");
                const raw = parseGpx(text);
                const track = buildTrack(raw);
                setPoints(track);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Impossible de lire ce fichier GPX.");
            } finally {
                setLoading(false);
            }
        };
        reader.onerror = () => {
            setError("Impossible de lire ce fichier.");
            setLoading(false);
        };
        reader.readAsText(file);
    };

    const stats: ElevationStats | null = useMemo(() => (points ? computeElevationStats(points) : null), [points]);
    const chartData = useMemo(() => (points ? downsampleForChart(points) : []), [points]);

    const estimation = useMemo(() => {
        if (!points) return null;

        if (discipline === "course") {
            const pace = (parseFloat(flatPaceMin) || 0) + (parseFloat(flatPaceSec) || 0) / 60;
            if (pace <= 0) return null;
            const timeMin = estimateRunTimeMin(points, pace);
            return { timeMin, extra: null as string | null };
        }

        const weight = parseFloat(weightInput);
        const power = parseFloat(powerInput);
        if (!(weight > 0) || !(power > 0)) return null;
        const { timeMin, avgSpeedKmh } = estimateBikeTimeMin(points, {
            totalMassKg: weight,
            powerW: power,
            crr: 0.005,
            cda: 0.32,
        });
        return { timeMin, extra: `${avgSpeedKmh.toFixed(1)} km/h en moyenne` };
    }, [points, discipline, flatPaceMin, flatPaceSec, weightInput, powerInput]);

    return (
        <div className="space-y-8">
            <div className={`p-6 md:p-8 ${card}`}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".gpx"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                    }}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition-colors hover:border-blue-500 hover:bg-blue-50/50 dark:border-slate-700 dark:hover:border-blue-500 dark:hover:bg-blue-500/5"
                >
                    <Upload size={28} className="text-blue-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {fileName ? "Changer de fichier GPX" : "Cliquez pour choisir un fichier GPX"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {fileName ?? "Export depuis Strava, Garmin Connect, Komoot..."}
                    </span>
                </button>

                {loading && <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Analyse du fichier…</p>}
                {error && <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
                <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                    Votre fichier est traité entièrement dans votre navigateur — il n&apos;est jamais envoyé à un serveur.
                </p>
            </div>

            {stats && (
                <>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className={`p-5 ${card}`}>
                            <Ruler size={18} className="mb-2 text-blue-600" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">{stats.distanceKm.toFixed(1)} km</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Distance</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <ArrowUp size={18} className="mb-2 text-orange-600" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">{Math.round(stats.gainM)} m</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">D+</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <ArrowDown size={18} className="mb-2 text-emerald-600" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">{Math.round(stats.lossM)} m</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">D-</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <Mountain size={18} className="mb-2 text-violet-600" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">
                                {Math.round(stats.minEle)}–{Math.round(stats.maxEle)} m
                            </p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Altitude</p>
                        </div>
                    </div>

                    <div className={`p-6 md:p-8 ${card}`}>
                        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Profil d&apos;élévation</h3>
                        <ElevationChart data={chartData} />
                    </div>

                    <div className={`p-6 md:p-8 ${card}`}>
                        <div className="mb-6 flex items-center gap-2">
                            <FileUp size={18} className="text-blue-600" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Estimation de temps</h3>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-2 max-w-xs">
                            <button
                                type="button"
                                onClick={() => setDiscipline("course")}
                                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                                    discipline === "course"
                                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                                }`}
                            >
                                Course à pied
                            </button>
                            <button
                                type="button"
                                onClick={() => setDiscipline("velo")}
                                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                                    discipline === "velo"
                                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                                }`}
                            >
                                Vélo
                            </button>
                        </div>

                        {discipline === "course" ? (
                            <div className="mb-6 max-w-xs">
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Allure à plat (min/km)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="number" inputMode="decimal" min={0} value={flatPaceMin} onChange={(e) => setFlatPaceMin(e.target.value)} className={inputClass} />
                                    <input type="number" inputMode="decimal" min={0} max={59} value={flatPaceSec} onChange={(e) => setFlatPaceSec(e.target.value)} className={inputClass} />
                                </div>
                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                    Estimation basée sur le coût énergétique de la course selon la pente (modèle de Minetti).
                                </p>
                            </div>
                        ) : (
                            <div className="mb-6 grid gap-4 sm:grid-cols-2 max-w-md">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Poids total (vélo + vous, kg)
                                    </label>
                                    <input type="number" inputMode="decimal" min={0} value={weightInput} onChange={(e) => setWeightInput(e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Puissance cible (W)
                                    </label>
                                    <input type="number" inputMode="decimal" min={0} value={powerInput} onChange={(e) => setPowerInput(e.target.value)} className={inputClass} />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 sm:col-span-2">
                                    Modèle physique simplifié (résistance au roulement, aérodynamisme, pente) avec des valeurs par
                                    défaut position route (Cx·SA ≈ 0,32, Crr ≈ 0,005).
                                </p>
                            </div>
                        )}

                        {estimation ? (
                            <>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge text={`Temps estimé : ${formatDuration(estimation.timeMin)}`} color="blue" />
                                    {estimation.extra && <Badge text={estimation.extra} color="slate" />}
                                </div>
                                <div className="mt-6">
                                    <LeadCapture
                                        tool="Analyseur GPX"
                                        summary={`Distance : ${stats.distanceKm.toFixed(1)} km — D+ ${Math.round(stats.gainM)} m — D- ${Math.round(stats.lossM)} m\nTemps estimé (${discipline}) : ${formatDuration(estimation.timeMin)}${estimation.extra ? ` — ${estimation.extra}` : ""}`}
                                    />
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Renseignez les valeurs demandées pour estimer votre temps sur ce parcours.
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

// app/outils/convertisseur-allure/RacePredictor.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TrendingUp, Link2, Check } from "lucide-react";
import Badge from "../../components/Badge";
import LeadCapture from "../../components/LeadCapture";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

const RIEGEL_EXPONENT = 1.06;

const raceOptions = [
    { key: "1000", label: "1 km", km: 1 },
    { key: "5000", label: "5 km", km: 5 },
    { key: "10000", label: "10 km", km: 10 },
    { key: "21097", label: "Semi-marathon", km: 21.097 },
    { key: "42195", label: "Marathon", km: 42.195 },
];

function formatDuration(totalMinutes: number): string {
    if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return "—";
    const totalSeconds = Math.round(totalMinutes * 60);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatPace(minutesPerKm: number): string {
    if (!Number.isFinite(minutesPerKm) || minutesPerKm <= 0) return "—";
    const mm = Math.floor(minutesPerKm);
    let ss = Math.round((minutesPerKm - mm) * 60);
    let m = mm;
    if (ss === 60) {
        ss = 0;
        m += 1;
    }
    return `${m}:${ss.toString().padStart(2, "0")}`;
}

export default function RacePredictor() {
    const searchParams = useSearchParams();
    const [raceKey, setRaceKey] = useState(() => searchParams.get("race") || "10000");
    const [h, setH] = useState(() => searchParams.get("h") || "0");
    const [m, setM] = useState(() => searchParams.get("m") || "42");
    const [s, setS] = useState(() => searchParams.get("s") || "0");
    const [copied, setCopied] = useState(false);

    const race = raceOptions.find((r) => r.key === raceKey)!;
    const totalMinutes = (parseFloat(h) || 0) * 60 + (parseFloat(m) || 0) + (parseFloat(s) || 0) / 60;
    const valid = totalMinutes > 0;

    const predictions = useMemo(() => {
        if (!valid) return [];
        return raceOptions.map((r) => {
            const predictedMin = totalMinutes * (r.km / race.km) ** RIEGEL_EXPONENT;
            return { ...r, predictedMin, pace: predictedMin / r.km };
        });
    }, [valid, totalMinutes, race.km]);

    return (
        <div className={`p-6 md:p-8 ${card}`}>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Prédicteur de temps de course</h3>
                </div>
                {predictions.length > 0 && (
                    <button
                        type="button"
                        onClick={() => {
                            const params = new URLSearchParams();
                            params.set("race", raceKey);
                            params.set("h", h);
                            params.set("m", m);
                            params.set("s", s);
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

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="max-w-xs">
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Distance de référence
                    </label>
                    <select value={raceKey} onChange={(e) => setRaceKey(e.target.value)} className={inputClass}>
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
            </div>

            {predictions.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[320px] border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                <th className="py-2 pr-2 font-semibold">Distance</th>
                                <th className="py-2 pr-2 font-semibold">Temps prédit</th>
                                <th className="py-2 font-semibold">Allure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {predictions.map((p) => (
                                <tr key={p.key} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                                    <td className="py-2.5 pr-2">
                                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                            {p.key === raceKey && <Badge text="Réf." color="blue" />}
                                            {p.label}
                                        </div>
                                    </td>
                                    <td className="py-2.5 pr-2 font-semibold text-slate-900 dark:text-white">
                                        {formatDuration(p.predictedMin)}
                                    </td>
                                    <td className="py-2.5 text-slate-600 dark:text-slate-400">{formatPace(p.pace)} /km</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-6">
                        <LeadCapture
                            tool="Prédicteur de temps de course"
                            summary={`Référence : ${race.label} en ${formatDuration(totalMinutes)}\n\nPrédictions :\n${predictions.map((p) => `${p.label} : ${formatDuration(p.predictedMin)} (${formatPace(p.pace)} /km)`).join("\n")}`}
                        />
                    </div>
                </div>
            ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">Renseignez un temps de course pour voir les prédictions.</p>
            )}

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
                {"Basé sur la formule de Riegel (T2 = T1 × (D2/D1)^1.06). Plus fiable entre distances proches (10 km → semi) que sur de grands écarts (5 km → marathon), où l'endurance spécifique pèse davantage que ne le prédit la formule."}
            </p>
        </div>
    );
}

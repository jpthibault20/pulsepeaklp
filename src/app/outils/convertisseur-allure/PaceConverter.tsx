// app/outils/convertisseur-allure/PaceConverter.tsx
"use client";

import { useMemo, useState } from "react";
import { Timer } from "lucide-react";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

const KM_PER_MILE = 1.60934;

const distances = [
    { name: "400 m", km: 0.4 },
    { name: "1 km", km: 1 },
    { name: "1 mile", km: KM_PER_MILE },
    { name: "5 km", km: 5 },
    { name: "10 km", km: 10 },
    { name: "Semi-marathon", km: 21.097 },
    { name: "Marathon", km: 42.195 },
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

export default function PaceConverter() {
    const [paceMin, setPaceMin] = useState("5");
    const [paceSec, setPaceSec] = useState("0");

    const paceMinPerKm = (parseFloat(paceMin) || 0) + (parseFloat(paceSec) || 0) / 60;
    const valid = paceMinPerKm > 0;

    const { kmh, mph, paceMile } = useMemo(() => {
        if (!valid) return { kmh: null, mph: null, paceMile: null };
        const speedKmh = 60 / paceMinPerKm;
        return {
            kmh: speedKmh,
            mph: speedKmh / KM_PER_MILE,
            paceMile: paceMinPerKm * KM_PER_MILE,
        };
    }, [valid, paceMinPerKm]);

    return (
        <div className={`p-6 md:p-8 ${card}`}>
            <div className="mb-6 flex items-center gap-2">
                <Timer size={18} className="text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Convertisseur d&apos;allure</h3>
            </div>

            <div className="mb-6 max-w-xs">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Allure (min/km)
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <input type="number" inputMode="decimal" min={0} value={paceMin} onChange={(e) => setPaceMin(e.target.value)} className={inputClass} />
                        <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">min</p>
                    </div>
                    <div>
                        <input type="number" inputMode="decimal" min={0} max={59} value={paceSec} onChange={(e) => setPaceSec(e.target.value)} className={inputClass} />
                        <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">sec</p>
                    </div>
                </div>
            </div>

            {kmh !== null && mph !== null && paceMile !== null ? (
                <>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-2xl font-black text-blue-600">{formatPace(paceMile)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">min/mile</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{kmh.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">km/h</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{mph.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">mph</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[280px] border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                    <th className="py-2 pr-2 font-semibold">Distance</th>
                                    <th className="py-2 font-semibold">Temps à cette allure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {distances.map((d) => (
                                    <tr key={d.name} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                                        <td className="py-2.5 pr-2 text-slate-700 dark:text-slate-300">{d.name}</td>
                                        <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                                            {formatDuration(paceMinPerKm * d.km)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">Renseignez une allure pour voir les conversions.</p>
            )}
        </div>
    );
}

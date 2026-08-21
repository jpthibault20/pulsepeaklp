// app/outils/calculateur-zones/puissance/PowerZonesCalculator.tsx
"use client";

import { useMemo, useState } from "react";
import { Zap } from "lucide-react";
import Badge from "../../../components/Badge";
import type { BadgeColor } from "../../../components/Badge";
import ZoneTable, { type ZoneRow } from "../components/ZoneTable";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

type Method = "20" | "8" | "5" | "combine";

const methodInfo: Record<Method, { label: string; factor?: number; reliability: string; reliabilityColor: BadgeColor }> = {
    "20": { label: "Test de 20 min", factor: 0.95, reliability: "Fiabilité élevée", reliabilityColor: "emerald" },
    "8": { label: "Test de 8 min", factor: 0.9, reliability: "Fiabilité moyenne", reliabilityColor: "yellow" },
    "5": { label: "Test de 5 min", factor: 0.85, reliability: "Fiabilité faible", reliabilityColor: "orange" },
    combine: { label: "Test combiné (2 efforts)", reliability: "Fiabilité élevée si tests bien espacés", reliabilityColor: "emerald" },
};

function powerZones(ftp: number): ZoneRow[] {
    const r = (v: number) => Math.round(v);
    return [
        { n: 1, name: "Récupération active", pct: "< 55 %", range: `0–${r(ftp * 0.55)}`, color: "blue" },
        { n: 2, name: "Endurance", pct: "56–75 %", range: `${r(ftp * 0.56)}–${r(ftp * 0.75)}`, color: "emerald" },
        { n: 3, name: "Tempo", pct: "76–90 %", range: `${r(ftp * 0.76)}–${r(ftp * 0.9)}`, color: "yellow" },
        { n: 4, name: "Seuil", pct: "91–105 %", range: `${r(ftp * 0.91)}–${r(ftp * 1.05)}`, color: "red" },
        { n: 5, name: "VO2max", pct: "106–120 %", range: `${r(ftp * 1.06)}–${r(ftp * 1.2)}`, color: "violet" },
        { n: 6, name: "Capacité anaérobie", pct: "121–150 %", range: `${r(ftp * 1.21)}–${r(ftp * 1.5)}`, color: "orange" },
        { n: 7, name: "Neuromusculaire", pct: "> 150 %", range: `> ${r(ftp * 1.51)}`, color: "pink" },
    ];
}

export default function PowerZonesCalculator() {
    const [method, setMethod] = useState<Method>("20");

    const [singlePower, setSinglePower] = useState("280");
    const [weightInput, setWeightInput] = useState("70");

    const [t1, setT1] = useState("5");
    const [p1, setP1] = useState("330");
    const [t2, setT2] = useState("20");
    const [p2, setP2] = useState("266");

    const weight = parseFloat(weightInput);
    const validWeight = Number.isFinite(weight) && weight > 0;

    const { ftp, wPrime, error } = useMemo(() => {
        if (method !== "combine") {
            const power = parseFloat(singlePower);
            const factor = methodInfo[method].factor!;
            if (!Number.isFinite(power) || power <= 0) return { ftp: null, wPrime: null, error: null };
            return { ftp: power * factor, wPrime: null, error: null };
        }

        const d1 = parseFloat(t1);
        const d2 = parseFloat(t2);
        const w1 = parseFloat(p1);
        const w2 = parseFloat(p2);

        if (![d1, d2, w1, w2].every((v) => Number.isFinite(v) && v > 0)) {
            return { ftp: null, wPrime: null, error: null };
        }
        if (Math.abs(d1 - d2) < 2) {
            return { ftp: null, wPrime: null, error: "Les deux durées doivent être espacées d'au moins 2 minutes pour un modèle fiable." };
        }

        const s1 = d1 * 60;
        const s2 = d2 * 60;
        const cp = (w1 * s1 - w2 * s2) / (s1 - s2);
        const wp = (w1 - cp) * s1;

        if (!Number.isFinite(cp) || cp <= 0) {
            return { ftp: null, wPrime: null, error: "Impossible de calculer un résultat cohérent avec ces valeurs — vérifiez vos efforts." };
        }

        return { ftp: cp, wPrime: wp, error: null };
    }, [method, singlePower, t1, p1, t2, p2]);

    const zones = ftp !== null ? powerZones(ftp) : [];
    const wPerKg = ftp !== null && validWeight ? ftp / weight : null;

    return (
        <div className="space-y-8">
            <div className={`p-6 md:p-8 ${card}`}>
                <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Méthode de test
                </label>
                <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {(Object.keys(methodInfo) as Method[]).map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMethod(m)}
                            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                                method === m
                                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`}
                        >
                            {methodInfo[m].label}
                        </button>
                    ))}
                </div>

                <Badge text={methodInfo[method].reliability} color={methodInfo[method].reliabilityColor} className="mb-6" />

                {method !== "combine" ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="power" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                <Zap size={16} className="text-blue-600" />
                                Puissance moyenne du test (watts)
                            </label>
                            <input
                                id="power"
                                type="number"
                                inputMode="decimal"
                                min={0}
                                value={singlePower}
                                onChange={(e) => setSinglePower(e.target.value)}
                                className={inputClass}
                            />
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                FTP estimée = puissance moyenne × {methodInfo[method].factor}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="weight" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Poids (kg) — optionnel
                            </label>
                            <input
                                id="weight"
                                type="number"
                                inputMode="decimal"
                                min={0}
                                value={weightInput}
                                onChange={(e) => setWeightInput(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="t1" className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Effort 1 — durée (min)
                                    </label>
                                    <input id="t1" type="number" inputMode="decimal" min={0} value={t1} onChange={(e) => setT1(e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label htmlFor="p1" className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Puissance (W)
                                    </label>
                                    <input id="p1" type="number" inputMode="decimal" min={0} value={p1} onChange={(e) => setP1(e.target.value)} className={inputClass} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="t2" className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Effort 2 — durée (min)
                                    </label>
                                    <input id="t2" type="number" inputMode="decimal" min={0} value={t2} onChange={(e) => setT2(e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label htmlFor="p2" className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Puissance (W)
                                    </label>
                                    <input id="p2" type="number" inputMode="decimal" min={0} value={p2} onChange={(e) => setP2(e.target.value)} className={inputClass} />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {"Choisissez deux efforts maximaux de durées différentes (ex. 5 et 20 min), idéalement espacées d'au moins 5 à 10 minutes pour un modèle fiable. La FTP est approchée par la « Critical Power » (Monod & Scherrer)."}
                        </p>
                        <div className="max-w-xs">
                            <label htmlFor="weight2" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Poids (kg) — optionnel
                            </label>
                            <input
                                id="weight2"
                                type="number"
                                inputMode="decimal"
                                min={0}
                                value={weightInput}
                                onChange={(e) => setWeightInput(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>
                )}

                {error && <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
            </div>

            <div className={`p-6 md:p-8 ${card}`}>
                <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">Vos zones de puissance</h3>
                <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">Modèle 7 zones (Coggan).</p>

                {ftp !== null ? (
                    <>
                        <div className="mb-6 flex flex-wrap gap-8">
                            <div>
                                <p className="text-3xl font-black text-blue-600">{Math.round(ftp)}</p>
                                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    {method === "combine" ? "Critical Power (≈ FTP)" : "FTP estimée (W)"}
                                </p>
                            </div>
                            {wPerKg !== null && (
                                <div>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">{wPerKg.toFixed(2)}</p>
                                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">W/kg</p>
                                </div>
                            )}
                            {wPrime !== null && (
                                <div>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">{(wPrime / 1000).toFixed(1)}</p>
                                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">W&apos; (kJ)</p>
                                </div>
                            )}
                        </div>
                        <ZoneTable zones={zones} unit="Watts" />
                    </>
                ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Renseignez les valeurs de votre test pour afficher vos zones.
                    </p>
                )}
            </div>
        </div>
    );
}

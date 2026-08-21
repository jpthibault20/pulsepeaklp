// app/outils/calculateur-zones/fc/HrZonesCalculator.tsx
"use client";

import { useMemo, useState } from "react";
import { HeartPulse } from "lucide-react";
import Badge from "../../../components/Badge";
import ZoneTable, { type ZoneRow } from "../components/ZoneTable";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

function hrZones(rest: number, max: number): ZoneRow[] {
    const hrr = max - rest;
    const at = (pct: number) => Math.round(rest + pct * hrr);
    return [
        { n: 1, name: "Récupération", pct: "50–60 % HRR", range: `${at(0.5)}–${at(0.6)}`, color: "blue" },
        { n: 2, name: "Endurance", pct: "60–70 % HRR", range: `${at(0.6)}–${at(0.7)}`, color: "emerald" },
        { n: 3, name: "Tempo", pct: "70–80 % HRR", range: `${at(0.7)}–${at(0.8)}`, color: "yellow" },
        { n: 4, name: "Seuil", pct: "80–90 % HRR", range: `${at(0.8)}–${at(0.9)}`, color: "red" },
        { n: 5, name: "VO2max", pct: "90–100 % HRR", range: `${at(0.9)}–${at(1)}`, color: "violet" },
    ];
}

export default function HrZonesCalculator() {
    const [restInput, setRestInput] = useState("55");
    const [knowsMax, setKnowsMax] = useState(true);
    const [maxInput, setMaxInput] = useState("185");
    const [ageInput, setAgeInput] = useState("30");

    const rest = parseFloat(restInput);
    const validRest = Number.isFinite(rest) && rest > 0;

    const age = parseFloat(ageInput);
    const validAge = Number.isFinite(age) && age > 0;

    const estimatedMax = validAge ? 208 - 0.7 * age : null;
    const maxManual = parseFloat(maxInput);
    const max = knowsMax ? maxManual : estimatedMax;
    const validMax = Number.isFinite(max ?? NaN) && (max ?? 0) > 0;

    const zones = useMemo(() => {
        if (!validRest || !validMax || !max) return [];
        if (max <= rest) return [];
        return hrZones(rest, max);
    }, [validRest, validMax, max, rest]);

    const invalidOrder = validRest && validMax && max !== null && max <= rest;

    return (
        <div className="space-y-8">
            <div className={`p-6 md:p-8 ${card}`}>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="rest" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            <HeartPulse size={16} className="text-blue-600" />
                            FC repos (bpm)
                        </label>
                        <input
                            id="rest"
                            type="number"
                            inputMode="decimal"
                            min={0}
                            value={restInput}
                            onChange={(e) => setRestInput(e.target.value)}
                            className={inputClass}
                        />
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            Mesurée idéalement au réveil, avant de vous lever.
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                            FC max
                        </label>
                        <div className="mb-3 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setKnowsMax(true)}
                                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                                    knowsMax
                                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                                }`}
                            >
                                Je la connais
                            </button>
                            <button
                                type="button"
                                onClick={() => setKnowsMax(false)}
                                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                                    !knowsMax
                                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                                }`}
                            >
                                L&apos;estimer via mon âge
                            </button>
                        </div>

                        {knowsMax ? (
                            <input
                                type="number"
                                inputMode="decimal"
                                min={0}
                                value={maxInput}
                                onChange={(e) => setMaxInput(e.target.value)}
                                className={inputClass}
                            />
                        ) : (
                            <>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    min={0}
                                    value={ageInput}
                                    onChange={(e) => setAgeInput(e.target.value)}
                                    placeholder="Âge"
                                    className={inputClass}
                                />
                                {estimatedMax !== null && (
                                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                        FC max estimée : ~{Math.round(estimatedMax)} bpm (formule de Tanaka). Une mesure réelle
                                        (test terrain ou labo) sera toujours plus précise.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {invalidOrder && (
                    <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
                        La FC max doit être supérieure à la FC repos.
                    </p>
                )}
            </div>

            <div className={`p-6 md:p-8 ${card}`}>
                <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">Vos zones de fréquence cardiaque</h3>
                <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
                    Modèle de Karvonen (% de réserve cardiaque — HRR).
                </p>

                {zones.length > 0 ? (
                    <>
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            <Badge text={`FC repos : ${Math.round(rest)} bpm`} color="slate" />
                            <Badge text={`FC max : ${Math.round(max as number)} bpm`} color="slate" />
                        </div>
                        <ZoneTable zones={zones} unit="bpm" />
                    </>
                ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Renseignez votre FC repos et votre FC max (ou votre âge) pour afficher vos zones.
                    </p>
                )}
            </div>
        </div>
    );
}

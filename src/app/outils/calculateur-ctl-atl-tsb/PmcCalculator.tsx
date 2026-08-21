// app/outils/calculateur-ctl-atl-tsb/PmcCalculator.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { Upload, Activity } from "lucide-react";
import Badge from "../../components/Badge";
import type { BadgeColor } from "../../components/Badge";
import PmcChart from "./PmcChart";
import { parseCsv, detectDateColumn, detectLoadColumn, buildDailyLoad, computePmc } from "./pmcUtils";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

function tsbInterpretation(tsb: number): { label: string; color: BadgeColor } {
    if (tsb > 25) return { label: "Très frais — attention à la perte de forme si prolongé", color: "violet" };
    if (tsb > 5) return { label: "Frais, prêt pour la performance", color: "emerald" };
    if (tsb > -10) return { label: "Zone d'entraînement optimale", color: "blue" };
    if (tsb > -30) return { label: "Fatigue — bloc de charge en cours", color: "orange" };
    return { label: "Risque de surentraînement", color: "red" };
}

export default function PmcCalculator() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState<string | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<string[][]>([]);
    const [dateIdx, setDateIdx] = useState<number | null>(null);
    const [loadIdx, setLoadIdx] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFile = (file: File) => {
        setError(null);
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const text = String(reader.result || "");
                const { headers: h, rows: r } = parseCsv(text);
                if (h.length === 0 || r.length === 0) {
                    throw new Error("Ce fichier CSV semble vide.");
                }
                setHeaders(h);
                setRows(r);
                setDateIdx(detectDateColumn(h));
                setLoadIdx(detectLoadColumn(h));
            } catch (e) {
                setError(e instanceof Error ? e.message : "Impossible de lire ce fichier CSV.");
                setHeaders([]);
                setRows([]);
            }
        };
        reader.onerror = () => setError("Impossible de lire ce fichier.");
        reader.readAsText(file);
    };

    const pmc = useMemo(() => {
        if (dateIdx === null || loadIdx === null || rows.length === 0) return [];
        const daily = buildDailyLoad(rows, dateIdx, loadIdx);
        return computePmc(daily);
    }, [rows, dateIdx, loadIdx]);

    const latest = pmc.length > 0 ? pmc[pmc.length - 1] : null;
    const interpretation = latest ? tsbInterpretation(latest.tsb) : null;

    return (
        <div className="space-y-8">
            <div className={`p-6 md:p-8 ${card}`}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
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
                        {fileName ? "Changer de fichier CSV" : "Cliquez pour choisir un export CSV Strava"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {fileName ?? "Réglages Strava → Mon compte → Télécharger ou supprimer vos données"}
                    </span>
                </button>

                {error && <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

                {headers.length > 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Colonne date
                            </label>
                            <select
                                value={dateIdx ?? ""}
                                onChange={(e) => setDateIdx(e.target.value === "" ? null : Number(e.target.value))}
                                className={inputClass}
                            >
                                <option value="">— Choisir —</option>
                                {headers.map((h, i) => (
                                    <option key={i} value={i}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Colonne charge (Relative Effort / TSS...)
                            </label>
                            <select
                                value={loadIdx ?? ""}
                                onChange={(e) => setLoadIdx(e.target.value === "" ? null : Number(e.target.value))}
                                className={inputClass}
                            >
                                <option value="">— Choisir —</option>
                                {headers.map((h, i) => (
                                    <option key={i} value={i}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {(dateIdx === null || loadIdx === null) && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 sm:col-span-2">
                                {"Nous n'avons pas pu détecter automatiquement les bonnes colonnes — sélectionnez-les manuellement ci-dessus."}
                            </p>
                        )}
                    </div>
                )}

                <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                    Votre fichier est traité entièrement dans votre navigateur — il n&apos;est jamais envoyé à un serveur.
                </p>
            </div>

            {pmc.length > 1 && latest && interpretation && (
                <>
                    <div className="grid grid-cols-3 gap-4">
                        <div className={`p-5 ${card}`}>
                            <p className="text-xl font-black text-blue-600">{latest.ctl.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">CTL (fitness)</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <p className="text-xl font-black text-orange-500">{latest.atl.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">ATL (fatigue)</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <p className="text-xl font-black text-emerald-500">{latest.tsb.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">TSB (forme)</p>
                        </div>
                    </div>

                    <div className={`p-6 md:p-8 ${card}`}>
                        <div className="mb-4 flex items-center gap-2">
                            <Activity size={18} className="text-blue-600" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Évolution de la charge</h3>
                        </div>
                        <div className="mb-6">
                            <Badge text={interpretation.label} color={interpretation.color} />
                        </div>
                        <PmcChart points={pmc} />
                        <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
                            {"CTL = moyenne mobile exponentielle sur 42 jours de votre charge quotidienne. ATL = idem sur 7 jours. TSB = CTL − ATL de la veille. Les premières semaines du graphique sous-estiment votre CTL/ATL réelles, le temps que le modèle \"monte en charge\" à partir de zéro."}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

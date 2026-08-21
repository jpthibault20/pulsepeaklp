// app/outils/calculateur-nutrition-sortie-longue/NutritionCalculator.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Wheat, Droplets, FlaskConical, Link2, Check } from "lucide-react";
import Badge from "../../components/Badge";
import LeadCapture from "../../components/LeadCapture";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

type Intensity = "facile" | "moderee" | "soutenue";
type Temp = "fraiche" | "moderee" | "chaude";

const intensityOptions: { key: Intensity; label: string }[] = [
    { key: "facile", label: "Facile" },
    { key: "moderee", label: "Modérée" },
    { key: "soutenue", label: "Soutenue" },
];

const tempOptions: { key: Temp; label: string }[] = [
    { key: "fraiche", label: "Fraîche (< 15°C)" },
    { key: "moderee", label: "Modérée (15-25°C)" },
    { key: "chaude", label: "Chaude (> 25°C)" },
];

const carbByIntensity: Record<"short" | "long", Record<Intensity, number>> = {
    short: { facile: 30, moderee: 45, soutenue: 60 },
    long: { facile: 45, moderee: 60, soutenue: 90 },
};

const fluidBase: Record<Intensity, number> = { facile: 400, moderee: 550, soutenue: 700 };
const fluidTempAdjust: Record<Temp, number> = { fraiche: -50, moderee: 0, chaude: 150 };

const sodiumBase: Record<Intensity, number> = { facile: 300, moderee: 450, soutenue: 600 };
const sodiumTempAdjust: Record<Temp, number> = { fraiche: -50, moderee: 0, chaude: 200 };

function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v));
}

export default function NutritionCalculator() {
    const searchParams = useSearchParams();
    const [hInput, setHInput] = useState(() => searchParams.get("h") || "3");
    const [mInput, setMInput] = useState(() => searchParams.get("m") || "0");
    const [intensity, setIntensity] = useState<Intensity>(() => {
        const v = searchParams.get("intensite");
        return v === "facile" || v === "moderee" || v === "soutenue" ? v : "moderee";
    });
    const [temp, setTemp] = useState<Temp>(() => {
        const v = searchParams.get("temp");
        return v === "fraiche" || v === "moderee" || v === "chaude" ? v : "moderee";
    });
    const [copied, setCopied] = useState(false);

    const h = parseFloat(hInput) || 0;
    const m = parseFloat(mInput) || 0;
    const durationMin = h * 60 + m;
    const durationH = durationMin / 60;

    const result = useMemo(() => {
        if (durationMin <= 0) return null;

        let carbsPerH = 0;
        if (durationMin >= 45 && durationMin <= 150) {
            carbsPerH = carbByIntensity.short[intensity];
        } else if (durationMin > 150) {
            carbsPerH = carbByIntensity.long[intensity];
        }

        const fluidPerH = clamp(fluidBase[intensity] + fluidTempAdjust[temp], 300, 1000);
        const sodiumPerH = clamp(sodiumBase[intensity] + sodiumTempAdjust[temp], 150, 1200);

        const totalCarbs = carbsPerH * durationH;
        const totalFluid = fluidPerH * durationH;
        const totalSodium = sodiumPerH * durationH;

        return { carbsPerH, fluidPerH, sodiumPerH, totalCarbs, totalFluid, totalSodium };
    }, [durationMin, durationH, intensity, temp]);

    return (
        <div className="space-y-8">
            <div className={`p-6 md:p-8 ${card}`}>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Durée de la sortie
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    min={0}
                                    value={hInput}
                                    onChange={(e) => setHInput(e.target.value)}
                                    className={inputClass}
                                />
                                <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">heures</p>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    min={0}
                                    max={59}
                                    value={mInput}
                                    onChange={(e) => setMInput(e.target.value)}
                                    className={inputClass}
                                />
                                <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">minutes</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Intensité
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {intensityOptions.map((opt) => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => setIntensity(opt.key)}
                                    className={`rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                                        intensity === opt.key
                                            ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Température ambiante
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {tempOptions.map((opt) => (
                            <button
                                key={opt.key}
                                type="button"
                                onClick={() => setTemp(opt.key)}
                                className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                                    temp === opt.key
                                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`p-6 md:p-8 ${card}`}>
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">Vos besoins estimés</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Pour {h > 0 ? `${h}h` : ""}{m > 0 ? `${m}min` : h === 0 ? "0min" : ""} d&apos;effort en intensité {intensityOptions.find((o) => o.key === intensity)?.label.toLowerCase()}.
                        </p>
                    </div>
                    {result !== null && (
                        <button
                            type="button"
                            onClick={() => {
                                const params = new URLSearchParams();
                                params.set("h", hInput);
                                params.set("m", mInput);
                                params.set("intensite", intensity);
                                params.set("temp", temp);
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

                {result === null ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">Renseignez une durée pour afficher vos besoins.</p>
                ) : durationMin < 45 ? (
                    <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
                        <Wheat size={18} className="mt-0.5 shrink-0 text-blue-600" />
                        <p>
                            {"Sur moins de 45 minutes, un apport en glucides pendant l'effort n'est généralement pas nécessaire — une hydratation simple suffit. Pensez surtout à bien manger avant et après la séance."}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-800">
                            <Wheat size={20} className="mb-3 text-orange-600 dark:text-orange-400" />
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{result.carbsPerH} g/h</p>
                            <p className="mb-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Glucides</p>
                            <Badge text={`≈ ${Math.round(result.totalCarbs)} g au total`} color="orange" />
                        </div>

                        <div className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-800">
                            <Droplets size={20} className="mb-3 text-blue-600 dark:text-blue-400" />
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{result.fluidPerH} mL/h</p>
                            <p className="mb-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Liquides</p>
                            <Badge text={`≈ ${(result.totalFluid / 1000).toFixed(1)} L au total`} color="blue" />
                        </div>

                        <div className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-800">
                            <FlaskConical size={20} className="mb-3 text-emerald-600 dark:text-emerald-400" />
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{result.sodiumPerH} mg/h</p>
                            <p className="mb-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Sodium</p>
                            <Badge text={`≈ ${Math.round(result.totalSodium)} mg au total`} color="emerald" />
                        </div>
                    </div>
                )}

                {result !== null && durationMin >= 45 && (
                    <div className="mt-6 border-t border-slate-200/80 pt-6 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                        <p className="mb-1 font-semibold text-slate-700 dark:text-slate-300">En pratique, sur toute la sortie :</p>
                        <p>
                            {"≈ "}
                            {Math.round(result.totalCarbs / 25)} gels énergétiques (25g de glucides), ou l&apos;équivalent en
                            barres/fruits secs — {" "}
                            {"≈ "}
                            {Math.max(1, Math.round(result.totalFluid / 750))} bidon(s) de 750 mL à répartir sur le parcours.
                        </p>
                    </div>
                )}

                <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
                    {"Ces repères sont des recommandations générales issues de la littérature en nutrition sportive (30 à 90 g/h de glucides, 400 à 800+ mL/h de liquides selon l'intensité et la chaleur). Ajustez selon votre tolérance digestive, votre taux de sudation personnel et vos sensations — testez toujours vos apports à l'entraînement avant une compétition."}
                </p>

                {result !== null && durationMin >= 45 && (
                    <div className="mt-6">
                        <LeadCapture
                            tool="Nutrition de sortie longue"
                            summary={`Glucides : ${result.carbsPerH} g/h (≈ ${Math.round(result.totalCarbs)} g au total)\nLiquides : ${result.fluidPerH} mL/h (≈ ${(result.totalFluid / 1000).toFixed(1)} L au total)\nSodium : ${result.sodiumPerH} mg/h (≈ ${Math.round(result.totalSodium)} mg au total)`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

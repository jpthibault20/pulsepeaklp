// app/outils/calculateur-ctl-atl-tsb/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, LineChart } from "lucide-react";
import LandingBackground from "../../components/LandingBackground";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrimaryButton from "../../components/PrimaryButton";
import Badge from "../../components/Badge";
import type { BadgeColor } from "../../components/Badge";
import AuthorBlock from "../../components/AuthorBlock";
import PmcCalculator from "./PmcCalculator";
import PmcChart from "./PmcChart";
import { generateDemoDailyLoad, computePmc } from "./pmcUtils";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export const metadata: Metadata = {
    title: "Calculateur CTL / ATL / TSB à partir d'un export Strava — PulsePeak",
    description:
        "Importez votre export CSV Strava pour visualiser votre forme (CTL, ATL, TSB) dans le temps — le modèle de gestion de charge popularisé par Coggan et TrainingPeaks.",
    alternates: {
        canonical: "/outils/calculateur-ctl-atl-tsb",
    },
};

// Exemple calculé côté serveur (fonctions pures) pour que la page affiche un
// résultat concret même sans import de fichier — date d'ancrage fixe pour un
// rendu déterministe entre deux builds.
const demoEndDate = new Date("2026-08-21");
const demoDaily = generateDemoDailyLoad(demoEndDate);
const demoPmc = computePmc(demoDaily, demoEndDate);
const demoLatest = demoPmc[demoPmc.length - 1];

const tsbTable: { range: string; label: string; color: BadgeColor }[] = [
    { range: "> +25", label: "Très frais — attention à la perte de forme si prolongé", color: "violet" },
    { range: "+5 à +25", label: "Frais, prêt pour la performance", color: "emerald" },
    { range: "-10 à +5", label: "Zone d'entraînement optimale", color: "blue" },
    { range: "-30 à -10", label: "Fatigue — bloc de charge en cours", color: "orange" },
    { range: "< -30", label: "Risque de surentraînement", color: "red" },
];

const faqs = [
    {
        q: "Comment exporter mes données depuis Strava ?",
        a: "Dans Strava, allez dans Réglages → Mon compte → « Télécharger ou supprimer vos données », puis demandez votre archive. Elle contient un fichier activities.csv que vous pouvez importer ici.",
    },
    {
        q: "Pourquoi mes colonnes ne sont pas détectées automatiquement ?",
        a: "Le format d'export de Strava peut varier selon la langue de votre compte ou les évolutions de la plateforme. Si la détection automatique échoue, sélectionnez manuellement la colonne de date et une colonne représentant une charge d'entraînement (Relative Effort, TSS, ou équivalent).",
    },
    {
        q: "Je n'ai pas de colonne \"Relative Effort\" ou \"TSS\" dans mon export, que faire ?",
        a: "Le Relative Effort de Strava n'est calculé que pour les activités avec donnée de fréquence cardiaque ou de puissance. Sans cette colonne, vous pouvez utiliser n'importe quelle mesure de charge disponible dans votre export (par exemple une estimation d'effort perçu), en gardant à l'esprit que la précision du modèle en dépend directement.",
    },
    {
        q: "Que signifie un TSB très négatif ?",
        a: "Un TSB très négatif (en dessous de -30) indique une fatigue accumulée importante par rapport à votre niveau de fitness — utile en bloc de charge, mais risqué s'il persiste sur la durée sans récupération, avec un risque de blessure ou de surentraînement.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            name: "Calculateur CTL / ATL / TSB",
            applicationCategory: "SportsApplication",
            operatingSystem: "Web",
            description:
                "Outil gratuit pour visualiser sa charge d'entraînement et sa forme (CTL, ATL, TSB) à partir d'un export CSV Strava.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            url: "https://www.pulsepeak.fr/outils/calculateur-ctl-atl-tsb",
        },
        {
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        },
    ],
};

export default function CtlAtlTsbPage() {
    return (
        <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LandingBackground />
            <Navbar />

            <section className="relative px-4 pb-8 pt-32">
                <div className="mx-auto max-w-3xl text-center">
                    <Badge text="Outil gratuit" icon={LineChart} color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl dark:text-white">
                        Calculateur CTL / ATL / TSB à partir d&apos;un export Strava
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Importez votre export CSV Strava pour visualiser l'évolution de votre fitness, votre fatigue et votre forme."}
                    </p>
                </div>
            </section>

            {/* Exemple pré-calculé — rendu côté serveur, visible sans import de fichier */}
            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                            Exemple : bloc de 12 semaines avec taper final
                        </p>
                        <Badge text="Données de démonstration" color="slate" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className={`p-5 ${card}`}>
                            <p className="text-xl font-black text-blue-600">{demoLatest.ctl.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">CTL (fitness)</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <p className="text-xl font-black text-orange-500">{demoLatest.atl.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">ATL (fatigue)</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <p className="text-xl font-black text-emerald-500">{demoLatest.tsb.toFixed(1)}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">TSB (forme)</p>
                        </div>
                    </div>

                    <div className={`mt-6 p-6 md:p-8 ${card}`}>
                        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Évolution de la charge</h2>
                        <PmcChart points={demoPmc} />
                    </div>

                    <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                        Importez votre propre export CSV ci-dessous pour remplacer cet exemple par vos données.
                    </p>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <PmcCalculator />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-10 p-8 md:p-10 ${card}`}>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Comprendre le calcul jour par jour
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Pour chaque jour d, CTL et ATL sont mis à jour par moyenne mobile exponentielle à partir de la charge du jour (TSS) et de leur propre valeur de la veille :"}
                        </p>
                        <div className="space-y-2 rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                            <p className="whitespace-nowrap font-mono text-sm font-semibold text-blue-600">
                                CTL(d) = CTL(d−1) + (TSS(d) − CTL(d−1)) / 42
                            </p>
                            <p className="whitespace-nowrap font-mono text-sm font-semibold text-blue-600">
                                ATL(d) = ATL(d−1) + (TSS(d) − ATL(d−1)) / 7
                            </p>
                            <p className="whitespace-nowrap font-mono text-sm font-semibold text-blue-600">
                                TSB(d) = CTL(d−1) − ATL(d−1)
                            </p>
                        </div>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Le TSB du jour utilise le CTL et l'ATL de la veille : il représente votre forme en entrant dans la journée, avant que la séance du jour ne soit prise en compte — c'est la convention utilisée par TrainingPeaks. Les jours sans activité comptent comme un TSS de 0, ce qui fait naturellement redescendre l'ATL (plus vite) et le CTL (plus lentement) pendant le repos."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Interprétation des zones de TSB
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[420px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                        <th className="py-2 pr-2 font-semibold">TSB</th>
                                        <th className="py-2 font-semibold">Interprétation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tsbTable.map((row) => (
                                        <tr key={row.range} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                                            <td className="py-2.5 pr-2">
                                                <Badge text={row.range} color={row.color} />
                                            </td>
                                            <td className="py-2.5 text-slate-700 dark:text-slate-300">{row.label}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            Seuils indicatifs, popularisés par TrainingPeaks — à ajuster selon votre propre historique et votre ressenti.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">D&apos;où vient ce modèle</h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Le principe remonte au modèle impulsion-réponse du physiologiste Eric Banister (1975), qui modélise la performance comme la différence entre une composante de fitness à décroissance lente et une composante de fatigue à décroissance rapide. Andrew Coggan l'a ensuite adapté au cyclisme avec puissance sous les noms CTL/ATL/TSB, popularisés par le logiciel TrainingPeaks — devenus depuis un standard largement repris dans les outils d'entraînement, y compris hors cyclisme."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Les limites du modèle</h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Le modèle CTL/ATL/TSB reste une simplification utile, pas une mesure directe de votre état physiologique. Il ne tient compte ni de votre sommeil, ni de votre niveau de stress, ni de votre alimentation — trois facteurs qui influencent tout autant votre capacité de récupération réelle. Les constantes de temps (42 et 7 jours) sont des valeurs moyennes issues des travaux de Banister : certains athlètes récupèrent plus vite ou plus lentement, sans que le modèle s'ajuste automatiquement à leur profil individuel."}
                        </p>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Le TSS (ou le Relative Effort de Strava) lui-même est une estimation imparfaite de la charge réelle d'une séance : deux séances au même score peuvent solliciter très différemment votre organisme selon le type d'effort (fractionné vs sortie longue, par exemple). Utilisez ces courbes comme une tendance à surveiller dans le temps, pas comme une valeur absolue à interpréter isolément."}
                        </p>
                    </div>

                    <div>
                        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Dans PulsePeak, votre CTL/ATL/TSB est calculé en continu à partir de vos séances réelles, toutes disciplines confondues, sans avoir besoin d'exporter et importer un fichier à chaque fois."}
                        </p>
                        <PrimaryButton text="Essayer PulsePeak" href="https://app.pulsepeak.fr" icon={ArrowRight} />
                    </div>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-2xl">
                    <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white">
                        Questions fréquentes
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <details key={faq.q} className={`group p-5 ${card}`}>
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 marker:content-none dark:text-white">
                                    {faq.q}
                                    <ChevronDown
                                        className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                                        size={18}
                                    />
                                </summary>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
                            </details>
                        ))}
                    </div>

                    <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-500">
                        Voir tous nos{" "}
                        <Link href="/outils" className="font-medium text-blue-600 hover:underline">
                            outils gratuits
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <AuthorBlock updatedAt="21 août 2026" />

            <Footer />
        </main>
    );
}

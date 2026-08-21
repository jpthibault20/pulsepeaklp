// app/outils/calculateur-ctl-atl-tsb/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, LineChart } from "lucide-react";
import LandingBackground from "../../components/LandingBackground";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrimaryButton from "../../components/PrimaryButton";
import Badge from "../../components/Badge";
import PmcCalculator from "./PmcCalculator";

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
            "@type": "WebApplication",
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
                        Calculateur CTL / ATL / TSB
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Importez votre export CSV Strava pour visualiser l'évolution de votre fitness, votre fatigue et votre forme."}
                    </p>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <PmcCalculator />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-6 p-8 md:p-10 ${card}`}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Comprendre le Performance Management Chart
                    </h2>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Le CTL (Chronic Training Load) représente votre fitness — une moyenne mobile de votre charge d'entraînement sur les 42 derniers jours. L'ATL (Acute Training Load) représente votre fatigue à court terme, sur 7 jours. Le TSB (Training Stress Balance), différence entre les deux, indique votre « forme » : positif quand vous êtes frais, négatif quand la fatigue domine."}
                    </p>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Ce modèle, popularisé par Andrew Coggan et repris par TrainingPeaks, aide à structurer les cycles de charge et de récupération, et à identifier le bon moment pour viser une performance ou un affûtage."}
                    </p>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Dans PulsePeak, votre CTL/ATL/TSB est calculé en continu à partir de vos séances réelles, toutes disciplines confondues, sans avoir besoin d'exporter et importer un fichier à chaque fois."}
                    </p>
                    <PrimaryButton text="Essayer PulsePeak" href="https://app.pulsepeak.fr" icon={ArrowRight} className="mt-2" />
                </div>
            </section>

            <section className="px-4 pb-24">
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

            <Footer />
        </main>
    );
}

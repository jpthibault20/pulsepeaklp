// app/outils/convertisseur-allure/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Timer } from "lucide-react";
import LandingBackground from "../../components/LandingBackground";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrimaryButton from "../../components/PrimaryButton";
import Badge from "../../components/Badge";
import AuthorBlock from "../../components/AuthorBlock";
import PaceConverter from "./PaceConverter";
import RacePredictor from "./RacePredictor";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const title = "Convertisseur d'allure & prédicteur de temps de course — PulsePeak";
const description =
    "Convertissez vos allures (min/km, min/mile, km/h) et prédisez votre temps sur une autre distance à partir d'un résultat de course récent (formule de Riegel).";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/outils/convertisseur-allure",
    },
    ...pageOpenGraph({ title, description, path: "/outils/convertisseur-allure" }),
};

const referenceTimes = [
    { objectif: "Marathon en 3h30", allure: "4:59 /km" },
    { objectif: "Marathon en 4h00", allure: "5:41 /km" },
    { objectif: "Marathon en 4h30", allure: "6:24 /km" },
    { objectif: "Semi en 1h30", allure: "4:16 /km" },
    { objectif: "Semi en 1h45", allure: "4:59 /km" },
    { objectif: "Semi en 2h00", allure: "5:41 /km" },
    { objectif: "10 km en 40 min", allure: "4:00 /km" },
    { objectif: "10 km en 50 min", allure: "5:00 /km" },
    { objectif: "10 km en 1h00", allure: "6:00 /km" },
];

const faqs = [
    {
        q: "Quelle est la différence entre le convertisseur et le prédicteur ?",
        a: "Le convertisseur transforme une allure donnée (min/km) en d'autres unités et en temps sur des distances standards, en supposant une vitesse constante. Le prédicteur, lui, part d'un résultat de course réel pour estimer votre temps sur une autre distance, en tenant compte du fait qu'on ne court pas un marathon à l'allure d'un 5 km.",
    },
    {
        q: "Pourquoi la formule de Riegel plutôt qu'une simple règle de trois ?",
        a: "Une règle de trois suppose une vitesse constante quelle que soit la distance, ce qui surestime largement vos temps sur les longues distances. La formule de Riegel (exposant 1.06) modélise la baisse naturelle de vitesse avec l'augmentation de la distance, validée empiriquement sur de nombreuses courses.",
    },
    {
        q: "La prédiction est-elle fiable pour passer du 5 km au marathon ?",
        a: "C'est l'écart où la formule est la moins précise : le marathon dépend beaucoup plus de votre endurance spécifique (fond, gestion de l'allure, nutrition) que de votre seule vitesse sur 5 km. Utilisez plutôt un résultat sur 10 km ou semi-marathon comme référence pour une prédiction marathon plus fiable.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            name: "Convertisseur d'allure et prédicteur de temps de course",
            applicationCategory: "SportsApplication",
            operatingSystem: "Web",
            description:
                "Outil gratuit pour convertir une allure de course à pied entre unités et prédire un temps de course sur une autre distance.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            url: "https://www.pulsepeak.fr/outils/convertisseur-allure",
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

export default function ConvertisseurAllurePage() {
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
                    <Badge text="Outil gratuit" icon={Timer} color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl dark:text-white">
                        Convertisseur d&apos;allure course à pied & prédicteur de temps
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Convertissez une allure entre unités, ou prédisez votre temps sur une autre distance à partir d'un résultat de course récent."}
                    </p>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl space-y-8">
                    <Suspense fallback={null}>
                        <PaceConverter />
                        <RacePredictor />
                    </Suspense>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-10 p-8 md:p-10 ${card}`}>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Comprendre la formule de Riegel en détail
                        </h2>
                        <div className="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                            <p className="font-mono text-sm font-semibold text-blue-600">T2 = T1 × (D2 / D1) ^ 1,06</p>
                        </div>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Publiée par l'ingénieur Peter Riegel en 1977, cette formule relie le temps sur une distance connue (T1, D1) au temps prédit sur une autre distance (T2, D2). L'exposant 1,06 — légèrement supérieur à 1 — traduit le fait que l'allure baisse naturellement quand la distance augmente : si la relation était parfaitement linéaire (exposant 1), on pourrait courir un marathon à l'allure d'un 10 km, ce qui n'est physiologiquement pas le cas pour la quasi-totalité des coureurs."}
                        </p>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Cet exposant est une moyenne empirique : il fonctionne mieux pour des coureurs à l'endurance déjà bien développée, et perd en précision pour des écarts de distance importants ou pour des profils très spécialisés (sprinteurs, ultra-traileurs)."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Repères de temps sur route
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Pour visualiser directement l'allure moyenne nécessaire à quelques objectifs chronométriques courants :"}
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[280px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                        <th className="py-2 pr-2 font-semibold">Objectif</th>
                                        <th className="py-2 font-semibold">Allure moyenne requise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {referenceTimes.map((row) => (
                                        <tr key={row.objectif} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                                            <td className="py-2.5 pr-2 text-slate-700 dark:text-slate-300">{row.objectif}</td>
                                            <td className="py-2.5 font-semibold text-slate-900 dark:text-white">{row.allure}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Allure plate vs allure ajustée à la pente
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Toutes les conversions de cette page supposent un terrain plat et des conditions stables. Sur un parcours vallonné, la même allure « objectif » ne demande pas le même effort en montée qu'en descente — une pente de 5% peut ralentir votre allure de 20 à 30 secondes par kilomètre pour un coût énergétique équivalent au plat. Si vous préparez une course sur un parcours accidenté ou que vous voulez estimer un temps réaliste à partir d'un profil GPX, notre "}
                            <Link href="/outils/analyseur-gpx" className="font-medium text-blue-600 hover:underline">
                                analyseur de fichier GPX
                            </Link>
                            {" applique un modèle d'allure ajustée à la pente (GAP) à partir de votre allure plate de référence."}
                        </p>
                    </div>

                    <div>
                        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Convertir une allure ou prédire un temps de course donne un repère utile, mais ne remplace pas un plan construit à partir de vos données réelles. PulsePeak recalcule vos allures cibles en continu à partir de vos séances et de vos courses, sur la ou les disciplines de votre choix — course à pied, mais aussi vélo et natation."}
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

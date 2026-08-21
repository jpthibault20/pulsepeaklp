// app/outils/convertisseur-allure/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, Timer } from "lucide-react";
import LandingBackground from "../../components/LandingBackground";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrimaryButton from "../../components/PrimaryButton";
import Badge from "../../components/Badge";
import PaceConverter from "./PaceConverter";
import RacePredictor from "./RacePredictor";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export const metadata: Metadata = {
    title: "Convertisseur d'allure & prédicteur de temps de course — PulsePeak",
    description:
        "Convertissez vos allures (min/km, min/mile, km/h) et prédisez votre temps sur une autre distance à partir d'un résultat de course récent (formule de Riegel).",
    alternates: {
        canonical: "/outils/convertisseur-allure",
    },
};

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
            "@type": "WebApplication",
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
                        Convertisseur d&apos;allure & prédicteur de temps
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Convertissez une allure entre unités, ou prédisez votre temps sur une autre distance à partir d'un résultat de course récent."}
                    </p>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl space-y-8">
                    <PaceConverter />
                    <RacePredictor />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-6 p-8 md:p-10 ${card}`}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Aller plus loin que la conversion
                    </h2>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Convertir une allure ou prédire un temps de course donne un repère utile, mais ne remplace pas un plan construit à partir de vos données réelles. Vos allures d'entraînement optimales dépendent de votre VMA, de votre endurance spécifique et de votre progression dans le temps — pas uniquement d'un résultat isolé."}
                    </p>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Dans PulsePeak, vos allures cibles sont recalculées en continu à partir de vos séances et de vos courses, sur la ou les disciplines de votre choix — course à pied, mais aussi vélo et natation."}
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

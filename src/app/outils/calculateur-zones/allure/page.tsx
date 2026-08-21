// app/outils/calculateur-zones/allure/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, Footprints } from "lucide-react";
import LandingBackground from "../../../components/LandingBackground";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PrimaryButton from "../../../components/PrimaryButton";
import Badge from "../../../components/Badge";
import ZonesTabs from "../components/ZonesTabs";
import PaceZonesCalculator from "./PaceZonesCalculator";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export const metadata: Metadata = {
    title: "Calculateur de zones d'allure course à pied (VMA) — PulsePeak",
    description:
        "Calculez vos zones d'allure course à pied à partir de votre VMA, d'un résultat de course récent ou de votre allure seuil. Récupération, endurance, seuil, VMA, fractionné.",
    alternates: {
        canonical: "/outils/calculateur-zones/allure",
    },
};

const faqs = [
    {
        q: "Comment mesurer sa VMA ?",
        a: "Les tests terrain les plus courants sont le VAMEVAL, le demi-Cooper (test de 6 minutes) ou le test 45-15. Ils donnent une vitesse en km/h qui sert de référence pour calculer toutes vos zones d'allure.",
    },
    {
        q: "L'estimation à partir d'un résultat de course est-elle fiable ?",
        a: "C'est une approximation basée sur le pourcentage de VMA généralement soutenu sur chaque distance par un coureur entraîné. Elle est utile si vous n'avez pas fait de test VMA récent, mais moins précise qu'un test dédié — le pourcentage réel varie selon votre profil (endurance vs vitesse) et vos conditions de course.",
    },
    {
        q: "Pourquoi l'allure seuil correspond-elle à environ 88% de la VMA ?",
        a: "C'est une valeur moyenne couramment utilisée chez les coureurs entraînés en endurance. Elle peut varier de quelques points selon votre typologie physiologique — un profil plutôt endurant tiendra un % de VMA plus élevé au seuil qu'un profil plutôt rapide.",
    },
    {
        q: "À quelle fréquence retester sa VMA ?",
        a: "Toutes les 6 à 10 semaines, ou après un bloc de travail spécifique (VMA, seuil). PulsePeak ajuste vos zones d'allure en continu à partir de vos séances et de vos courses, sans nécessiter un test dédié à chaque fois.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            name: "Calculateur de zones d'allure",
            applicationCategory: "SportsApplication",
            operatingSystem: "Web",
            description:
                "Outil gratuit pour calculer ses zones d'allure course à pied à partir de sa VMA, d'un résultat de course ou de son allure seuil.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            url: "https://www.pulsepeak.fr/outils/calculateur-zones/allure",
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

export default function AllureZonesPage() {
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
                    <Badge text="Outil gratuit" icon={Footprints} color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl dark:text-white">
                        Calculateur de zones d&apos;allure
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"À partir de votre VMA, d'un résultat de course récent ou de votre allure seuil, obtenez vos 7 zones d'allure en min/km."}
                    </p>
                </div>
            </section>

            <section className="px-4">
                <ZonesTabs active="allure" />
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <PaceZonesCalculator />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-6 p-8 md:p-10 ${card}`}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Pourquoi s&apos;entraîner en % de VMA ?
                    </h2>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"La VMA (Vitesse Maximale Aérobie) est la vitesse la plus élevée à laquelle vous consommez un maximum d'oxygène. C'est la référence classique en course à pied pour calculer des allures d'entraînement adaptées — du footing de récupération au fractionné court, en passant par le seuil."}
                    </p>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Dans PulsePeak, vos zones d'allure sont recalculées automatiquement à partir de vos séances et croisées avec vos données de fréquence cardiaque et, si vous pratiquez aussi le vélo ou la natation, avec vos zones de puissance — pour un plan cohérent sur la ou les disciplines de votre choix."}
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

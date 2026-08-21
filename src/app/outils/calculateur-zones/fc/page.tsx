// app/outils/calculateur-zones/fc/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, HeartPulse } from "lucide-react";
import LandingBackground from "../../../components/LandingBackground";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PrimaryButton from "../../../components/PrimaryButton";
import Badge from "../../../components/Badge";
import ZonesTabs from "../components/ZonesTabs";
import HrZonesCalculator from "./HrZonesCalculator";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export const metadata: Metadata = {
    title: "Calculateur de zones de fréquence cardiaque — PulsePeak",
    description:
        "Calculez vos zones d'entraînement en fréquence cardiaque (méthode de Karvonen) à partir de votre FC repos et de votre FC max, mesurée ou estimée selon votre âge.",
    alternates: {
        canonical: "/outils/calculateur-zones/fc",
    },
};

const faqs = [
    {
        q: "Pourquoi utiliser la FC repos et la FC max plutôt qu'un pourcentage de FC max seul ?",
        a: "La méthode de Karvonen (% de réserve cardiaque, ou HRR) tient compte de votre FC repos, un indicateur individuel de votre niveau de forme cardiovasculaire. Deux athlètes avec la même FC max mais des FC repos très différentes n'ont pas les mêmes zones réelles — Karvonen corrige cet écart, contrairement à un simple pourcentage de FC max.",
    },
    {
        q: "Comment mesurer sa FC repos ?",
        a: "Idéalement au réveil, avant de vous lever, pendant 3 jours consécutifs, puis en prenant la moyenne. Une montre ou un tracker d'activité qui mesure le sommeil donne aussi une bonne estimation.",
    },
    {
        q: "Comment mesurer sa FC max sans test en laboratoire ?",
        a: "Un test terrain (par exemple plusieurs répétitions courtes et intenses en côte, ou un contre-la-montre de 3 à 5 minutes en fin d'échauffement poussé) donne une valeur plus fiable que la formule d'estimation par l'âge, qui reste une approximation avec une marge d'erreur individuelle importante.",
    },
    {
        q: "La formule par l'âge est-elle fiable ?",
        a: "La formule de Tanaka (208 − 0,7 × âge) est plus précise que l'ancienne formule 220 − âge, mais reste une moyenne de population avec un écart-type de plusieurs battements par minute selon les individus. Utilisez-la comme point de départ, à affiner avec un test terrain si possible.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            name: "Calculateur de zones de fréquence cardiaque",
            applicationCategory: "SportsApplication",
            operatingSystem: "Web",
            description:
                "Outil gratuit pour calculer ses zones d'entraînement en fréquence cardiaque selon la méthode de Karvonen, à partir de la FC repos et de la FC max.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            url: "https://www.pulsepeak.fr/outils/calculateur-zones/fc",
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

export default function FcZonesPage() {
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
                    <Badge text="Outil gratuit" icon={HeartPulse} color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl dark:text-white">
                        Calculateur de zones de fréquence cardiaque
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Entrez votre FC repos et votre FC max (mesurée ou estimée selon votre âge) pour obtenir vos 5 zones d'entraînement, selon la méthode de Karvonen."}
                    </p>
                </div>
            </section>

            <section className="px-4">
                <ZonesTabs active="fc" />
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <HrZonesCalculator />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-6 p-8 md:p-10 ${card}`}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Pourquoi la méthode de Karvonen ?
                    </h2>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Contrairement à un simple pourcentage de FC max, la méthode de Karvonen calcule vos zones en pourcentage de votre réserve cardiaque (HRR = FC max − FC repos). Elle est plus personnalisée puisqu'elle intègre votre FC repos, un marqueur individuel de votre condition cardiovasculaire, qui évolue avec l'entraînement."}
                    </p>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Dans PulsePeak, vos zones de fréquence cardiaque sont recalculées automatiquement à mesure que votre FC repos évolue, et croisées avec vos données de puissance et d'allure pour ajuster votre plan sur la ou les disciplines de votre choix — natation, vélo, course à pied."}
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

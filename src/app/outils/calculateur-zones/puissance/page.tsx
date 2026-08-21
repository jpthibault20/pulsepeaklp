// app/outils/calculateur-zones/puissance/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, Gauge } from "lucide-react";
import LandingBackground from "../../../components/LandingBackground";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PrimaryButton from "../../../components/PrimaryButton";
import Badge from "../../../components/Badge";
import ZonesTabs from "../components/ZonesTabs";
import PowerZonesCalculator from "./PowerZonesCalculator";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export const metadata: Metadata = {
    title: "Calculateur de zones de puissance vélo (FTP) — PulsePeak",
    description:
        "Calculez vos zones de puissance à partir d'un test de 20, 8 ou 5 minutes, ou d'un test combiné (Critical Power). Modèle 7 zones utilisé en cyclisme et triathlon.",
    alternates: {
        canonical: "/outils/calculateur-zones/puissance",
    },
};

const faqs = [
    {
        q: "Quel test choisir pour estimer sa FTP ?",
        a: "Le test de 20 minutes (FTP = 95% de la puissance moyenne) reste la référence la plus fiable. Le test de 8 minutes (×0,90) est un bon compromis fatigue/précision. Le test de 5 minutes est le moins précis pour la FTP seule — il est surtout utile combiné à un effort plus long.",
    },
    {
        q: "Qu'est-ce que le test combiné (Critical Power) ?",
        a: "Il s'agit de réaliser deux efforts maximaux de durées différentes (par exemple 5 et 20 minutes) et d'en déduire mathématiquement votre Critical Power (CP), une approximation de la FTP, ainsi que votre W' (réserve anaérobie). Plus les deux durées sont espacées, plus le modèle est fiable.",
    },
    {
        q: "Pourquoi mes différentes méthodes donnent des FTP légèrement différentes ?",
        a: "Chaque protocole a sa propre marge d'erreur et sollicite des filières énergétiques légèrement différentes. Une FTP mesurée via un test de 20 min un jour de fraîcheur ne sera jamais identique à une estimation issue d'un test de 5 min. L'important est de garder la même méthode dans le temps pour suivre votre progression.",
    },
    {
        q: "À quelle fréquence retester sa FTP ?",
        a: "Toutes les 4 à 8 semaines en période de progression, ou après un bloc d'entraînement ciblé (Seuil, VO2max). PulsePeak met à jour votre FTP en continu à partir de vos séances réelles, sans avoir besoin de refaire un test dédié à chaque fois.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            name: "Calculateur de zones de puissance",
            applicationCategory: "SportsApplication",
            operatingSystem: "Web",
            description:
                "Outil gratuit pour calculer ses zones d'entraînement en puissance (FTP) à partir d'un test de 20, 8 ou 5 minutes, ou d'un test combiné Critical Power.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            url: "https://www.pulsepeak.fr/outils/calculateur-zones/puissance",
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

export default function PuissanceZonesPage() {
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
                    <Badge text="Outil gratuit" icon={Gauge} color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl dark:text-white">
                        Calculateur de zones de puissance
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Choisissez votre protocole de test pour estimer votre FTP et obtenir vos 7 zones d'entraînement en watts."}
                    </p>
                </div>
            </section>

            <section className="px-4">
                <ZonesTabs active="puissance" />
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <PowerZonesCalculator />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-6 p-8 md:p-10 ${card}`}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Pourquoi calculer ses zones de puissance ?
                    </h2>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"La FTP (Functional Threshold Power) est la puissance moyenne maximale que vous pouvez théoriquement soutenir pendant une heure. C'est la référence à partir de laquelle sont calculées vos zones d'entraînement — récupération, endurance, tempo, seuil, VO2max, capacité anaérobie et puissance neuromusculaire."}
                    </p>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Dans PulsePeak, votre FTP est recalculée en continu à partir de vos séances réelles, et utilisée pour structurer vos blocs d'entraînement (Force, Seuil, Endurance critique) sur la ou les disciplines que vous pratiquez — vélo, mais aussi natation et course à pied."}
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

// app/outils/calculateur-nutrition-sortie-longue/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, Apple } from "lucide-react";
import LandingBackground from "../../components/LandingBackground";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrimaryButton from "../../components/PrimaryButton";
import Badge from "../../components/Badge";
import NutritionCalculator from "./NutritionCalculator";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export const metadata: Metadata = {
    title: "Calculateur de nutrition de sortie longue — PulsePeak",
    description:
        "Calculez vos besoins en glucides, liquides et sodium pour une sortie longue à vélo ou en course à pied, selon la durée, l'intensité et la température.",
    alternates: {
        canonical: "/outils/calculateur-nutrition-sortie-longue",
    },
};

const faqs = [
    {
        q: "Faut-il vraiment manger pendant une sortie de moins d'une heure ?",
        a: "En général non, sauf sensation de faim ou séance très intense enchaînée avec peu de récupération. Vos réserves de glycogène suffisent largement sur ce type de durée — l'important est surtout de bien manger avant et après.",
    },
    {
        q: "Pourquoi un mix glucose/fructose plutôt que du glucose seul ?",
        a: "Au-delà de 60 g/h de glucides, l'intestin absorbe mal une seule source de sucre (le transporteur du glucose sature). Combiner glucose et fructose (souvent env. 2:1) utilise deux transporteurs intestinaux différents et permet d'augmenter l'absorption jusqu'à 90 g/h.",
    },
    {
        q: "Comment savoir si je transpire beaucoup de sodium ?",
        a: "Un signe classique : des traces blanches de sel séché sur vos vêtements ou votre casquette après l'effort. Si c'est votre cas, visez le haut des fourchettes indiquées ici, voire au-delà avec l'avis d'un professionnel.",
    },
    {
        q: "Ces recommandations sont-elles valables en natation ?",
        a: "Les repères de glucides et de sodium restent une base valable, mais les besoins en liquides sont plus difficiles à estimer en piscine ou en eau libre (moins de perception de la transpiration). Fiez-vous davantage à la durée et à l'intensité qu'à la sensation de soif.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            name: "Calculateur de nutrition de sortie longue",
            applicationCategory: "SportsApplication",
            operatingSystem: "Web",
            description:
                "Outil gratuit pour estimer ses besoins en glucides, liquides et sodium pendant une sortie longue à vélo, en course à pied ou en triathlon.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            url: "https://www.pulsepeak.fr/outils/calculateur-nutrition-sortie-longue",
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

export default function NutritionPage() {
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
                    <Badge text="Outil gratuit" icon={Apple} color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl dark:text-white">
                        Calculateur de nutrition de sortie longue
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Durée, intensité et température : obtenez vos besoins en glucides, liquides et sodium pour tenir jusqu'au bout."}
                    </p>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <NutritionCalculator />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-6 p-8 md:p-10 ${card}`}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Pourquoi anticiper sa nutrition d&apos;effort ?
                    </h2>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"La fringale (« fringale » ou « coup de bambou ») et la déshydratation sont parmi les premières causes d'échec sur une sortie longue ou une course d'endurance. Vos réserves de glycogène sont limitées à 60-90 minutes d'effort intense : au-delà, un apport régulier en glucides devient nécessaire pour maintenir l'allure et éviter la baisse de régime."}
                    </p>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Dans PulsePeak, vos sorties longues sont identifiées à l'avance dans votre plan, ce qui vous permet d'anticiper votre stratégie nutritionnelle plutôt que de l'improviser le jour J."}
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

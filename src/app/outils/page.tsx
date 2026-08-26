// app/outils/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Link from "next/link";
import {
    Gauge,
    HeartPulse,
    Footprints,
    Timer,
    Mountain,
    LineChart,
    Apple,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import LandingBackground from "../components/LandingBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Badge from "../components/Badge";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const title = "Outils gratuits pour cyclistes, coureurs, nageurs et triathlètes — PulsePeak";
const description =
    "Calculateurs et outils gratuits d'entraînement : zones de puissance et FC, allure de course, analyse GPX, charge CTL/ATL/TSB, nutrition de sortie longue.";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/outils",
    },
    ...pageOpenGraph({ title, description, path: "/outils" }),
};

interface Tool {
    title: string;
    description: string;
    icon: LucideIcon;
    href?: string;
}

const tools: Tool[] = [
    {
        title: "Calculateur de zones de puissance",
        description: "Votre FTP et vos 7 zones de puissance à partir d'un test de 20, 8, 5 min ou combiné.",
        icon: Gauge,
        href: "/outils/calculateur-zones/puissance",
    },
    {
        title: "Calculateur de zones de fréquence cardiaque",
        description: "Vos zones cardiaques (méthode de Karvonen) à partir de votre FC repos et FC max.",
        icon: HeartPulse,
        href: "/outils/calculateur-zones/fc",
    },
    {
        title: "Calculateur de zones d'allure",
        description: "Vos zones d'allure course à pied à partir de votre VMA ou d'un résultat de course.",
        icon: Footprints,
        href: "/outils/calculateur-zones/allure",
    },
    {
        title: "Convertisseur d'allure & prédicteur de temps",
        description: "Convertissez vos allures course et estimez votre temps sur une autre distance.",
        icon: Timer,
        href: "/outils/convertisseur-allure",
    },
    {
        title: "Analyseur de fichier GPX",
        description: "Dénivelé, profil du parcours et estimation de temps/puissance à partir d'un GPX.",
        icon: Mountain,
        href: "/outils/analyseur-gpx",
    },
    {
        title: "Calculateur CTL / ATL / TSB",
        description: "Suivez votre charge d'entraînement et votre forme à partir d'un export Strava.",
        icon: LineChart,
        href: "/outils/calculateur-ctl-atl-tsb",
    },
    {
        title: "Calculateur de nutrition de sortie longue",
        description: "Vos besoins en glucides, liquides et sodium selon la durée et l'intensité de la sortie.",
        icon: Apple,
        href: "/outils/calculateur-nutrition-sortie-longue",
    },
];

export default function OutilsPage() {
    return (
        <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
            <LandingBackground />
            <Navbar />

            <section className="relative px-4 pb-16 pt-32 text-center">
                <div className="mx-auto max-w-3xl">
                    <Badge text="Outils gratuits" color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black tracking-tighter text-slate-900 md:text-6xl dark:text-white">
                        Des outils gratuits pour votre entraînement.
                    </h1>
                    <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Des calculateurs simples, sans compte à créer, pour la natation, le vélo, la course à pied ou le triathlon."}
                    </p>
                </div>
            </section>

            <section className="px-4 pb-24">
                <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        const content = (
                            <>
                                <Icon className="mb-5 text-blue-600" size={32} />
                                <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{tool.title}</h2>
                                <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {tool.description}
                                </p>
                                {tool.href ? (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                                        Utiliser l&apos;outil
                                        <ArrowRight size={16} />
                                    </span>
                                ) : (
                                    <Badge text="Bientôt disponible" color="slate" />
                                )}
                            </>
                        );

                        if (tool.href) {
                            return (
                                <Link
                                    key={tool.title}
                                    href={tool.href}
                                    className={`group flex flex-col p-8 transition-shadow hover:shadow-lg ${card}`}
                                >
                                    {content}
                                </Link>
                            );
                        }

                        return (
                            <div key={tool.title} className={`flex flex-col p-8 opacity-70 ${card}`}>
                                {content}
                            </div>
                        );
                    })}
                </div>
            </section>

            <Footer />
        </main>
    );
}

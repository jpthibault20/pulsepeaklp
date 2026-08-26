// app/outils/calculateur-zones/fc/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, HeartPulse } from "lucide-react";
import LandingBackground from "../../../components/LandingBackground";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PrimaryButton from "../../../components/PrimaryButton";
import Badge from "../../../components/Badge";
import AuthorBlock from "../../../components/AuthorBlock";
import ZonesTabs from "../components/ZonesTabs";
import HrZonesCalculator from "./HrZonesCalculator";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const title = "Calculateur de zones de fréquence cardiaque — PulsePeak";
const description =
    "Calculez vos zones d'entraînement en fréquence cardiaque (méthode de Karvonen) à partir de votre FC repos et de votre FC max, mesurée ou estimée selon votre âge.";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/outils/calculateur-zones/fc",
    },
    ...pageOpenGraph({ title, description, path: "/outils/calculateur-zones/fc" }),
};

const tanakaTable = [
    { age: "20 ans", fcmax: "≈ 194 bpm" },
    { age: "30 ans", fcmax: "≈ 187 bpm" },
    { age: "40 ans", fcmax: "≈ 180 bpm" },
    { age: "50 ans", fcmax: "≈ 173 bpm" },
    { age: "60 ans", fcmax: "≈ 166 bpm" },
    { age: "70 ans", fcmax: "≈ 159 bpm" },
];

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
            "@type": "SoftwareApplication",
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
                        Calculateur de zones de fréquence cardiaque (méthode de Karvonen)
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
                    <Suspense fallback={null}>
                        <HrZonesCalculator />
                    </Suspense>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-10 p-8 md:p-10 ${card}`}>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Protocole pour mesurer sa FC repos
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"La FC repos est le paramètre le plus facile à mesurer, et pourtant souvent négligé. Pour une valeur fiable :"}
                        </p>
                        <ol className="ml-5 list-decimal space-y-2 text-slate-600 dark:text-slate-400">
                            <li>Mesurez-la au réveil, avant même de vous lever ou de consulter votre téléphone.</li>
                            <li>Répétez la mesure sur 3 jours consécutifs, dans des conditions similaires (pas de soirée arrosée ou de nuit trop courte la veille).</li>
                            <li>Prenez la moyenne des 3 mesures plutôt qu&apos;une valeur isolée, qui peut varier de quelques battements d&apos;un jour à l&apos;autre.</li>
                        </ol>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Une montre connectée qui mesure votre FC pendant le sommeil donne aussi une estimation fiable, généralement légèrement plus basse qu'une mesure au réveil actif."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Comment tester sa FC max sur le terrain
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"La FC max mesurée est toujours plus fiable qu'une formule d'estimation. Un protocole courant : après un échauffement complet de 20 minutes incluant quelques accélérations, enchaînez 2 à 3 répétitions de 3 minutes en côte à intensité quasi-maximale, avec 3 minutes de récupération entre chaque, puis terminez la dernière répétition par un sprint de 15 à 20 secondes. La valeur la plus haute observée sur votre cardiofréquencemètre est une bonne approximation de votre FC max."}
                        </p>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Ce type de test est exigeant physiquement : s'il est nouveau pour vous ou si vous reprenez une activité après une pause prolongée, prenez l'avis d'un médecin avant de le réaliser."}
                        </p>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"À défaut de test terrain, la formule de Tanaka (208 − 0,7 × âge) donne une estimation plus fiable statistiquement que l'ancienne formule 220 − âge :"}
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[280px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                        <th className="py-2 pr-2 font-semibold">Âge</th>
                                        <th className="py-2 font-semibold">FC max estimée (Tanaka)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tanakaTable.map((row) => (
                                        <tr key={row.age} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                                            <td className="py-2.5 pr-2 text-slate-700 dark:text-slate-300">{row.age}</td>
                                            <td className="py-2.5 font-semibold text-slate-900 dark:text-white">{row.fcmax}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Karvonen vs % de FC max : un vrai écart
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Beaucoup de calculateurs simplifient en prenant un pourcentage direct de la FC max. Karvonen calcule au contraire un pourcentage de la réserve cardiaque (HRR = FC max − FC repos), puis l'ajoute à la FC repos :"}
                        </p>
                        <div className="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                            <p className="font-mono text-sm font-semibold text-blue-600">FC cible = FC repos + % × (FC max − FC repos)</p>
                        </div>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Exemple concret pour un athlète de FC repos 55 bpm et FC max 185 bpm, à une intensité cible de 70% :"}
                        </p>
                        <ul className="ml-5 list-disc space-y-1 text-slate-600 dark:text-slate-400">
                            <li>70% de la FC max directement : 0,70 × 185 = <span className="font-semibold text-slate-800 dark:text-slate-200">130 bpm</span></li>
                            <li>70% par la méthode de Karvonen : 55 + 0,70 × (185 − 55) = <span className="font-semibold text-slate-800 dark:text-slate-200">146 bpm</span></li>
                        </ul>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Un écart de 16 bpm sur cet exemple — loin d'être négligeable pour caler une séance d'endurance. C'est pour cette raison que Karvonen est la méthode recommandée dès que la FC repos est connue."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            La FC max varie selon le sport pratiqué
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Une même personne n'atteint généralement pas la même FC max selon la discipline. À l'effort maximal, la course à pied sollicite davantage de masse musculaire en position verticale et produit souvent la FC max la plus élevée. Le vélo, en position assise avec moins de muscles engagés simultanément, donne typiquement une FC max inférieure de 3 à 8 bpm. La natation va plus loin : la position horizontale, l'immersion et le réflexe de plongée réduisent la FC max de 10 à 15 bpm en moyenne par rapport à la course."}
                        </p>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Conséquence pratique : si vous pratiquez plusieurs disciplines, calculez des zones FC séparées pour chacune plutôt que de réutiliser la même FC max partout — sans quoi vos zones en natation ou à vélo seront systématiquement décalées vers le haut."}
                        </p>
                    </div>

                    <div>
                        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                            {"PulsePeak suit l'évolution de votre FC repos au fil des semaines et recalcule vos zones cardiaques automatiquement — un repère utile pour détecter une fatigue qui s'installe, en complément de vos zones de puissance ou d'allure si vous combinez plusieurs disciplines."}
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

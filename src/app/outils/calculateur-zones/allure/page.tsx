// app/outils/calculateur-zones/allure/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Footprints } from "lucide-react";
import LandingBackground from "../../../components/LandingBackground";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PrimaryButton from "../../../components/PrimaryButton";
import Badge from "../../../components/Badge";
import AuthorBlock from "../../../components/AuthorBlock";
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

const vmaTests = [
    {
        name: "VAMEVAL",
        text: "Course sur piste ou terrain plat balisé, avec une vitesse qui augmente de 0,5 km/h toutes les minutes, cadencée par des bips sonores. Arrêt à l'épuisement : la dernière vitesse tenue est votre VMA.",
    },
    {
        name: "Demi-Cooper (6 minutes)",
        text: "Courir la plus grande distance possible en 6 minutes. VMA (km/h) ≈ distance parcourue (m) × 0,1714 — une formule d'estimation rapide, moins précise que le Vameval mais accessible sans matériel.",
    },
    {
        name: "45-15 (Georges Gacon)",
        text: "Alternance de 45 secondes d'effort et 15 secondes de récupération, avec une vitesse croissante par palier. Utilisé en préparation collective (sports co) autant qu'en course à pied.",
    },
];

const correspondanceTable = [
    { vma: 12, paces: ["8:20", "7:09", "6:15", "5:33", "5:00", "4:33"] },
    { vma: 14, paces: ["7:09", "6:07", "5:21", "4:46", "4:17", "3:54"] },
    { vma: 16, paces: ["6:15", "5:21", "4:41", "4:10", "3:45", "3:25"] },
    { vma: 18, paces: ["5:33", "4:46", "4:10", "3:42", "3:20", "3:02"] },
    { vma: 20, paces: ["5:00", "4:17", "3:45", "3:20", "3:00", "2:44"] },
];

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
            "@type": "SoftwareApplication",
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
                        Calculateur de zones d&apos;allure course à pied (VMA)
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
                    <Suspense fallback={null}>
                        <PaceZonesCalculator />
                    </Suspense>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-10 p-8 md:p-10 ${card}`}>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Les protocoles de test VMA les plus courants
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"La VMA se mesure sur le terrain, pas en calcul théorique. Trois protocoles reviennent le plus souvent en France :"}
                        </p>
                        <div className="space-y-4">
                            {vmaTests.map((test) => (
                                <div key={test.name} className="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                                    <p className="mb-1 font-semibold text-slate-800 dark:text-slate-200">{test.name}</p>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{test.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Table de correspondance % VMA → allure
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Pour visualiser directement l'effet de votre VMA sur vos allures d'entraînement, sans repasser par le calculateur :"}
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[520px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                        <th className="py-2 pr-2 font-semibold">VMA</th>
                                        <th className="py-2 pr-2 font-semibold">60%</th>
                                        <th className="py-2 pr-2 font-semibold">70%</th>
                                        <th className="py-2 pr-2 font-semibold">80%</th>
                                        <th className="py-2 pr-2 font-semibold">90%</th>
                                        <th className="py-2 pr-2 font-semibold">100%</th>
                                        <th className="py-2 font-semibold">110%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {correspondanceTable.map((row) => (
                                        <tr key={row.vma} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                                            <td className="py-2.5 pr-2 font-semibold text-slate-900 dark:text-white">{row.vma} km/h</td>
                                            {row.paces.map((p, i) => (
                                                <td key={i} className="py-2.5 pr-2 text-slate-600 dark:text-slate-400">
                                                    {p}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">Allures exprimées en min/km.</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Pourquoi l&apos;estimation depuis une course reste approximative
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Le pourcentage de VMA tenu sur une distance donnée dépend de votre profil physiologique. Un coureur plutôt endurant (filière aérobie dominante) tiendra un pourcentage plus élevé sur un 10 km ou un semi qu'un coureur plutôt rapide mais moins endurant, à VMA identique. Ce calculateur applique des pourcentages moyens issus de la littérature sur l'entraînement par la VMA (travaux popularisés en France notamment par Véronique Billat) — un vrai test terrain reste plus fiable si vous cherchez une précision maximale, en particulier pour caler des séances de fractionné exigeantes."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Comment utiliser ces zones dans votre plan
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"L'erreur la plus répandue chez les coureurs autonomes est de passer trop de temps dans les zones intermédiaires (tempo, résistance dure) et pas assez aux deux extrêmes — l'endurance fondamentale (Z2) qui construit la base aérobie, et le travail spécifique VMA (Z6-Z7) qui la fait progresser. La majorité de votre volume hebdomadaire devrait rester en endurance fondamentale, avec une ou deux séances ciblées par semaine dans les zones plus intenses selon votre objectif du moment (10 km, semi, marathon)."}
                        </p>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Gardez aussi à l'esprit que ces zones se décalent avec la fatigue : une allure de zone 2 en tout début de bloc d'entraînement peut demander l'effort d'une zone 3 en fin de semaine chargée. C'est pour cette raison qu'il est utile de croiser l'allure avec la fréquence cardiaque plutôt que de se fier à un seul indicateur."}
                        </p>
                    </div>

                    <div>
                        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                            {"PulsePeak recalcule vos zones d'allure automatiquement à partir de vos séances et de vos courses, et les croise avec vos données de fréquence cardiaque — utile pour repérer un écart inhabituel entre l'allure et l'effort ressenti, souvent le premier signe de fatigue accumulée."}
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

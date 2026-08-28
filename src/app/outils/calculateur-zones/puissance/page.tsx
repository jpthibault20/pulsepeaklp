// app/outils/calculateur-zones/puissance/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Gauge } from "lucide-react";
import LandingBackground from "../../../components/LandingBackground";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PrimaryButton from "../../../components/PrimaryButton";
import Badge from "../../../components/Badge";
import AuthorBlock from "../../../components/AuthorBlock";
import ZonesTabs from "../components/ZonesTabs";
import PowerZonesCalculator from "./PowerZonesCalculator";
import PowerDurationCurve from "./PowerDurationCurve";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const title = "Calculateur de zones de puissance vélo (FTP) — PulsePeak";
const description =
    "Calculez vos zones de puissance à partir d'un test de 20, 8 ou 5 minutes, ou d'un test combiné (Critical Power). Modèle 7 zones utilisé en cyclisme et triathlon.";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/outils/calculateur-zones/puissance",
    },
    ...pageOpenGraph({ title, description, path: "/outils/calculateur-zones/puissance" }),
};

const wattsPerKgTable = [
    { level: "Débutant", range: "< 2,5 W/kg" },
    { level: "Intermédiaire", range: "2,5 – 3,5 W/kg" },
    { level: "Confirmé", range: "3,5 – 4,2 W/kg" },
    { level: "Avancé (compétiteur régional)", range: "4,2 – 5,0 W/kg" },
    { level: "Élite / professionnel", range: "> 5,0 W/kg" },
];

const coggenFrielTable = [
    { zone: "Z1 · Récupération active", coggan: "< 55 %", friel: "Zone 1 · < 55 %" },
    { zone: "Z2 · Endurance", coggan: "56–75 %", friel: "Zone 2 · 56–75 %" },
    { zone: "Z3 · Tempo", coggan: "76–90 %", friel: "Zone 3 · 76–90 %" },
    { zone: "Z4 · Seuil", coggan: "91–105 %", friel: "Zone 4 · 91–105 %" },
    { zone: "Z5 · VO2max", coggan: "106–120 %", friel: "Zone 5a · 106–120 %" },
    { zone: "Z6 · Capacité anaérobie", coggan: "121–150 %", friel: "Zone 5b · 121–150 %" },
    { zone: "Z7 · Neuromusculaire", coggan: "> 150 %", friel: "Zone 5c · > 150 %" },
];

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
    {
        q: "Mon FTP en W/kg est-il bon pour mon niveau ?",
        a: "Le tableau W/kg de cette page donne des repères généraux issus du power profiling popularisé par Andrew Coggan, établis principalement sur des cyclistes hommes. Chez les femmes, à niveau d'entraînement égal, les valeurs sont en moyenne 10 à 15% plus basses pour des raisons physiologiques — ce n'est pas un signe de niveau inférieur, juste une échelle différente.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            name: "Calculateur de zones de puissance",
            applicationCategory: "SportsApplication",
            operatingSystem: "Web",
            description:
                "Outil gratuit pour calculer ses zones d'entraînement en puissance (FTP) à partir d'un test de 20, 8 ou 5 minutes, ou d'un test combiné Critical Power.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            url: "https://pulsepeak.fr/outils/calculateur-zones/puissance",
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
                        Calculateur FTP et zones de puissance vélo
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
                    <Suspense fallback={null}>
                        <PowerZonesCalculator />
                    </Suspense>
                </div>
            </section>

            {/* Contenu approfondi — protocole, formules, repères, méthodologie */}
            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-10 p-8 md:p-10 ${card}`}>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Protocole du test de 20 minutes, étape par étape
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Le test de 20 minutes est le protocole de référence pour estimer sa FTP sur le terrain, popularisé par Hunter Allen et Andrew Coggan. Il se déroule en cinq temps :"}
                        </p>
                        <ol className="ml-5 list-decimal space-y-2 text-slate-600 dark:text-slate-400">
                            <li>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">Échauffement (15–20 min)</span> —
                                {" montée en intensité progressive, avec 2 à 3 accélérations courtes de 30 à 60 secondes pour préparer les jambes à l'effort à venir."}
                            </li>
                            <li>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">Effort d&apos;ouverture (5 min)</span> —
                                {" un bloc proche du seuil pour finir de vous mettre en jambes, suivi de 10 minutes de récupération très facile."}
                            </li>
                            <li>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">Le test (20 min)</span> —
                                {" effort maximal soutenable sur toute la durée, en gérant l'allure : partir trop vite est l'erreur la plus fréquente et fausse le résultat à la baisse sur la deuxième moitié."}
                            </li>
                            <li>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">Retour au calme (10–15 min)</span> —
                                {" à faible intensité, pour faciliter la récupération."}
                            </li>
                            <li>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">Calcul</span> —
                                {" FTP = puissance moyenne des 20 minutes × 0,95."}
                            </li>
                        </ol>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Quelques conditions à respecter pour un résultat fiable : un parcours plat ou en faux-plat régulier, sans vent fort ni interruptions (feux, intersections), et un état de fraîcheur correct — évitez de tester après une grosse séance ou un manque de sommeil. Pour comparer vos résultats dans le temps, refaites le test dans des conditions aussi proches que possible d'une fois sur l'autre."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Les formules utilisées</h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Chaque protocole applique un coefficient à la puissance moyenne mesurée, pour compenser le fait qu'on ne peut pas soutenir la même intensité relative sur 5 minutes que sur 60 :"}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                                <p className="font-mono text-sm font-semibold text-blue-600">FTP = P20 × 0,95</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Test de 20 minutes</p>
                            </div>
                            <div className="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                                <p className="font-mono text-sm font-semibold text-blue-600">FTP = P8 × 0,90</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Test de 8 minutes</p>
                            </div>
                            <div className="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                                <p className="font-mono text-sm font-semibold text-blue-600">FTP = P5 × 0,85</p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Test de 5 minutes</p>
                            </div>
                        </div>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Pour le test combiné, on utilise le modèle à deux paramètres de la Critical Power (Monod & Scherrer, 1965), qui modélise la relation entre puissance et durée sur les efforts courts à moyens :"}
                        </p>
                        <div className="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                            <p className="font-mono text-sm font-semibold text-blue-600">CP = (P1 × t1 − P2 × t2) / (t1 − t2)</p>
                            <p className="mt-2 font-mono text-sm font-semibold text-blue-600">W&apos; = (P1 − CP) × t1</p>
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                {"P1/t1 et P2/t2 sont la puissance moyenne et la durée (en secondes) de vos deux efforts maximaux. CP (Critical Power) approxime votre FTP ; W' représente votre réserve anaérobie, en joules."}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Combien de W/kg selon le niveau ?</h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Rapporter sa FTP à son poids (W/kg) permet de se situer, notamment pour les efforts où le poids compte (montée). Ces repères s'inspirent du power profiling d'Andrew Coggan :"}
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[320px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                        <th className="py-2 pr-2 font-semibold">Niveau</th>
                                        <th className="py-2 font-semibold">FTP (W/kg, ~1h)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wattsPerKgTable.map((row) => (
                                        <tr key={row.level} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                                            <td className="py-2.5 pr-2 text-slate-700 dark:text-slate-300">{row.level}</td>
                                            <td className="py-2.5 font-semibold text-slate-900 dark:text-white">{row.range}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            {"Table indicative, établie principalement sur des cyclistes hommes en compétition route. Chez les femmes, à niveau égal, les valeurs sont en moyenne inférieures de 10 à 15% — ce n'est pas comparable terme à terme."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">La courbe puissance-durée</h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Votre puissance maximale soutenable diminue à mesure que la durée de l'effort augmente, jusqu'à se stabiliser autour de votre Critical Power. Cette relation, illustrée schématiquement ci-dessous, est la base théorique commune à toutes les méthodes d'estimation de la FTP : plus le test est court, plus il se situe loin de l'asymptote et plus le coefficient correcteur doit être important."}
                        </p>
                        <PowerDurationCurve />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Zones Coggan vs zones Friel</h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Le modèle 7 zones utilisé sur cette page vient du livre de référence d'Andrew Coggan et Hunter Allen, "}
                            <em>Training and Racing with a Power Meter</em>
                            {". Joe Friel, autre référence de l'entraînement structuré, reprend en pratique les mêmes seuils de puissance en pourcentage de FTP — la vraie différence entre les deux systèmes se joue surtout sur les zones de fréquence cardiaque, où Friel a développé son propre modèle basé sur le LTHR, quand Coggan calque sa table HR directement sur les zones de puissance. Pour la puissance, Friel numérote simplement les deux dernières zones différemment (5a/5b/5c au lieu de 5/6/7) :"}
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[420px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                                        <th className="py-2 pr-2 font-semibold">Zone (Coggan)</th>
                                        <th className="py-2 pr-2 font-semibold">% FTP</th>
                                        <th className="py-2 font-semibold">Équivalent Friel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coggenFrielTable.map((row) => (
                                        <tr key={row.zone} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                                            <td className="py-2.5 pr-2 text-slate-700 dark:text-slate-300">{row.zone}</td>
                                            <td className="py-2.5 pr-2 text-slate-600 dark:text-slate-400">{row.coggan}</td>
                                            <td className="py-2.5 font-semibold text-slate-900 dark:text-white">{row.friel}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                            {"PulsePeak recalcule votre FTP en continu à partir de vos séances de vélo réelles — pas seulement lors d'un test dédié — et l'utilise pour structurer vos blocs d'entraînement (Force, Seuil, Endurance critique), en tenant compte de votre charge sur les autres disciplines si vous pratiquez aussi la natation ou la course à pied."}
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

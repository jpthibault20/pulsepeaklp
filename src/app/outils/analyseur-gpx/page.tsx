// app/outils/analyseur-gpx/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mountain } from "lucide-react";
import LandingBackground from "../../components/LandingBackground";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrimaryButton from "../../components/PrimaryButton";
import Badge from "../../components/Badge";
import GpxAnalyzer from "./GpxAnalyzer";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export const metadata: Metadata = {
    title: "Analyseur de fichier GPX (dénivelé, profil, temps estimé) — PulsePeak",
    description:
        "Importez un fichier GPX pour obtenir la distance, le dénivelé (D+/D-), le profil d'élévation et une estimation de temps ou de puissance sur le parcours.",
    alternates: {
        canonical: "/outils/analyseur-gpx",
    },
};

const faqs = [
    {
        q: "Où trouver le fichier GPX de mon parcours ?",
        a: "La plupart des plateformes (Strava, Garmin Connect, Komoot, RideWithGPS, OpenRunner...) permettent d'exporter un itinéraire ou une activité au format GPX depuis leur page de détail, généralement via un bouton « Exporter » ou « Télécharger ».",
    },
    {
        q: "Mes données GPX sont-elles envoyées sur un serveur ?",
        a: "Non. Le fichier est lu et analysé entièrement dans votre navigateur — il n'est jamais transmis ni stocké ailleurs.",
    },
    {
        q: "Pourquoi mon D+ diffère-t-il de celui affiché par mon application habituelle ?",
        a: "Le dénivelé calculé à partir de données GPS/altimètre brutes est très sensible au bruit de mesure — chaque application applique son propre lissage. Cet outil lisse les altitudes avant de sommer les montées, mais un écart de quelques pourcents avec Strava ou Garmin reste normal.",
    },
    {
        q: "Comment fonctionne l'estimation de temps ?",
        a: "En course à pied, elle utilise le modèle de coût énergétique de Minetti (2002), qui traduit chaque pente en un « équivalent plat » à partir de votre allure de référence. À vélo, elle simule la puissance nécessaire pente par pente (gravité, résistance au roulement, aérodynamisme) pour atteindre la puissance cible que vous indiquez. Dans les deux cas, il s'agit d'une estimation physique, pas d'une mesure — la météo, la fatigue ou le revêtement ne sont pas pris en compte.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            name: "Analyseur de fichier GPX",
            applicationCategory: "SportsApplication",
            operatingSystem: "Web",
            description:
                "Outil gratuit pour analyser un fichier GPX : distance, dénivelé positif et négatif, profil d'élévation et estimation de temps ou de puissance.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            url: "https://www.pulsepeak.fr/outils/analyseur-gpx",
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

export default function AnalyseurGpxPage() {
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
                    <Badge text="Outil gratuit" icon={Mountain} color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl dark:text-white">
                        Analyseur de fichier GPX
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Importez un fichier GPX pour obtenir la distance, le dénivelé, le profil d'élévation et une estimation de temps sur votre parcours."}
                    </p>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <GpxAnalyzer />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-6 p-8 md:p-10 ${card}`}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Pourquoi analyser un parcours avant de partir ?
                    </h2>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Connaître le dénivelé et le profil d'un parcours avant de s'engager permet d'ajuster son allure, sa stratégie de ravitaillement ou son choix de développement (à vélo). Un même kilométrage ne demande pas la même énergie sur un parcours plat que sur un profil vallonné."}
                    </p>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {"Dans PulsePeak, vos séances et sorties tiennent compte de ce type de contraintes pour ajuster votre plan et vos zones cibles, sur la ou les disciplines que vous pratiquez — natation, vélo, course à pied."}
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

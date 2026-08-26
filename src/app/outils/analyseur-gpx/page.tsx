// app/outils/analyseur-gpx/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mountain, Ruler, ArrowUp, ArrowDown } from "lucide-react";
import LandingBackground from "../../components/LandingBackground";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrimaryButton from "../../components/PrimaryButton";
import Badge from "../../components/Badge";
import AuthorBlock from "../../components/AuthorBlock";
import GpxAnalyzer from "./GpxAnalyzer";
import ElevationChart from "./ElevationChart";
import {
    generateDemoTrack,
    buildTrack,
    computeElevationStats,
    downsampleForChart,
    estimateRunTimeMin,
    estimateBikeTimeMin,
} from "./gpxUtils";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const title = "Analyseur de fichier GPX : dénivelé, profil et temps estimé — PulsePeak";
const description =
    "Importez un fichier GPX pour obtenir la distance, le dénivelé (D+/D-), le profil d'élévation et une estimation de temps ou de puissance sur le parcours.";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/outils/analyseur-gpx",
    },
    ...pageOpenGraph({ title, description, path: "/outils/analyseur-gpx" }),
};

// Exemple calculé côté serveur (fonctions pures, sans DOMParser) pour que la page
// affiche un résultat concret même avant tout import de fichier.
const demoTrack = buildTrack(generateDemoTrack());
const demoStats = computeElevationStats(demoTrack);
const demoChartData = downsampleForChart(demoTrack);
const demoRunTimeMin = estimateRunTimeMin(demoTrack, 5);
const demoBikeEstimate = estimateBikeTimeMin(demoTrack, { totalMassKg: 78, powerW: 220, crr: 0.005, cda: 0.32 });

function formatDuration(totalMinutes: number): string {
    const totalSeconds = Math.round(totalMinutes * 60);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    if (h > 0) return `${h}h${m.toString().padStart(2, "0")}`;
    return `${m} min`;
}

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
            "@type": "SoftwareApplication",
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
                        Analyseur de fichier GPX : dénivelé, profil et temps estimé
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"Importez un fichier GPX pour obtenir la distance, le dénivelé, le profil d'élévation et une estimation de temps sur votre parcours."}
                    </p>
                </div>
            </section>

            {/* Exemple pré-calculé — rendu côté serveur, visible sans import de fichier */}
            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                            Exemple : sortie vallonnée de 18 km
                        </p>
                        <Badge text="Parcours de démonstration" color="slate" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className={`p-5 ${card}`}>
                            <Ruler size={18} className="mb-2 text-blue-600" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">{demoStats.distanceKm.toFixed(1)} km</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Distance</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <ArrowUp size={18} className="mb-2 text-orange-600" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">{Math.round(demoStats.gainM)} m</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">D+</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <ArrowDown size={18} className="mb-2 text-emerald-600" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">{Math.round(demoStats.lossM)} m</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">D-</p>
                        </div>
                        <div className={`p-5 ${card}`}>
                            <Mountain size={18} className="mb-2 text-violet-600" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">
                                {Math.round(demoStats.minEle)}–{Math.round(demoStats.maxEle)} m
                            </p>
                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Altitude</p>
                        </div>
                    </div>

                    <div className={`mt-6 p-6 md:p-8 ${card}`}>
                        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Profil d&apos;élévation</h2>
                        <ElevationChart data={demoChartData} />
                    </div>

                    <div className={`mt-6 flex flex-wrap items-center gap-3 p-6 md:p-8 ${card}`}>
                        <Badge text={`Course à 5:00/km → ${formatDuration(demoRunTimeMin)}`} color="blue" />
                        <Badge text={`Vélo à 220 W / 78 kg → ${formatDuration(demoBikeEstimate.timeMin)} (${demoBikeEstimate.avgSpeedKmh.toFixed(1)} km/h moy.)`} color="slate" />
                    </div>

                    <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                        Importez votre propre fichier ci-dessous pour remplacer cet exemple par votre parcours.
                    </p>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-4xl">
                    <GpxAnalyzer />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className={`mx-auto max-w-4xl space-y-10 p-8 md:p-10 ${card}`}>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Comment fonctionne le calcul du D+
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Sommer brutalement toutes les variations d'altitude entre points consécutifs surestime fortement le dénivelé : le bruit de mesure GPS/altimètre (quelques mètres d'imprécision par point) s'accumule et peut doubler le D+ réel sur un parcours long. Cet outil lisse d'abord l'altitude sur une fenêtre de distance (environ 30 mètres) avant de sommer les montées et les descentes — une fenêtre basée sur la distance plutôt que sur un nombre de points fixe, pour rester pertinente aussi bien sur une trace GPS dense (un point par seconde) que sur un itinéraire planifié plus épars (un point tous les 50 à 100 mètres)."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Le modèle de Minetti expliqué (course à pied)
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Le coût énergétique de la course varie fortement avec la pente. Minetti et ses collègues (2002) ont modélisé ce coût C (en joules par kilogramme et par mètre parcouru) en fonction du gradient i (positif en montée, négatif en descente) :"}
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                            <p className="whitespace-nowrap font-mono text-sm font-semibold text-blue-600">
                                C(i) = 155,4·i⁵ − 30,4·i⁴ − 43,3·i³ + 46,3·i² + 19,5·i + 3,6
                            </p>
                        </div>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Pour chaque segment du parcours, l'outil compare ce coût à celui du plat (C(0) = 3,6 J/kg/m) pour obtenir une « distance équivalent plat », puis applique votre allure de référence à cette distance équivalente plutôt qu'à la distance réelle. C'est le même principe que l'allure ajustée à la pente (GAP) utilisée par les montres et applications de course modernes."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Le modèle physique vélo expliqué
                        </h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"À vélo, l'estimation résout, pente par pente, la vitesse qui équilibre votre puissance cible avec les forces qui s'opposent à l'avancement : la gravité (fonction de la pente et de votre poids total), la résistance au roulement, et la traînée aérodynamique — qui domine largement à haute vitesse :"}
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
                            <p className="whitespace-nowrap font-mono text-sm font-semibold text-blue-600">
                                P = (m·g·sin θ + m·g·Crr·cos θ) · v + ½·ρ·SCx·v³
                            </p>
                        </div>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"m étant votre poids total (vélo + vous), θ l'angle de la pente, Crr le coefficient de résistance au roulement, ρ la densité de l'air et SCx votre surface frontale effective (traînée). Cette équation est résolue numériquement pour chaque groupe de pentes similaires du parcours, puis les temps de chaque segment sont sommés. Les valeurs par défaut (Crr ≈ 0,005, SCx ≈ 0,32 m²) correspondent à une position route classique — un résultat indicatif, sensible à la météo, aux pneus et à la position réelle sur le vélo."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Limites de l&apos;analyse</h2>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Ces estimations reposent uniquement sur la géométrie du parcours et les paramètres que vous renseignez : elles ne tiennent compte ni du vent, ni de la température, ni du revêtement, ni de votre fatigue du jour. Un fichier GPX de mauvaise qualité (points épars, altimètre imprécis) dégrade aussi la fiabilité du D+ et du profil affichés. Utilisez ces chiffres comme un repère de préparation, pas comme une prédiction exacte de votre temps de course."}
                        </p>
                    </div>

                    <div>
                        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
                            {"Connaître le dénivelé et le profil d'un parcours avant de s'engager permet d'ajuster son allure, sa stratégie de ravitaillement ou son choix de développement. Dans PulsePeak, ce type de contrainte est pris en compte pour ajuster votre plan et vos zones cibles, sur la ou les disciplines que vous pratiquez — natation, vélo, course à pied."}
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

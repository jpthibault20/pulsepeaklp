// app/page.tsx
import Image from "next/image";
import {
  Waves,
  Brain,
  Gauge,
  Calendar,
  ArrowRight,
  Target,
  BrainCircuit,
} from "lucide-react";
import LandingBackground from "./components/LandingBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrimaryButton from "./components/PrimaryButton";
import Badge from "./components/Badge";
import Testimonials from "./components/Testimonials";
import InstallAppBanner from "./components/InstallAppBanner";
import MirrorSection from "./components/MirrorSection";
import DisciplineProof from "./components/DisciplineProof";
import CompetitorFaq from "./components/CompetitorFaq";
import PhoneMockup from "./components/PhoneMockup";
import PricingBanner from "./components/PricingBanner";
import FinalCta from "./components/FinalCta";

const card =
  "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pulsepeak.fr/#organization",
      name: "PulsePeak",
      url: "https://pulsepeak.fr",
      logo: "https://pulsepeak.fr/logoBlack.png",
    },
    {
      "@type": "SoftwareApplication",
      name: "PulsePeak",
      url: "https://pulsepeak.fr",
      applicationCategory: "SportsApplication",
      operatingSystem: "Web, iOS, Android",
      description:
        "Coach IA multisport pour la natation, le vélo et la course à pied : planification personnalisée, analyse de performance et suivi de forme.",
      offers: {
        "@type": "Offer",
        price: "5",
        priceCurrency: "EUR",
        url: "https://pulsepeak.fr/pricing",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 pb-16 pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Texte */}
          <div className="text-center lg:text-left">
            <Badge text="Coach IA multisport" icon={Waves} color="blue" className="mb-6" />

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">PulsePeak</p>

            <h1 className="mx-auto mb-8 max-w-2xl text-4xl font-black leading-[1.05] tracking-tighter text-slate-900 md:text-6xl lg:mx-0 lg:text-5xl xl:text-6xl dark:text-white">
              {"Un coach IA qui s'adapte à votre semaine, pas l'inverse."}
            </h1>

            <p className="mx-auto mb-6 max-w-2xl text-xl leading-relaxed text-slate-600 md:text-2xl lg:mx-0 dark:text-slate-400">
              {"Planification personnalisée, analyse de performance et suivi de forme, sur la ou les disciplines de votre choix."}
            </p>

            <p className="mb-10 text-sm font-semibold text-blue-600">
              {"1er mois offert, sans engagement — puis dès 5€/mois, offre de lancement jusqu'au 31 décembre 2026"}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <PrimaryButton
                text="Essayer PulsePeak"
                href="https://app.pulsepeak.fr"
                icon={ArrowRight}
                size="lg"
              />
              <PrimaryButton
                text="Voir les tarifs"
                href="/pricing"
                variant="outline"
                size="lg"
              />
            </div>
          </div>

          <PhoneMockup
            src="/screen_calendar_phone.png"
            alt="Agenda d'entraînement PulsePeak sur mobile"
            aspect="hero"
            priority
          />
        </div>
      </section>

      <MirrorSection />

      {/* Section Présentation détaillée — value prop d'abord */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
              Le coaching, réinventé.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {"PulsePeak ne se contente pas de générer un plan. Il vit l'entraînement avec vous, sortie après sortie."}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Pilier 1 : Ultra-adaptatif */}
            <div className={`p-8 ${card}`}>
              <Badge text="Adaptatif" icon={Brain} color="blue" className="mb-6" />
              <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                {"L'IA qui vous connaît"}
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {
                  "Une réunion qui finit tard ? Une mauvaise nuit ? L'IA recalcule instantanément votre semaine pour optimiser votre récupération sans sacrifier vos objectifs. Fini le stress de ne pas suivre le plan."
                }
              </p>
            </div>

            {/* Pilier 2 : Pour tous les niveaux */}
            <div className={`p-8 ${card}`}>
              <Badge text="Endurance" icon={Gauge} color="emerald" className="mb-6" />
              <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                {"Du loisir à la compétition"}
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {
                  "Que vous prépariez un 10 km, une sortie longue à vélo, un objectif natation ou un triathlon complet, l'algorithme ajuste la charge et l'intensité sur la ou les disciplines choisies, en fonction de votre historique réel, de vos zones de puissance/FC et de vos ambitions."
                }
              </p>
            </div>

            {/* Pilier 3 : Méthodologie */}
            <div className={`p-8 ${card}`}>
              <Badge text="VO2max" icon={Calendar} color="violet" className="mb-6" />
              <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                {"L'art du cycle"}
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {
                  "Fini la routine. L'IA structure votre saison en blocs thématiques (Force, Seuil, Endurance critique) pour garantir une progression constante et éviter la stagnation. Une approche scientifique et éprouvée."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingBanner />

      {/* Section Visuels — preuve */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              {"L'expérience PulsePeak"}
            </p>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
              Visualisez votre succès.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Une interface intuitive pour un suivi précis et une motivation constante.
            </p>
          </div>

          <DisciplineProof />

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className={`p-4 ${card}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 md:rounded-xl">
                <Image
                  src="/screen_calendar_pc.png"
                  alt="Agenda PulsePeak"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-3"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Votre saison, optimisée sortie après sortie.
              </p>
            </div>

            <div className={`p-4 ${card}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 md:rounded-xl">
                <Image
                  src="/screen_generate_week_w_IA.png"
                  alt="L'IA génère votre semaine d'entraînement"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-3"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                {"L'IA ajuste votre semaine selon votre forme et vos disponibilités."}
              </p>
            </div>

            <div className={`col-span-full p-4 md:col-span-1 ${card}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 md:rounded-xl">
                <Image
                  src="/Screen_plan.png"
                  alt="Plan d'entraînement structuré en blocs"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain object-top p-3"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Votre saison structurée en blocs de progression.
              </p>
            </div>

            <div className={`col-span-full p-4 md:col-span-1 ${card}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 md:rounded-xl">
                <Image
                  src="/Screen_stats_v2.png"
                  alt="Statistiques de performance"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-3"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Chaque donnée compte pour votre progression.
              </p>
            </div>

            <div className={`p-4 ${card}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 md:rounded-xl">
                <Image
                  src="/workout_planned.png"
                  alt="Détail d'une séance planifiée par l'IA"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-3"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Chaque séance expliquée : quoi, combien, pourquoi.
              </p>
            </div>

            <div className={`p-4 ${card}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 md:rounded-xl">
                <Image
                  src="/workout.png"
                  alt="Analyse détaillée d'une séance réalisée"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-3"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Et analysée en détail une fois la séance terminée.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InstallAppBanner />

      {/* Section Vision — trust/humain, juste avant la conversion finale */}
      <section id="vision" className="mx-auto max-w-7xl px-4 py-24 scroll-mt-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Carte Vision (large) */}
          <div className={`md:col-span-2 flex flex-col justify-between p-10 ${card}`}>
            <div className="space-y-4">
              <Target className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Ma vision</h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {
                  "J'ai créé PulsePeak parce que les plans d'entraînement statiques sont les ennemis de la progression sportive. Je veux offrir à chaque nageur, cycliste, coureur ou triathlète la précision d'un coach pro, boostée par une IA capable d'analyser chaque séance."
                }
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-slate-200/80 pt-8 dark:border-slate-800">
              <Image
                src="/Profile.png"
                alt="Photo du fondateur"
                width={100}
                height={100}
                className="h-16 w-16 rounded-full border-2 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-800"
              />
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                JEANPIERRE Thibault, <span className="text-blue-600">Fondateur</span>
              </p>
            </div>
          </div>

          {/* Carte "Pensé pour la route" */}
          <div className={`p-10 ${card}`}>
            <BrainCircuit className="mb-6 text-blue-600" size={40} />
            <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
              Pensé pour la route
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {
                "L'IA calcule, mais l'expérience guide. L'application est calibrée sur la réalité de l'entraînement — natation, vélo, course à pied ou triathlon : gérer la fatigue, les imprévus et la « vraie vie », pas juste des chiffres."
              }
            </p>
          </div>
        </div>
      </section>

      <Testimonials />

      <CompetitorFaq />

      <FinalCta />

      <Footer />
    </main>
  );
}

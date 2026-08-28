// app/components/DisciplineLandingPage.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LandingBackground from "./LandingBackground";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PrimaryButton from "./PrimaryButton";
import Badge from "./Badge";
import PhoneMockup from "./PhoneMockup";
import DisciplineShowcase from "./DisciplineShowcase";
import PricingBanner from "./PricingBanner";
import CompetitorFaq from "./CompetitorFaq";
import FinalCta from "./FinalCta";
import { disciplineOrder, getDiscipline, type Discipline } from "@/lib/disciplines";

const card =
  "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export default function DisciplineLandingPage({ discipline }: { discipline: Discipline }) {
  const config = getDiscipline(discipline);
  const Icon = config.icon;
  const others = disciplineOrder.filter((key) => key !== discipline);

  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <LandingBackground />
      <Navbar />

      {/* Hero — situation, pas catalogue */}
      <section className="relative px-4 pb-16 pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <Badge text={config.badgeText} icon={Icon} color={config.color} className="mb-6" />

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">PulsePeak</p>

            <h1 className="mx-auto mb-8 max-w-2xl text-4xl font-black leading-[1.05] tracking-tighter text-slate-900 md:text-6xl lg:mx-0 lg:text-5xl xl:text-6xl dark:text-white">
              {config.h1}
            </h1>

            <p className="mx-auto mb-6 max-w-2xl text-xl leading-relaxed text-slate-600 md:text-2xl lg:mx-0 dark:text-slate-400">
              {config.subtitle}
            </p>

            <p className="mb-10 text-sm font-semibold text-blue-600">
              {"Dès 5€/mois — offre de lancement jusqu'au 31 décembre 2026"}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <PrimaryButton text="Essayer PulsePeak" href="https://app.pulsepeak.fr" icon={ArrowRight} size="lg" />
              <PrimaryButton text="Voir les tarifs" href="/pricing" variant="outline" size="lg" />
            </div>
          </div>

          <PhoneMockup src={config.image} alt={config.imageAlt} aspect="compact" priority />
        </div>
      </section>

      {/* Section miroir — un seul cas, celui de cette discipline */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
            Vous vous reconnaissez ?
          </h2>
          <div className={`mx-auto flex items-start gap-4 p-6 text-left ${card}`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Icon size={20} />
            </span>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">{config.mirrorText}</p>
          </div>
          <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">{config.bridge}</p>
        </div>
      </section>

      <PricingBanner />

      {/* Preuve — dédiée à la discipline, pas de catalogue générique */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
              {"L'expérience PulsePeak"}
            </p>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
              {`Votre semaine ${config.label.toLowerCase()}, visualisée.`}
            </h2>
          </div>

          <DisciplineShowcase discipline={discipline} />
        </div>
      </section>

      <CompetitorFaq />

      <FinalCta
        title={`Prêt à transformer votre entraînement ${config.label.toLowerCase()} ?`}
        subtitle="Profitez du tarif de lancement à 5€/mois jusqu'au 31 décembre 2026 et donnez un coach IA à votre entraînement."
      />

      {/* Maillage interne — les autres disciplines, sans jamais donner l'impression que ce n'est "pas pour vous" */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold text-slate-500 dark:text-slate-500">Une autre discipline ?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {others.map((key) => {
              const other = getDiscipline(key);
              return (
                <Link
                  key={key}
                  href={`/${other.slug}`}
                  className="rounded-full border border-slate-200/80 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {other.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

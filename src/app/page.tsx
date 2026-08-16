// app/page.tsx
import Image from "next/image";
import {
  Bike,
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

const card =
  "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <LandingBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 pb-16 pt-32 text-center">
        <div className="mx-auto max-w-5xl">
          <Badge text="Coach cycliste intelligent" icon={Bike} color="blue" className="mb-6" />

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">PulsePeak</p>

          <h1 className="mx-auto mb-8 max-w-4xl text-4xl font-black leading-[1.05] tracking-tighter text-slate-900 md:text-6xl dark:text-white">
            {"Un coach cycliste IA qui s'adapte à votre semaine, pas l'inverse."}
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-xl leading-relaxed text-slate-600 md:text-2xl dark:text-slate-400">
            {"Planification personnalisée, analyse de performance et suivi de forme pour progresser à vélo."}
          </p>

          <p className="mb-10 text-sm font-semibold text-blue-600">
            {"Dès 5€/mois — offre de lancement jusqu'au 31 décembre 2026"}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <PrimaryButton
              text="Essayer PulsePeak"
              href="https://app.pulsepeak.fr"
              icon={ArrowRight}
              size="lg"
            />
            <PrimaryButton
              text="Voir les tarifs"
              href="/prix"
              variant="outline"
              size="lg"
            />
          </div>
        </div>
      </section>

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
                  "Que vous prépariez votre première sortie longue ou une cyclosportive exigeante, l'algorithme ajuste la charge et l'intensité en fonction de votre historique réel, de vos zones de puissance/FC et de vos ambitions."
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

      {/* Bandeau de conversion intermédiaire — évite d'avoir à scroller jusqu'en bas */}
      <section className="px-4 pb-4">
        <div className={`mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 border-blue-200/60 bg-blue-50/60 px-6 py-6 text-center dark:border-blue-500/20 dark:bg-blue-500/5 sm:flex-row sm:text-left ${card}`}>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {"Offre de lancement : 5€/mois jusqu'au 31 décembre 2026."}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Puis 9€/mois. Résiliable à tout moment.
            </p>
          </div>
          <PrimaryButton text="Voir les tarifs" href="/prix" icon={ArrowRight} className="shrink-0" />
        </div>
      </section>

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

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className={`p-4 ${card}`}>
              <div className="overflow-hidden rounded-lg md:rounded-xl">
                <Image
                  src="/screen_calendar.png"
                  alt="Agenda PulsePeak"
                  width={800}
                  height={500}
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Votre saison, optimisée sortie après sortie.
              </p>
            </div>

            <div className={`p-4 ${card}`}>
              <div className="overflow-hidden rounded-lg md:rounded-xl">
                <Image
                  src="/Screen_IA.png"
                  alt="L'IA au service de votre passion"
                  width={800}
                  height={500}
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                {"L'IA au service de votre passion."}
              </p>
            </div>

            <div className={`col-span-full p-4 md:col-span-1 ${card}`}>
              <div className="overflow-hidden rounded-lg md:rounded-xl">
                <Image
                  src="/screen_profile.png"
                  alt="Profil athlète PulsePeak"
                  width={800}
                  height={500}
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Votre profil, vos données, votre évolution.
              </p>
            </div>

            <div className={`col-span-full p-4 md:col-span-1 ${card}`}>
              <div className="overflow-hidden rounded-lg md:rounded-xl">
                <Image
                  src="/Screen_stats.png"
                  alt="Statistiques de performance"
                  width={800}
                  height={500}
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Chaque donnée compte pour votre progression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vision — trust/humain, juste avant la conversion finale */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Carte Vision (large) */}
          <div className={`md:col-span-2 flex flex-col justify-between p-10 ${card}`}>
            <div className="space-y-4">
              <Target className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Notre vision</h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {
                  "Nous avons créé PulsePeak parce que les plans d'entraînement statiques sont les ennemis de la progression à vélo. Nous voulons offrir à chaque cycliste la précision d'un coach pro, boostée par une IA capable d'analyser chaque sortie."
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
                JEANPIERRE Thibaut, <span className="text-blue-600">Fondateur</span>
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
                "L'IA calcule, mais l'expérience guide. L'application est calibrée sur la réalité du cyclisme : gérer la fatigue, les imprévus et la « vraie vie », pas juste des chiffres."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action final */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-8 rounded-2xl bg-blue-600 px-6 py-16 shadow-lg shadow-blue-900/20 md:px-16">
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {"Prêt à transformer votre entraînement ?"}
          </h2>
          <p className="text-lg text-blue-100 md:text-xl">
            {"Profitez du tarif de lancement à 5€/mois jusqu'au 31 décembre 2026 et donnez un coach IA à votre vélo."}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton
              text="Essayer PulsePeak"
              href="https://app.pulsepeak.fr"
              icon={ArrowRight}
              variant="secondary"
              size="lg"
            />
            <PrimaryButton
              text="Voir les tarifs"
              href="/prix"
              variant="outline-light"
              size="lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

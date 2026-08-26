// app/prix/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { Check, Zap, ChevronDown } from "lucide-react";
import LandingBackground from "../components/LandingBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import Badge from "../components/Badge";

const title = "Tarifs — PulsePeak";
const description =
  "Un tarif simple pour un coach IA natation, vélo, course à pied. Offre de lancement à 5€/mois jusqu'au 31 décembre 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing",
  },
  ...pageOpenGraph({ title, description, path: "/pricing" }),
};

const card =
  "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const included = [
  "Plans d'entraînement adaptatifs par IA",
  "Analyse de puissance, FC et charge d'entraînement",
  "Suivi de forme et de progression illimité",
  "Toutes les fonctionnalités de l'application",
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Puis-je résilier à tout moment ?",
    a: "Oui. Comme précisé dans nos CGV, vous pouvez résilier votre abonnement à tout moment ; la résiliation prend effet à la fin de la période en cours.",
  },
  {
    q: "Le tarif à 5€/mois est-il garanti indéfiniment ?",
    a: "Non, c'est un tarif de lancement valable jusqu'au 31 décembre 2026. Passé cette date, l'abonnement mensuel repasse à 9€/mois — le tarif annuel à 90€/an n'est pas concerné.",
  },
  {
    q: "PulsePeak remplace-t-il un coach ou un avis médical ?",
    a: "Non. Les recommandations de PulsePeak sont fournies à titre informatif et ne remplacent pas l'avis d'un professionnel de santé, notamment avant de démarrer un programme d'entraînement intensif.",
  },
  {
    q: "Que deviennent mes données ?",
    a: (
      <>
        Elles sont traitées conformément à notre{" "}
        <a href="/privacy-policy" className="font-medium text-blue-600 hover:underline">
          politique de confidentialité
        </a>
        .
      </>
    ),
  },
];

export default function PrixPage() {
  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <LandingBackground />
      <Navbar />

      <section className="relative px-4 pb-16 pt-32 text-center">
        <div className="mx-auto max-w-3xl">
          <Badge text="Offre de lancement · -44%" icon={Zap} color="orange" className="mb-8" />
          <h1 className="mb-6 text-4xl font-black tracking-tighter text-slate-900 md:text-6xl dark:text-white">
            Un tarif simple, sans surprise.
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
            {"Un seul abonnement, toutes les fonctionnalités. Économisez 44% jusqu'au 31 décembre 2026 avec le tarif de lancement à 5€/mois."}
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Mensuel */}
          <div className={`flex flex-col p-8 ${card}`}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Mensuel</h2>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">5€</span>
              <span className="pb-1 text-slate-500 dark:text-slate-400">/mois</span>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="line-through">9€/mois</span> jusqu&apos;au 31 décembre 2026, puis 9€/mois.
            </p>

            <ul className="mt-8 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="mt-0.5 shrink-0 text-blue-600" size={18} />
                  {item}
                </li>
              ))}
            </ul>

            <PrimaryButton
              text="Commencer à 5€/mois"
              href="https://app.pulsepeak.fr"
              variant="outline"
              size="lg"
              className="mt-8 w-full"
            />
          </div>

          {/* Annuel (mis en avant) */}
          <div className={`relative flex flex-col p-8 pt-11 ${card} border-blue-600/60 ring-2 ring-blue-600/20 dark:border-blue-500/50`}>
            <Badge text="Meilleure offre" color="blue" className="absolute -top-3 left-8" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Annuel</h2>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">90€</span>
              <span className="pb-1 text-slate-500 dark:text-slate-400">/an</span>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Soit 7,50€/mois — l&apos;équivalent de 2 mois offerts.
            </p>

            <ul className="mt-8 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="mt-0.5 shrink-0 text-blue-600" size={18} />
                  {item}
                </li>
              ))}
            </ul>

            <PrimaryButton
              text="Commencer à 90€/an"
              href="https://app.pulsepeak.fr"
              variant="primary"
              size="lg"
              className="mt-8 w-full"
            />
          </div>
        </div>
      </section>

      {/* FAQ — lève les objections avant la décision */}
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
            Une autre question ?{" "}
            <a href="/contact" className="font-medium text-blue-600 hover:underline">
              Contactez-nous
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

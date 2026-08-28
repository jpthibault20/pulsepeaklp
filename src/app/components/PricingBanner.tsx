// app/components/PricingBanner.tsx
import { ArrowRight } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

const card =
  "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export default function PricingBanner() {
  return (
    <section className="px-4 pb-4">
      <div
        className={`mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 border-blue-200/60 bg-blue-50/60 px-6 py-6 text-center dark:border-blue-500/20 dark:bg-blue-500/5 sm:flex-row sm:text-left ${card}`}
      >
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {"Offre de lancement : 5€/mois jusqu'au 31 décembre 2026."}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Puis 9€/mois. Résiliable à tout moment.</p>
        </div>
        <PrimaryButton text="Voir les tarifs" href="/pricing" icon={ArrowRight} className="shrink-0" />
      </div>
    </section>
  );
}

// app/components/CompetitorFaq.tsx
import { HelpCircle } from "lucide-react";

const card =
  "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export default function CompetitorFaq() {
  return (
    <section className="px-4 py-16">
      <div className={`mx-auto max-w-3xl p-8 md:p-10 ${card}`}>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <HelpCircle size={20} />
          </span>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl dark:text-white">
            {"Pourquoi payer, alors que Garmin Coach ou Decathlon Coach sont inclus ?"}
          </h2>
        </div>
        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
          {
            "Ces plans embarqués suivent un calendrier figé : ils ne savent pas que votre nuit a été mauvaise, que votre semaine a basculé, ou que vous courez et roulez la même semaine. PulsePeak réadapte votre plan sur votre fatigue réelle, combine plusieurs disciplines dans une même logique de charge, et tient compte de vos contraintes de vie — ce qu'un plan livré avec une montre ne fait pas."
          }
        </p>
      </div>
    </section>
  );
}

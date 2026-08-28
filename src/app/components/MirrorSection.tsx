// app/components/MirrorSection.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { disciplineOrder, getDiscipline } from "@/lib/disciplines";

const card =
  "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export default function MirrorSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
            Vous vous reconnaissez ?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {disciplineOrder.map((key) => {
            const config = getDiscipline(key);
            const Icon = config.icon;
            return (
              <Link
                key={key}
                href={`/${config.slug}`}
                className={`group flex items-start gap-4 p-6 transition-colors hover:border-blue-300 dark:hover:border-blue-500/40 ${card}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Icon size={20} />
                </span>
                <div className="flex-1">
                  <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {config.mirrorText}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {`Voir le coaching ${config.label.toLowerCase()}`}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

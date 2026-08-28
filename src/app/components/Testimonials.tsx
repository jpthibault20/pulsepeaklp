// app/components/Testimonials.tsx
import { Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export default function Testimonials() {
    return (
        <section className="px-4 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
                        Ils s&apos;entraînent avec PulsePeak
                    </p>
                    <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
                        Ce qu&apos;ils en disent.
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        Natation, vélo, course à pied ou triathlon complet : des retours sur chaque discipline.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {testimonials.map((t) => (
                        <div key={t.name} className={`relative flex flex-col p-6 ${card}`}>
                            <div className="mb-3 flex gap-0.5 text-yellow-500 dark:text-yellow-400">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>

                            <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                {`« ${t.quote} »`}
                            </p>

                            <div className="flex items-center gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    {t.name
                                        .split(" ")
                                        .map((p) => p[0])
                                        .join("")}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">
                                        {t.disciplineLabel}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

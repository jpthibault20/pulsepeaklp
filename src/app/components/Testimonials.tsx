// app/components/Testimonials.tsx
import { Star, Waves, Bike } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Badge from "./Badge";
import type { BadgeColor } from "./Badge";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

interface Testimonial {
    name: string;
    discipline: string;
    icon: LucideIcon;
    color: BadgeColor;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Julien M.",
        discipline: "Vélo",
        icon: Bike,
        color: "blue",
        quote:
            "Enfin un suivi de charge qui colle à mes vraies séances de puissance, pas une moyenne théorique. Les blocs Force / Seuil / Endurance m'ont fait progresser sans stagner.",
    },
    {
        name: "Élodie B.",
        discipline: "Natation",
        icon: Waves,
        color: "cyan",
        quote:
            "Je ne fais que de la natation et je craignais un outil pensé pour le triathlon. PulsePeak s'est concentré uniquement sur ma discipline, avec un plan cohérent séance après séance.",
    },
    {
        name: "Thomas D.",
        discipline: "Triathlon",
        icon: Waves,
        color: "violet",
        quote:
            "La répartition entre mes trois disciplines s'ajuste automatiquement selon ma forme du moment. C'est la première fois qu'un plan tient compte de la fatigue cumulée sur les trois sports.",
    },
];

export default function Testimonials() {
    return (
        <section className="px-4 py-24">
            <div className="mx-auto max-w-5xl">
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

                <div className="grid gap-6 sm:grid-cols-3">
                    {testimonials.map((t) => (
                        <div key={t.name} className={`relative flex flex-col p-6 ${card}`}>
                            <div className="mb-3 flex gap-0.5 text-yellow-500 dark:text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
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
                                    <Badge text={t.discipline} icon={t.icon} color={t.color} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

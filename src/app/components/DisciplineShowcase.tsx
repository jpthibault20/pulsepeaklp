// app/components/DisciplineShowcase.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getDiscipline, type Discipline } from "@/lib/disciplines";
import { getTestimonial } from "@/lib/testimonials";

const card =
  "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

interface Props {
  discipline: Discipline;
  /** Ajoute un lien vers la page dédiée à la discipline (utilisé depuis la home) */
  linkToPage?: boolean;
}

export default function DisciplineShowcase({ discipline, linkToPage = false }: Props) {
  const config = getDiscipline(discipline);
  const testimonial = getTestimonial(discipline);

  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className={`mx-auto w-56 p-4 sm:w-64 ${card}`}>
        <div className="relative aspect-[41/89] overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950">
          <Image
            key={config.image}
            src={config.image}
            alt={config.imageAlt}
            fill
            sizes="256px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className={`p-6 ${card}`}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-600">
            Exemple de semaine générée par l&apos;IA
          </p>
          <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
            {config.week.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className={`p-6 ${card}`}>
          <div className="mb-3 flex gap-0.5 text-yellow-500 dark:text-yellow-400">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {`« ${testimonial.quote} »`}
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {testimonial.name}
            <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-500">
              {testimonial.disciplineLabel}
            </span>
          </p>
        </div>

        {linkToPage && (
          <Link
            href={`/${config.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {`En savoir plus sur le coaching ${config.label.toLowerCase()}`}
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}

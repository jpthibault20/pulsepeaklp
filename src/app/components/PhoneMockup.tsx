// app/components/PhoneMockup.tsx
import Image from "next/image";

type Aspect = "hero" | "compact";

interface Props {
  src: string;
  alt: string;
  aspect?: Aspect;
  priority?: boolean;
}

const aspectClass: Record<Aspect, string> = {
  hero: "aspect-[682/1488]",
  compact: "aspect-[41/89]",
};

export default function PhoneMockup({ src, alt, aspect = "hero", priority = false }: Props) {
  return (
    <div className="relative mx-auto w-56 sm:w-64 lg:mx-0 lg:w-72">
      {/* Glow d'ambiance */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[80px] dark:bg-blue-500/20" />

      {/* Boutons du châssis */}
      <div className="absolute -left-[3px] top-16 h-6 w-[3px] rounded-l bg-slate-800 dark:bg-slate-700" />
      <div className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-slate-800 dark:bg-slate-700" />
      <div className="absolute -right-[3px] top-24 h-12 w-[3px] rounded-r bg-slate-800 dark:bg-slate-700" />

      {/* Châssis téléphone */}
      <div className="relative overflow-hidden rounded-[2.75rem] border-[3px] border-slate-800 bg-slate-900 shadow-2xl shadow-slate-900/30 ring-1 ring-white/10 dark:border-slate-700">
        <div className="relative flex h-7 items-center justify-center bg-white">
          <div className="h-5 w-24 rounded-full bg-slate-950" />
        </div>
        <div className={`relative ${aspectClass[aspect]}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 288px, 256px"
            className="object-cover"
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

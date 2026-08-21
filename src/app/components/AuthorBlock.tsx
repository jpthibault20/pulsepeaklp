// app/components/AuthorBlock.tsx
import Image from "next/image";
import Link from "next/link";
import { CalendarClock } from "lucide-react";

export default function AuthorBlock({ updatedAt }: { updatedAt: string }) {
    return (
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 border-t border-slate-200/80 px-4 py-8 text-center dark:border-slate-800 sm:flex-row sm:text-left">
            <Link href="/#vision" className="flex items-center gap-3">
                <Image
                    src="/Profile.png"
                    alt="Photo de Thibault Jeanpierre"
                    width={72}
                    height={72}
                    className="h-10 w-10 shrink-0 rounded-full border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800"
                />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Rédigé par{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">Thibault Jeanpierre</span>,
                    fondateur de PulsePeak
                </p>
            </Link>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                <CalendarClock size={14} />
                Mis à jour le {updatedAt}
            </p>
        </div>
    );
}

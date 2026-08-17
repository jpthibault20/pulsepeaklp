// app/components/Badge.tsx
import type { LucideIcon } from "lucide-react";

export type BadgeColor =
    | "emerald"
    | "orange"
    | "red"
    | "blue"
    | "yellow"
    | "violet"
    | "pink"
    | "indigo"
    | "cyan"
    | "slate";

interface Props {
    text: string;
    icon?: LucideIcon;
    color?: BadgeColor;
    className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
    emerald:
        "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    orange:
        "bg-orange-50 text-orange-700 border-orange-200/60 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
    red: "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
    blue: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
    yellow:
        "bg-yellow-50 text-yellow-700 border-yellow-200/60 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20",
    violet:
        "bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
    pink: "bg-pink-50 text-pink-700 border-pink-200/60 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20",
    indigo:
        "bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200/60 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20",
    slate:
        "bg-slate-100 text-slate-700 border-slate-200/60 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20",
};

export default function Badge({ text, icon: Icon, color = "slate", className = "" }: Props) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${colorStyles[color]} ${className}`}
        >
            {Icon && <Icon size={12} />}
            {text}
        </span>
    );
}

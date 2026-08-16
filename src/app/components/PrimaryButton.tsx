// app/components/PrimaryButton.tsx
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "outline-light";
type Size = "md" | "lg";

interface Props {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: Variant;
    size?: Size;
    icon?: LucideIcon;
    className?: string;
}

const variantStyles: Record<Variant, string> = {
    primary:
        "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-900/20",
    secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
    outline:
        "border border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900",
    ghost:
        "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900",
    "outline-light": "border border-white/40 text-white hover:bg-white/10",
};

const sizeStyles: Record<Size, string> = {
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-lg",
};

export default function PrimaryButton({
    text,
    href,
    onClick,
    variant = "primary",
    size = "md",
    icon: Icon,
    className = "",
}: Props) {
    const classes = `group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

    const content = (
        <>
            <span>{text}</span>
            {Icon && (
                <Icon
                    size={size === "lg" ? 20 : 18}
                    className="transition-transform group-hover:translate-x-1"
                />
            )}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={classes}>
            {content}
        </button>
    );
}

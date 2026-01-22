// app/components/PrimaryButton.tsx
import { ArrowRight } from "lucide-react";

interface Props {
    text: string;
    onClick?: () => void;
    className?: string;
}

export default function PrimaryButton({ text, onClick, className }: Props) {
    return (
        <button
            onClick={onClick}
            className={`
        group relative px-8 py-4 
        bg-cyan-400 text-slate-950 font-extrabold text-lg rounded-xl
        transition-all duration-300 transform hover:scale-105 active:scale-95
        /* Ombre pour fond sombre */
        shadow-[0_0_20px_rgba(34,211,238,0.4)] 
        /* Ombre pour fond clair */
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.2),0_0_30px_rgba(34,211,238,0.6)]
        flex items-center justify-center gap-2
        border-2 border-cyan-300
        ${className}
      `}
        >
            <span className="relative z-10 uppercase tracking-tight">{text}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
    );
}
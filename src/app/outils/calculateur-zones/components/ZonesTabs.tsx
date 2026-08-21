// app/outils/calculateur-zones/components/ZonesTabs.tsx
import Link from "next/link";
import { Zap, HeartPulse, Footprints } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ZoneType = "puissance" | "fc" | "allure";

const tabs: { key: ZoneType; href: string; label: string; icon: LucideIcon }[] = [
    { key: "puissance", href: "/outils/calculateur-zones/puissance", label: "Puissance", icon: Zap },
    { key: "fc", href: "/outils/calculateur-zones/fc", label: "Fréq. cardiaque", icon: HeartPulse },
    { key: "allure", href: "/outils/calculateur-zones/allure", label: "Allure", icon: Footprints },
];

export default function ZonesTabs({ active }: { active: ZoneType }) {
    return (
        <div className="mx-auto mb-10 flex max-w-lg items-center gap-1 rounded-xl border border-slate-200/80 bg-white/80 p-1 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.key === active;
                return (
                    <Link
                        key={tab.key}
                        href={tab.href}
                        className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors sm:px-3 sm:text-sm ${
                            isActive
                                ? "bg-blue-600 text-white shadow-sm shadow-blue-900/20"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                        }`}
                    >
                        <Icon size={15} />
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}

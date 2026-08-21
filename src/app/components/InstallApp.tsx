// app/components/InstallApp.tsx
import { Share2, MoreVertical, SquarePlus, Smartphone, ArrowRight } from "lucide-react";
import Badge from "./Badge";
import PrimaryButton from "./PrimaryButton";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const platforms = [
    {
        os: "iOS · Safari",
        steps: [
            { icon: Smartphone, text: "Ouvrez app.pulsepeak.fr dans Safari" },
            { icon: Share2, text: "Appuyez sur l'icône Partager" },
            { icon: SquarePlus, text: "Sélectionnez « Sur l'écran d'accueil »" },
        ],
    },
    {
        os: "Android · Chrome",
        steps: [
            { icon: Smartphone, text: "Ouvrez app.pulsepeak.fr dans Chrome" },
            { icon: MoreVertical, text: "Appuyez sur le menu ⋮ en haut à droite" },
            { icon: SquarePlus, text: "Sélectionnez « Installer l'application »" },
        ],
    },
];

export default function InstallApp() {
    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2">
                {platforms.map((platform) => (
                    <div key={platform.os} className={`p-8 ${card}`}>
                        <Badge text={platform.os} color="slate" className="mb-6" />
                        <ol className="space-y-4">
                            {platform.steps.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <li key={i} className="flex items-center gap-4">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                            {i + 1}
                                        </span>
                                        <Icon size={18} className="shrink-0 text-slate-400" />
                                        <span className="text-sm text-slate-700 dark:text-slate-300">{step.text}</span>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <PrimaryButton
                    text="Ouvrir PulsePeak"
                    href="https://app.pulsepeak.fr"
                    icon={ArrowRight}
                    variant="outline"
                />
            </div>
        </div>
    );
}

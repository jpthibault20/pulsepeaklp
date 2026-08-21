// app/components/InstallAppBanner.tsx
import { Smartphone, ArrowRight } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

export default function InstallAppBanner() {
    return (
        <section className="px-4 pb-4">
            <div
                className={`mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 px-6 py-6 text-center sm:flex-row sm:text-left ${card}`}
            >
                <div className="flex items-center gap-4">
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 sm:flex">
                        <Smartphone size={20} />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                            {"Pas d'app à télécharger sur le Store"}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {"PulsePeak s'ajoute à votre écran d'accueil en 10 secondes."}
                        </p>
                    </div>
                </div>
                <PrimaryButton
                    text="Comment l'installer"
                    href="/telecharger"
                    icon={ArrowRight}
                    variant="outline"
                    className="shrink-0"
                />
            </div>
        </section>
    );
}

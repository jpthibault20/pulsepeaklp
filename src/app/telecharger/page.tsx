// app/telecharger/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { ArrowRight, ChevronDown, Smartphone, Zap, RefreshCw, Laptop } from "lucide-react";
import LandingBackground from "../components/LandingBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import Badge from "../components/Badge";
import InstallApp from "../components/InstallApp";

const card =
    "rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-md shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800";

const title = "Installer l'application PulsePeak — PulsePeak";
const description =
    "PulsePeak est une web app installable sur votre écran d'accueil en quelques secondes, sans passer par l'App Store ou le Google Play Store. Suivez le tuto iOS et Android.";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/telecharger",
    },
    ...pageOpenGraph({ title, description, path: "/telecharger" }),
};

const reasons = [
    {
        icon: Zap,
        title: "Aucune installation à attendre",
        text: "Pas de téléchargement, pas de mise à jour à valider manuellement : ouvrez PulsePeak et c'est déjà la dernière version.",
    },
    {
        icon: RefreshCw,
        title: "Toujours à jour",
        text: "Chaque amélioration est disponible immédiatement, sans passer par une validation de store qui peut prendre plusieurs jours.",
    },
    {
        icon: Laptop,
        title: "La même app partout",
        text: "Téléphone, tablette ou ordinateur : une seule application, avec vos données synchronisées, sans distinction entre « app » et « site ».",
    },
];

const faqs = [
    {
        q: "Pourquoi PulsePeak n'est pas sur l'App Store ou le Google Play Store ?",
        a: "PulsePeak est développée comme une web app pour rester disponible instantanément sur toutes les plateformes, sans délai de validation par un store et sans les contraintes techniques qui y sont liées. L'ajout à l'écran d'accueil offre une expérience très proche d'une app native, en gardant ces avantages.",
    },
    {
        q: "Est-ce que ça prend de la place sur mon téléphone ?",
        a: "Beaucoup moins qu'une application native classique : il ne s'agit pas d'un téléchargement complet, seulement d'un raccourci vers PulsePeak avec son icône sur votre écran d'accueil.",
    },
    {
        q: "Puis-je désinstaller l'icône facilement ?",
        a: "Oui, exactement comme n'importe quelle autre icône : un appui long puis « Supprimer », que ce soit sur iOS ou Android. Cela ne supprime ni votre compte ni vos données.",
    },
    {
        q: "Ça fonctionne aussi sur ordinateur ?",
        a: "Oui, PulsePeak fonctionne dans n'importe quel navigateur récent sur ordinateur, sans étape d'installation particulière — il suffit d'ouvrir app.pulsepeak.fr.",
    },
];

export default function TelechargerPage() {
    return (
        <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
            <LandingBackground />
            <Navbar />

            <section className="relative px-4 pb-8 pt-32 text-center">
                <div className="mx-auto max-w-3xl">
                    <Badge text="Web app installable" icon={Smartphone} color="blue" className="mb-6" />
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tighter text-slate-900 md:text-5xl dark:text-white">
                        Installer PulsePeak sur votre téléphone
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                        {"PulsePeak est une web app : elle fonctionne directement depuis votre navigateur, sans rien à télécharger sur un store. En 10 secondes, ajoutez-la à votre écran d'accueil pour l'ouvrir comme n'importe quelle application."}
                    </p>
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-5xl">
                    <InstallApp />
                </div>
            </section>

            <section className="px-4 pb-16">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 text-center">
                        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                            Pourquoi une web app plutôt qu&apos;une app de store ?
                        </h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {reasons.map((r) => {
                            const Icon = r.icon;
                            return (
                                <div key={r.title} className={`p-6 ${card}`}>
                                    <Icon className="mb-4 text-blue-600" size={24} />
                                    <h3 className="mb-2 font-bold text-slate-900 dark:text-white">{r.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{r.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="px-4 pb-16 text-center">
                <PrimaryButton text="Ouvrir PulsePeak" href="https://app.pulsepeak.fr" icon={ArrowRight} size="lg" />
            </section>

            <section className="px-4 pb-24">
                <div className="mx-auto max-w-2xl">
                    <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white">
                        Questions fréquentes
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <details key={faq.q} className={`group p-5 ${card}`}>
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 marker:content-none dark:text-white">
                                    {faq.q}
                                    <ChevronDown
                                        className="shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                                        size={18}
                                    />
                                </summary>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

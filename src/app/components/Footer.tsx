// app/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

const legalLinks = [
    { href: "/contact", label: "Contact" },
    { href: "/legal-notices", label: "Mentions légales" },
    { href: "/terms-of-use", label: "CGU" },
    { href: "/terms-of-sale", label: "CGV" },
    { href: "/privacy-policy", label: "Confidentialité" },
];

export default function Footer() {
    return (
        <footer className="border-t border-slate-200/80 px-4 py-10 dark:border-slate-800">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                <div className="flex flex-col items-center gap-3 md:flex-row">
                    <Image
                        src="/logoBlack.png"
                        alt="Logo PulsePeak"
                        width={100}
                        height={100}
                        className="h-6 w-6 shrink-0 dark:hidden"
                    />
                    <Image
                        src="/logoWhite.png"
                        alt="Logo PulsePeak"
                        width={100}
                        height={100}
                        className="hidden h-6 w-6 shrink-0 dark:block"
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        {"© 2026 PulsePeak. L'IA au service de votre passion : natation, vélo, course à pied."}
                    </p>
                </div>
                <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    {legalLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}

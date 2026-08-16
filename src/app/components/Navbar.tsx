// app/components/Navbar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import PrimaryButton from "./PrimaryButton";

const links = [
    { href: "/prix", label: "Tarifs" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <Image
                        src="/logoWhite.png"
                        alt="Logo PulsePeak"
                        width={100}
                        height={100}
                        className="h-8 w-8 rounded-full bg-slate-900 p-1 dark:bg-transparent"
                    />
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        PulsePeak
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <div className="hidden md:block">
                        <PrimaryButton text="Essayer PulsePeak" href="https://app.pulsepeak.fr" />
                    </div>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={open}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 md:hidden"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
                    <div className="flex flex-col gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <PrimaryButton
                            text="Essayer PulsePeak"
                            href="https://app.pulsepeak.fr"
                            className="mt-2 w-full"
                        />
                    </div>
                </div>
            )}
        </nav>
    );
}

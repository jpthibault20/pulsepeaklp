// app/components/ThemeToggle.tsx
"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
}

function getSnapshot() {
    return document.documentElement.getAttribute("data-theme") === "dark";
}

function getServerSnapshot() {
    return false;
}

export default function ThemeToggle() {
    const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const toggle = () => {
        const next = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    };

    return (
        <button
            onClick={toggle}
            aria-label="Basculer le thème clair/sombre"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200/80 text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
        >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
    );
}

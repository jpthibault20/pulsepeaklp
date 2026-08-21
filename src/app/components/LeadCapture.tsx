// app/components/LeadCapture.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

const inputClass =
    "flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

type Status = "idle" | "sending" | "sent" | "error";

export default function LeadCapture({ tool, summary }: { tool: string; summary: string }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, tool, summary }),
            });
            if (!res.ok) throw new Error("Envoi impossible");
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    };

    if (status === "sent") {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200/60 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <CheckCircle2 size={16} className="shrink-0" />
                Résultat envoyé à {email}.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Mail size={16} className="text-blue-600" />
                Recevoir ce résultat par email
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className={inputClass}
                />
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition-all hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : "Envoyer"}
                </button>
            </div>
            {status === "error" && (
                <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                    Une erreur est survenue. Merci de réessayer.
                </p>
            )}
        </form>
    );
}

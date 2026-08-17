// app/components/ContactForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) throw new Error("Envoi impossible");

            setStatus("sent");
            setName("");
            setEmail("");
            setMessage("");
        } catch {
            setStatus("error");
        }
    };

    if (status === "sent") {
        return (
            <div className="flex flex-col items-center gap-4 rounded-xl md:rounded-2xl border border-slate-200/80 bg-white/80 p-10 text-center backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
                <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={40} />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Message envoyé</h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Merci, votre message a bien été transmis. Nous vous répondrons rapidement.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl md:rounded-2xl border border-slate-200/80 bg-white/80 p-8 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60"
        >
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Nom
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Message
                </label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className={`${inputClass} resize-none`}
                />
            </div>

            {status === "error" && (
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    Une erreur est survenue. Merci de réessayer dans un instant.
                </p>
            )}

            <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-md shadow-blue-900/20 transition-all hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
                {status === "sending" ? (
                    <>
                        <Loader2 className="animate-spin" size={18} />
                        Envoi en cours…
                    </>
                ) : (
                    <>
                        Envoyer le message
                        <Send size={18} />
                    </>
                )}
            </button>
        </form>
    );
}

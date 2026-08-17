// app/contact/page.tsx
import type { Metadata } from "next";
import LandingBackground from "../components/LandingBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — PulsePeak",
  description: "Une question sur PulsePeak ? Contactez-nous via ce formulaire.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <LandingBackground />
      <Navbar />

      <section className="relative px-4 pb-24 pt-32">
        <div className="mx-auto max-w-xl">
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tighter text-slate-900 md:text-5xl dark:text-white">
              Contactez-nous
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Une question, une suggestion ? Écrivez-nous, nous vous répondrons rapidement.
            </p>
          </div>

          <ContactForm />

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
            Vous cherchez juste nos tarifs ?{" "}
            <a href="/pricing" className="font-medium text-blue-600 hover:underline">
              Consultez la page Tarifs
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

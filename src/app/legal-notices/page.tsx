// app/legal-notices/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import LandingBackground from "../components/LandingBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LegalToc from "../components/LegalToc";

const title = "Mentions légales — PulsePeak";
const description = "Mentions légales du site PulsePeak.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/legal-notices",
  },
  ...pageOpenGraph({ title, description, path: "/legal-notices" }),
};

const h2 = "mt-10 mb-3 scroll-mt-24 text-xl font-bold text-slate-900 dark:text-white";
const p = "mb-4 leading-relaxed text-slate-600 dark:text-slate-400";
const ul = "mb-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400";

const toc = [
  { id: "editeur", label: "Éditeur du site" },
  { id: "publication", label: "Directeur de la publication" },
  { id: "hebergement", label: "Hébergement" },
  { id: "propriete", label: "Propriété intellectuelle" },
  { id: "liens", label: "Liens hypertextes" },
  { id: "droit", label: "Droit applicable" },
  { id: "documents", label: "Documents complémentaires" },
];

export default function LegalNoticesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <LandingBackground />
      <Navbar />

      <section className="relative px-4 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-slate-900 md:text-5xl dark:text-white">
            Mentions légales
          </h1>
          <p className="mb-10 text-sm text-slate-500 dark:text-slate-500">Dernière mise à jour : 16 août 2026</p>

          <LegalToc items={toc} />

          <h2 id="editeur" className={h2}>1. Éditeur du site</h2>
          <p className={p}>
            Le site PulsePeak est édité par JEANPIERRE Thibault, entreprise individuelle en cours
            d&apos;immatriculation (numéro SIRET en attente d&apos;attribution), domiciliée à Saverne (67700),
            France.
          </p>
          <p className={p}>
            Contact : via le{" "}
            <a href="/contact" className="font-medium text-blue-600 hover:underline">
              formulaire de contact
            </a>
            .
          </p>

          <h2 id="publication" className={h2}>2. Directeur de la publication</h2>
          <p className={p}>JEANPIERRE Thibault.</p>

          <h2 id="hebergement" className={h2}>3. Hébergement</h2>
          <p className={p}>
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          </p>

          <h2 id="propriete" className={h2}>4. Propriété intellectuelle</h2>
          <p className={p}>
            L&apos;ensemble des éléments du site PulsePeak (textes, logo, graphismes, structure) est protégé par le
            droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans
            autorisation préalable est interdite.
          </p>

          <h2 id="liens" className={h2}>5. Liens hypertextes</h2>
          <p className={p}>
            Le site peut contenir des liens vers des sites tiers, notamment l&apos;application PulsePeak
            (app.pulsepeak.fr). L&apos;éditeur n&apos;est pas responsable du contenu de ces sites tiers.
          </p>

          <h2 id="droit" className={h2}>6. Droit applicable</h2>
          <p className={p}>
            Les présentes mentions légales sont soumises au droit français. Tout litige relève de la compétence
            des tribunaux français.
          </p>

          <h2 id="documents" className={h2}>7. Documents complémentaires</h2>
          <ul className={ul}>
            <li>
              <a href="/terms-of-use" className="font-medium text-blue-600 hover:underline">
                Conditions générales d&apos;utilisation
              </a>
            </li>
            <li>
              <a href="/terms-of-sale" className="font-medium text-blue-600 hover:underline">
                Conditions générales de vente
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="font-medium text-blue-600 hover:underline">
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

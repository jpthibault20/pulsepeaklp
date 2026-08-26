// app/cgu/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import LandingBackground from "../components/LandingBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LegalToc from "../components/LegalToc";

const title = "CGU — PulsePeak";
const description = "Conditions générales d'utilisation de PulsePeak.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terms-of-use",
  },
  ...pageOpenGraph({ title, description, path: "/terms-of-use" }),
};

const h2 = "mt-10 mb-3 scroll-mt-24 text-xl font-bold text-slate-900 dark:text-white";
const p = "mb-4 leading-relaxed text-slate-600 dark:text-slate-400";

const toc = [
  { id: "objet", label: "Objet" },
  { id: "description", label: "Description du service" },
  { id: "compte", label: "Compte utilisateur" },
  { id: "abonnement", label: "Abonnement et tarifs" },
  { id: "responsabilite", label: "Responsabilité" },
  { id: "propriete", label: "Propriété intellectuelle" },
  { id: "resiliation", label: "Résiliation" },
  { id: "modification", label: "Modification des CGU" },
  { id: "droit", label: "Droit applicable" },
];

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <LandingBackground />
      <Navbar />

      <section className="relative px-4 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-slate-900 md:text-5xl dark:text-white">
            Conditions générales d&apos;utilisation
          </h1>
          <p className="mb-10 text-sm text-slate-500 dark:text-slate-500">Dernière mise à jour : 16 août 2026</p>

          <LegalToc items={toc} />

          <h2 id="objet" className={h2}>1. Objet</h2>
          <p className={p}>
            Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès et l&apos;usage du
            site pulsepeak.fr et de l&apos;application PulsePeak (app.pulsepeak.fr), édités par JEANPIERRE Thibault
            (voir les{" "}
            <a href="/legal-notices" className="font-medium text-blue-600 hover:underline">
              mentions légales
            </a>
            ). En créant un compte ou en utilisant le service, l&apos;utilisateur accepte sans réserve les
            présentes CGU.
          </p>

          <h2 id="description" className={h2}>2. Description du service</h2>
          <p className={p}>
            PulsePeak est un service de coaching sportif (natation, vélo, course à pied, seul ou en triathlon)
            assisté par intelligence artificielle : génération de
            plans d&apos;entraînement personnalisés, analyse de performance et suivi de forme à partir des données
            fournies par l&apos;utilisateur.
          </p>
          <p className={p}>
            <strong className="text-slate-900 dark:text-white">Avertissement santé :</strong> les recommandations
            fournies par PulsePeak sont à titre informatif et ne constituent pas un avis médical. Il est
            recommandé de consulter un professionnel de santé avant de débuter ou de modifier significativement un
            programme d&apos;entraînement, notamment en cas d&apos;antécédents médicaux.
          </p>

          <h2 id="compte" className={h2}>3. Compte utilisateur</h2>
          <p className={p}>
            L&apos;accès à certaines fonctionnalités nécessite la création d&apos;un compte. L&apos;utilisateur
            s&apos;engage à fournir des informations exactes et à préserver la confidentialité de ses identifiants
            de connexion.
          </p>

          <h2 id="abonnement" className={h2}>4. Abonnement et tarifs</h2>
          <p className={p}>
            L&apos;accès complet au service est payant selon les tarifs affichés sur la{" "}
            <a href="/pricing" className="font-medium text-blue-600 hover:underline">
              page Tarifs
            </a>
            . L&apos;abonnement est renouvelé automatiquement pour la même durée, sauf résiliation par
            l&apos;utilisateur au moins 48 heures avant la date de renouvellement, directement depuis son espace
            compte.
          </p>

          <h2 id="responsabilite" className={h2}>5. Responsabilité</h2>
          <p className={p}>
            PulsePeak met tout en œuvre pour assurer la disponibilité et la fiabilité du service, sans garantir une
            disponibilité continue. L&apos;éditeur ne saurait être tenu responsable des dommages résultant d&apos;une
            interruption du service, d&apos;une perte de données ou d&apos;une utilisation inappropriée des
            recommandations fournies.
          </p>

          <h2 id="propriete" className={h2}>6. Propriété intellectuelle</h2>
          <p className={p}>
            Le service, sa technologie et son contenu restent la propriété exclusive de l&apos;éditeur. Les données
            d&apos;entraînement saisies par l&apos;utilisateur lui appartiennent.
          </p>

          <h2 id="resiliation" className={h2}>7. Résiliation</h2>
          <p className={p}>
            L&apos;utilisateur peut résilier son compte à tout moment. L&apos;éditeur se réserve le droit de
            suspendre ou de résilier un compte en cas de manquement aux présentes CGU.
          </p>

          <h2 id="modification" className={h2}>8. Modification des CGU</h2>
          <p className={p}>
            Les présentes CGU peuvent être modifiées à tout moment. Les utilisateurs seront informés de toute
            modification substantielle.
          </p>

          <h2 id="droit" className={h2}>9. Droit applicable</h2>
          <p className={p}>
            Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou leur
            exécution relève de la compétence des tribunaux français.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

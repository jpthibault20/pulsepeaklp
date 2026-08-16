// app/confidentialite/page.tsx
import type { Metadata } from "next";
import LandingBackground from "../components/LandingBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LegalToc from "../components/LegalToc";

export const metadata: Metadata = {
  title: "Politique de confidentialité — PulsePeak",
  description: "Comment PulsePeak collecte et protège vos données personnelles.",
};

const h2 = "mt-10 mb-3 scroll-mt-24 text-xl font-bold text-slate-900 dark:text-white";
const p = "mb-4 leading-relaxed text-slate-600 dark:text-slate-400";
const ul = "mb-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400";

const toc = [
  { id: "responsable", label: "Responsable du traitement" },
  { id: "donnees", label: "Données collectées" },
  { id: "finalites", label: "Finalités du traitement" },
  { id: "base-legale", label: "Base légale" },
  { id: "conservation", label: "Durée de conservation" },
  { id: "destinataires", label: "Destinataires des données" },
  { id: "cookies", label: "Cookies" },
  { id: "droits", label: "Vos droits" },
  { id: "securite", label: "Sécurité" },
];

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <LandingBackground />
      <Navbar />

      <section className="relative px-4 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-slate-900 md:text-5xl dark:text-white">
            Politique de confidentialité
          </h1>
          <p className="mb-10 text-sm text-slate-500 dark:text-slate-500">Dernière mise à jour : 16 août 2026</p>

          <LegalToc items={toc} />

          <h2 id="responsable" className={h2}>1. Responsable du traitement</h2>
          <p className={p}>
            Le responsable du traitement des données collectées sur ce site est JEANPIERRE Thibaut (voir les{" "}
            <a href="/mentions-legales" className="font-medium text-blue-600 hover:underline">
              mentions légales
            </a>
            ).
          </p>

          <h2 id="donnees" className={h2}>2. Données collectées</h2>
          <p className={p}>Sur ce site, seules les données que vous nous transmettez volontairement sont collectées :</p>
          <ul className={ul}>
            <li>Nom, email et contenu du message, via le formulaire de contact.</li>
          </ul>
          <p className={p}>
            L&apos;application PulsePeak (app.pulsepeak.fr) traite par ailleurs des données de profil et
            d&apos;entraînement (âge, poids, fréquence cardiaque, puissance, historique d&apos;activités) nécessaires
            au fonctionnement du service de coaching, dans les conditions décrites au sein de
            l&apos;application.
          </p>

          <h2 id="finalites" className={h2}>3. Finalités du traitement</h2>
          <ul className={ul}>
            <li>Répondre aux demandes envoyées via le formulaire de contact.</li>
            <li>Assurer le fonctionnement et l&apos;amélioration du service.</li>
          </ul>

          <h2 id="base-legale" className={h2}>4. Base légale</h2>
          <p className={p}>
            Le traitement repose sur l&apos;intérêt légitime de répondre aux demandes des utilisateurs et, le cas
            échéant, sur l&apos;exécution du contrat d&apos;abonnement.
          </p>

          <h2 id="conservation" className={h2}>5. Durée de conservation</h2>
          <p className={p}>
            Les messages envoyés via le formulaire de contact sont conservés le temps nécessaire au traitement de
            la demande, puis supprimés.
          </p>

          <h2 id="destinataires" className={h2}>6. Destinataires des données</h2>
          <p className={p}>
            Les données du formulaire de contact sont transmises via le prestataire d&apos;envoi d&apos;emails
            Resend, à seule fin d&apos;acheminement du message. Elles ne sont ni vendues, ni cédées à des tiers à
            des fins commerciales.
          </p>

          <h2 id="cookies" className={h2}>7. Cookies</h2>
          <p className={p}>
            Ce site n&apos;utilise pas de cookies de suivi ou publicitaires. La préférence d&apos;affichage (thème
            clair/sombre) est enregistrée localement dans votre navigateur (localStorage) et n&apos;est jamais
            transmise à un serveur.
          </p>

          <h2 id="droits" className={h2}>8. Vos droits</h2>
          <p className={p}>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit
            d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de portabilité sur vos données
            personnelles. Vous pouvez exercer ces droits en nous écrivant via le{" "}
            <a href="/contact" className="font-medium text-blue-600 hover:underline">
              formulaire de contact
            </a>
            . Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL (www.cnil.fr).
          </p>

          <h2 id="securite" className={h2}>9. Sécurité</h2>
          <p className={p}>
            Des mesures techniques raisonnables sont mises en œuvre pour protéger vos données contre tout accès,
            modification ou divulgation non autorisés.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

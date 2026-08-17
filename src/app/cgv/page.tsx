// app/cgv/page.tsx
import type { Metadata } from "next";
import LandingBackground from "../components/LandingBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LegalPlaceholder from "../components/LegalPlaceholder";
import LegalToc from "../components/LegalToc";

export const metadata: Metadata = {
  title: "CGV — PulsePeak",
  description: "Conditions générales de vente de PulsePeak.",
};

const h2 = "mt-10 mb-3 scroll-mt-24 text-xl font-bold text-slate-900 dark:text-white";
const p = "mb-4 leading-relaxed text-slate-600 dark:text-slate-400";
const ul = "mb-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400";

const toc = [
  { id: "objet", label: "Objet" },
  { id: "vendeur", label: "Identification du vendeur" },
  { id: "services", label: "Services et prix" },
  { id: "paiement", label: "Modalités de paiement" },
  { id: "duree", label: "Durée, renouvellement et résiliation" },
  { id: "retractation", label: "Droit de rétractation" },
  { id: "reclamation", label: "Réclamations" },
  { id: "responsabilite", label: "Responsabilité" },
  { id: "modification", label: "Modification des CGV" },
  { id: "droit", label: "Droit applicable" },
];

export default function CgvPage() {
  return (
    <main className="min-h-screen overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-200">
      <LandingBackground />
      <Navbar />

      <section className="relative px-4 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-black tracking-tighter text-slate-900 md:text-5xl dark:text-white">
            Conditions générales de vente
          </h1>
          <p className="mb-10 text-sm text-slate-500 dark:text-slate-500">Dernière mise à jour : 17 août 2026</p>

          <LegalToc items={toc} />

          <h2 id="objet" className={h2}>1. Objet</h2>
          <p className={p}>
            Les présentes conditions générales de vente (CGV) régissent la vente à distance des abonnements au
            service PulsePeak, proposés sur app.pulsepeak.fr, entre l&apos;éditeur (voir article 2) et tout
            consommateur ou professionnel souscrivant un abonnement (« le client »). Elles complètent les{" "}
            <a href="/cgu" className="font-medium text-blue-600 hover:underline">
              conditions générales d&apos;utilisation
            </a>{" "}
            (CGU), qui régissent l&apos;usage du service, et priment sur celles-ci pour tout ce qui concerne la
            transaction commerciale. Toute souscription implique l&apos;acceptation sans réserve des présentes CGV.
          </p>

          <h2 id="vendeur" className={h2}>2. Identification du vendeur</h2>
          <p className={p}>
            Le service PulsePeak est vendu par JEANPIERRE Thibault, dont l&apos;identité complète figure dans les{" "}
            <a href="/mentions-legales" className="font-medium text-blue-600 hover:underline">
              mentions légales
            </a>
            . Toute question relative à une commande peut être adressée via le{" "}
            <a href="/contact" className="font-medium text-blue-600 hover:underline">
              formulaire de contact
            </a>
            .
          </p>

          <h2 id="services" className={h2}>3. Services et prix</h2>
          <p className={p}>
            Les caractéristiques et tarifs des abonnements (mensuel et annuel) sont détaillés sur la{" "}
            <a href="/prix" className="font-medium text-blue-600 hover:underline">
              page Tarifs
            </a>
            , dans leur version en vigueur au moment de la souscription. Les prix affichés sont exprimés en euros,
            toutes taxes comprises (TTC) — TVA non applicable, art. 293 B du CGI (franchise en base de TVA
            applicable aux micro-entreprises). L&apos;éditeur se réserve le droit de modifier ses tarifs à tout moment ; les modifications ne
            s&apos;appliquent pas aux abonnements déjà souscrits avant leur date de renouvellement.
          </p>

          <h2 id="paiement" className={h2}>4. Modalités de paiement</h2>
          <p className={p}>
            Le paiement s&apos;effectue en ligne, par carte bancaire, via le prestataire de paiement sécurisé
            Stripe. L&apos;éditeur n&apos;a pas accès aux données bancaires du client, traitées exclusivement par ce
            prestataire. L&apos;abonnement est prélevé selon la périodicité choisie (mensuelle ou annuelle) à
            compter de la date de souscription, puis à chaque échéance de renouvellement.
          </p>

          <h2 id="duree" className={h2}>5. Durée, renouvellement et résiliation</h2>
          <p className={p}>
            L&apos;abonnement est souscrit pour la durée choisie (un mois ou un an) et renouvelé automatiquement
            pour une durée identique, sauf résiliation par le client au moins 48 heures avant la date de
            renouvellement. La résiliation s&apos;effectue directement depuis l&apos;espace compte de
            l&apos;application et prend effet à la fin de la période en cours ; aucun remboursement au prorata n&apos;est effectué
            pour la période déjà entamée, sauf exercice du droit de rétractation prévu à l&apos;article 6.
          </p>

          <h2 id="retractation" className={h2}>6. Droit de rétractation</h2>
          <p className={p}>
            Conformément à l&apos;article L221-18 du Code de la consommation, tout consommateur dispose en
            principe d&apos;un délai de 14 jours à compter de la souscription pour exercer son droit de
            rétractation, sans avoir à justifier de motif.
          </p>
          <p className={p}>
            Toutefois, PulsePeak étant un service numérique accessible immédiatement après paiement, le client est
            invité à donner, avant la validation de sa commande, son accord exprès pour un accès immédiat au
            service et à renoncer expressément à son droit de rétractation, conformément à l&apos;article
            L221-28 13° du Code de la consommation. Dans ce cas, le droit de rétractation ne peut plus être exercé
            une fois le service pleinement exécuté. En l&apos;absence d&apos;un tel accord explicite recueilli au
            moment du paiement, le délai de rétractation de 14 jours s&apos;applique pleinement.
          </p>
          <p className={p}>
            Cet accord exprès est recueilli au moyen d&apos;une case à cocher dédiée, présentée au client au
            moment du paiement sur app.pulsepeak.fr.
          </p>

          <h2 id="reclamation" className={h2}>7. Réclamations</h2>
          <p className={p}>
            Toute réclamation peut être adressée via le{" "}
            <a href="/contact" className="font-medium text-blue-600 hover:underline">
              formulaire de contact
            </a>
            . L&apos;éditeur s&apos;engage à y répondre dans un délai raisonnable.
          </p>

          <h2 id="responsabilite" className={h2}>8. Responsabilité</h2>
          <p className={p}>
            L&apos;éditeur met tout en œuvre pour assurer le bon déroulement des transactions, sans garantir une
            disponibilité continue du service de paiement ou de l&apos;application. Sa responsabilité ne saurait
            être engagée en cas d&apos;inexécution due à un cas de force majeure, à une défaillance du prestataire
            de paiement, ou à une utilisation frauduleuse des moyens de paiement par un tiers.
          </p>

          <h2 id="modification" className={h2}>9. Modification des CGV</h2>
          <p className={p}>
            Les présentes CGV peuvent être modifiées à tout moment. Les CGV applicables sont celles en vigueur à
            la date de souscription ou de renouvellement de l&apos;abonnement.
          </p>

          <h2 id="droit" className={h2}>10. Droit applicable</h2>
          <p className={p}>
            Les présentes CGV sont soumises au droit français. En cas de litige, et à défaut de résolution
            amiable ou par médiation, les tribunaux français sont seuls compétents, sous réserve des règles
            impératives de protection des consommateurs applicables.
          </p>

          <h2 id="documents" className={h2}>Documents complémentaires</h2>
          <ul className={ul}>
            <li>
              <a href="/cgu" className="font-medium text-blue-600 hover:underline">
                Conditions générales d&apos;utilisation
              </a>
            </li>
            <li>
              <a href="/mentions-legales" className="font-medium text-blue-600 hover:underline">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="/confidentialite" className="font-medium text-blue-600 hover:underline">
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

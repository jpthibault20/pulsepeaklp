// src/lib/launchOffer.ts
// Offre de lancement : souscription au mensuel à 5€ jusqu'au 31/12/2026 23h59 (heure de Paris),
// prix garanti à 5€ jusqu'au 31/12/2027 pour ces abonnés, puis 9€/mois. Les nouveaux inscrits
// à partir du 1/1/2027 ne voient plus que 9€/mois ou 90€/an.
// Les pages qui affichent ces textes déclarent `revalidate` pour basculer seules après la date.

/** 1er janvier 2027 à 00h00, heure de Paris (UTC+1 en hiver) */
const LAUNCH_OFFER_END = new Date("2027-01-01T00:00:00+01:00");

export function isLaunchOfferOpen(now: Date = new Date()): boolean {
  return now < LAUNCH_OFFER_END;
}

/** Textes de prix communs à la home, aux pages discipline et aux CTA, selon l'état de l'offre */
export function getPricingCopy(now: Date = new Date()) {
  const open = isLaunchOfferOpen(now);
  return {
    open,
    monthlyPrice: open ? "5" : "9",
    /** Suffixe des meta descriptions : "1er mois offert puis …" */
    metaPrice: open ? "dès 5€/mois" : "9€/mois",
    heroPriceLine: open
      ? "1er mois offert, sans engagement — puis dès 5€/mois jusqu'à fin 2027 si tu souscris avant le 31 décembre 2026"
      : "1er mois offert, sans engagement — puis 9€/mois ou 90€/an",
    finalCtaSubtitle: open
      ? "Le premier mois est offert, puis 5€/mois avec le tarif de lancement, garanti jusqu'au 31 décembre 2027 pour toute souscription avant le 31 décembre 2026. Sans engagement, résiliable à tout moment."
      : "Le premier mois est offert, puis 9€/mois. Sans engagement, résiliable à tout moment.",
    bannerTitle: open
      ? "1er mois offert, puis l'offre de lancement à 5€/mois jusqu'au 31 décembre 2027 pour toute souscription avant le 31 décembre 2026."
      : "1er mois offert, puis 9€/mois — ou 90€/an, soit 2 mois offerts.",
    bannerSubtitle: open
      ? "Ensuite 9€/mois. Sans engagement, résiliable à tout moment."
      : "Sans engagement, résiliable à tout moment.",
  };
}

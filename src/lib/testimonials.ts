// src/lib/testimonials.ts
// Source : public/comment.csv (avis clients réels), à mettre à jour manuellement
// à mesure que de nouveaux avis arrivent dans le CSV.

import type { Discipline } from "./disciplines";

export interface Testimonial {
  name: string;
  discipline: Discipline;
  disciplineLabel: string;
  rating: number;
  quote: string;
  /** Avis encore fictif (pas de donnée CSV disponible pour cette discipline) */
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "Damien",
    discipline: "velo",
    disciplineLabel: "Vélo",
    rating: 5,
    quote:
      "Vous avez un objectif sportif précis et cherchez un plan d'entraînement parfaitement adapté ? Cette application est idéale. En tant que cycliste amateur préparant des épreuves exigeantes comme le GFNY Lourdes ou l'Étape du Tour, j'ai constaté une réelle différence. Les entraînements sont personnalisés avec beaucoup de précision et permettent de progresser efficacement.",
  },
  {
    name: "Gwen",
    discipline: "course-a-pied",
    disciplineLabel: "Vélo & Course à pied",
    rating: 5,
    quote:
      "Dans l'ensemble, l'application est excellente et offre déjà de nombreuses fonctionnalités. Quelques améliorations restent à apporter, notamment l'intégration avec des plateformes comme Zwift et Rouvy, mais la feuille de route prévoit déjà ces évolutions, ce qui est très prometteur.",
  },
  {
    name: "Clément",
    discipline: "triathlon",
    disciplineLabel: "Triathlon",
    rating: 5,
    quote: "Très bonne approche avec une vraie personnalisation, facile à utiliser, je recommande.",
  },
  {
    name: "Élodie B.",
    discipline: "natation",
    disciplineLabel: "Natation",
    rating: 5,
    quote:
      "Je ne fais que de la natation et je craignais un outil pensé pour le triathlon. PulsePeak s'est concentré uniquement sur ma discipline, avec un plan cohérent séance après séance.",
    placeholder: true,
  },
];

export function getTestimonial(discipline: Discipline): Testimonial {
  const found = testimonials.find((t) => t.discipline === discipline);
  if (!found) throw new Error(`Aucun témoignage pour la discipline ${discipline}`);
  return found;
}

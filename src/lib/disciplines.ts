// src/lib/disciplines.ts
// Source unique de contenu par discipline : hero, section miroir, preuve, SEO.
// Réutilisée par la home (sélecteur de discipline) et les pages dédiées /velo, /course-a-pied, /triathlon, /natation.

import { Bike, Footprints, Repeat, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Discipline = "velo" | "course-a-pied" | "triathlon" | "natation";

type DisciplineBadgeColor = "blue" | "orange" | "violet" | "cyan";

export interface DisciplineConfig {
  key: Discipline;
  slug: string;
  label: string;
  icon: LucideIcon;
  color: DisciplineBadgeColor;
  badgeText: string;
  h1: string;
  subtitle: string;
  mirrorText: string;
  bridge: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  week: string[];
}

// Ordre calé sur le sondage (n=40) : vélo (72%) → course à pied (55%) →
// triathlon (la niche multisport, 15%) → natation (20%, discipline n°4).
export const disciplineOrder: Discipline[] = ["velo", "course-a-pied", "triathlon", "natation"];

export const disciplines: Record<Discipline, DisciplineConfig> = {
  velo: {
    key: "velo",
    slug: "velo",
    label: "Vélo",
    icon: Bike,
    color: "blue",
    badgeText: "Coach IA vélo",
    h1: "Un coach IA pour cyclistes qui n'ont pas le temps de tout calculer eux-mêmes.",
    subtitle:
      "Zones de puissance, charge d'entraînement, sorties longues : PulsePeak construit et ajuste votre plan vélo semaine après semaine, sans coach humain à 150€/mois.",
    mirrorText: "Vous roulez 8h/semaine, vous avez un capteur de puissance, et vous stagnez depuis un an.",
    bridge:
      "PulsePeak analyse votre charge réelle et restructure votre semaine en blocs Force / Seuil / Endurance, pour que la stagnation ne soit plus une fatalité.",
    metaTitle: "Coach IA pour cyclistes — plans vélo personnalisés | PulsePeak",
    metaDescription:
      "Un coach IA dédié au vélo : plans de puissance, sorties longues et blocs de progression adaptés à votre semaine, dès 5€/mois.",
    image: "/phoneCalendar_cycling.png",
    imageAlt: "Agenda d'entraînement vélo dans PulsePeak",
    week: [
      "Lun — Repos",
      "Mar — Seuil 1h15",
      "Jeu — Endurance 1h45",
      "Sam — Sortie longue 3h",
      "Dim — Récupération active 45 min",
    ],
  },
  "course-a-pied": {
    key: "course-a-pied",
    slug: "course-a-pied",
    label: "Course à pied",
    icon: Footprints,
    color: "orange",
    badgeText: "Coach IA course à pied",
    h1: "Un coach IA qui adapte votre plan course à pied à votre vraie semaine.",
    subtitle:
      "Fractionné, sortie longue, récupération : le plan bouge avec votre emploi du temps, pas l'inverse.",
    mirrorText:
      "Vos contraintes pro et familiales décalent la moitié de vos séances, et votre plan ne s'en aperçoit jamais.",
    bridge:
      "Une séance ratée n'est plus un échec : PulsePeak recalcule la semaine autour de vos disponibilités réelles, sans casser la progression.",
    metaTitle: "Coach IA course à pied — plans adaptés à votre semaine | PulsePeak",
    metaDescription:
      "Un coach IA qui recalcule votre plan course à pied selon vos vraies disponibilités et votre forme du moment, dès 5€/mois.",
    image: "/phoneCalendar_run.png",
    imageAlt: "Agenda d'entraînement course à pied dans PulsePeak",
    week: [
      "Lun — Repos",
      "Mar — Fractionné VMA",
      "Jeu — Endurance fondamentale 45 min",
      "Sam — Sortie longue 1h15",
      "Dim — Récupération 30 min",
    ],
  },
  triathlon: {
    key: "triathlon",
    slug: "triathlon",
    label: "Triathlon",
    icon: Repeat,
    color: "violet",
    badgeText: "Coach IA triathlon",
    h1: "Un coach IA qui répartit vélo, course à pied et natation sans que vous ayez à choisir.",
    subtitle:
      "Un seul plan pour vos trois disciplines, qui arbitre la charge entre elles selon votre forme réelle de la semaine.",
    mirrorText:
      "Vous jonglez plusieurs sports et vous ne savez jamais lequel sacrifier quand la semaine déraille.",
    bridge:
      "PulsePeak tient compte de la fatigue cumulée sur les trois disciplines pour décider quoi ajuster, plutôt que de vous laisser arbitrer seul.",
    metaTitle: "Coach IA triathlon — plans multisport personnalisés | PulsePeak",
    metaDescription:
      "Un coach IA qui répartit vélo, course à pied et natation dans un seul plan cohérent, ajusté à votre fatigue réelle, dès 5€/mois.",
    image: "/phonecalendare_run&cycling.png",
    imageAlt: "Agenda d'entraînement multisport dans PulsePeak",
    week: [
      "Lun — Natation technique",
      "Mar — Vélo seuil",
      "Jeu — CAP fractionné",
      "Sam — Brick vélo + CAP",
      "Dim — Sortie longue vélo",
    ],
  },
  natation: {
    key: "natation",
    slug: "natation",
    label: "Natation",
    icon: Waves,
    color: "cyan",
    badgeText: "Coach IA natation",
    h1: "Un coach IA pensé pour les nageurs, pas seulement pour les triathlètes.",
    subtitle:
      "Technique, endurance, séances seuil : un plan piscine complet, sans devoir vous fondre dans un plan pensé pour le vélo.",
    mirrorText: "Vous nagez seul le midi et vous refaites la même séance depuis six mois.",
    bridge:
      "PulsePeak construit votre progression natation en blocs dédiés — technique, endurance, seuil — pour sortir de la routine sans y penser.",
    metaTitle: "Coach IA natation — plans piscine personnalisés | PulsePeak",
    metaDescription:
      "Un coach IA dédié à la natation : séances technique, endurance et seuil qui évoluent avec votre progression, dès 5€/mois.",
    image: "/phoneCalendar_swim.png",
    imageAlt: "Agenda d'entraînement natation dans PulsePeak",
    week: [
      "Lun — Technique + PPG",
      "Mer — Endurance 2500m",
      "Ven — Séance seuil",
      "Dim — Sortie longue 3000m",
    ],
  },
};

export function getDiscipline(key: Discipline): DisciplineConfig {
  return disciplines[key];
}

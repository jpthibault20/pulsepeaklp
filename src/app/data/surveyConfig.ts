export const SURVEY_CONFIG = [
  {
    id: 'name',
    type: 'text',
    question: "Comment t'appelles-tu ?",
    placeholder: "Ton prénom"
  },
  {
    id: 'email',
    type: 'text', // Logique email gérée dans le input type plus bas
    question: "Sur quel email veux-tu recevoir ton accès ?",
    placeholder: "ton@email.com"
  },
  {
    id: 'features_rank',
    type: 'rank',
    question: "Classe ces fonctions par priorité pour TOI",
    // Les options par défaut avant classement
    options: [
      "App Mobile Native (iOS/Android)",
      "Planification Objectifs de Saison",
      "Analyse Historique Détaillée",
      "Connexion Directe Garmin/Wahoo",
      "Coach IA Conversationnel (Chat)"
    ]
  }
];
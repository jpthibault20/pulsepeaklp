// app/data/surveyConfig.ts

export type QuestionType = 'text' | 'choice' | 'scale';

export interface SurveyQuestion {
    id: string;
    question: string;
    type: QuestionType;
    options?: string[]; // Pour les choix multiples
    minLabel?: string;  // Pour l'échelle
    maxLabel?: string;
}

export const SURVEY_CONFIG: SurveyQuestion[] = [
    {
        id: 'role',
        question: "Quel type d'athlète êtes-vous ?",
        type: 'choice',
        options: ['Amateur passionné', 'Compétiteur régulier', 'Élite / Pro', 'Débutant absolu']
    },
    {
        id: 'goal',
        question: "Quel est votre objectif principal pour la saison prochaine ?",
        type: 'text',
    },
    {
        id: 'pain_point',
        question: "Quelle est la partie la plus difficile dans votre planification actuelle ?",
        type: 'choice',
        options: ['Adapter mon plan aux imprévus', 'Savoir si je progresse vraiment', 'Éviter le surentraînement', 'Gérer les 3 sports équitablement']
    },
    {
        id: 'interest_score',
        question: "Sur une échelle de 1 à 10, à quel point une IA adaptative vous intéresse ?",
        type: 'scale',
        minLabel: "Pas du tout",
        maxLabel: "Indispensable"
    },
    {
        id: 'email',
        question: "Laissez votre email pour être notifié du lancement (et recevoir votre invitation bêta)",
        type: 'text'
    }
];
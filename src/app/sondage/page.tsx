"use client"

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, Users } from "lucide-react";
import { SURVEY_CONFIG } from "../data/surveyConfig";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem";
import { useState } from "react";
import BackgroundEffect from "../components/BackgroundEffect";
import Link from "next/link";

type AnswerValue = string | string[];

export default function SurveyPage() {
    const [introActive, setIntroActive] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
    const [loading, setLoading] = useState(false);

    const currentQuestion = SURVEY_CONFIG[currentStep];
    const progress = ((currentStep + 1) / SURVEY_CONFIG.length) * 100;

    // --- LOGIQUE (Handlers) ---
    const handleAnswer = (value: AnswerValue) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    };
    const submitSurvey = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi');
            }

            // Si tout est bon, on affiche l'écran de succès
            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue lors de l'envoi. Réessayez.");
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Vérification de sécurité (over peut être null si on lâche l'élément hors zone)
        if (over && active.id !== over.id) {

            // On force le typage ici car on sait que pour cette question, c'est un tableau de strings
            // Si pas de réponse encore enregistrée, on prend l'ordre par défaut des options
            const currentItems = (answers[currentQuestion.id] as string[]) || (currentQuestion.options as string[]);

            const oldIndex = currentItems.indexOf(active.id as string);
            const newIndex = currentItems.indexOf(over.id as string);

            handleAnswer(arrayMove(currentItems, oldIndex, newIndex));
        }
    };

    const handleNext = () => {
        if (currentStep < SURVEY_CONFIG.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // C'est la dernière étape, on envoie !
            submitSurvey();
        }
    };

    // --- RENDU ---
    return (
        <main className="min-h-screen flex flex-col relative overflow-hidden">
            <BackgroundEffect />
            <div className="relative w-full md:absolute md:top-0 md:left-0 p-6 z-50">
                <Link
                    href="/"
                    className="inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors font-bold group"
                >
                    <ArrowLeft size={25} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>


            <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">

                {/* TITRE PRINCIPAL (Visible sauf si Submitted) */}
                {!isSubmitted && (
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                            Aidez-nous à construire <span className="text-cyan-400">le futur</span>
                        </h1>
                        <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base">
                            PulsePeak est en développement actif. Tes choix guident mon code.
                        </p>
                    </div>
                )}

                {/* --- BLOC INTRO (Le texte retravaillé) --- */}
                {introActive ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl mx-auto text-center space-y-8 p-8 md:p-10 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-4xl shadow-2xl"
                    >
                        <div className="w-16 h-16 bg-cyan-400/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                            <Users size={32} />
                        </div>

                        <h2 className="text-3xl font-black text-white">Rejoins la Core Team</h2>

                        <div className="text-slate-300 leading-relaxed text-lg space-y-4 text-left md:text-center">
                            <p>
                                J&apos;utilise déjà cette App pour mes propres entraînements. Ça marche, c&apos;est puissant.
                            </p>
                            <p>
                                Maintenant, je veux t&apos;ouvrir l&apos;accès. Mais pour sortir une V1 rapidement, <strong>je dois faire des choix drastiques.</strong>
                            </p>
                            <p className="font-medium text-white">
                                Ne me laisse pas développer des gadgets. Dis-moi ce qui est vital pour ta progression en 2 minutes chrono.
                            </p>
                        </div>

                        <button
                            onClick={() => setIntroActive(false)}
                            className="w-full py-5 bg-cyan-400 text-slate-950 font-black text-lg rounded-2xl shadow-lg shadow-cyan-400/20 hover:scale-[1.02] hover:bg-cyan-300 transition-all flex items-center justify-center gap-3"
                        >
                            C&apos;EST PARTI <ArrowRight size={22} />
                        </button>
                    </motion.div>
                ) : isSubmitted ? (
                    // --- ÉCRAN DE SUCCÈS ---
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-12 bg-slate-900/80 border border-slate-800 rounded-4xl max-w-md mx-auto shadow-2xl backdrop-blur-md"
                    >
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                            <Check size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Message Reçu !</h2>
                        <p className="text-slate-400">
                            Merci de faire partie de l&apos;aventure. Je retourne coder les fonctionnalités que tu as choisies. 🫡
                        </p>
                        <Link href="/" className="inline-block mt-8 text-cyan-400 font-bold hover:text-white transition-colors">
                            Retour à l&apos;accueil
                        </Link>
                    </motion.div>
                ) : (
                    // --- QUESTIONNAIRE ---
                    <div className="w-full max-w-2xl mx-auto px-4">
                        {/* Barre de progression */}
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mb-8 shadow-inner">
                            <motion.div
                                className="bg-cyan-400 h-1.5 rounded-full shadow-[0_0_15px_#06b6d4]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentQuestion.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="bg-slate-900/80 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl relative"
                            >
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-8 leading-tight">
                                    {currentQuestion.question}
                                </h2>

                                <div className="space-y-6">
                                    {/* --- TYPE RANK (Drag & Drop) --- */}
                                    {currentQuestion.type === 'rank' && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-xs text-cyan-400 uppercase font-bold tracking-widest mb-2">
                                                <span>⬆️ Plus important</span>
                                                <span>Moins important ⬇️</span>
                                            </div>

                                            {/* Note: Si le drag&drop ne marche pas sur mobile, il faudra ajouter la prop sensors={sensors} au DndContext */}
                                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                                <SortableContext
                                                    // On force le type en string[] car on sait qu'ici ce sont des options à classer
                                                    items={(answers[currentQuestion.id] as string[]) || (currentQuestion.options as string[]) || []}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    {/* On répète la logique pour la boucle map */}
                                                    {((answers[currentQuestion.id] as string[]) || (currentQuestion.options as string[]) || []).map((item) => (
                                                        <SortableItem key={item} id={item} value={item} />
                                                    ))}
                                                </SortableContext>
                                            </DndContext>

                                        </div>
                                    )}

                                    {/* --- TYPE TEXT --- */}
                                    {currentQuestion.type === 'text' && (
                                        <input
                                            type={currentQuestion.id === 'email' ? 'email' : 'text'}
                                            className="w-full bg-slate-950 border-2 border-slate-800 text-white p-6 rounded-2xl focus:border-cyan-400 outline-none transition-all text-xl font-medium placeholder:text-slate-600"
                                            placeholder={currentQuestion.placeholder || "Écrivez ici..."}
                                            value={answers[currentQuestion.id] || ''}
                                            onChange={(e) => handleAnswer(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                            autoFocus
                                        />
                                    )}
                                </div>

                                {/* Navigation Boutons */}
                                <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-6">
                                    <button
                                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                                        disabled={currentStep === 0}
                                        className={`flex items-center font-bold text-slate-500 hover:text-white transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                    >
                                        <ChevronLeft size={20} className="mr-2" /> PRÉCÉDENT
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        disabled={loading || (currentQuestion.type === 'text' && !answers[currentQuestion.id])}
                                        className="w-full md:w-auto bg-cyan-400 hover:bg-white text-slate-950 font-black py-5 px-12 rounded-2xl shadow-[0_15px_30px_rgba(34,211,238,0.3)] hover:shadow-[0_20px_40px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-20 disabled:cursor-not-allowed transform hover:-translate-y-1"
                                    >
                                        {loading ? 'ENREGISTREMENT...' : (currentStep === SURVEY_CONFIG.length - 1 ? 'TERMINER' : 'SUIVANT')}
                                        {!loading && <ArrowRight size={24} />}
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </main>
    );
}
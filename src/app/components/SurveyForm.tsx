/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/SurveyForm.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SURVEY_CONFIG } from '../data/surveyConfig';
import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SurveyForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const currentQuestion = SURVEY_CONFIG[currentStep];
    const progress = ((currentStep) / SURVEY_CONFIG.length) * 100;

    const handleAnswer = (value: any) => {
        setAnswers({ ...answers, [currentQuestion.id]: value });
    };

    const handleNext = async () => {
        if (currentStep < SURVEY_CONFIG.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            await submitSurvey();
        }
    };

    const submitSurvey = async () => {
        setLoading(true);
        // C'est ici que tu brancheras ton appel API vers Resend
        console.log("Données à envoyer :", answers);

        // Simulation d'attente
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="text-center p-8 bg-surface border border-slate-800 rounded-2xl max-w-md mx-auto mt-10">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Merci !</h2>
                <p className="text-slate-400">Vos réponses ont bien été enregistrées. Nous vous tiendrons informé du lancement de PulsePeak.</p>
                <Link href="/" className="inline-block mt-6 text-primary hover:underline">Retour à l&apos;accueil</Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            {/* Barre de progression */}
            <div className="w-full bg-slate-800 h-1 rounded-full mb-8">
                <motion.div
                    className="bg-primary h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-surface border border-slate-800 p-6 md:p-10 rounded-2xl shadow-2xl"
                >
                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-4">
                        {/* Input Texte */}
                        {currentQuestion.type === 'text' && (
                            <input
                                type={currentQuestion.id === 'email' ? 'email' : 'text'}
                                className="w-full bg-slate-900 border border-slate-700 text-white p-4 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Votre réponse..."
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswer(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                autoFocus
                            />
                        )}

                        {/* Choix Multiples */}
                        {currentQuestion.type === 'choice' && (
                            <div className="grid gap-3">
                                {currentQuestion.options?.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            handleAnswer(option);
                                            // Petit délai pour l'UX avant de passer à la suite
                                            setTimeout(() => {
                                                if (currentStep < SURVEY_CONFIG.length - 1) setCurrentStep(s => s + 1);
                                            }, 200);
                                        }}
                                        className={`p-4 text-left rounded-lg border transition-all ${answers[currentQuestion.id] === option
                                            ? 'bg-primary/20 border-primary text-primary'
                                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Échelle 1-10 */}
                        {currentQuestion.type === 'scale' && (
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between text-xs text-slate-400 uppercase tracking-wider">
                                    <span>{currentQuestion.minLabel}</span>
                                    <span>{currentQuestion.maxLabel}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={answers[currentQuestion.id] || 5}
                                    onChange={(e) => handleAnswer(e.target.value)}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="text-center text-primary font-bold text-xl">
                                    {answers[currentQuestion.id] || 5} / 10
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                            disabled={currentStep === 0}
                            className={`flex items-center text-sm text-slate-500 hover:text-white transition-colors ${currentStep === 0 ? 'opacity-0' : 'opacity-100'}`}
                        >
                            <ChevronLeft size={16} className="mr-1" /> Précédent
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={loading || (currentQuestion.type === 'text' && !answers[currentQuestion.id])}
                            className="
    w-full md:w-auto
    bg-cyan-400 hover:bg-white text-slate-950
    font-black py-5 px-12 rounded-2xl
    shadow-[0_20px_40px_rgba(34,211,238,0.3)]
    border-b-4 border-cyan-600 active:border-b-0 active:translate-y-1
    transition-all duration-150
    flex items-center justify-center gap-3
    disabled:bg-slate-800 disabled:text-slate-600 disabled:border-none disabled:shadow-none
  "
                        >
                            {loading ? 'ENVOI EN COURS...' : (currentStep === SURVEY_CONFIG.length - 1 ? 'TERMINER' : 'SUIVANT')}
                            {!loading && <ArrowRight size={24} />}
                        </button>
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SURVEY_CONFIG } from '../data/surveyConfig';
import { ArrowRight, Check, ChevronLeft, GripVertical, Info } from 'lucide-react';
import Link from 'next/link';

// Imports pour le Drag & Drop
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Sous-composant pour un item draggable ---
function SortableItem({ id, value }: { id: string, value: string }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-3 p-4 mb-2 bg-slate-900 border ${isDragging ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-slate-700'} rounded-xl touch-none`}
        >
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-slate-500 hover:text-cyan-400">
                <GripVertical size={20} />
            </div>
            <span className="text-white font-medium">{value}</span>
        </div>
    );
}

// --- COMPOSANT PRINCIPAL ---
export default function SurveyForm() {
    const [introActive, setIntroActive] = useState(true); // État pour l'introduction
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Configuration des capteurs pour le Drag & Drop (Souris + Tactile)
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const currentQuestion = SURVEY_CONFIG[currentStep];
    const progress = introActive ? 0 : ((currentStep + 1) / SURVEY_CONFIG.length) * 100;

    const handleAnswer = (value: any) => {
        setAnswers({ ...answers, [currentQuestion.id]: value });
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldItems = answers[currentQuestion.id] || currentQuestion.options;
            const oldIndex = oldItems.indexOf(active.id);
            const newIndex = oldItems.indexOf(over.id);
            const newOrder = arrayMove(oldItems, oldIndex, newIndex);
            handleAnswer(newOrder);
        }
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
        console.log("Données finales :", answers);
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    // --- Rendu Introduction ---
    if (introActive) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto text-center space-y-8 p-6 md:p-10 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-4xl shadow-2xl"
            >
                <div className="w-16 h-16 bg-cyan-400/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/20">
                    <Info size={32} />
                </div>
                <h1 className="text-3xl font-black text-white">Contribuez à PulsePeak</h1>
                <p className="text-slate-400 leading-relaxed text-lg">
                    Nous construisons le futur du triathlon. Vos réponses nous permettent de calibrer notre IA pour qu&apos;elle réponde parfaitement à vos besoins réels sur le terrain.
                    <br /><br />
                    <span className="text-sm italic">Temps estimé : 2 minutes</span>
                </p>
                <button
                    onClick={() => setIntroActive(false)}
                    className="w-full py-5 bg-cyan-400 text-slate-950 font-black rounded-2xl shadow-lg shadow-cyan-400/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                >
                    DÉMARRER LE QUESTIONNAIRE <ArrowRight size={20} />
                </button>
            </motion.div>
        );
    }

    // --- Rendu Succès ---
    if (isSubmitted) {
        return (
            <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-4xl max-w-md mx-auto shadow-2xl">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Parfait !</h2>
                <p className="text-slate-400">Merci d&apos;aider PulsePeak à devenir l&apos;outil ultime des triathlètes.</p>
                <Link href="/" className="inline-block mt-8 text-cyan-400 font-bold hover:text-white transition-colors">Retour à l&apos;accueil</Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            {/* Barre de progression avec effet Glow */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mb-12 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                <motion.div
                    className="bg-cyan-400 h-1.5 rounded-full shadow-[0_0_15px_#06b6d4]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="bg-slate-900/80 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl relative"
                >
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-8 leading-tight">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-6">
                        {/* --- TYPE RANK (Drag & Drop) --- */}
                        {currentQuestion.type === 'rank' && (
                            <div className="space-y-4">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-4 italic">
                                    Glissez pour classer par importance (Haut = Prioritaire)
                                </p>
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={answers[currentQuestion.id] || currentQuestion.options || []} strategy={verticalListSortingStrategy}>
                                        {(answers[currentQuestion.id] || currentQuestion.options)?.map((item: string) => (
                                            <SortableItem key={item} id={item} value={item} />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </div>
                        )}

                        {/* --- TYPE CHOICE --- */}
                        {currentQuestion.type === 'choice' && (
                            <div className="grid gap-4">
                                {currentQuestion.options?.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            handleAnswer(option);
                                            setTimeout(() => handleNext(), 250);
                                        }}
                                        className={`p-5 text-left rounded-2xl border-2 transition-all font-bold ${answers[currentQuestion.id] === option
                                            ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400'
                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* --- TYPE TEXT --- */}
                        {currentQuestion.type === 'text' && (
                            <input
                                type={currentQuestion.id === 'email' ? 'email' : 'text'}
                                className="w-full bg-slate-950 border-2 border-slate-800 text-white p-6 rounded-2xl focus:border-cyan-400 outline-none transition-all text-lg font-medium"
                                placeholder="Écrivez ici..."
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswer(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                autoFocus
                            />
                        )}
                    </div>

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
                            className="w-full md:w-auto bg-cyan-400 hover:bg-white text-slate-950 font-black py-5 px-12 rounded-2xl shadow-[0_15px_30px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-20"
                        >
                            {loading ? 'ENVOI...' : (currentStep === SURVEY_CONFIG.length - 1 ? 'TERMINER' : 'SUIVANT')}
                            {!loading && <ArrowRight size={24} />}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
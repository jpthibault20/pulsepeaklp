// app/components/BackgroundEffect.tsx
"use client";

import { useMemo } from 'react';

// 1. On définit la structure en dehors pour la clarté
interface Particle {
    id: number;
    left: string;
    top: string;
    delay: string;
    duration: string;
    opacity: number;
}

// 2. Fonction de génération pure (hors composant)
const generateParticles = (count: number): Particle[] => {
    return [...Array(count)].map((_, i) => ({
        id: i,
        left: `${(i * 7.7) % 100}%`, // Utilisation d'un algo déterministe simple
        top: `${(i * 13.3) % 100}%`,  // pour éviter Math.random() si on veut être 100% pur
        delay: `${(i * 0.5) % 15}s`,
        duration: `${10 + (i % 10)}s`,
        opacity: 0.1 + (i % 5) * 0.1,
    }));
};

export default function BackgroundEffect() {
    // 3. useMemo garantit que la valeur est calculée une seule fois
    // et reste stable sans déclencher de "cascading renders"
    const particles = useMemo(() => generateParticles(25), []);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-[#020617]">
            {/* Grille de perspective (Effet de sol) */}
            <div className="absolute bottom-0 left-0 right-0 h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-grid-perspective animate-grid-run origin-bottom opacity-30"
                    style={{ transform: 'perspective(500px) rotateX(25deg)' }}
                />
            </div>

            {/* Glow Central (IA Pulse) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />

            {/* Particules de Data */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-data-float"
                        style={{
                            left: p.left,
                            top: p.top,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                            opacity: p.opacity,
                        }}
                    />
                ))}
            </div>

            {/* Balayage de lumière horizontal */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
                <div className="absolute top-3/4 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-600 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
            </div>

            {/* Vignettage pour focus central */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_10%,rgba(2,6,23,0.8)_100%)]" />
        </div>
    );
}
// app/sondage/page.tsx
import SurveyForm from '../components/SurveyForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SurveyPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <div className="p-6">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Retour
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Aidez-nous à construire le futur</h1>
                    <p className="text-slate-400 max-w-md mx-auto">
                        PulsePeak est en développement actif. Vos réponses orientent directement nos fonctionnalités prioritaires.
                    </p>
                </div>

                <SurveyForm />
            </div>
        </main>
    );
}
// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Brain, Heart, Zap, ArrowRight, Users, Target, BrainCircuit } from 'lucide-react'; // Ajout de nouvelles icônes
import BackgroundEffect from './components/BackgroundEffect';

export default function Home() {
  return (
    <main className="min-h-screen  text-slate-200 overflow-x-hidden selection:bg-primary selection:text-black">
      <BackgroundEffect />
      {/* Navbar simplifiée */}
      <nav className="fixed top-0 w-full z-50  backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logoWhite.png"
              alt="PulsePeak Logo"
              width={100}
              height={100}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-black"
            />
            {/* <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-black">P</div> */}
            <span className="font-bold text-xl tracking-tight text-white">PulsePeak</span>
          </div>
          <Link
            href="/sondage"
            className="
    relative px-6 py-2 
    bg-cyan-400 text-slate-950 
    text-sm font-black uppercase tracking-tight 
    rounded-full border-b-2 border-cyan-600
    shadow-[0_0_15px_rgba(34,211,238,0.4)] 
    hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] 
    hover:bg-white hover:scale-105
    transition-all duration-200 active:translate-y-0.5 active:border-b-0
  "
          >
            Contribuer
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge animé */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8 animate-bounce">
            <Zap size={14} /> L&apos;IA qui vit votre entraînement
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            PULSE<span className="text-cyan-400">PEAK</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Le premier coach IA pour triathlètes qui ne dort jamais. <span className="text-white">Adaptatif. Radical. Performant.</span>
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/sondage" className="group relative px-10 py-5 bg-cyan-400 text-slate-950 font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.7)] transition-all border-b-4 border-cyan-600 active:border-b-0 active:translate-y-1 flex items-center gap-3">
              PARTICIPER AU DÉVELOPPEMENT
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 'Vision des fondateurs' */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Carte Vision (Large) */}
          <div className="md:col-span-2 p-10 rounded-4xl bg-slate-900/40 border border-white/5 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <Target className="text-cyan-400" size={40} />
              <h2 className="text-3xl font-bold text-white">Notre Vision</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                &quot;Nous avons créé PulsePeak parce que les plans d&apos;entraînement statiques sont les ennemis de la progression. Nous voulons offrir à chaque amateur la précision d&apos;un coach pro, boostée par une IA capable d&apos;analyser chaque battement de cœur.&quot;
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
              <div className="flex -space-x-4">
                <Image
                  src="/Profile.png"
                  alt="Photo Fondateur 1"
                  width={100}
                  height={100}
                  className="w-16 h-16 rounded-full border-2 border-background bg-slate-800"
                />
                {/* <div className="w-12 h-12 rounded-full border-2 border-[#050A14] bg-slate-800" /> Photo Fondateur 1 */}
                {/* <div className="w-12 h-12 rounded-full border-2 border-[#050A14] bg-slate-800" /> Photo Fondateur 2 */}
              </div>
              <p className="text-sm font-bold text-white">JEANPIERRE Thibaut, <span className="text-cyan-400">Fondateurs</span></p>
            </div>
          </div>

          {/* Carte "Pas juste de la tech" */}
          <div className="p-10 rounded-4xl bg-linear-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 backdrop-blur-md">
            {/* Changement d'icône pour évoquer l'intelligence et la conception */}
            <BrainCircuit className="text-cyan-400 mb-6" size={40} />

            <h3 className="text-2xl font-bold text-white mb-4">Pensée pour le Terrain</h3>

            <p className="text-slate-300">
              L&apos;IA calcule, mais l&apos;expérience guide. L&apos;application est calibrée sur la réalité du sport : gérer la fatigue, les imprévus et la &quot;vraie vie&quot;, pas juste des chiffres.
            </p>
          </div>
        </div>
      </section>


      {/* Section Présentation Détaillée - Mise en avant de l'IA et de l'humain */}
      <section className="py-24 px-4 bg-linear-to-b from-surface to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Le coaching, réinventé.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              PulsePeak ne se contente pas de générer un plan. Il vit l&apos;entraînement avec vous.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pilier 1 : Ultra-Adaptatif */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">L&apos;IA qui vous connaît</h3>
              <p className="text-slate-400 leading-relaxed">
                Une réunion qui finit tard ? Une mauvaise nuit ? L&apos;IA recalcule instantanément votre semaine pour optimiser votre récupération sans sacrifier vos objectifs. Fini le stress de ne pas suivre le plan.
              </p>
            </div>

            {/* Pilier 2 : Pour Tous les Niveaux */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-secondary/50 transition-colors group">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-black transition-all">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Du Débutant à l&apos;Élite</h3>
              <p className="text-slate-400 leading-relaxed">
                Que vous prépariez votre premier S ou un format XXL, l&apos;algorithme ajuste la charge (TSS) et l&apos;intensité en fonction de votre historique réel, de vos zones de puissance/FC et de vos ambitions.
              </p>
            </div>

            {/* Pilier 3 : La Méthodologie */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/50 transition-colors group">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">L&apos;Art du Cycle</h3>
              <p className="text-slate-400 leading-relaxed">
                Fini la routine. L&apos;IA structure votre saison en blocs thématiques (Force, Seuil, Endurance critique) pour garantir une progression constante et éviter la stagnation. Une approche scientifique et éprouvée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Visuels (Screenshots + Vélos) */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-3">L&apos;Expérience PulsePeak</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Visualisez votre succès.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Une interface intuitive pour un suivi précis et une motivation constante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image de l'App - Calendrier */}
            <div className="relative group p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image src="/screen_calendar.png" alt="Agenda PulsePeak" width={800} height={500} className="object-cover" />
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">Votre saison, optimisée jour après jour.</p>
            </div>

            {/* Image de Vélo (pour l'aspect sportif et non trop tech) */}
            <div className="relative group p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden -rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image src="/Screen_IA.png" alt="L&apos;IA au service de votre passion." width={800} height={500} className="object-cover" />
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">L&apos;IA au service de votre passion.</p>
            </div>

            {/* Image de l'App - Profil */}
            <div className="relative group p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 col-span-full md:col-span-1">
              <div className="absolute inset-0 bg-linear-to-r from-secondary/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image src="/screen_profile.png" alt="Profil Athlète PulsePeak" width={800} height={500} className="object-cover" />
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">Votre profil, vos données, votre évolution.</p>
            </div>

            {/* Image de l'App - Stats / Mobile */}
            <div className="relative group p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 col-span-full md:col-span-1">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image src="/Screen_stats.png" alt="Statistiques de performance" width={800} height={500} className="object-cover" />
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">Chaque donnée compte pour votre progression.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-20 px-4 text-center bg-linear-to-t from-background to-surface">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Prêt à transformer votre entraînement ?
          </h2>
          <p className="text-lg md:text-xl text-slate-400">
            Rejoignez la communauté PulsePeak et participez à la construction du futur du coaching Triathlon. Votre avis est précieux.
          </p>
          <Link
            href="/sondage"
            className="group relative w-full md:w-auto px-10 py-5 bg-cyan-400 text-slate-950 font-black text-xl rounded-2xl 
                   transition-all duration-300 transform hover:scale-105 active:scale-95
                   shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.7)]
                   border-b-4 border-cyan-600 flex items-center justify-center gap-3"
          >
            <span className="relative z-10">Participer au sondage maintenant</span>
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5 bg-background">
        <p>© 2026 PulsePeak. L&apos;IA au service de votre passion pour le Triathlon.</p>
      </footer>
    </main>
  );
}
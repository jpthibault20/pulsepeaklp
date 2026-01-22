// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Activity, BarChart3, Calendar, Lock, Check, Brain, Heart, Bike } from 'lucide-react'; // Ajout de nouvelles icônes

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-slate-200 overflow-x-hidden selection:bg-primary selection:text-black">

      {/* Navbar simplifiée */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-black">P</div>
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
      <section className="relative pt-32 pb-20 px-4 md:pt-48 md:pb-32 text-center overflow-visible">
        {/* Halo lumineux en arrière-plan pour détacher les boutons du fond sombre */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-bold tracking-wider uppercase mb-4">
            🚀 Révolutionnez votre entraînement Triathlon
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Votre Coach Triathlon <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-blue-500">
              Sur-Mesure & Intelligent.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-medium">
            L&apos;IA qui transforme votre potentiel en performance. <span className="text-white">Adaptez-vous, progressez, excellez.</span>
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">

            {/* Bouton Sondage (L'action principale - ULTRA VISIBLE) */}
            <Link
              href="/sondage"
              className="group relative w-full md:w-auto px-10 py-5 bg-cyan-400 text-slate-950 font-black text-xl rounded-2xl 
                   transition-all duration-300 transform hover:scale-105 active:scale-95
                   shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.7)]
                   border-b-4 border-cyan-600 flex items-center justify-center gap-3"
            >
              <span className="relative z-10">PARTICIPER AU DÉVELOPPEMENT</span>
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Bouton App (L'action secondaire - SOBRE) */}
            <div className="group relative w-full md:w-auto">
              <button
                disabled
                className="w-full md:w-auto px-8 py-5 bg-slate-900/80 text-slate-500 rounded-2xl font-bold border-2 border-slate-800 
                     flex items-center justify-center gap-2 cursor-not-allowed backdrop-blur-sm"
              >
                <Lock size={20} />
                Accéder à l&apos;App
              </button>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] md:text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700 shadow-xl">
                L&apos;aventure commence bientôt ! 🕒
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 'Vision des fondateurs' */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-3">Notre Philosophie</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">
            La Révolution de l&apos;Entraînement Personnel
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            &quot;En tant que passionnés de triathlon, nous avons été frustrés par les plans d&apos;entraînement génériques.
            C&apos;est pourquoi nous avons créé PulsePeak : pour offrir à chaque athlète, quel que soit son niveau,
            un coaching intelligent qui s&apos;adapte réellement à sa vie, pas l&apos;inverse.&quot;
          </p>
          {/* Photos des fondateurs - à remplacer par tes images */}
          <div className="flex justify-center gap-8 md:gap-16 items-center flex-wrap">
            <div className="text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary/50 shadow-lg">
                <Image
                  src="/images/jeanpierre.jpg" // Remplace par ta photo
                  alt="Jean-Pierre, Co-fondateur"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-white text-lg font-semibold">Jean-Pierre</h3>
              <p className="text-slate-500 text-sm">Co-fondateur & CTO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden mx-auto mb-4 border-2 border-secondary/50 shadow-lg">
                <Image
                  src="/images/thibaut.jpg" // Remplace par ta photo
                  alt="Thibaut, Co-fondateur"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-white text-lg font-semibold">Thibaut</h3>
              <p className="text-slate-500 text-sm">Co-fondateur & CEO</p>
            </div>
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
                {/* Remplacer src par le chemin réel de tes images uploadées dans /public */}
                {/* <Image src="/images/agenda.png" alt="Agenda PulsePeak" width={800} height={500} className="object-cover" /> */}
                <div className="aspect-16/10 bg-slate-800 flex items-center justify-center text-slate-500">
                  <span className="text-sm">Image 1: Agenda PulsePeak</span>
                </div>
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">Votre saison, optimisée jour après jour.</p>
            </div>

            {/* Image de Vélo (pour l'aspect sportif et non trop tech) */}
            <div className="relative group p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden -rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* <Image src="/images/velo-triathlon.jpg" alt="Vélo de triathlon en action" width={800} height={500} className="object-cover" /> */}
                <div className="aspect-16/10 bg-slate-800 flex items-center justify-center text-slate-500">
                  <span className="text-sm">Image 2: Vélo de Triathlon</span>
                </div>
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">La passion du deux-roues, au service de vos objectifs.</p>
            </div>

            {/* Image de l'App - Profil */}
            <div className="relative group p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 col-span-full md:col-span-1">
              <div className="absolute inset-0 bg-linear-to-r from-secondary/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* <Image src="/images/profil.png" alt="Profil Athlète PulsePeak" width={800} height={500} className="object-cover" /> */}
                <div className="aspect-16/10 bg-slate-800 flex items-center justify-center text-slate-500">
                  <span className="text-sm">Image 3: Profil Athlète PulsePeak</span>
                </div>
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">Votre profil, vos données, votre évolution.</p>
            </div>

            {/* Image de l'App - Stats / Mobile */}
            <div className="relative group p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 col-span-full md:col-span-1">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden -rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* <Image src="/images/stats.png" alt="Statistiques de performance" width={800} height={500} className="object-cover" /> */}
                <div className="aspect-16/10 bg-slate-800 flex items-center justify-center text-slate-500">
                  <span className="text-sm">Image 4: Stats de Performance</span>
                </div>
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
// app/components/ProductFilm.tsx
"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, Clapperboard, Play } from "lucide-react";
import { track } from "@vercel/analytics";
import Badge from "./Badge";
import PrimaryButton from "./PrimaryButton";

/*
 * Section « film » de la landing.
 *
 * Performance :
 * - Le poster est un <picture> rendu côté serveur (AVIF → WebP → JPG). Le bon
 *   format (16:9 / 9:16) est choisi par le navigateur via `media`, sans JS : zéro
 *   CLS, poster visible dès le HTML.
 * - Le <video> n'est monté qu'à l'approche du viewport (IntersectionObserver) et
 *   avec preload="none" : aucun octet vidéo n'est téléchargé avant le clic.
 * - Une seule déclinaison est montée (9:16 sur mobile portrait < 768 px, 16:9
 *   sinon), choisie côté client avant tout chargement : jamais les deux.
 *
 * Le son fait partie de l'expérience : pas d'autoplay, lecture AVEC le son au
 * clic (le play() est appelé dans le handler pour conserver le geste utilisateur,
 * indispensable sur iOS Safari).
 */

/** Même requête que les variantes Tailwind `max-md:portrait:` utilisées plus bas. */
const PORTRAIT_QUERY = "(max-width: 767px) and (orientation: portrait)";

type Format = "portrait" | "landscape";

const SOURCES: Record<Format, { webm: string; mp4: string }> = {
  landscape: {
    webm: "/video/pulsepeak-film-16x9.webm",
    mp4: "/video/pulsepeak-film-16x9.mp4",
  },
  portrait: {
    webm: "/video/pulsepeak-film-9x16.webm",
    mp4: "/video/pulsepeak-film-9x16.mp4",
  },
};

const POSTERS = {
  landscape: "/video/pulsepeak-film-16x9-poster",
  portrait: "/video/pulsepeak-film-9x16-poster",
} as const;

const FILM_LABEL = "Film de présentation PulsePeak, 60 secondes, avec musique";

function subscribeFormat(callback: () => void) {
  const mql = window.matchMedia(PORTRAIT_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFormatSnapshot(): Format {
  return window.matchMedia(PORTRAIT_QUERY).matches ? "portrait" : "landscape";
}

function getFormatServerSnapshot(): Format | null {
  // Inconnu côté serveur : la vidéo n'est de toute façon jamais rendue en SSR.
  return null;
}

export default function ProductFilm() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const liveFormat = useSyncExternalStore(subscribeFormat, getFormatSnapshot, getFormatServerSnapshot);
  const [isNear, setIsNear] = useState(false);
  const [started, setStarted] = useState(false);
  // Le poster <picture> reste affiché jusqu'à la première image décodée.
  const [hasFrame, setHasFrame] = useState(false);
  // Une fois la lecture lancée, on fige le format : une rotation d'écran ne doit
  // pas recharger l'autre fichier en pleine lecture.
  const [lockedFormat, setLockedFormat] = useState<Format | null>(null);
  const format = lockedFormat ?? liveFormat;

  // Monte le <video> (toujours en preload="none") à l'approche du viewport.
  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video || !format) return;
    setLockedFormat(format);
    setStarted(true);
    // Le bouton disparaît : on garde le focus clavier sur le lecteur.
    video.focus();
    // Appel synchrone dans le handler de clic : lecture avec le son autorisée.
    video.muted = false;
    const playing = video.play();
    playing?.catch(() => {
      // Lecture refusée (politique navigateur, réseau…) : on retire le poster
      // pour exposer les contrôles natifs et permettre une relance manuelle.
      setHasFrame(true);
    });
    try {
      track("film_play", { format });
    } catch {
      // Le suivi ne doit jamais bloquer la lecture.
    }
  };

  const sources = format ? SOURCES[format] : null;

  return (
    <section id="film" aria-labelledby="film-title" className="scroll-mt-20 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge text="Le film" icon={Clapperboard} color="blue" className="mb-6" />
          <h2
            id="film-title"
            className="mx-auto mb-6 max-w-3xl text-3xl font-bold text-slate-900 md:text-5xl dark:text-white"
          >
            {"60 secondes pour voir ton plan s'adapter à ta vraie semaine."}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {"Une séance sautée, une journée chargée, des jambes lourdes : regarde PulsePeak recalculer la suite au lieu de te laisser courir après le plan."}
          </p>
        </div>

        {/* Cadre de la vidéo : ratio réservé en CSS (pas de CLS), 9:16 sur mobile portrait. */}
        <div
          ref={frameRef}
          className="relative mx-auto w-full rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-xl shadow-slate-900/10 backdrop-blur-md max-md:portrait:max-w-[calc(78svh*9/16)] md:rounded-3xl md:p-3 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-black/30"
        >
          {/* Halo d'ambiance, cohérent avec PhoneMockup */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[90px] dark:bg-blue-500/15"
          />

          <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100 max-md:portrait:aspect-[9/16] md:rounded-2xl dark:bg-slate-950">
            {isNear && sources && (
              <video
                key={format}
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                preload="none"
                playsInline
                controls={started}
                aria-label={FILM_LABEL}
                aria-describedby="film-description"
                onPlaying={() => setHasFrame(true)}
              >
                <source src={sources.webm} type='video/webm; codecs="vp9, opus"' />
                <source src={sources.mp4} type="video/mp4" />
                {"Ton navigateur ne lit pas la vidéo. "}
                <a href={sources.mp4}>Télécharger le film (MP4)</a>
              </video>
            )}

            {/* Poster SSR : le navigateur choisit format et codec image seul. Pas
                d'attribut `poster` sur <video> pour ne pas télécharger l'image deux fois. */}
            {!hasFrame && (
              <picture>
                <source media={PORTRAIT_QUERY} type="image/avif" srcSet={`${POSTERS.portrait}.avif`} />
                <source media={PORTRAIT_QUERY} type="image/webp" srcSet={`${POSTERS.portrait}.webp`} />
                <source media={PORTRAIT_QUERY} srcSet={`${POSTERS.portrait}.jpg`} />
                <source type="image/avif" srcSet={`${POSTERS.landscape}.avif`} />
                <source type="image/webp" srcSet={`${POSTERS.landscape}.webp`} />
                <img
                  src={`${POSTERS.landscape}.jpg`}
                  alt="Aperçu du film de présentation PulsePeak"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={900}
                />
              </picture>
            )}

            {!started && (
              <button
                type="button"
                onClick={handlePlay}
                disabled={!isNear || !sources}
                aria-label="Lancer le film de présentation PulsePeak (60 secondes, avec le son)"
                className="group absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-colors hover:bg-slate-900/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-500 disabled:cursor-wait dark:hover:bg-slate-950/20"
              >
                <span className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
                  {/* Pulsation douce, coupée si prefers-reduced-motion */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-blue-600/30 motion-safe:animate-ping motion-safe:[animation-duration:2.4s]"
                  />
                  <span className="relative flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-900/30 ring-4 ring-white/70 transition-transform motion-safe:group-hover:scale-105 motion-safe:group-active:scale-95 dark:ring-slate-900/70">
                    <Play aria-hidden="true" className="ml-1 h-8 w-8 fill-current md:h-10 md:w-10" />
                  </span>
                </span>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur md:bottom-5 md:text-sm dark:bg-slate-900/90 dark:text-slate-200">
                  {"1 min · avec le son"}
                </span>
              </button>
            )}
          </div>
        </div>

        <p id="film-description" className="sr-only">
          {
            "Le film montre une semaine qui déraille : une séance de vélo prévue mardi à 19 h devient impossible. Avec un plan figé, tu rattrapes, puis tu casses. Avec PulsePeak, tu indiques tes disponibilités et ton état du jour en une phrase, et l'IA génère une semaine construite autour de toi, où chaque séance a une raison. Les séances sont synchronisées depuis Strava ; si une sortie est plus dure que prévu, le coach ajuste la suite. Le plan est structuré bloc par bloc jusqu'à l'affûtage de ton objectif, avec le suivi de ta forme, de ta fatigue et de ta fraîcheur, et un coach IA disponible pour tes questions. Le plan bouge, toi, tu avances."
          }
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <PrimaryButton
            text="Essaie PulsePeak gratuitement"
            href="https://app.pulsepeak.fr"
            icon={ArrowRight}
            size="lg"
          />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {"1er mois offert, sans engagement."}
          </p>
        </div>
      </div>
    </section>
  );
}

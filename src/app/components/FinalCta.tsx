// app/components/FinalCta.tsx
import { ArrowRight } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

interface Props {
  title?: string;
  subtitle?: string;
}

export default function FinalCta({
  title = "Prêt à transformer votre entraînement ?",
  subtitle = "Profitez du tarif de lancement à 5€/mois jusqu'au 31 décembre 2026 et donnez un coach IA à votre entraînement.",
}: Props) {
  return (
    <section className="px-4 py-20 text-center">
      <div className="mx-auto max-w-3xl space-y-8 rounded-2xl bg-blue-600 px-6 py-16 shadow-lg shadow-blue-900/20 md:px-16">
        <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">{title}</h2>
        <p className="text-lg text-blue-100 md:text-xl">{subtitle}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton
            text="Essayer PulsePeak"
            href="https://app.pulsepeak.fr"
            icon={ArrowRight}
            variant="secondary"
            size="lg"
          />
          <PrimaryButton text="Voir les tarifs" href="/pricing" variant="outline-light" size="lg" />
        </div>
      </div>
    </section>
  );
}

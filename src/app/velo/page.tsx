// app/velo/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { getDiscipline, getMetaDescription } from "@/lib/disciplines";
import DisciplineLandingPage from "../components/DisciplineLandingPage";

// Revalidation horaire : bascule des prix à la fin de l'offre de lancement
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const config = getDiscipline("velo");
  const description = getMetaDescription(config);
  return {
    title: config.metaTitle,
    description,
    alternates: {
      canonical: "/velo",
    },
    ...pageOpenGraph({ title: config.metaTitle, description, path: "/velo" }),
  };
}

export default function VeloPage() {
  return <DisciplineLandingPage discipline="velo" />;
}

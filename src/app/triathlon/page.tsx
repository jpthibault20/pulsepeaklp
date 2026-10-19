// app/triathlon/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { getDiscipline, getMetaDescription } from "@/lib/disciplines";
import DisciplineLandingPage from "../components/DisciplineLandingPage";

// Revalidation horaire : bascule des prix à la fin de l'offre de lancement
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const config = getDiscipline("triathlon");
  const description = getMetaDescription(config);
  return {
    title: config.metaTitle,
    description,
    alternates: {
      canonical: "/triathlon",
    },
    ...pageOpenGraph({ title: config.metaTitle, description, path: "/triathlon" }),
  };
}

export default function TriathlonPage() {
  return <DisciplineLandingPage discipline="triathlon" />;
}

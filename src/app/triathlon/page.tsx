// app/triathlon/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { getDiscipline } from "@/lib/disciplines";
import DisciplineLandingPage from "../components/DisciplineLandingPage";

const config = getDiscipline("triathlon");

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: "/triathlon",
  },
  ...pageOpenGraph({ title: config.metaTitle, description: config.metaDescription, path: "/triathlon" }),
};

export default function TriathlonPage() {
  return <DisciplineLandingPage discipline="triathlon" />;
}

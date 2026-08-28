// app/velo/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { getDiscipline } from "@/lib/disciplines";
import DisciplineLandingPage from "../components/DisciplineLandingPage";

const config = getDiscipline("velo");

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: "/velo",
  },
  ...pageOpenGraph({ title: config.metaTitle, description: config.metaDescription, path: "/velo" }),
};

export default function VeloPage() {
  return <DisciplineLandingPage discipline="velo" />;
}

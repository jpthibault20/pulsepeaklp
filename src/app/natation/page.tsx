// app/natation/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { getDiscipline } from "@/lib/disciplines";
import DisciplineLandingPage from "../components/DisciplineLandingPage";

const config = getDiscipline("natation");

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: "/natation",
  },
  ...pageOpenGraph({ title: config.metaTitle, description: config.metaDescription, path: "/natation" }),
};

export default function NatationPage() {
  return <DisciplineLandingPage discipline="natation" />;
}

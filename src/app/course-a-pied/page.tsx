// app/course-a-pied/page.tsx
import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { getDiscipline } from "@/lib/disciplines";
import DisciplineLandingPage from "../components/DisciplineLandingPage";

const config = getDiscipline("course-a-pied");

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: {
    canonical: "/course-a-pied",
  },
  ...pageOpenGraph({ title: config.metaTitle, description: config.metaDescription, path: "/course-a-pied" }),
};

export default function CourseAPiedPage() {
  return <DisciplineLandingPage discipline="course-a-pied" />;
}

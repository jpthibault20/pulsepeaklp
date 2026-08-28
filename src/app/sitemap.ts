import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/velo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/course-a-pied", priority: 0.85, changeFrequency: "monthly" },
  { path: "/triathlon", priority: 0.8, changeFrequency: "monthly" },
  { path: "/natation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/outils", priority: 0.8, changeFrequency: "weekly" },
  { path: "/outils/analyseur-gpx", priority: 0.7, changeFrequency: "monthly" },
  { path: "/outils/calculateur-ctl-atl-tsb", priority: 0.7, changeFrequency: "monthly" },
  { path: "/outils/calculateur-nutrition-sortie-longue", priority: 0.7, changeFrequency: "monthly" },
  { path: "/outils/calculateur-zones/allure", priority: 0.7, changeFrequency: "monthly" },
  { path: "/outils/calculateur-zones/fc", priority: 0.7, changeFrequency: "monthly" },
  { path: "/outils/calculateur-zones/puissance", priority: 0.7, changeFrequency: "monthly" },
  { path: "/outils/convertisseur-allure", priority: 0.7, changeFrequency: "monthly" },
  { path: "/telecharger", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/legal-notices", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-sale", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-use", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

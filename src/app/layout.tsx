import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { pageOpenGraph } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "PulsePeak — Coach IA vélo, course à pied, natation";
const description =
  "Votre plan vélo, course à pied ou natation se recalcule sur vos séances réelles, pas sur ce qui était prévu. Connecté à Strava. Dès 9 €/mois.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pulsepeak.fr"),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  ...pageOpenGraph({ title, description, path: "/" }),
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

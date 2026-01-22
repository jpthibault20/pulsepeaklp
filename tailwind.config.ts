// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050A14", // Un fond très sombre proche de tes screens
        surface: "#0F172A",    // Pour les cartes
        primary: "#06b6d4",    // Cyan (inspiré de ton UI)
        secondary: "#f97316",  // Orange (inspiré de ton UI)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #0F172A 0deg, #06b6d4 180deg, #0F172A 360deg)',
      },
    },
  },
  plugins: [],
};
export default config;
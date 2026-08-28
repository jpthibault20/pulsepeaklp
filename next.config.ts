import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Dev uniquement : autorise l'accès au serveur local depuis le LAN
  // (test sur mobile). Sans effet sur le build de production.
  allowedDevOrigins: ["192.168.1.33"],
  turbopack: {
    // Ancre la racine du workspace sur ce dossier : sans ça Turbopack remonte
    // les dossiers parents et retient le package-lock.json de C:\Users\tjean.
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pulsepeak.fr" }],
        destination: "https://pulsepeak.fr/:path*",
        permanent: true,
      },
      {
        source: "/outils/calculateur-zones-fc-puissance",
        destination: "/outils/calculateur-zones/puissance",
        permanent: true,
      },
      {
        source: "/outils/calculateur-zones",
        destination: "/outils/calculateur-zones/puissance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

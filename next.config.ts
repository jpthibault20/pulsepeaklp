import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
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

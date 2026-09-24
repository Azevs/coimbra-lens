import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // O jogo Operação Serenata é uma página estática em public/tinta-na-alta/.
  async rewrites() {
    return [
      { source: "/tinta-na-alta", destination: "/tinta-na-alta/index.html" },
      { source: "/tinta-na-alta/", destination: "/tinta-na-alta/index.html" },
    ];
  },
};

export default nextConfig;

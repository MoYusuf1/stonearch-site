import type { NextConfig } from "next";

// SITE picks which site this build makes: "web" (studio, default) or "help" (homeowner niches).
const site = process.env.SITE === "help" ? "help" : "web";

// GitHub Pages serves from /stonearch-site. A subdomain deploy sets BASE_PATH="" instead.
const basePath = process.env.BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/stonearch-site" : "");

const nextConfig: NextConfig = {
  output: "export",
  // Help-only pages are named *.help.tsx, so the studio build never sees them.
  pageExtensions: site === "help" ? ["help.tsx", "tsx", "ts"] : ["tsx", "ts"],
  basePath,
  images: { unoptimized: true },
  // Inline the CSS so the first paint does not wait on a stylesheet request.
  experimental: { inlineCss: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE: site },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

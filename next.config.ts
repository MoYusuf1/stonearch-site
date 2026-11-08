import type { NextConfig } from "next";

// GitHub Pages serves the site from /stonearch-site.
const basePath = process.env.NODE_ENV === "production" ? "/stonearch-site" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  // Inline the CSS so the first paint does not wait on a stylesheet request.
  experimental: { inlineCss: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
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

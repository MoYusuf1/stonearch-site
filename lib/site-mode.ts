// Which site this build makes. Set with SITE=help at build time; see next.config.ts.
export const SITE = process.env.NEXT_PUBLIC_SITE === "help" ? "help" : "web";

// Full public URL of this build, ending in "/". Set SITE_URL per deploy (e.g. https://help.stonearch.com/).
export const SITE_URL = process.env.SITE_URL ?? "https://moyusuf1.github.io/stonearch-site/";

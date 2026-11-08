/* eslint-disable @next/next/no-img-element -- static export, images are already sized */
import type { Metadata } from "next";
import { HomeShell } from "@/components/home-shell";
import { Container } from "@/components/site";
import { BRAND, LEADS_INDEXABLE } from "@/lib/leads";
import { niches } from "@/lib/niches";

const base = process.env.NEXT_PUBLIC_BASE_PATH;

export const helpHubMetadata: Metadata = {
  title: `Home help in Minneapolis–St. Paul | ${BRAND}`,
  description: "Something broke at home? Tell us what's wrong. We write back in under a minute and find you a local pro.",
  applicationName: BRAND,
  authors: [],
  // Never in search results: searches should land on a niche page, not this list.
  // "follow" stays on once the niche pages go live, so crawlers still find them from here.
  robots: { index: false, follow: LEADS_INDEXABLE },
  openGraph: { images: [] },
  twitter: { card: "summary", images: [] },
};

// Front page of the help site: one card per niche in lib/niches.ts.
export function HelpHub() {
  return (
    <HomeShell cta={false}>
      <Container className="py-12 lg:py-20">
        <p className="text-[15px] text-black/60">Twin Cities</p>
        <h1 className="mt-3 max-w-[640px] text-[40px] leading-[1.08] font-medium tracking-[-0.02em] md:text-[56px]">
          What do you need help with?
        </h1>
        <ul className="mt-10 grid max-w-[960px] gap-5 sm:grid-cols-2">
          {niches.map((n) => (
            <li key={n.slug}>
              <a href={`${base}/${n.slug}`} className="group block overflow-hidden rounded-2xl border border-black/10">
                <img
                  src={`${base}/img/home/${n.hero.src}`}
                  alt=""
                  width={1100}
                  height={734}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <p className="text-[24px] font-medium">{n.name}</p>
                  <p className="mt-1 text-[17px] text-black/60">{n.headline}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </HomeShell>
  );
}

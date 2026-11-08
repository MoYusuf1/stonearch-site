/* eslint-disable @next/next/no-img-element -- static export, images are already sized */
import type { Metadata } from "next";
import { Clock, Gift, MapPin } from "lucide-react";
import { IntakeForm } from "@/components/intake-form";
import { Container } from "@/components/site";
import { BRAND, LEADS_INDEXABLE, type Vertical } from "@/lib/leads";

type Photo = { src: string; alt: string };

export type IntakeCopy = {
  vertical: Vertical;
  title: string;
  description: string;
  headline: string;
  warning?: string;
  pains: string[];
  hero: Photo;
  side: Photo;
  faqs: [string, string][];
};

const photo = (file: string) => `${process.env.NEXT_PUBLIC_BASE_PATH}/img/home/${file}`;

// Only claims that are true before a contractor signs on.
const promises = [
  [Clock, "Day or night", "Ask at 2 AM. We still write back."],
  [MapPin, "Local", "Minneapolis–St. Paul only."],
  [Gift, "Free", "It costs nothing to ask."],
] as const;

const steps = [
  ["Tell us what's wrong", "It takes about a minute."],
  ["We write back fast", "In under a minute, any hour."],
  ["We find you a local pro", "Someone near you who handles this."],
];

export function intakeMetadata(c: IntakeCopy): Metadata {
  return {
    title: `${c.title} | ${BRAND}`,
    description: c.description,
    alternates: { canonical: `./${c.vertical.slug}` },
    robots: { index: LEADS_INDEXABLE, follow: LEADS_INDEXABLE },
    openGraph: { title: c.title, description: c.description, siteName: BRAND, url: `./${c.vertical.slug}`, images: [] },
    twitter: { card: "summary", title: c.title, description: c.description, images: [] },
  };
}

export function IntakePage(c: IntakeCopy) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="relative isolate overflow-hidden">
        <img
          src={photo(c.hero.src)}
          srcSet={`${photo(c.hero.src)} 1100w, ${photo(c.hero.src.replace(".webp", "-wide.webp"))} 1920w`}
          sizes="100vw"
          alt={c.hero.alt}
          width={1100}
          height={734}
          fetchPriority="high"
          className="h-52 w-full object-cover sm:h-72 lg:absolute lg:inset-0 lg:-z-10 lg:h-full"
        />
        {/* Darkens the left side on desktop so white text stays readable over any photo. */}
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/75 via-black/45 to-black/10 lg:block" />
        <Container className="grid gap-8 py-8 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-16 lg:py-10">
          <div className="lg:text-white">
            <p className="text-[15px] text-black/60 lg:text-white/75">Minneapolis&ndash;St. Paul &middot; Any hour</p>
            <h1 className="mt-3 max-w-[640px] text-[38px] leading-[1.08] font-medium tracking-[-0.02em] md:text-[52px]">
              {c.headline}
            </h1>
            <p className="mt-4 max-w-[480px] text-[18px] leading-[1.4] text-black/60 md:text-[19px] lg:text-white/85">
              Tell us what&rsquo;s wrong. We&rsquo;ll write back in under a minute and find you a local pro.
            </p>
            {c.warning && (
              <p className="mt-6 max-w-[480px] rounded-xl border border-red-200 bg-red-50 p-4 text-[15px] text-red-900">
                {c.warning}
              </p>
            )}
          </div>
          <div id="get-help">
            <IntakeForm vertical={c.vertical} />
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f7f5]">
        <Container className="grid gap-4 py-8 sm:grid-cols-3 lg:py-10">
          {promises.map(([Icon, title, text]) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
              <div>
                <p className="text-[16px] font-medium">{title}</p>
                <p className="text-[15px] text-black/60">{text}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <Container className="py-14 lg:py-20">
        <h2 className="text-[32px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[40px]">Sound familiar?</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {c.pains.map((p) => (
            <li key={p} className="rounded-2xl border border-black/10 p-5 text-[17px] leading-[1.4]">
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[17px] text-black/60">You don&rsquo;t have to make ten calls. Tell us once. We&rsquo;ll find someone.</p>
      </Container>

      <Container className="grid items-center gap-10 pb-14 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <img
          loading="lazy"
          decoding="async"
          src={photo(c.side.src)}
          alt={c.side.alt}
          width={1100}
          height={734}
          className="aspect-[3/2] w-full rounded-2xl object-cover"
        />
        <div>
          <h2 className="text-[32px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[40px]">How it works</h2>
          <ol className="mt-8 space-y-6">
            {steps.map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-[15px] font-medium text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[18px] font-medium">{title}</p>
                  <p className="text-[16px] text-black/60">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href="#get-help" className="mt-8 inline-block text-[16px] font-medium underline underline-offset-4">
            Get help now
          </a>
        </div>
      </Container>

      <Container className="max-w-[860px] pb-8">
        <h2 className="text-[32px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[40px]">Common questions</h2>
        <dl className="mt-8 divide-y divide-black/10 border-y border-black/10">
          {c.faqs.map(([q, a]) => (
            <div key={q} className="py-5 sm:grid sm:grid-cols-[260px_1fr] sm:gap-8">
              <dt className="text-[17px] font-medium">{q}</dt>
              <dd className="mt-1 text-[17px] text-black/60 sm:mt-0">{a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}

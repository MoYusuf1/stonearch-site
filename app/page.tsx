/* eslint-disable @next/next/no-img-element -- static export, images are already sized */
import {
  Clock,
  FileText,
  Gauge,
  Menu,
  PenTool,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Reveal } from "@/components/reveal";
import { Container, Logo, Pill } from "@/components/site";
import { cn } from "@/lib/utils";

const base = process.env.NEXT_PUBLIC_BASE_PATH;
// Page images are 900px WebP copies in public/img/900; the hero also has the full-size original.
const img = (file: string) => `${base}/img/900/${file.replace(/\.\w+$/, ".webp")}`;
const MAIL = "mailto:stonearchwebdesign@gmail.com";
const MOCKUP = `${MAIL}?subject=Free%20mockup%20request&body=Business%20name%3A%0AWhat%20I%20sell%3A%0AHours%3A`;

const nav = [
  ["Services", "#services"],
  ["How it works", "#how"],
  ["Work", "#work"],
  ["Answers", "#answers"],
  ["Contact", "#contact"],
];

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <Container className="flex h-[72px] items-center justify-between">
        <div className="flex items-center gap-12">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map(([label, href]) => (
              <a key={href} href={href} className="text-[15px] font-medium text-black hover:text-black/60">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <a href={MAIL} className="hidden text-[15px] font-medium sm:block">
            Email us
          </a>
          <Pill href={MOCKUP} className="hidden h-[39px] px-[18px] text-[15px] sm:inline-flex">
            Get a free mockup
          </Pill>
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open menu" />}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <SheetTitle>Menu</SheetTitle>
              <nav className="mt-6 flex flex-col gap-4">
                {nav.map(([label, href]) => (
                  <SheetClose key={href} nativeButton={false} render={<a href={href} />} className="text-left text-xl font-medium">
                    {label}
                  </SheetClose>
                ))}
              </nav>
              <Pill href={MOCKUP} className="mt-8 w-full">
                Get a free mockup
              </Pill>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="top">
      <Container className="grid items-center gap-10 pt-8 pb-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div>
          <p className="flex items-center gap-3 text-[15px] text-black/60">
            Web design in <span className="font-semibold text-black italic">Minneapolis</span>
          </p>
          <h1 className="mt-6 max-w-[620px] lg:mt-10 text-[44px] leading-[1.1] font-medium tracking-[-0.02em] md:text-[56px]">
            A simple website for your shop.
          </h1>
          <p className="mt-6 max-w-[560px] text-[20px] leading-[1.3] text-black/60">
            One-page websites for Minneapolis small businesses. $499 to build, $49 a month, free mockup first.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
            <Pill href={MOCKUP} className="px-3 text-[15px] sm:px-6 sm:text-[17px]">Get a free mockup</Pill>
            <Pill href="#services" dark={false} className="px-3 text-[15px] sm:px-6 sm:text-[17px]">
              See pricing
            </Pill>
          </div>
          <p className="mt-6 text-[14px] text-black/60">No calls. No commitment.</p>
        </div>
        <div>
          <img
            src={img("hero-cafe.webp")}
            srcSet={`${base}/img/900/hero-cafe-600.webp 600w, ${img("hero-cafe.webp")} 900w, ${base}/img/hero-cafe.webp 1600w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={1600}
            height={1097}
            fetchPriority="high"
            alt="Inside a small Minneapolis-style cafe"
            className="aspect-[4/3] w-full rounded-2xl object-cover md:aspect-[16/9] lg:aspect-[4/3]"
          />
        </div>
      </Container>
    </section>
  );
}

const features = [
  [FileText, "One page", "Hours, menu, and how to find you."],
  [Smartphone, "Works on phones", "Where your customers look first."],
  [PenTool, "Free mockup", "See it before you pay."],
  [ShieldCheck, "We keep it running", "Hosting and 2 edits a month."],
  [Gauge, "Fast", "Loads in a blink."],
  [Clock, "One price", "No hourly bills."],
] as const;

function Features() {
  return (
    <section id="services" className="bg-[#f7f7f5]">
      <Container className="py-10 sm:py-16">
        <h2 className="sr-only">What you get</h2>
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 lg:grid-cols-3">
          {features.map(([Icon, title, text]) => (
            <div key={title} className="bg-white p-5 sm:p-8">
              <Icon className="size-6" strokeWidth={1.5} />
              <h3 className="mt-3 text-[16px] font-medium sm:mt-10 sm:text-[17px]">{title}</h3>
              <p className="mt-1 text-[14px] text-black/60 sm:text-[15px]">{text}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <Container className="grid items-end gap-8 py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-12 lg:py-24">
        <Reveal>
          <h2 className="max-w-[440px] text-[40px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[50px]">
            Just send one email.
          </h2>
          <Pill href={MOCKUP} className="mt-6 lg:mt-10">
            Get a free mockup
          </Pill>
        </Reveal>
        <Reveal>
          <Card className="grid gap-0 overflow-hidden rounded-2xl bg-black p-0 text-white ring-0 md:grid-cols-[1fr_1fr]">
            <img loading="lazy" decoding="async" src={img("about.jpg")} alt="Laptop on a desk" className="h-48 w-full object-cover md:h-full md:min-h-[320px]" />
            <div className="flex flex-col justify-between gap-6 p-6 md:gap-10 md:p-8">
              <p className="text-[18px] leading-[1.35] md:text-[20px]">
                I&rsquo;m a software engineer in Minneapolis, not an agency. You talk to me, the person who builds your
                site.
              </p>
              <div>
                <p className="text-[15px] font-medium">Mohamed Yusuf</p>
                <p className="text-[15px] text-white/60">Stone Arch Web Design</p>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}

const steps = [
  { title: "1. See a free mockup", text: "We make a sample of your site for free.", image: "banner-storefront.webp", alt: "A cafe storefront at night" },
  { title: "2. We build it", text: "Like it? We build it for $499 in 2–3 days.", image: "card-chef.jpg", alt: "A chef plating a dish" },
  { title: "3. We keep it running", text: "$49 a month keeps it online, with small edits.", image: "", alt: "" },
];

// Step 3 visual: what the monthly plan looks like, instead of a stock photo.
function SiteStatus() {
  return (
    <div className="flex h-36 flex-col justify-center gap-3 md:h-44 rounded-xl bg-white p-5 text-[15px] shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium">yourshop.com</span>
        <span className="flex items-center gap-1.5 text-[13px] text-green-700">
          <span className="size-2 rounded-full bg-green-600" />
          Online
        </span>
      </div>
      <Separator />
      <div className="flex justify-between text-black/60">
        <span>Edits this month</span>
        <span className="text-black">1 of 2</span>
      </div>
      <div className="flex justify-between text-black/60">
        <span>Next bill</span>
        <span className="text-black">$49</span>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how">
      <Container className="py-10 sm:py-16">
        <Reveal>
          <h2 className="text-center text-[40px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[50px]">
            How it works
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {steps.map((s, i) => (
            <Reveal key={s.title} className={cn(i === 0 && "md:col-span-2 lg:row-span-2")}>
              <Card className="h-full gap-6 rounded-2xl bg-[#f7f7f5] p-6 ring-0 md:p-8">
                <div>
                  <h3 className={cn("font-medium", i === 0 ? "text-[28px]" : "text-[20px]")}>{s.title}</h3>
                  <p className="mt-1 text-[17px] text-black/60">{s.text}</p>
                </div>
                {s.image ? (
                  <img loading="lazy" decoding="async"
                    src={img(s.image)}
                    alt={s.alt}
                    className={cn("w-full rounded-xl object-cover", i === 0 ? "h-44 md:h-64 lg:h-auto lg:min-h-0 lg:flex-1" : "h-36 md:h-44")}
                  />
                ) : (
                  <SiteStatus />
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const work = [
  ["Cafe", "center-cafe.webp"],
  ["Bakery", "collage-bakery.webp"],
  ["Restaurant", "hero-room-m.webp"],
  ["Sushi", "collage-sushi.jpg"],
  ["Coffee", "collage-coffee.webp"],
  ["Dessert", "card-sundae.jpg"],
];

function Work() {
  return (
    <section id="work">
      <Container className="py-14 lg:py-24">
        <Reveal className="text-center">
          <h2 className="text-[40px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[50px]">
            Sample sites
            <br />
            <span className="text-black/40">for shops like yours.</span>
          </h2>
          <p className="mt-4 text-[14px] text-black/60">Examples, not client work</p>
        </Reveal>
        <Reveal className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-3 lg:mt-12 lg:gap-x-6 lg:gap-y-10">
          {work.map(([label, file]) => (
            <figure key={file} className="group">
              <div className="overflow-hidden rounded-xl bg-[#f7f7f5] lg:rounded-2xl">
                <img loading="lazy" decoding="async"
                  src={img(file)}
                  alt={`Sample website photo for a ${label.toLowerCase()}`}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-2 text-[15px] font-medium lg:mt-3 lg:text-[17px]">{label}</figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

const answers = [
  ["Cost", "$499 to build, then $49 a month. A web address is about $13 a year."],
  ["Speed", "2–3 days after you send your menu, photos, and hours."],
  ["Monthly", "We keep your site online and safe, and make 2 small edits a month."],
  ["Contract", "6 months minimum, then month to month. Leaving early? Pay the months left, or buy the site."],
  ["Have Square?", "Keep it. We link your ordering and social pages."],
];

function Answers() {
  return (
    <section id="answers">
      <Container className="py-10 sm:py-16">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-[620px] text-[40px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[50px]">
            Questions
          </h2>
        </Reveal>
        <Reveal className="mx-auto mt-8 max-w-[760px]">
          <dl className="divide-y divide-black/10 border-y border-black/10">
            {answers.map(([q, a]) => (
              <div key={q} className="py-5 sm:grid sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="text-[17px] font-medium">{q}</dt>
                <dd className="mt-1 text-[17px] text-black/60 sm:mt-0">{a}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <p className="mt-6 text-center text-[15px] text-black/60">
          Other questions?{" "}
          <a href={MAIL} className="font-medium text-black underline underline-offset-4">
            Email us
          </a>
        </p>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <Container className="grid items-center gap-8 py-14 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <Reveal>
          <h2 className="text-[40px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[50px]">Ready when you are.</h2>
          <p className="mt-4 max-w-[520px] text-[17px] text-black/60">Send your shop name. We send back a free mockup.</p>
        </Reveal>
        <Reveal className="relative overflow-hidden rounded-2xl">
          <img
            loading="lazy"
            decoding="async"
            src={img("cafe-owner.webp")}
            alt="A smiling owner in her coffee shop"
            className="aspect-[16/9] w-full object-cover"
          />
          <Pill
            href={MOCKUP}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black hover:bg-white/85"
          >
            Get a free mockup
          </Pill>
        </Reveal>
      </Container>
    </section>
  );
}

const footerCols = [
  ["Services", [["One-Page Website", "#services"], ["Care Plan", "#services"], ["Free mockup", MOCKUP]]],
  ["Explore", [["How it works", "#how"], ["Work", "#work"], ["Answers", "#answers"]]],
  ["Contact", [["Email us", MAIL], ["Business card", `${base}/card.html`], ["Save contact", `${base}/contact.vcf`]]],
] as const;

function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="py-10 lg:py-16">
        <div className="grid grid-cols-3 gap-4 sm:gap-10">
          {footerCols.map(([title, links]) => (
            <div key={title}>
              <p className="text-[14px] font-medium sm:text-[15px]">{title}</p>
              <ul className="mt-3 space-y-2">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-[14px] text-white/70 hover:text-white sm:text-[15px]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8 bg-white/15" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Logo light />
          <p className="text-[13px] text-white/60">
            Serving Minneapolis&ndash;St. Paul &middot; &copy; 2026 Stone Arch Web Design
          </p>
        </div>
      </Container>
    </footer>
  );
}

const SITE = "https://moyusuf1.github.io/stonearch-site/";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}#business`,
      name: "Stone Arch Web Design",
      description:
        "One-page websites for Minneapolis–St. Paul small businesses: cafes, bakeries, restaurants, and shops. $499 to build, $49 a month for hosting and edits, with a free mockup before you pay.",
      url: SITE,
      email: "stonearchwebdesign@gmail.com",
      image: `${SITE}img/hero-cafe.jpg`,
      logo: `${SITE}apple-touch-icon.png`,
      priceRange: "$499 build + $49/mo",
      address: { "@type": "PostalAddress", addressLocality: "Minneapolis", addressRegion: "MN", addressCountry: "US" },
      areaServed: [
        { "@type": "City", name: "Minneapolis" },
        { "@type": "City", name: "Saint Paul" },
      ],
      founder: { "@type": "Person", name: "Mohamed Yusuf", jobTitle: "Software engineer" },
      knowsAbout: ["Small business websites", "Restaurant websites", "Mobile-first web design", "Local SEO"],
      makesOffer: [
        {
          "@type": "Offer",
          name: "One-page website",
          description: "A mobile-first one-page website with a free mockup first. Live in 2–3 days.",
          price: "499",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Monthly care plan",
          description: "Hosting, security, and 2 small edits a month. 6-month minimum, then month to month.",
          priceSpecification: { "@type": "UnitPriceSpecification", price: "49", priceCurrency: "USD", unitCode: "MON" },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}#website`,
      url: SITE,
      name: "Stone Arch Web Design",
      publisher: { "@id": `${SITE}#business` },
    },
    {
      "@type": "FAQPage",
      mainEntity: answers.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <HowItWorks />
        <Work />
        <Answers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

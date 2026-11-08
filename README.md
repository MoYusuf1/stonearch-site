# Stone Arch Web Design — Company Site

## Links

One repo builds two sites. `SITE=web` (default) is the studio. `SITE=help` is the homeowner help site.

| Page | Site | Live | Local | Branch |
|---|---|---|---|---|
| Studio homepage (shop owners) | web | [moyusuf1.github.io/stonearch-site](https://moyusuf1.github.io/stonearch-site/) | `npm run dev` → [localhost:3000](http://localhost:3000/) | `main` |
| Help hub (all niches) | help | not published (planned: help.stonearch.com) | `npm run dev:help` → [localhost:3000](http://localhost:3000/) | `leadgen` |
| Furnace intake | help | not published | `npm run dev:help` → [localhost:3000/furnace](http://localhost:3000/furnace) | `leadgen` |
| Snow intake | help | not published | `npm run dev:help` → [localhost:3000/snow](http://localhost:3000/snow) | `leadgen` |
| Digital business card | web | [card.html](https://moyusuf1.github.io/stonearch-site/card.html) | [localhost:3000/card.html](http://localhost:3000/card.html) | `main` |
| `llms.txt` (AI summary) | web | [llms.txt](https://moyusuf1.github.io/stonearch-site/llms.txt) | — | `main` |
| Sitemap | web | [sitemap.xml](https://moyusuf1.github.io/stonearch-site/sitemap.xml) | — | `main` |

Repo: [GitHub](https://github.com/MoYusuf1/stonearch-site) · [Deploys](https://github.com/MoYusuf1/stonearch-site/actions) · [Pages settings](https://github.com/MoYusuf1/stonearch-site/settings/pages)

Next.js (App Router, static export) + Tailwind + shadcn/ui. Layout follows the
Bonsai partner landing page; all copy, prices and photos are Stone Arch's own.

- **Dev:** `npm install`, then `npm run dev` (http://localhost:3000).
- **Build:** `npm run build` writes the static site to `out/` with base path `/stonearch-site`.
- **Deploy:** `.github/workflows/deploy.yml` publishes `out/` to GitHub Pages on push to `main`.
  Set the repo's Pages source to "GitHub Actions" once.
- **Page:** `app/page.tsx` (all sections). shadcn components live in `components/ui/`.
- **Static files:** `public/` (images, `card.html`, `contact.vcf`, `robots.txt`, `sitemap.xml`).
- **Content rules:** prices $499 build + $49/mo care (6-month minimum, 2 small edits/mo).
  Photos are examples, not paid client work. No testimonials, client logos, or invented metrics.
- **Contact:** stonearchwebdesign@gmail.com (mailto links only; the page sends nothing).

## Help site (homeowner niches) — branch `leadgen`, not published

- **Build:** `npm run build:help` (or `SITE=help`). For a subdomain deploy, also set `BASE_PATH=""` and `SITE_URL=https://help.stonearch.com/`. The help build drops the studio's `llms.txt`, sitemap, robots, and business card.
- **Pages:** the hub at `/` lists every niche. Each niche page at `/<slug>` comes from one template: `app/(home)/[niche]/page.help.tsx` (the `.help.tsx` name means only help builds see it).
- **Settings:** `lib/leads.ts` holds the brand, draft consent text, `LEADS_INDEXABLE` (false = `noindex`), and the validator.
- **Form endpoint:** set `NEXT_PUBLIC_LEAD_ENDPOINT` at build time. The form POSTs the lead as JSON. Without it, the form says "not connected yet".
- **Local test:** run `node scripts/mock-lead-endpoint.mjs`, then `NEXT_PUBLIC_LEAD_ENDPOINT=http://localhost:8787/lead npm run dev:help`. Leads are written to `leads.test.jsonl`.
- **Self-checks:** `node scripts/check-lead.test.ts` and `node scripts/check-niches.test.ts`.
- **Before real leads:** attorney check of the consent text, a real endpoint that sends the auto-reply and routes to the buyer, and the domain.

### Add a niche

1. Copy one entry in `lib/niches.ts` and change the words: slug, name, headline, pains, form options, FAQs.
2. Add 3 photos to `public/img/home/`: the hero (1100px WebP), the same hero at 1920px named `<hero>-wide.webp`, and a side photo.
3. Run `node scripts/check-niches.test.ts`. It fails on a duplicate slug, an empty field, or a missing photo.
4. Run `npm run dev:help` and open `localhost:3000/<slug>`.

Keep every claim true today: no prices, ratings, or promises a buyer has not agreed to.

# Stone Arch Web Design — Company Site

## Links

| Page | Live | Local (`npm run dev`) | Branch |
|---|---|---|---|
| Studio homepage (shop owners) | [moyusuf1.github.io/stonearch-site](https://moyusuf1.github.io/stonearch-site/) | [localhost:3000](http://localhost:3000/) | `main` |
| Furnace intake (homeowners) | not published | [localhost:3000/furnace](http://localhost:3000/furnace) | `leadgen` |
| Snow intake (homeowners) | not published | [localhost:3000/snow](http://localhost:3000/snow) | `leadgen` |
| Digital business card | [card.html](https://moyusuf1.github.io/stonearch-site/card.html) | [localhost:3000/card.html](http://localhost:3000/card.html) | `main` |
| `llms.txt` (AI summary) | [llms.txt](https://moyusuf1.github.io/stonearch-site/llms.txt) | — | `main` |
| Sitemap | [sitemap.xml](https://moyusuf1.github.io/stonearch-site/sitemap.xml) | — | `main` |

Repo: [GitHub](https://github.com/MoYusuf1/stonearch-site) · [Deploys](https://github.com/MoYusuf1/stonearch-site/actions) · [Pages settings](https://github.com/MoYusuf1/stonearch-site/settings/pages)

When the lead pages go live, they will be at `https://moyusuf1.github.io/stonearch-site/furnace` and `/snow`.

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

## Homeowner lead pages (branch `leadgen`, not published)

- **Pages:** `/furnace` and `/snow` in `app/(home)/`, with their own header and footer. The studio homepage, sitemap, and `llms.txt` never link to them.
- **Config:** `lib/leads.ts` holds the brand name (placeholder), the draft consent text, the form options, and `LEADS_INDEXABLE` (false = `noindex`).
- **Form endpoint:** set `NEXT_PUBLIC_LEAD_ENDPOINT` at build time. The form POSTs the lead as JSON. Without it, the form says "not connected yet".
- **Local test:** run `node scripts/mock-lead-endpoint.mjs`, then build with `NEXT_PUBLIC_LEAD_ENDPOINT=http://localhost:8787/lead`. Leads are written to `leads.test.jsonl`.
- **Validator self-check:** `node scripts/check-lead.test.ts`.
- **Before real leads:** attorney check of the consent text, the brand decision, and a real endpoint that sends the auto-reply and routes to the contractor.

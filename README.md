# Stone Arch — Company Site

This repo builds two sites:

- The **studio site** sells one-page websites to shop owners.
- The **help site** collects requests from homeowners. Each request is a lead for a local contractor.

## Links

| Page | Site | Live | Local |
|---|---|---|---|
| Studio home page | studio | [moyusuf1.github.io/stonearch-site](https://moyusuf1.github.io/stonearch-site/) | `npm run dev` → [localhost:3000](http://localhost:3000/) |
| Help hub (all niches) | help | [moyusuf1.github.io/stonearch-site/help](https://moyusuf1.github.io/stonearch-site/help/) | `npm run dev:help` → [localhost:3000](http://localhost:3000/) |
| Furnace & Heating | help | [/help/furnace](https://moyusuf1.github.io/stonearch-site/help/furnace) | `npm run dev:help` → [localhost:3000/furnace](http://localhost:3000/furnace) |
| Snow Removal | help | [/help/snow](https://moyusuf1.github.io/stonearch-site/help/snow) | `npm run dev:help` → [localhost:3000/snow](http://localhost:3000/snow) |
| Business card | studio | [card.html](https://moyusuf1.github.io/stonearch-site/card.html) | [localhost:3000/card.html](http://localhost:3000/card.html) |
| `llms.txt` (summary for AI tools) | studio | [llms.txt](https://moyusuf1.github.io/stonearch-site/llms.txt) | — |
| Sitemap | studio | [sitemap.xml](https://moyusuf1.github.io/stonearch-site/sitemap.xml) | — |

Repo: [GitHub](https://github.com/MoYusuf1/stonearch-site) · [Deploys](https://github.com/MoYusuf1/stonearch-site/actions) · [Pages settings](https://github.com/MoYusuf1/stonearch-site/settings/pages)

The help site is live for review only:

- Search engines do not index it (`noindex`).
- The studio site does not link to it.
- The form does not send leads. It shows "This form is not connected yet."

## Stack

- Next.js (App Router, static export), Tailwind CSS, and shadcn/ui.
- The studio layout follows the Bonsai partner page. All text, prices, and photos are Stone Arch's own.

## Commands

| Command | Result |
|---|---|
| `npm install` | Installs the packages. Do this first. |
| `npm run dev` | Starts the studio site at `localhost:3000`. |
| `npm run dev:help` | Starts the help site at `localhost:3000`. |
| `npm run build` | Builds the studio site into `out/`. |
| `npm run build:help` | Builds the help site into `out/`. |
| `npm run build:pages` | Builds both sites into `out/`. The help site goes into `out/help/`. GitHub Pages uses this. |
| `npm run lint` | Checks the code style. |
| `node scripts/check-lead.test.ts` | Checks the form rules. |
| `node scripts/check-niches.test.ts` | Checks every niche entry. |

## Deploy

1. Push to `main`.
2. The workflow `.github/workflows/deploy.yml` runs `npm run build:pages`.
3. GitHub Pages publishes `out/`.

The Pages source must be "GitHub Actions". This is already set.

## Studio site

- The page is `app/page.tsx`. The shadcn components are in `components/ui/`.
- Static files are in `public/`: images, `card.html`, `contact.vcf`, `robots.txt`, `sitemap.xml`, and `llms.txt`.
- Prices: $499 to build. $49 a month after. The minimum is 6 months. The plan includes 2 small edits each month.
- Contact: stonearchwebdesign@gmail.com. The buttons open the visitor's email app. The page sends nothing.
- Photos are examples. They are not client work.
- Do not add reviews, client logos, or numbers that are not true.

## Help site

- The hub page lists all niches. Search engines never index the hub. Searches go to the niche pages.
- One template makes each niche page: `app/(home)/[niche]/page.help.tsx`.
- Only help builds use files that end in `.help.tsx`. The studio build ignores them.
- The niche text is in `lib/niches.ts`.
- The lead settings are in `lib/leads.ts`: the brand, the consent text, the form rules, and `LEADS_INDEXABLE`.
- `LEADS_INDEXABLE = false` keeps the niche pages out of search. Set it to `true` only after the go-live checks below.

### Build settings

| Setting | Use |
|---|---|
| `SITE=help` | Builds the help site. Without it, the build makes the studio site. |
| `BASE_PATH` | The URL path of the site. Use `""` for a subdomain. |
| `SITE_URL` | The full public URL, with a `/` at the end. Example: `https://help.stonearch.com/`. |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | The URL that receives each lead as JSON. Without it, the form does not send. |

### Test the form

1. Run `node scripts/mock-lead-endpoint.mjs`.
2. In a second terminal, run `NEXT_PUBLIC_LEAD_ENDPOINT=http://localhost:8787/lead npm run dev:help`.
3. Open `localhost:3000/furnace`. Fill in the form. Send it.
4. Look in the first terminal. The lead also goes into `leads.test.jsonl`.

### Add a niche

1. Copy one entry in `lib/niches.ts`.
2. Change the words: slug, name, headline, pain points, form options, and questions.
3. Add 3 photos to `public/img/home/`:
   - The hero photo, 1100 px wide, WebP.
   - The same hero photo, 1920 px wide, named `<hero>-wide.webp`.
   - A side photo, 1100 px wide, WebP.
4. Run `node scripts/check-niches.test.ts`. The check fails if a slug repeats, a field is empty, or a photo is missing.
5. Run `npm run dev:help`. Open `localhost:3000/<slug>`.

Write only true claims. Do not show prices, ratings, or promises that a contractor has not agreed to.

### Before real leads

Do all of these before you set `LEADS_INDEXABLE = true` or connect the form:

1. Get an attorney to check the consent text and the lead sale rules.
2. Connect a lead endpoint. It must send the auto-reply and send the lead to the contractor.
3. Buy the domain. Move the help site to `help.stonearch.com`.

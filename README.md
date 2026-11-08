# Stone Arch Web Design — Company Site

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

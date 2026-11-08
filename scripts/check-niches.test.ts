// Run: node scripts/check-niches.test.ts — checks every niche entry before it ships.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { niches } from "../lib/niches.ts";

const img = (f: string) => new URL(`../public/img/home/${f}`, import.meta.url);
const slugs = new Set<string>();

for (const n of niches) {
  const at = `niche "${n.slug}"`;
  assert.match(n.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${at}: slug must be lowercase words joined by "-"`);
  assert.ok(!slugs.has(n.slug), `${at}: duplicate slug`);
  slugs.add(n.slug);
  for (const k of ["name", "title", "description", "headline", "question", "placeholder"] as const)
    assert.ok(n[k].trim(), `${at}: "${k}" is empty`);
  assert.ok(n.pains.length >= 2, `${at}: needs at least 2 pains`);
  assert.ok(n.services.length >= 2 && n.timelines.length >= 2, `${at}: needs at least 2 services and 2 timelines`);
  assert.ok(n.faqs.length >= 1, `${at}: needs at least 1 FAQ`);
  for (const f of [n.hero.src, n.hero.src.replace(".webp", "-wide.webp"), n.side.src])
    assert.ok(existsSync(img(f)), `${at}: missing photo public/img/home/${f}`);
  assert.ok(n.hero.alt && n.side.alt, `${at}: photos need alt text`);
}
console.log(`checkNiches: ${niches.length} niches OK`);

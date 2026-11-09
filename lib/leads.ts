// Shared lead settings for the help site. Niche content lives in lib/niches.ts.

// Placeholder until the lead-brand decision. Change it here only.
export const BRAND = "Stone Arch";

// Where the intake form POSTs JSON. NEXT_PUBLIC_LEAD_ENDPOINT can override
// at build time; the default is the Stone Arch Furnace Intake form on Formspree
// (free plan, account on sparkyy@muse.ai). Empty means the form shows "not connected".
export const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "https://formspree.io/f/moeegvao";

// Keep these pages out of search until the attorney check and the go to publish.
export const LEADS_INDEXABLE = false;

// Draft wording. The attorney check must approve it before real leads flow.
export const consentText = (brand: string) =>
  `I agree that ${brand} may call, text, or email me about this request and share it with one local pro. Message and data rates may apply. Reply STOP to opt out.`;

export type Lead = {
  vertical: string; // niche slug
  service: string;
  zip: string;
  problem: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
  consent: { agreed: true; text: string; at: string };
  page: string;
  submittedAt: string;
};

export type LeadField = "service" | "zip" | "problem" | "timeline" | "name" | "phone" | "email" | "consent";

// Returns the first problem as { field, message }, or null when the lead is good to send.
export function checkLead(
  l: Omit<Lead, "consent" | "page" | "submittedAt">,
  consented: boolean,
): { field: LeadField; message: string } | null {
  const bad = (field: LeadField, message: string) => ({ field, message });
  if (!l.service) return bad("service", "Pick what's happening.");
  if (!l.timeline) return bad("timeline", "Pick how soon you need help.");
  if (!l.name.trim()) return bad("name", "Add your first name.");
  if (!/^\d{5}$/.test(l.zip)) return bad("zip", "Add your 5-digit zip code.");
  const phoneDigits = l.phone.replace(/\D/g, "");
  if (phoneDigits.length > 0 && phoneDigits.length < 10) return bad("phone", "Use a 10-digit phone number.");
  if (!l.email.trim() && !phoneDigits) return bad("phone", "Add a phone number or email so we can reach you.");
  if (l.email && !/^\S+@\S+\.\S+$/.test(l.email)) return bad("email", "That email doesn't look right.");
  if (!consented) return bad("consent", "Check the box so we can contact you.");
  return null;
}

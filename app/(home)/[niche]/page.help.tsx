import { notFound } from "next/navigation";
import { IntakePage, intakeMetadata } from "@/components/intake-page";
import { nicheBySlug, niches } from "@/lib/niches";

// One page per niche in lib/niches.ts. The ".help.tsx" name means only SITE=help builds see it.
export const dynamicParams = false;

type Props = { params: Promise<{ niche: string }> };

export function generateStaticParams() {
  return niches.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const niche = nicheBySlug((await params).niche);
  return niche ? intakeMetadata(niche) : {};
}

export default async function NichePage({ params }: Props) {
  const niche = nicheBySlug((await params).niche);
  if (!niche) notFound();
  return <IntakePage niche={niche} />;
}

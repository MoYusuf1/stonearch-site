import { IntakePage, intakeMetadata, type IntakeCopy } from "@/components/intake-page";
import { verticals } from "@/lib/leads";

const copy: IntakeCopy = {
  vertical: verticals.snow,
  title: "Snow removal in Minneapolis–St. Paul",
  description:
    "Driveway, sidewalk, or roof buried in Minneapolis or St. Paul? Tell us what you need. We write back in under a minute and find you a local pro.",
  headline: "Snowed in? Let's dig you out.",
  pains: [
    "You need to leave, and the driveway is buried.",
    "Your back can't take another round of shoveling.",
    "Last year's plow guy won't call back.",
    "You don't know who will actually show up.",
  ],
  hero: { src: "snowblower.webp", alt: "A man clearing a snowy path with a snowblower" },
  side: { src: "shoveling.webp", alt: "A person shoveling snow outside a house" },
  faqs: [
    [
      "Can I sign up for the whole season now?",
      "Yes. Pick \"All winter\" and we'll find you a local pro for the season.",
    ],
    ["How fast will I hear back?", "In under a minute. Then we find you a local pro."],
    ["Does it cost anything?", "No. Asking is free."],
  ],
};

export const metadata = intakeMetadata(copy);

export default function SnowPage() {
  return <IntakePage {...copy} />;
}

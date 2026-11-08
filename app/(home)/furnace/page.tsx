import { IntakePage, intakeMetadata, type IntakeCopy } from "@/components/intake-page";
import { verticals } from "@/lib/leads";

const copy: IntakeCopy = {
  vertical: verticals.furnace,
  title: "No heat? Get furnace help in Minneapolis–St. Paul",
  description:
    "Furnace out in Minneapolis or St. Paul? Tell us what's wrong. We write back in under a minute and find you a local pro.",
  headline: "No heat? Let's get it fixed.",
  warning: "Smell gas? Don't use this form. Get everyone out and call 911 from outside.",
  pains: [
    "The house keeps getting colder.",
    "Every company you call goes to voicemail.",
    "You don't know who to trust.",
    "You're worried the pipes will freeze.",
  ],
  hero: { src: "warm-home.webp", alt: "A warm living room with a fire going" },
  side: { src: "technician.webp", alt: "A technician connecting a line on a heating and cooling unit" },
  faqs: [
    [
      "My furnace stopped. What should I check first?",
      "Check that the thermostat is on heat and has fresh batteries. Check that the furnace switch is on and the breaker hasn't tripped. A clogged filter can also shut it off.",
    ],
    [
      "Is no heat an emergency?",
      "In a Minnesota winter, it can be. Pipes can freeze when a house gets cold. While you wait, open the cabinets under your sinks and let a faucet drip.",
    ],
    ["How fast will I hear back?", "In under a minute. Then we find you a local pro."],
    ["Does it cost anything?", "No. Asking is free."],
  ],
};

export const metadata = intakeMetadata(copy);

export default function FurnacePage() {
  return <IntakePage {...copy} />;
}

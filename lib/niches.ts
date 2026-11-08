// Every homeowner niche on the help site. One entry here = one page at /<slug>.
// To add a niche: copy an entry, change the words, add two photos to public/img/home/.
// Keep every claim true today: no prices, ratings, or promises a contractor hasn't agreed to.

type Photo = { src: string; alt: string };

export type Niche = {
  slug: string;
  // Hub card + page metadata
  name: string;
  title: string;
  description: string;
  // Page
  headline: string;
  warning?: string;
  pains: string[];
  hero: Photo; // also needs a "-wide.webp" copy (1920px) for desktop
  side: Photo;
  faqs: [string, string][];
  // Form
  question: string;
  services: string[];
  timelines: string[];
  placeholder: string;
};

export const niches: Niche[] = [
  {
    slug: "furnace",
    name: "Furnace & Heating",
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
    question: "What's happening?",
    services: ["No heat at all", "Not warm enough", "Strange noise", "Something else"],
    timelines: ["Right now", "Today", "This week", "Not urgent"],
    placeholder: "Example: It runs but blows cold air.",
  },
  {
    slug: "snow",
    name: "Snow Removal",
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
      ["Can I sign up for the whole season now?", "Yes. Pick \"All winter\" and we'll find you a local pro for the season."],
      ["How fast will I hear back?", "In under a minute. Then we find you a local pro."],
      ["Does it cost anything?", "No. Asking is free."],
    ],
    question: "What needs clearing?",
    services: ["Driveway", "Sidewalk", "Roof", "Driveway + sidewalk"],
    timelines: ["Right now", "Before the next snow", "All winter"],
    placeholder: "Example: Long driveway. I leave for work at 7.",
  },
];

export const nicheBySlug = (slug: string) => niches.find((n) => n.slug === slug);

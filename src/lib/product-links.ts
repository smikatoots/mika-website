export const productLinkCategories = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "finance", label: "Finance" },
  { id: "physical", label: "Physical" },
  { id: "work", label: "Work" },
  { id: "food", label: "Food & Drinks" },
  { id: "learning", label: "Learning" },
  { id: "services", label: "Services" },
] as const;

export type ProductLinkCategoryId = Exclude<
  (typeof productLinkCategories)[number]["id"],
  "all"
>;

export type ProductLink = {
  id: string;
  name: string;
  description: string;
  href: string;
  categories: ProductLinkCategoryId[];
};

const U = {
  fishAudio: "https://fish.audio/?fpr=bliknq",
  capitalVentureX: "https://capital.one/3nffNQa",
  chaseFreedomUnlimited: "https://www.referyourchasecard.com/18/X49W5WBKFC",
  m1Finance: "https://m1.finance/jvVekGKC2na-",
  monarchMoney: "https://www.monarchmoney.com/referral/pulm2hd82n",
  facetWealth: "https://facetwealth.referralrock.com/l/1MIKAELAREY71/",
  etrade: "https://refer.etrade.net/ncruz",
  coinbase: "https://www.coinbase.com/join/reyes_73f",
  cadence: "https://share.keepyourcadence.com/mikaela72",
  remento: "https://to.remento.co/dfb2a7f429551f8723b01210b3a17c78",
  notion: "https://notion.so/",
  substack: "http://mikareyes.substack.com/",
  phantombuster: "https://phantombuster.com/",
  deel: "https://get.deel.com/mbs491remo80",
  ramp: "https://ramp.com/?rc=32UCQH&referral_location=login",
  gusto: "https://gusto.com/r/mika07e8",
  mercury: "https://mercury.com/r/parallax-labs",
  cometeer: "https://cometeer.com/get-started?code=T7shdZ",
  glowbar: "https://blvd.app/@glowbar/refer/MIKAELA-717659",
  granola: "https://join.granola.ai/t/vhhbzajvu7",
  wisprFlow: "https://wisprflow.ai/r?MIKAELA1",
  cursor: "https://cursor.com/referral?code=W5VDPGO8R3BO",
} as const;

export const productLinks: ProductLink[] = [
  {
    id: "fish-audio",
    name: "Fish Audio",
    description:
      "Expressive voice AI for real-time text-to-speech and voice cloning in 83 languages.",
    href: U.fishAudio,
    categories: ["ai"],
  },
  {
    id: "granola",
    name: "Granola",
    description:
      "AI meeting notes with no bot on the call. Two free months of Business with this link.",
    href: U.granola,
    categories: ["ai", "work"],
  },
  {
    id: "wispr-flow",
    name: "Wispr Flow",
    description: "Voice dictation into any text field. One free month of Pro.",
    href: U.wisprFlow,
    categories: ["ai"],
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-native code editor for real projects. $20 credit toward Pro.",
    href: U.cursor,
    categories: ["ai"],
  },
  {
    id: "capital-venture-x",
    name: "Capital Venture X",
    description:
      "Premium travel card — cheaper annual fee than CSR with similar benefits.",
    href: U.capitalVentureX,
    categories: ["finance"],
  },
  {
    id: "chase-freedom-unlimited",
    name: "Chase Freedom Unlimited",
    description: "Free cash-back card that pairs well with Chase Sapphire cards.",
    href: U.chaseFreedomUnlimited,
    categories: ["finance"],
  },
  {
    id: "m1-finance",
    name: "M1 Finance",
    description: "Roboadvisor.",
    href: U.m1Finance,
    categories: ["finance"],
  },
  {
    id: "monarch-money",
    name: "Monarch Money",
    description: "Budgeting app — I've replaced my spreadsheets with this.",
    href: U.monarchMoney,
    categories: ["finance"],
  },
  {
    id: "facet-wealth",
    name: "FacetWealth",
    description:
      "Fiduciary financial planning — legally obligated to act in your interest.",
    href: U.facetWealth,
    categories: ["finance"],
  },
  {
    id: "etrade",
    name: "Etrade",
    description: "Best UI I've found for investments and trades.",
    href: U.etrade,
    categories: ["finance"],
  },
  {
    id: "coinbase",
    name: "Coinbase",
    description: "Crypto!! Get $10 of free Bitcoin.",
    href: U.coinbase,
    categories: ["finance"],
  },
  {
    id: "cadence",
    name: "Cadence",
    description: "Best travel companion capsules. $15 off your first order.",
    href: U.cadence,
    categories: ["physical"],
  },
  {
    id: "remento",
    name: "Remento",
    description:
      "Weekly prompts to parents — stories crafted into a beautiful book. $15 off.",
    href: U.remento,
    categories: ["physical"],
  },
  {
    id: "notion",
    name: "Notion",
    description: "Where my second brain lives.",
    href: U.notion,
    categories: ["work"],
  },
  {
    id: "substack",
    name: "Substack",
    description: "Home of my newsletter.",
    href: U.substack,
    categories: ["work"],
  },
  {
    id: "phantombuster",
    name: "Phantombuster",
    description: "Outbound automation for social media and more.",
    href: U.phantombuster,
    categories: ["work"],
  },
  {
    id: "deel",
    name: "Deel",
    description: "Hire international contractors compliantly.",
    href: U.deel,
    categories: ["work"],
  },
  {
    id: "ramp",
    name: "Ramp",
    description: "Expense management for your business. $500 from our referral code.",
    href: U.ramp,
    categories: ["work"],
  },
  {
    id: "gusto",
    name: "Gusto",
    description: "Simple HR management platform.",
    href: U.gusto,
    categories: ["work"],
  },
  {
    id: "mercury",
    name: "Mercury",
    description: "Best business bank account I've used.",
    href: U.mercury,
    categories: ["work", "finance"],
  },
  {
    id: "cometeer",
    name: "Cometeer",
    description: "The best coffee ever. $25 off your first 32 cups.",
    href: U.cometeer,
    categories: ["food"],
  },
  {
    id: "glowbar",
    name: "Glowbar",
    description: "Fast facials in the U.S.",
    href: U.glowbar,
    categories: ["services"],
  },
];

export function categoryLabel(category: ProductLinkCategoryId): string {
  const match = productLinkCategories.find((item) => item.id === category);
  return match?.label ?? category;
}

export const siteConfig = {
  name: "Pausio.eu",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pausio.eu",
  description:
    "One simple timer padlock, three lockable boxes, and a practical way to put distractions out of reach.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@pausio.eu",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
} as const;

export type CampaignVariant =
  | "general"
  | "phone_detox"
  | "snack_control"
  | "study_focus"
  | "gaming_breaks"
  | "alcohol_moderation";

export const campaignMessages: Record<
  CampaignVariant,
  { headline: string; copy: string; cta: string; highlight?: string }
> = {
  general: {
    headline: "Lock distractions away. Get your time back.",
    copy: "Phones. Snacks. Alcohol. Distractions. Lock them away, set the timer, and let future-you deal with it later.",
    cta: "Shop Pausio.eu",
  },
  phone_detox: {
    headline: "Your phone can’t scroll from inside a box.",
    copy: "Put the phone away, set the timer, and give your attention somewhere better to be.",
    cta: "Put your phone in jail",
    highlight: "phone-detox",
  },
  snack_control: {
    headline: "Chocolate can wait. Really.",
    copy: "Make the decision once, lock the snacks away, and stop renegotiating every ten minutes.",
    cta: "Meet your snack supervisor",
    highlight: "snack-control",
  },
  study_focus: {
    headline: "Less scrolling. More doing.",
    copy: "A physical boundary for the device that keeps turning one quick check into forty minutes.",
    cta: "Make focus easier",
    highlight: "study-focus",
  },
  gaming_breaks: {
    headline: "Your controller has a bedtime.",
    copy: "Set the break before one more round becomes six. Future-you does not get a vote.",
    cta: "Take back the evening",
    highlight: "gaming-breaks",
  },
  alcohol_moderation: {
    headline: "You said two beers. We trust 6 PM you.",
    copy: "Make a practical choice early, then put the rest outside the negotiation.",
    cta: "See how Pausio.eu works",
    highlight: "alcohol-moderation",
  },
};

export function getCampaignVariant(value?: string | null): CampaignVariant {
  return value && value in campaignMessages ? (value as CampaignVariant) : "general";
}

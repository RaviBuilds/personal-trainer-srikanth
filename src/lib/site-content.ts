export type SiteAsset = {
  src: string;
  alt: string;
};

export type SiteService = {
  published: boolean;
  href: string;
  label: string;
};

export const siteContent = {
  draftPreview: true,
  name: "Shrikant",
  brand: "SHRIKANT",
  descriptor: "PERSONAL TRAINING",
  instagram: "https://www.instagram.com/_srikanth_goud_350_/",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  contact: { email: "", phone: "", whatsapp: "" },
  navigation: [
    { label: "The approach", href: "#approach" },
    { label: "Coaching", href: "#coaching" },
    { label: "FAQs", href: "#faqs" },
  ],
  services: {
    inPerson: { published: true, href: "/services/in-person-personal-training-hyderabad/", label: "In-person training" },
    online: { published: true, href: "/services/online-personal-training/", label: "Online coaching" },
    weightLoss: { published: false, href: "/services/weight-loss-personal-trainer-hyderabad/", label: "Weight-loss coaching" },
    strength: { published: false, href: "/services/strength-and-muscle-coaching-hyderabad/", label: "Strength coaching" },
    atHome: { published: false, href: "/services/personal-trainer-at-home-hyderabad/", label: "At-home training" },
  } satisfies Record<string, SiteService>,
  assets: {
    hero: { src: "/images/hero-coaching.png", alt: "Temporary editorial image of a trainer coaching a client through a strength movement" },
    coach: { src: "/images/coach-portrait.png", alt: "Temporary editorial portrait of a fitness coach in a training studio" },
    detail: { src: "/images/training-detail.png", alt: "Temporary editorial image of a training notebook and kettlebell on a wooden bench" },
  } satisfies Record<string, SiteAsset>,
  draftGallery: [
    { src: "/images/training-detail.png", alt: "Temporary training detail image, to be replaced with approved brand photography" },
    { src: "/images/coach-portrait.png", alt: "Temporary coach portrait, to be replaced with an approved trainer photograph" },
  ],
  draftPrices: [],
  draftStats: [],
  showTransformationDemo: false,
} as const;

export type SiteContent = typeof siteContent;

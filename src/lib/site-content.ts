export const siteContent = {
  name: "Shrikant",
  brand: "SHRIKANT",
  instagram: "https://www.instagram.com/_srikanth_goud_350_/",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  contact: { email: "", phone: "", whatsapp: "" },
  showTransformationDemo: true,
  services: {
    inPerson: { published: true, href: "/services/in-person-personal-training-hyderabad/" },
    online: { published: true, href: "/services/online-personal-training/" },
    weightLoss: { published: false, href: "/services/weight-loss-personal-trainer-hyderabad/" },
    strength: { published: false, href: "/services/strength-and-muscle-coaching-hyderabad/" },
    atHome: { published: false, href: "/services/personal-trainer-at-home-hyderabad/" },
  },
  assets: {
    hero: { src: "/images/hero-coaching.png", alt: "A trainer coaching a client through a strength movement" },
    coach: { src: "/images/coach-portrait.png", alt: "Portrait of a fitness coach in a training studio" },
    detail: { src: "/images/training-detail.png", alt: "Training notebook and kettlebell on a wooden bench" },
  },
} as const;

export type SiteContent = typeof siteContent;

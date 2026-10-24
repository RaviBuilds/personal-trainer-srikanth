import type { Metadata } from "next";

export type SiteAsset = { src: string; alt: string };
export type SiteService = { published: boolean; href: string; label: string };
export type ProgressStory = { id: string; before: SiteAsset; after: SiteAsset; beforeCaption: string; afterCaption: string; approvedQuote?: string; approvedResult?: string };

export const siteContent = {
  draftPreview: true,
  name: "Shrikant",
  brand: "SHRIKANT",
  descriptor: "PERSONAL TRAINING",
  instagram: "https://www.instagram.com/_srikanth_goud_350_/",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  contact: { email: "", phone: "", whatsapp: "", enquiryEndpoint: "" },
  credibility: { clients: "XX+", years: "XX", sessions: "XX+" },
  navigation: [{ label: "Approach", href: "#approach" }, { label: "Formats", href: "#formats" }, { label: "Goals", href: "#goals" }, { label: "FAQs", href: "#faqs" }],
  services: {
    inPerson: { published: true, href: "/services/in-person-personal-training-hyderabad/", label: "In-person training" },
    online: { published: true, href: "/services/online-personal-training/", label: "Online coaching" },
    weightLoss: { published: false, href: "/services/weight-loss-personal-trainer-hyderabad/", label: "Weight-loss coaching" },
    strength: { published: false, href: "/services/strength-and-muscle-coaching-hyderabad/", label: "Strength coaching" },
    atHome: { published: false, href: "/services/personal-trainer-at-home-hyderabad/", label: "At-home training" },
  } satisfies Record<string, SiteService>,
  assets: {
    hero: { src: "/images/hero-coaching-v2.png", alt: "Temporary editorial image of a coach guiding a client through a strength movement" },
    coach: { src: "/images/coach-portrait.png", alt: "Temporary editorial portrait of a fitness coach in a training studio" },
    detail: { src: "/images/training-detail.png", alt: "Temporary editorial image of training equipment and notes" },
    formats: {
      gym: { src: "/images/gym-training.png", alt: "Temporary editorial image of gym-based strength training" },
      home: { src: "/images/home-training.png", alt: "Temporary editorial image of training in a home setting" },
      online: { src: "/images/online-coaching.png", alt: "Temporary editorial image of online coaching at home" },
    },
    goals: {
      strength: { src: "/images/gym-training.png", alt: "Temporary editorial image representing strength training" },
      conditioning: { src: "/images/conditioning-training.png", alt: "Temporary editorial image representing cardio and conditioning" },
      mobility: { src: "/images/mobility-training.png", alt: "Temporary editorial image representing mobility practice" },
    },
  },
  progressGallery: { enabled: true, published: false, stories: [] as ProgressStory[] },
  programmes: [
    { id: "strength", title: "Strength training", summary: "Build a consistent practice around foundational strength work.", suits: "People who want to work on strength with a clear, progressive routine.", approach: "Compound movements, accessory work, manageable progression, and technique practice.", setting: "A gym or home setup with the equipment needed for the selected movements." },
    { id: "conditioning", title: "Cardio and conditioning", summary: "Develop your ability to work, recover, and repeat effort.", suits: "People who want more structure around cardiovascular fitness and work capacity.", approach: "Intervals, steady efforts, and conditioning circuits arranged around experience and available time.", setting: "A gym, outdoor space, or clear home floor area depending on the session design." },
    { id: "fat-loss", title: "Fat-loss training", summary: "Support a fat-loss goal without fixed-result promises.", suits: "People who want a structured training routine alongside their broader health choices.", approach: "Strength and conditioning sessions shaped around consistency, recovery, and a maintainable routine.", setting: "A gym, home, or outdoor setting with the equipment available for the plan." },
    { id: "muscle-building", title: "Muscle building", summary: "Organise resistance training around building muscle and healthy weight gain.", suits: "People who want a clearer resistance-training direction.", approach: "Planned resistance work, progressive overload, recovery habits, and practical guidance where selected.", setting: "Usually a gym or a home setup with suitable resistance equipment." },
    { id: "beginner", title: "Beginner fitness", summary: "A straightforward place to start if structured training is new to you.", suits: "People who want clear exercise guidance and a manageable pace.", approach: "Fundamental movement patterns, simple session structure, gradual practice, and room to build confidence.", setting: "A gym, home, or clear floor space depending on the agreed format." },
    { id: "mobility", title: "Mobility and flexibility", summary: "Make mobility practice a more intentional part of your week.", suits: "People who want to work on movement range and flexibility.", approach: "Regular mobility drills, controlled range work, and flexibility practice matched to current ability.", setting: "A clear, stable floor area; an optional mat may be useful." },
  ],
  draftServices: [
    { id: "in-person", enabled: true, draft: true, title: "In-person training", description: "Face-to-face sessions at a client location or gym, with the exact setting kept configurable.", preparation: "Clear floor space, a stable surface, water, and an optional mat may help." },
    { id: "online", enabled: true, draft: true, title: "Online training", description: "Remote coaching built around the space, schedule, and format that suits the client.", preparation: "A camera device, stable internet, adequate lighting, and clear floor space can help." },
    { id: "plan-only", enabled: true, draft: true, title: "Training-plan coaching", description: "A written training direction with editable check-in and review details.", preparation: "The plan can be designed around the equipment and time available." },
  ],
  draftPrices: [
    { id: "online-plan", category: "training-only", title: "Online plan and check-ins", detail: "No live sessions", monthly: 3000 },
    { id: "online-8", category: "training-only", title: "Online 1:1 training", detail: "8 sessions/month", monthly: 8000 },
    { id: "online-12", category: "training-only", title: "Online 1:1 training", detail: "12 sessions/month", monthly: 12000 },
    { id: "in-person-12", category: "training-only", title: "In-person/home training", detail: "12 sessions/month", monthly: 14000 },
  ],
} as const;
export type SiteContent = typeof siteContent;

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  return { title: `${title} | ${siteContent.name}`, description, robots: siteContent.draftPreview ? { index: false, follow: false } : { index: true, follow: true }, ...(siteContent.domain ? { alternates: { canonical: `${siteContent.domain.replace(/\/$/, "")}${path}` } } : {}) };
}

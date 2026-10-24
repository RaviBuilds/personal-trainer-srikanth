import type { Metadata } from "next";

export type SiteAsset = { src: string; alt: string };
export type SiteService = { published: boolean; href: string; label: string };
export type ProgressStory = { id: string; before: SiteAsset; after: SiteAsset; beforeCaption: string; afterCaption: string; approvedQuote?: string; approvedResult?: string };
export type PriceOption = { id: string; category: "training-only" | "nutrition-only" | "combined"; title: string; detail: string; monthly: number };

export const siteContent = {
  draftPreview: true,
  name: "Shrikant",
  brand: "SHRIKANT",
  descriptor: "PERSONAL TRAINING",
  instagram: "https://www.instagram.com/_srikanth_goud_350_/",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  contact: { email: "", phone: "", whatsapp: "", enquiryEndpoint: "" },
  credibility: { clients: "", years: "", sessions: "" },
  profile: { qualifications: "", experience: "", achievements: "" },
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
  progressGallery: { enabled: true, published: false, stories: [
    { id: "story-one", before: { src: "/images/home-training.png", alt: "Placeholder before image slot for a future approved progress story" }, after: { src: "/images/conditioning-training.png", alt: "Placeholder after image slot for a future approved progress story" }, beforeCaption: "Before image placeholder", afterCaption: "After image placeholder" },
    { id: "story-two", before: { src: "/images/gym-training.png", alt: "Placeholder before image slot for a future approved progress story" }, after: { src: "/images/mobility-training.png", alt: "Placeholder after image slot for a future approved progress story" }, beforeCaption: "Before image placeholder", afterCaption: "After image placeholder" },
    { id: "story-three", before: { src: "/images/online-coaching.png", alt: "Placeholder before image slot for a future approved progress story" }, after: { src: "/images/training-detail.png", alt: "Placeholder after image slot for a future approved progress story" }, beforeCaption: "Before image placeholder", afterCaption: "After image placeholder" },
    { id: "story-four", before: { src: "/images/hero-coaching.png", alt: "Placeholder before image slot for a future approved progress story" }, after: { src: "/images/coach-portrait.png", alt: "Placeholder after image slot for a future approved progress story" }, beforeCaption: "Before image placeholder", afterCaption: "After image placeholder" },
  ] as ProgressStory[] },
  nutritionModule: { enabled: true, title: "Nutrition and recovery guidance", copy: "General education around hydration, workout fuelling, recovery habits, sleep, and consistency can sit alongside training. It is practical guidance, not medical advice or a treatment plan.", detail: "The focus is on habits you can understand and repeat, with any personal health questions directed to an appropriate qualified professional." },
  programmes: [
    { id: "strength", title: "Strength", summary: "Build a consistent practice around foundational resistance work.", approach: "This can include movement patterns, technique practice, manageable progression, and accessory work shaped around your experience and equipment." },
    { id: "conditioning", title: "Cardio and conditioning", summary: "Develop your ability to work, recover, and repeat effort.", approach: "This can include intervals, steady efforts, and conditioning circuits arranged around your current ability, available time, and preferred setting." },
    { id: "fat-loss", title: "Fat loss", summary: "Support a fat-loss goal with a maintainable training routine.", approach: "This can include strength and conditioning sessions, repeatable weekly structure, and recovery habits that support consistency without promising a fixed result." },
    { id: "muscle-building", title: "Muscle building and healthy weight gain", summary: "Organise resistance training around building muscle and healthy weight gain.", approach: "This can include planned resistance work, progressive overload, recovery habits, and practical general guidance where selected." },
    { id: "beginner", title: "Beginner fitness", summary: "A straightforward place to start if structured training is new to you.", approach: "This can include fundamental movement patterns, simple session structure, gradual practice, and clear guidance that helps build familiarity." },
    { id: "mobility", title: "Mobility and flexibility", summary: "Make mobility practice a more intentional part of your week.", approach: "This can include controlled range work, regular mobility drills, and flexibility practice matched to your current ability." },
  ],
  delivery: [
    { id: "gym", title: "Gym-based personal training", description: "Face-to-face coaching in a gym setting, with exercises demonstrated, coached, and adjusted in the session.", preparation: "Bring the gym access you use, water, and comfortable training clothes. Any membership or venue charge is kept as a separate configurable pricing detail." },
    { id: "home", title: "Personal training at your location", description: "Practical face-to-face training shaped around the space and equipment available at your home or agreed location.", preparation: "A clear floor area, stable non-slip surface, water, and a mat if useful. Exact equipment and travel details remain configurable." },
    { id: "online", title: "Online personal training", description: "Remote coaching with a plan and live guidance shaped around your schedule, space, and equipment.", preparation: "Use a phone or laptop with camera, stable internet, adequate lighting, and clear floor space. A mat is optional; camera placement helps the coach see your movement." },
  ],
  draftPrices: [
    { id: "online-plan", category: "training-only", title: "Online plan and check-ins", detail: "Training-only · no live sessions", monthly: 3000 },
    { id: "online-8", category: "training-only", title: "Online 1:1 training", detail: "Training-only · 8 sessions/month", monthly: 8000 },
    { id: "online-12", category: "training-only", title: "Online 1:1 training", detail: "Training-only · 12 sessions/month", monthly: 12000 },
    { id: "in-person-12", category: "training-only", title: "Gym/home in-person training", detail: "Training-only · 12 sessions/month", monthly: 14000 },
    { id: "nutrition", category: "nutrition-only", title: "Nutrition and recovery guidance", detail: "Nutrition-only · general guidance", monthly: 4000 },
    { id: "online-combined", category: "combined", title: "Online 12-session training plus nutrition guidance", detail: "Combined · 12 sessions/month", monthly: 16000 },
    { id: "in-person-combined", category: "combined", title: "In-person 12-session training plus nutrition guidance", detail: "Combined · 12 sessions/month", monthly: 18000 },
  ] as PriceOption[],
} as const;
export type SiteContent = typeof siteContent;
export function pageMetadata(title: string, description: string, path = "/"): Metadata { return { title: `${title} | ${siteContent.name}`, description, robots: siteContent.draftPreview ? { index: false, follow: false } : { index: true, follow: true }, ...(siteContent.domain ? { alternates: { canonical: `${siteContent.domain.replace(/\/$/, "")}${path}` } } : {}) }; }

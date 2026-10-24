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
  programmes: [
    { id: "strength", title: "Strength training", summary: "Build a consistent practice around foundational strength work.", suits: "A useful direction for people who want to work on strength with a clear, progressive routine.", approach: "A goal-led mix of compound movements, accessory work, manageable progression, and technique practice.", setting: "A gym or home setup with the equipment needed for the selected movements.", nextStep: "Share your current experience, schedule, and preferred training setting." },
    { id: "conditioning", title: "Cardio and conditioning", summary: "Develop your ability to work, recover, and repeat effort.", suits: "A useful direction for people who want more structure around cardiovascular fitness and work capacity.", approach: "Intervals, steady efforts, and conditioning circuits can be arranged around your experience and available time.", setting: "A gym, outdoor space, or clear home floor area depending on the session design.", nextStep: "Describe the activities you enjoy and how much time you can train." },
    { id: "fat-loss", title: "Fat-loss training", summary: "Use practical training habits to support a fat-loss goal without fixed-result promises.", suits: "People who want a structured training routine alongside their own broader health and nutrition choices.", approach: "Strength and conditioning sessions shaped around consistency, recovery, and the routine you can maintain.", setting: "A gym, home, or outdoor setting with the equipment available for the plan.", nextStep: "Start with your routine, experience, and the kind of support you are looking for." },
    { id: "muscle-building", title: "Muscle-building and healthy weight gain", summary: "Create a structured training direction for building muscle and supporting healthy weight gain.", suits: "People who want to organise resistance training and eating habits around a muscle-building goal.", approach: "Planned resistance work, progressive overload, recovery habits, and practical nutrition guidance where selected.", setting: "Usually a gym or a home setup with suitable resistance equipment.", nextStep: "Share your current training and eating routine so the starting point is clear." },
    { id: "beginner", title: "Beginner fitness", summary: "A straightforward place to start if structured training is new to you.", suits: "People who want clear exercise guidance, an approachable pace, and a routine that feels manageable.", approach: "Fundamental movement patterns, simple session structure, gradual practice, and room to build confidence.", setting: "A gym, home, or clear floor space depending on the agreed format.", nextStep: "Tell us what feels new, difficult, or most important about starting." },
    { id: "mobility", title: "Mobility and flexibility", summary: "Make mobility practice a more intentional part of your week.", suits: "People who want to work on movement range and flexibility as part of general training.", approach: "Regular mobility drills, controlled range work, and flexibility practice matched to your current ability.", setting: "A clear, stable floor area; an optional mat may be useful.", nextStep: "Share which movements feel restricted and how you currently practise." },
  ],
  draftServices: [
    { id: "in-person", enabled: true, draft: true, title: "In-person training", description: "Face-to-face sessions at a client location or gym, with the exact setting and equipment kept configurable.", preparation: "Practical preparation may include clear floor space, a stable non-slip surface, water, and an optional mat." },
    { id: "online", enabled: true, draft: true, title: "Online training", description: "Remote coaching built around the space, schedule, and training format that suits the client.", preparation: "A device with a video-call camera, stable internet, adequate lighting, clear floor space, and an optional mat can make sessions easier to follow." },
    { id: "plan-only", enabled: true, draft: true, title: "Training-plan-only coaching", description: "A written training direction with editable check-in and review details, without assuming live sessions.", preparation: "The plan can be designed around the equipment and time available to the client." },
    { id: "nutrition-recovery", enabled: true, draft: true, title: "Nutrition and recovery support", description: "Practical support around nutrition habits and recovery alongside a training goal.", preparation: "The scope and format of guidance remain configurable for the final programme." },
  ],
  draftPrices: [
    { id: "online-plan", category: "training-only", title: "Online plan and check-ins", detail: "No live sessions", monthly: 3000, sessions: "Editable" },
    { id: "online-8", category: "training-only", title: "Online 1:1 training", detail: "8 sessions/month", monthly: 8000, sessions: 8 },
    { id: "online-12", category: "training-only", title: "Online 1:1 training", detail: "12 sessions/month", monthly: 12000, sessions: 12 },
    { id: "in-person-12", category: "training-only", title: "In-person/home training", detail: "12 sessions/month", monthly: 14000, sessions: 12 },
    { id: "nutrition", category: "nutrition-only", title: "Nutrition and recovery guidance", detail: "Guidance alone", monthly: 4000, sessions: "Not applicable" },
    { id: "online-combined", category: "combined", title: "Online 12-session training plus nutrition guidance", detail: "12 sessions/month", monthly: 16000, sessions: 12 },
    { id: "in-person-combined", category: "combined", title: "In-person 12-session training plus nutrition guidance", detail: "12 sessions/month", monthly: 18000, sessions: 12 },
  ],
  draftStats: [],
  showTransformationDemo: false,
} as const;

export type SiteContent = typeof siteContent;

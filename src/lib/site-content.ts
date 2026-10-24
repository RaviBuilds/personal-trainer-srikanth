import type { Metadata } from "next";
import { formatRupees, lowestMonthly } from "./pricing";
import { buildFooterNavGroups } from "./footer-nav";

export type SiteAsset = { src: string; alt: string };
export type SiteService = { published: boolean; href: string; label: string };
export type StoryImage = { src: string; alt: string; focalPoint: { x: number; y: number } };
export type StoryMetric = { label: string; before: number; after: number; unit: string };
export type ProgressStory = {
  id: string;
  /** True only with real before and after photos of the same person, written client consent and owner-confirmed figures. */
  verified?: boolean;
  goal: string;
  client: string;
  title: string;
  duration: string;
  format: string;
  quote: string;
  /** The first metric is the headline figure shown on the tab and on the photo seam. Changes are computed, never typed. */
  metrics: StoryMetric[];
  before: StoryImage;
  after: StoryImage;
};
export type ProgressStoriesConfig = {
  headingBefore: string;
  headingAccent: string;
  lede: string;
  paragraph: string[];
  disclaimer: string;
  effortMark: { line1: string; line2: string };
  cta: { label: string; message: string };
  /** Shown in place of the viewer when no story is cleared for display. */
  noStories: { title: string; body: string };
  labels: {
    region: string;
    previous: string;
    next: string;
    before: string;
    after: string;
    /** Accessible name of each tab: "{goal} {tabSuffix}". */
    tabSuffix: string;
  };
  stories: ProgressStory[];
};
export type PricingPlan = { id: string; name: string; meta: string; monthly: number; waMessage: string };
export type PricingTone = "white" | "cream" | "dark";
export type PricingGroup = {
  id: string;
  title: string;
  description: string;
  tone: PricingTone;
  tag?: string;
  cta?: { label: string; whatsappMessage: string };
  plans: PricingPlan[];
};
export type PricingConfig = {
  image: { src: string; alt: string; width: number; height: number; aspect: string; focalPoint: { x: number; y: number } };
  headline: { accent: string; rest: string };
  lede: { before: string; after: string };
  indexLabel: string;
  fromLabel: string;
  perMonthLabel: string;
  columns: { plan: string; monthly: string };
  rowLinkLabel: string;
  terms: { months: number; label: string }[];
  groups: PricingGroup[];
  help: { title: string; body: string; ctaLabel: string; callLabel: string };
  notes: string[];
  feesGuide: { before: string; linkLabel: string; href: string; after: string };
};
export type FormatIcon = "dumbbell" | "house" | "monitorPlay";
export type FormatFact = { value: string; unit?: string; label: string };
export type FormatCard = {
  id: string;
  icon: FormatIcon;
  chip: string;
  title: string;
  summary: string;
  facts: FormatFact[];
  bestFor: string[];
  ready: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string; objectPosition: string };
};

export type GoalIcon = "dumbbell" | "heartPulse" | "flame" | "trendingUp" | "sprout" | "move";
export type GoalDay = "session" | "light" | "rest";
export type GoalItem = {
  id: string;
  icon: GoalIcon;
  label: string;
  title: string;
  promise: string;
  description: string;
  includes: [string, string, string];
  week: [GoalDay, GoalDay, GoalDay, GoalDay, GoalDay, GoalDay, GoalDay];
  sessionsLabel: string;
  image: { src: string; fallback: string; alt: string; objectPosition: string };
  cta: { label: string; whatsappMessage: string };
  learnMore?: { label: string; href: string };
};

export type NutritionSlice = {
  id: string;
  tabLabel: string;
  name: string;
  hubValue: string;
  hubCaption: string;
  role: string;
  listLabel: string;
  options: string;
  tip: string;
};

export type ApproachIcon = "MessageCircle" | "SlidersHorizontal" | "Dumbbell" | "TrendingUp";
export type ApproachStep = {
  id: string;
  icon: ApproachIcon;
  timing: string;
  name: string;
  /** May contain one inline link token: <link text='...' href='...'/> */
  body: string;
  comfort: string;
};
export type ApproachConfig = {
  /** Anchor id of the homepage section. */
  anchorId: string;
  headingBefore: string;
  headingAccent: string;
  lede: string;
  stepsLabel: string;
  steps: ApproachStep[];
  cta: { title: string; body: string; primaryLabel: string; whatsappMessage: string; callLabel: string };
};

export type HeroStat = { value: number; suffix: string; label: string; icon: HeroIcon };

export type CoachSectionConfig = {
  headingBefore: string;
  headingAccent: string;
  lede: string;
  principles: { lead: string; text: string }[];
  languagesLine: string;
  image: {
    src: string;
    alt: string;
    /** Intrinsic size of the file on disk. */
    width: number;
    height: number;
    /** Reserved ratio for the stacked (mobile) layout, as a CSS aspect-ratio value. */
    aspect: string;
    /** Percentages used for object-position, so a different crop keeps the face in frame. */
    focalPoint: { x: number; y: number };
  };
};

export type InstagramReel = {
  /** A local video file. It is both the idle preview and the in-place player. */
  src: string;
  /** Short chip text shown on the idle card. */
  label: string;
  /** Accessible description of what the video shows. */
  description: string;
  /** Second of the video shown as the idle preview frame. */
  previewTime: number;
};
export type InstagramBenefitIcon = "dumbbell" | "activity" | "salad";
export type InstagramConfig = {
  handle: string;
  url: string;
  displayName: string;
  bio: string;
  avatar: SiteAsset;
  reels: InstagramReel[];
  headingBefore: string;
  headingAccent: string;
  lede: string;
  benefits: { icon: InstagramBenefitIcon; label: string }[];
  followLabel: string;
  seeAllLabel: string;
  labels: {
    reelsGroup: string;
    playReel: string;
    pauseReel: string;
    muteReel: string;
    previousReel: string;
    nextReel: string;
    /** Position readout under the rail on mobile. {current} and {total} are filled in. */
    reelPosition: string;
  };
};

// Shared values. The hero, the coach section and the contact links all read these, so each fact is written once.
const coachName = "Srikanth";
const instagramUrl = "https://www.instagram.com/_srikanth_goud_350_/";
const instagramHandle = "_srikanth_goud_350_";

const instagram: InstagramConfig = {
  handle: instagramHandle,
  url: instagramUrl,
  displayName: "Srikanth Gaddam",
  bio: "NASM CPT · In-person & online fitness coach",
  avatar: { src: "/images/instagram/profile.webp", alt: "Srikanth, fitness trainer in Hyderabad" },
  headingBefore: "Daily workout and diet tips, straight from the ",
  headingAccent: "gym floor.",
  lede: "Follow Srikanth, a fitness trainer in Hyderabad, on Instagram for daily workout updates, training tips, mobility drills and simple diet advice. New reels and client training moments go up regularly, so you can train along from home or the gym.",
  benefits: [
    { icon: "dumbbell", label: "Daily workout updates" },
    { icon: "activity", label: "Form and mobility tips" },
    { icon: "salad", label: "Simple diet and nutrition guidance" },
  ],
  followLabel: "Follow on Instagram",
  seeAllLabel: "See all reels",
  labels: {
    reelsGroup: "Instagram reels",
    playReel: "Play reel",
    pauseReel: "Pause reel",
    muteReel: "Mute reel",
    previousReel: "Previous reel",
    nextReel: "Next reel",
    reelPosition: "Reel {current} of {total}",
  },
  reels: [
    {
      src: "/images/instagram/reel-1.mp4",
      label: "Sled push",
      description: "A coach guiding a client through a weighted sled push on the gym turf",
      previewTime: 1,
    },
    {
      src: "/images/instagram/reel-2.mp4",
      label: "Core session",
      description: "A coach guiding a client through core exercises on the gym floor, from sit-ups to planks",
      previewTime: 1,
    },
    {
      src: "/images/instagram/reel-3.mp4",
      label: "Bench press",
      description: "A coach spotting a client on the barbell bench press",
      previewTime: 1,
    },
  ],
};
const languages = ["Telugu", "Hindi", "English"];
const joinList = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items.join(""));

const stats: HeroStat[] = [
  { value: 7, suffix: "+", label: "Years in fitness", icon: "calendar" },
  { value: 500, suffix: "+", label: "Clients trained", icon: "users" },
  { value: 2000, suffix: "+", label: "Sessions coached", icon: "activity" },
  { value: 300, suffix: "+", label: "Nutrition consultations", icon: "apple" },
];
// The first stat is the years of experience; the coach lede reads it so the text never drifts from the counter.
const [yearsStat] = stats;

const coachSection: CoachSectionConfig = {
  headingBefore: `Meet ${coachName}, a personal trainer in Hyderabad who coaches `,
  headingAccent: "the person, not just the workout.",
  lede: `${coachName} is a NASM-certified personal trainer with ${yearsStat.value}${yearsStat.suffix} years of experience coaching people in Hyderabad at the gym, at home and online. He keeps sessions simple, explains every exercise, and plans around your week, so training feels doable from the first day.`,
  principles: [
    { lead: "Form first, load later.", text: "Every exercise is explained and demonstrated before the weight goes up." },
    { lead: "Plans that fit your week.", text: "Gym, home or online, with sessions scheduled around your work and family." },
    { lead: "Honest check-ins.", text: "Regular reviews of training, food and recovery, so the plan keeps up with you." },
  ],
  languagesLine: `Coaches in ${joinList(languages)}. Online clients across India.`,
  image: {
    // The file on disk is 1408 x 768. The trainer stands at the horizontal centre, so a tall crop keeps him in frame.
    src: "/images/coach-portrait.png",
    alt: `${coachName}, a NASM-certified personal trainer in Hyderabad, standing in a gym`,
    width: 1408,
    height: 768,
    aspect: "4/5",
    focalPoint: { x: 50, y: 30 },
  },
};

const services = {
  inPerson: { published: true, href: "/services/in-person-personal-training-hyderabad/", label: "In-person training" },
  online: { published: true, href: "/services/online-personal-training/", label: "Online coaching" },
  weightLoss: { published: false, href: "/services/weight-loss-personal-trainer-hyderabad/", label: "Weight-loss coaching" },
  strength: { published: false, href: "/services/strength-and-muscle-coaching-hyderabad/", label: "Strength coaching" },
  atHome: { published: false, href: "/services/personal-trainer-at-home-hyderabad/", label: "At-home training" },
} satisfies Record<string, SiteService>;

export type HeroIcon = "dumbbell" | "house" | "monitor" | "calendar" | "users" | "activity" | "apple";

export type SectionIcon =
  | "target"
  | "calendarClock"
  | "history"
  | "briefcase"
  | "utensils"
  | "activity"
  | "monitorPlay";

const planMessage = (name: string, meta: string) =>
  `Hi Srikanth, I'm interested in ${name} (${meta.endsWith(".") ? meta.slice(0, -1) : meta}). Could you tell me more?`;
const plan = (id: string, name: string, meta: string, monthly: number): PricingPlan => ({ id, name, meta, monthly, waMessage: planMessage(name, meta) });

// Monthly fees only. Term totals are always monthly x months and are computed where they are shown.
const pricing: PricingConfig = {
  image: {
    // The file on disk is the WebP export of the pricing photograph (1916 x 821).
    src: "/images/pricing-session.webp",
    alt: "A personal trainer and a client reviewing a weekly training plan on a bench in a bright gym in Hyderabad",
    width: 1916,
    height: 821,
    aspect: "21/9",
    focalPoint: { x: 68, y: 40 },
  },
  headline: { accent: "Affordable", rest: " personal training prices in Hyderabad." },
  lede: {
    before: "Clear personal trainer fees in Hyderabad, from ",
    after: " a month. Choose training, nutrition guidance, or both.",
  },
  indexLabel: "Pricing groups",
  fromLabel: "from",
  perMonthLabel: "/month",
  columns: { plan: "Plan", monthly: "Per month" },
  rowLinkLabel: "Ask about this plan",
  terms: [
    { months: 3, label: "3 months" },
    { months: 6, label: "6 months" },
    { months: 12, label: "12 months" },
  ],
  groups: [
    {
      id: "training",
      title: "Training only",
      description: "Coaching built around your goal. Choose online or in person, and how many sessions a month.",
      tone: "white",
      plans: [
        plan("online-plan", "Online plan and check-ins", "A written plan with weekly check-ins. No live sessions.", 3000),
        plan("online-8", "Online 1:1 training", "8 live video sessions a month", 8000),
        plan("online-12", "Online 1:1 training", "12 live video sessions a month", 12000),
        plan("in-person-12", "Gym or home in-person training", "12 sessions a month at your gym or home", 14000),
      ],
    },
    {
      id: "nutrition",
      title: "Nutrition only",
      description: "Practical nutrition guidance from your fitness trainer, without the training sessions. A good fit if you already train.",
      tone: "cream",
      plans: [
        plan("nutrition-guidance", "Nutrition and recovery guidance", "Food, hydration, sleep and recovery guidance. General education, not medical advice.", 4000),
      ],
    },
    {
      id: "combined",
      title: "Training plus nutrition guidance",
      description: "Sessions and food guidance planned together, so what you do in the gym and what you eat work as one plan.",
      tone: "dark",
      tag: "Most complete",
      cta: {
        label: "Plan training and nutrition together",
        whatsappMessage: "Hi Srikanth, I'd like to plan training and nutrition together. Could you tell me more?",
      },
      plans: [
        plan("online-12-nutrition", "Online 12-session training plus nutrition guidance", "12 live video sessions a month, with nutrition guidance", 16000),
        plan("in-person-12-nutrition", "In-person 12-session training plus nutrition guidance", "12 sessions a month at your gym or home, with nutrition guidance", 18000),
      ],
    },
  ],
  help: {
    title: "Not sure which plan fits your week?",
    body: "Tell Srikanth your goal and your schedule on WhatsApp and he will suggest one.",
    ctaLabel: "Chat on WhatsApp",
    callLabel: "Call",
  },
  notes: [
    "Fees are for coaching, in Indian rupees. Longer terms are the monthly fee multiplied by the number of months.",
    "Gym membership or venue charges, where they apply, are separate and confirmed before you start.",
  ],
  // The guide at this route owns the "personal trainer fees in Hyderabad" topic.
  feesGuide: {
    before: "Comparing coaches? Read ",
    linkLabel: "personal trainer fees in Hyderabad: what affects the cost",
    href: "/guides/personal-trainer-fees-hyderabad/",
    after: ".",
  },
};

const approach: ApproachConfig = {
  // "#approach" is already used by the starting-point section that the header "Approach" link targets.
  anchorId: "process",
  headingBefore: "A personal training approach that starts with ",
  headingAccent: "you feeling at ease.",
  lede: "How Srikanth, a personal trainer in Hyderabad, coaches: no judgement, no jargon, no rushing. When you are comfortable you train honestly and tell him what you notice, and that honest feedback is what lets him adjust your plan.",
  stepsLabel: "The four steps of Srikanth's approach",
  steps: [
    { id: "understand", icon: "MessageCircle", timing: "Before session one", name: "Understand", body: "A relaxed conversation about your goal, your routine, your food habits, any injuries you have had and what you have tried before.", comfort: "You talk first. Nobody asks you to perform on day one." },
    { id: "plan", icon: "SlidersHorizontal", timing: "Week one", name: "Plan", body: "Together you agree a training direction that fits your starting point and the time you can realistically give it.", comfort: "You choose the pace and the format." },
    { id: "coach", icon: "Dumbbell", timing: "Every session", name: "Coach", body: "Clear, step-by-step guidance on every exercise, with form first and load later, in the format that suits your week: <link text='gym, home or online' href='#formats'/>.", comfort: "Questions are welcome at any point. Nothing is rushed or compared." },
    { id: "review", icon: "TrendingUp", timing: "Every four weeks", name: "Review", body: "You look at the signals that matter for your goal and routine, such as strength, stamina, energy and consistency, then adjust the approach.", comfort: "Your honest feedback is the most useful information. Say what works and what does not." },
  ],
  cta: {
    title: "Your first call is just a conversation.",
    body: "Tell Srikanth your goal and what worries you about starting. He will tell you what to expect, with no pressure to join.",
    primaryLabel: "Start with a conversation",
    whatsappMessage: "Hi Srikanth, I'd like to start with a conversation about personal training.",
    callLabel: "Or call {phone}",
  },
};

const progressStories: ProgressStoriesConfig = {
  headingBefore: "Personal training results in Hyderabad, built on ",
  headingAccent: "effort from both sides.",
  lede: "Srikanth brings 100% to every session, online and in person. When you bring yours, results are within reach.",
  paragraph: [
    "Srikanth coaches people across Hyderabad at the gym and at home, and clients across India online. As a weight loss personal trainer he builds fat-loss plans around strength training, steady cardio and food habits you can actually repeat. As a strength and muscle-gain coach he helps lean clients put on weight healthily and helps experienced lifters train with better form.",
    "Women train with him for fitness after pregnancy, for strength and fat-loss goals, and for confidence in the gym, including women who have PCOD or PCOS and whose doctor has said exercise is fine. He plans training and nutrition guidance around that advice and does not treat medical conditions. Beginners, busy professionals and people returning after a long break are welcome; every plan starts from where you are today.",
  ],
  disclaimer: "Individual client results, shared with their written consent. Results depend on starting point, consistency, food and recovery, and are not guaranteed. Nutrition guidance is general education, not medical advice.",
  effortMark: { line1: "100%", line2: "effort" },
  cta: {
    label: "Start your own story",
    message: "Hi Srikanth, I saw the progress stories on your website and I'd like to start my own. Could we talk about my goal?",
  },
  noStories: {
    title: "Curious what is realistic for your goal?",
    body: "Tell Srikanth where you are starting from and he will tell you honestly what to expect.",
  },
  labels: {
    region: "Client progress stories",
    previous: "Previous story",
    next: "Next story",
    before: "Before",
    after: "After",
    tabSuffix: "story",
  },
  stories: [
    {
      id: "weight-loss",
      verified: false,
      goal: "Weight loss",
      client: "Anita K., 34",
      title: "Fat loss through strength training, steady cardio and simple food habits",
      duration: "9 months",
      format: "Gym training with nutrition guidance",
      quote: "I stopped dreading the gym. Srikanth explained every exercise, so I always knew why I was doing it.",
      metrics: [
        { label: "Body weight", before: 80, after: 65, unit: "kg" },
        { label: "Body fat", before: 38, after: 29, unit: "%" },
        { label: "Waist", before: 96, after: 83, unit: "cm" },
      ],
      before: { src: "/images/home-training.png", alt: "Before: Anita at the start of training", focalPoint: { x: 50, y: 40 } },
      after: { src: "/images/conditioning-training.png", alt: "After: Anita after 9 months of training", focalPoint: { x: 52, y: 40 } },
    },
    {
      id: "muscle-gain",
      verified: false,
      goal: "Muscle gain",
      client: "Rohit S., 27",
      title: "Lean muscle and healthy weight gain, built session by session",
      duration: "10 months",
      format: "In-person training with nutrition guidance",
      quote: "He pushed me when I was ready and slowed me down when my form slipped. That is how I finally gained properly.",
      metrics: [
        { label: "Body weight", before: 58, after: 65, unit: "kg" },
        { label: "Squat, 5 reps", before: 40, after: 80, unit: "kg" },
        { label: "Pull-ups", before: 0, after: 6, unit: "reps" },
      ],
      before: { src: "/images/gym-training.png", alt: "Before: Rohit at the start of training", focalPoint: { x: 46, y: 55 } },
      after: { src: "/images/mobility-training.png", alt: "After: Rohit after 10 months of training", focalPoint: { x: 50, y: 40 } },
    },
    {
      id: "after-pregnancy",
      verified: false,
      goal: "After pregnancy",
      client: "Sneha R., 31",
      title: "Returning to strength after pregnancy, at home and at her own pace",
      duration: "8 months",
      format: "Home training, started after her doctor's clearance",
      quote: "Nobody rushed me. We started with what I could do and built from there, once my doctor said I could begin.",
      metrics: [
        { label: "Waist", before: 94, after: 82, unit: "cm" },
        { label: "Plank hold", before: 20, after: 120, unit: "sec" },
        { label: "Body weight", before: 71, after: 63, unit: "kg" },
      ],
      before: { src: "/images/online-coaching.png", alt: "Before: Sneha at the start of training", focalPoint: { x: 70, y: 45 } },
      after: { src: "/images/training-detail.png", alt: "After: Sneha after 8 months of training", focalPoint: { x: 62, y: 50 } },
    },
    {
      id: "online-fitness",
      verified: false,
      goal: "Online fitness",
      client: "Karthik M., 38",
      title: "Online coaching that fit around a full work week",
      duration: "6 months",
      format: "Online 1:1 training with weekly check-ins",
      quote: "The weekly check-ins kept me honest, and the sessions fitted around my meetings.",
      metrics: [
        { label: "Body weight", before: 88, after: 79, unit: "kg" },
        { label: "Waist", before: 102, after: 92, unit: "cm" },
        { label: "Training days a week", before: 1, after: 4, unit: "days" },
      ],
      before: { src: "/images/hero-coaching.png", alt: "Before: Karthik at the start of training", focalPoint: { x: 44, y: 40 } },
      after: { src: "/images/coach-portrait.png", alt: "After: Karthik after 6 months of training", focalPoint: { x: 50, y: 30 } },
    },
  ],
};

/**
 * The single gate for progress stories. A story renders when it is verified, when the app is not a
 * production build, or when NEXT_PUBLIC_SHOW_PROGRESS_STORIES is "true".
 */
export function getVisibleStories(): ProgressStory[] {
  const showAll = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PROGRESS_STORIES === "true";
  return progressStories.stories.filter((story) => story.verified === true || showAll);
}

export type ContactTopic = { id: string; label: string; sentence: string };
export type ContactField = { label: string; placeholder: string; error: string; maxLength: number };
export type ContactCardConfig = {
  headingBefore: string;
  headingAccent: string;
  lede: string;
  topicsLabel: string;
  topics: ContactTopic[];
  nameField: ContactField;
  messageField: ContactField;
  submitLabel: string;
  helper: string;
  callPrefix: string;
  note: string;
  /** The text sent to WhatsApp. {coach} and {name} are filled in; the message goes between the greeting and the signature. */
  compose: { greeting: string; signature: string };
  /** Shown after WhatsApp is opened. It never says the message was sent. */
  opening: { before: string; linkLabel: string; after: string };
  noscriptLabel: string;
};

const contactCard: ContactCardConfig = {
  headingBefore: "Don't wait for Monday. You are ",
  headingAccent: "one message away.",
  lede: `Tell ${coachName} your name and what you want to work on. Your message opens in WhatsApp, ready to send, and he will reply with how he can help you plan your personal training or nutrition in Hyderabad.`,
  topicsLabel: "Suggested topics",
  topics: [
    { id: "fat-loss", label: "Fat loss", sentence: "I want to lose fat and get fitter." },
    { id: "muscle-gain", label: "Muscle gain", sentence: "I want to build muscle and strength." },
    { id: "beginner", label: "Beginner fitness", sentence: "I am a beginner and want to start training safely." },
    { id: "online", label: "Online coaching", sentence: "I am interested in online coaching." },
    { id: "nutrition", label: "Nutrition guidance", sentence: "I would like nutrition guidance along with training." },
  ],
  nameField: { label: "Your name", placeholder: "Enter your name", error: "Please enter your name.", maxLength: 60 },
  messageField: {
    label: "What would you like to work on?",
    placeholder: "For example: I want to lose weight and build strength, and I can train after 7 pm.",
    error: "Please write a short message.",
    maxLength: 500,
  },
  submitLabel: "Send on WhatsApp",
  helper: `This opens WhatsApp with your message ready. Press send there to reach ${coachName}.`,
  callPrefix: "Prefer to talk? Call",
  note: "Please avoid sharing medical details in this message.",
  compose: { greeting: "Hi {coach}, my name is {name}.", signature: "\u2014 sent from your website" },
  opening: { before: "Opening WhatsApp\u2026 If it did not open, ", linkLabel: "tap here", after: "." },
  noscriptLabel: `Message ${coachName} on WhatsApp`,
};

const images = {
  contactCard: {
    // The same portrait file as the coach section, with a different focal point so the two crops are not identical.
    // The file is landscape, so in a tall crop only the horizontal value moves the frame.
    src: coachSection.image.src,
    alt: `${coachName}, personal trainer in Hyderabad, ready to answer your message`,
    aspect: "4/5",
    focalPoint: { x: 57, y: 20 },
  },
};

// Site footer. Link groups live in footer-nav.ts (so the link-check script can read them); everything else is here.
const footer = {
  brandName: `${coachName} Personal Training`,
  blurb: `${coachName} is a NASM-certified personal trainer in Hyderabad, coaching clients one-to-one at the gym, at home and online. Training and nutrition guidance are built around your goals, with a clear plan and honest progress reviews.`,
  whatsappLabel: "Chat on WhatsApp",
  contactTitle: "Contact",
  locality: "Hyderabad, Telangana",
  navGroups: buildFooterNavGroups(coachName),
  legalLinks: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Disclaimer", href: "/disclaimer/" },
  ],
  note: { before: "Fitness and nutrition guidance on this site is general education, not ", linkLabel: "medical advice", linkHref: "/disclaimer/", after: "." },
  credit: { prefix: "Designed and developed by", label: "Blogspage AI", href: "https://www.blogspage.com/" },
};

export const siteContent = {
  draftPreview: true,
  name: coachName,
  brand: "SRIKANTH",
  descriptor: "PERSONAL TRAINING",
  logo: { src: "/images/SRIKANTH-Personal-Training-logo.png", alt: "Srikanth Personal Training" },
  jobTitle: "Personal Trainer",
  languages,
  instagram,
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  contact: {
    email: "", phone: "", whatsapp: "",
    phoneDisplay: "+91 91004 34337",
    phoneTel: "+919100434337",
    whatsappNumber: "919100434337",
    whatsappMessage: "Hi Srikanth, I found your website and I'd like to know more about personal training.",
    floatingLabel: "Chat with Srikanth",
  },
  credibility: { clients: "", years: "", sessions: "" },
  profile: { qualifications: "", experience: "", achievements: "" },
  navigation: [{ label: "Approach", href: "#approach" }, { label: "Formats", href: "#formats" }, { label: "Goals", href: "#goals" }, { label: "FAQs", href: "#faqs" }],
  services,
  hero: {
    eyebrow: "Personal training in Hyderabad",
    lead: "Coaching shaped around your goals, schedule and starting point, at the gym, at your home, or online.",
    pathways: [
      { label: "At the gym", href: services.inPerson.href, icon: "dumbbell" },
      { label: "At your home", href: services.inPerson.href, icon: "house" },
      { label: "Online coaching", href: services.online.href, icon: "monitor" },
    ] as { label: string; href: string; icon: HeroIcon }[],
    whatsappLabel: "Chat on WhatsApp",
    callLabel: "Call",
    credential: "NASM Certified Personal Trainer",
    rating: { score: "4.9", count: "120+", source: "Google" },
    regionLabel: "Hyderabad · Online · In person",
    stats,
  },
  assets: {
    hero: { src: "/images/hero-coaching-v2.png", alt: "Trainer guiding a client through a dumbbell squat in a bright training studio" },
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
  progressStories,
  nutritionWheel: {
    enabled: true,
    image: {
      src: "/images/nutrition-wheel.png",
      alt: "Overhead view of everyday Indian foods and recovery items in six sections: protein, carbs, vegetables, healthy fats, water, and sleep and recovery",
      width: 1254,
      height: 1254,
      aspect: "1 / 1",
      focalPoint: "50% 50%",
    },
    // Extra rotation (degrees) added to every slice position, for fine alignment of the photograph.
    angleOffsetDeg: 0,
    headline: { before: "Training works better when ", accent: "food and recovery", after: " keep up." },
    lede: {
      before: "Nutrition guidance from a fitness trainer in Hyderabad, kept practical. Six everyday habits, with portions you can size up using your own hand. See how a ",
      linkLabel: "nutrition consultation",
      // No dedicated nutrition page exists yet, so this points at the contact card on the home page.
      linkHref: "#contact",
      after: " works.",
    },
    tabsLabel: "Nutrition topics",
    tipLabel: "Srikanth's tip",
    footnote: "Portions are a starting point. Your plan is adjusted to your goal, routine and food preferences.",
    caption: "General education only, not medical advice or a treatment plan. For personal health questions, please see a qualified professional.",
    prevLabel: "Previous topic",
    nextLabel: "Next topic",
    cta: { label: "Ask about nutrition guidance", whatsappMessage: "Hi Srikanth, I'd like to know about nutrition guidance." },
    slices: [
      { id: "protein", tabLabel: "Protein", name: "Protein", hubValue: "1 palm", hubCaption: "at every main meal", role: "Protein helps your body repair and build after training, and keeps you full between meals.", listLabel: "Everyday options", options: "Dal, eggs, paneer, curd, chicken, fish, sprouts, soya chunks", tip: "Spread it across the day instead of one big dinner." },
      { id: "carbs", tabLabel: "Carbs", name: "Smart carbs", hubValue: "1 handful", hubCaption: "cooked, per meal. More on hard training days", role: "Carbs fuel your sessions. The aim is steady energy, not cutting them out.", listLabel: "Everyday options", options: "Roti, brown or red rice, oats, poha, ragi, sweet potato, banana, fruit", tip: "Keep most of your carbs in the meals before and after training." },
      { id: "vegetables", tabLabel: "Vegetables", name: "Vegetables and fibre", hubValue: "2 fists", hubCaption: "at lunch and dinner", role: "Vegetables bring fibre, vitamins and volume, which helps digestion and keeps meals filling.", listLabel: "Everyday options", options: "Palak, bhindi, beans, carrot, cucumber, tomato, cauliflower, salads", tip: "Add one vegetable you already enjoy to every meal before changing anything else." },
      { id: "fats", tabLabel: "Fats", name: "Healthy fats", hubValue: "1 thumb", hubCaption: "per meal", role: "Fats help you absorb some vitamins and make meals satisfying. A little goes a long way.", listLabel: "Everyday options", options: "Peanuts, almonds, walnuts, flaxseeds, coconut, a teaspoon of ghee, groundnut oil", tip: "Measure your oil and ghee for a week. Most of us pour more than we think." },
      { id: "water", tabLabel: "Water", name: "Water and hydration", hubValue: "2\u20133 litres", hubCaption: "a day. More in summer", role: "Even mild dehydration makes training feel harder. Water is the simplest habit to fix.", listLabel: "Everyday options", options: "Water, buttermilk, coconut water, nimbu pani without sugar, plain tea", tip: "Keep a bottle in sight and finish one before you leave for the gym." },
      { id: "recovery", tabLabel: "Recovery", name: "Sleep and recovery", hubValue: "7\u20139 hours", hubCaption: "of sleep, most nights", role: "Muscles adapt while you rest. Sleep and rest days are part of the plan, not time off from it.", listLabel: "Habits that help", options: "A fixed bedtime, a screen-free last half hour, one full rest day, light walks, stretching, a foam roller", tip: "If you can only change one thing, fix your bedtime." },
    ] as NutritionSlice[],
  },
  programmes: [
    { id: "strength", title: "Strength", summary: "Build a consistent practice around foundational resistance work.", approach: "This can include movement patterns, technique practice, manageable progression, and accessory work shaped around your experience and equipment." },
    { id: "conditioning", title: "Cardio and conditioning", summary: "Develop your ability to work, recover, and repeat effort.", approach: "This can include intervals, steady efforts, and conditioning circuits arranged around your current ability, available time, and preferred setting." },
    { id: "fat-loss", title: "Fat loss", summary: "Support a fat-loss goal with a maintainable training routine.", approach: "This can include strength and conditioning sessions, repeatable weekly structure, and recovery habits that support consistency without promising a fixed result." },
    { id: "muscle-building", title: "Muscle building and healthy weight gain", summary: "Organise resistance training around building muscle and healthy weight gain.", approach: "This can include planned resistance work, progressive overload, recovery habits, and practical general guidance where selected." },
    { id: "beginner", title: "Beginner fitness", summary: "A straightforward place to start if structured training is new to you.", approach: "This can include fundamental movement patterns, simple session structure, gradual practice, and clear guidance that helps build familiarity." },
    { id: "mobility", title: "Mobility and flexibility", summary: "Make mobility practice a more intentional part of your week.", approach: "This can include controlled range work, regular mobility drills, and flexibility practice matched to your current ability." },
  ],
  formatsSection: {
    eyebrow: "Three ways to train",
    headline: "Make the format fit",
    accent: "your life.",
    lead: "Choose the setting that gives you the clearest, most practical way to train. Srikanth, a fitness trainer in Hyderabad, coaches you one-to-one in all three.",
    helper: {
      text: "Not sure which setting fits your week?",
      linkLabel: "Ask Srikanth on WhatsApp",
      whatsappMessage: "Hi Srikanth, I am not sure whether gym, home or online training suits me. Can you suggest one?",
    },
  },
  formats: [
    {
      id: "gym",
      icon: "dumbbell",
      chip: "In person \u00b7 Gym",
      title: "Gym-based personal training in Hyderabad",
      summary: "Face-to-face coaching in a gym, with every exercise demonstrated, coached and adjusted in the session.",
      facts: [
        { value: "60", unit: "min", label: "Per session" },
        { value: "1:1", label: "Coaching" },
        { value: "3\u20135", label: "Sessions a week" },
      ],
      bestFor: ["Strength", "Muscle gain", "Fat loss"],
      ready: "Your gym access, water and comfortable training clothes.",
      cta: { label: "Explore gym training", href: services.inPerson.href },
      image: {
        src: "/images/gym-training.png",
        alt: "Personal trainer coaching a client through a barbell squat in a bright gym",
        objectPosition: "50% 40%",
      },
    },
    {
      id: "home",
      icon: "house",
      chip: "In person \u00b7 Your place",
      title: "Personal training at your home or location",
      summary: "Face-to-face training shaped around the space and equipment you already have, at home or an agreed location.",
      facts: [
        { value: "60", unit: "min", label: "Per session" },
        { value: "1:1", label: "Coaching" },
        { value: "3\u20134", label: "Sessions a week" },
      ],
      bestFor: ["Privacy", "Busy schedules", "Beginners"],
      ready: "A clear floor area, a non-slip surface, water and a mat.",
      cta: { label: "Explore home training", href: services.inPerson.href },
      image: {
        src: "/images/home-training.png",
        alt: "Personal trainer guiding a client through a lunge in a living room",
        objectPosition: "50% 30%",
      },
    },
    {
      id: "online",
      icon: "monitorPlay",
      chip: "Live online",
      title: "Online personal training",
      summary: "Remote coaching with a plan and live guidance, shaped around your schedule, space and equipment.",
      facts: [
        { value: "45", unit: "min", label: "Per session" },
        { value: "Live 1:1", label: "Coaching" },
        { value: "3\u20135", label: "Sessions a week" },
      ],
      bestFor: ["Busy professionals", "Travellers", "Outside Hyderabad"],
      ready: "A phone or laptop with a camera, steady internet and good lighting. A mat is optional.",
      cta: { label: "Explore online training", href: services.online.href },
      image: {
        src: "/images/online-coaching.png",
        alt: "Client following a live online personal training session on a laptop at home",
        objectPosition: "50% 45%",
      },
    },
  ] as FormatCard[],
  goalsSection: {
    eyebrow: "What Srikanth helps you with",
    headline: "Pick your goal. Srikanth builds the plan.",
    accent: "goal.",
    lead: "Fat loss, strength, stamina, mobility or a first step into fitness: whatever you want from your body, your fitness trainer in Hyderabad builds one-to-one training around it.",
    note: "Most clients combine two goals. Srikanth plans for both.",
    listLabel: "Training goals",
    dayStateLabels: { session: "session", light: "light movement", rest: "rest" },
    includesLabel: "What it includes",
    weekLabel: "A typical week",
    weekLegend: "Session \u00b7 Light movement \u00b7 Rest",
    sessionsSuffix: " sessions a week",
    dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    dayLetters: ["M", "T", "W", "T", "F", "S", "S"],
  },
  goals: [
    {
      id: "strength",
      icon: "dumbbell",
      label: "Strength",
      title: "Strength training",
      promise: "Feel stronger in everyday life, not just in the gym.",
      description: "Strength training in Hyderabad built on foundational lifts, progressed at a pace your body can keep up with.",
      includes: [
        "Squat, hinge, push, pull and carry patterns",
        "Progressive loading planned week by week",
        "Technique coached until it feels natural",
      ],
      week: ["session", "light", "session", "rest", "session", "light", "rest"],
      sessionsLabel: "3\u20134",
      image: {
        src: "/images/goal-strength.png",
        fallback: "/images/gym-training.png",
        alt: "A personal trainer coaching a client through a barbell deadlift in a gym",
        objectPosition: "50% 45%",
      },
      cta: {
        label: "Start with strength",
        whatsappMessage: "Hi Srikanth, I would like to work on strength. Can we talk about a plan?",
      },
    },
    {
      id: "conditioning",
      icon: "heartPulse",
      label: "Cardio and conditioning",
      title: "Cardio and conditioning",
      promise: "Climb the stairs without counting the steps.",
      description: "Build stamina, recovery and a stronger heart with intervals, steady efforts and conditioning circuits matched to your current level.",
      includes: [
        "Interval and steady-effort blocks",
        "Pacing you can feel, not just chase",
        "Circuits you can repeat anywhere",
      ],
      week: ["session", "rest", "session", "light", "session", "session", "rest"],
      sessionsLabel: "4",
      image: {
        src: "/images/conditioning-training.png",
        fallback: "/images/conditioning-training.png",
        alt: "A client doing a kettlebell conditioning circuit in a loft studio",
        objectPosition: "50% 45%",
      },
      cta: {
        label: "Start with stamina",
        whatsappMessage: "Hi Srikanth, I would like to build my stamina and conditioning. Can we talk about a plan?",
      },
    },
    {
      id: "fat-loss",
      icon: "flame",
      label: "Fat loss",
      title: "Fat loss",
      promise: "Lose fat and keep it off, without crash diets.",
      description: "Fat loss personal training in Hyderabad that pairs strength and conditioning with realistic food habits and recovery.",
      includes: [
        "Strength and cardio structured for steady progress",
        "Simple food habits that fit your routine",
        "Weekly check-ins on training, food and recovery",
      ],
      week: ["session", "session", "light", "session", "session", "light", "rest"],
      sessionsLabel: "4",
      image: {
        src: "/images/goal-fat-loss.png",
        fallback: "/images/home-training.png",
        alt: "A client finishing a step-up circuit while her trainer counts the reps",
        objectPosition: "50% 40%",
      },
      cta: {
        label: "Start with fat loss",
        whatsappMessage: "Hi Srikanth, I would like to lose fat in a sustainable way. Can we talk about a plan?",
      },
    },
    {
      id: "muscle-building",
      icon: "trendingUp",
      label: "Muscle building",
      title: "Muscle building and healthy weight gain",
      promise: "Build size you can see and strength you can use.",
      description: "A muscle building coach in Hyderabad: structured training, enough protein and enough rest, progressed over weeks.",
      includes: [
        "Split routines matched to your schedule",
        "Tracked lifts and progressive loading",
        "Eating guidance for healthy weight gain",
      ],
      week: ["session", "session", "light", "session", "session", "light", "rest"],
      sessionsLabel: "4",
      image: {
        src: "/images/goal-muscle.png",
        fallback: "/images/training-detail.png",
        alt: "A trainer spotting a client during a dumbbell bench press",
        objectPosition: "50% 45%",
      },
      cta: {
        label: "Start building muscle",
        whatsappMessage: "Hi Srikanth, I would like to build muscle and gain weight in a healthy way. Can we talk about a plan?",
      },
    },
    {
      id: "beginner",
      icon: "sprout",
      label: "Beginner fitness",
      title: "Beginner fitness",
      promise: "Never trained before? You are exactly where everyone starts.",
      description: "Personal training for beginners in Hyderabad: slow, clear and supportive, so you learn the basics properly and enjoy the process.",
      includes: [
        "Basic movements taught step by step",
        "A gentle build-up with no guesswork",
        "Routine and habit support from week one",
      ],
      week: ["session", "rest", "session", "rest", "session", "light", "rest"],
      sessionsLabel: "3",
      image: {
        src: "/images/goal-beginner.png",
        fallback: "/images/online-coaching.png",
        alt: "A beginner learning a goblet squat while the trainer demonstrates beside him",
        objectPosition: "50% 40%",
      },
      cta: {
        label: "Start from the basics",
        whatsappMessage: "Hi Srikanth, I am new to training and would like to start properly. Can we talk about a plan?",
      },
    },
    {
      id: "mobility",
      icon: "move",
      label: "Mobility and flexibility",
      title: "Mobility and flexibility",
      promise: "Move freely, sit comfortably, feel lighter in your own body.",
      description: "Make mobility a deliberate part of your week with controlled stretching, joint-friendly drills and posture-aware strength work.",
      includes: [
        "Hip, shoulder and spine mobility drills",
        "Posture-aware movement and breathing",
        "Short routines you can repeat at home",
      ],
      week: ["session", "light", "session", "light", "session", "light", "rest"],
      sessionsLabel: "3",
      image: {
        src: "/images/mobility-training.png",
        fallback: "/images/mobility-training.png",
        alt: "A client holding a stretch on a mat in a bright studio",
        objectPosition: "50% 45%",
      },
      cta: {
        label: "Start moving better",
        whatsappMessage: "Hi Srikanth, I would like to improve my mobility and flexibility. Can we talk about a plan?",
      },
    },
  ] as GoalItem[],
  startingPoint: {
    headline: "Going to the gym for years, but not seeing the result?",
    headlineAccent: "result?",
    reassurance: "Not to worry. Srikanth is here to help.",
    reassuranceAccent: "Srikanth",
    lead: "You have been training for years, but your body has not changed the way you expected. As a personal trainer in Hyderabad, Srikanth finds what is missing, whether it is the programme, the technique, the food or the recovery, and builds a plan around your life.",
    image: {
      src: "/images/training-detail.png",
      alt: "A training notebook beside a kettlebell, where a personal trainer in Hyderabad plans each client's programme",
    },
    cardTab: "The starting point",
    cardTitle: "How Srikanth starts with you",
    cardIntro: "The right training approach depends on more than a goal written down. Before any programme begins, Srikanth looks at six things about you.",
    youLeaveWith: [
      "A clear first-month plan",
      "The right format for you: gym, home or online",
      "A coach who knows your week",
    ],
    cta: {
      label: "Start on WhatsApp",
      whatsappMessage: "Hi Srikanth, I have been training for a while without the result I wanted. Can we talk about a starting point?",
      callPrefix: "or call",
    },
    criteria: [
      { id: "goal", icon: "target", label: "Your goal", descriptor: "What you want to change, and why it matters to you now." },
      { id: "routine", icon: "calendarClock", label: "Your routine", descriptor: "Work hours, travel and sleep, so the plan fits a real week." },
      { id: "experience", icon: "history", label: "Your experience", descriptor: "What you have tried, for how long, and where it stalled." },
      { id: "profession", icon: "briefcase", label: "Your profession", descriptor: "Desk hours, shifts or a physical job: it shapes recovery and posture." },
      { id: "food", icon: "utensils", label: "Your food habits", descriptor: "What you actually eat in a normal week, not the ideal one." },
      { id: "movement", icon: "activity", label: "Your movement", descriptor: "How you squat, hinge and carry, and any limits to train around." },
    ] as { id: string; icon: SectionIcon; label: string; descriptor: string }[],
  },
  hooks: {
    gymNoResult: {
      id: "gymNoResult",
      icon: "activity" as SectionIcon,
      question: "Going to the gym for years, but not seeing the result?",
      answer: "Not to worry. Srikanth is here to help.",
      cta: { label: "Talk to Srikanth", href: "#contact" },
      whatsappMessage: "Hi Srikanth, I have been going to the gym for years without the result I wanted. Can we talk?",
    },
    noTime: {
      id: "noTime",
      icon: "monitorPlay" as SectionIcon,
      question: "No time to get to a gym?",
      answer: "Not getting the time to visit a gym, but still worried about your fitness? Srikanth coaches live online personal training sessions that fit around your day, from wherever you are.",
      cta: { label: "Explore online classes", href: services.online.href },
      whatsappMessage: "Hi Srikanth, I do not have time to get to a gym. Can we talk about online training?",
    },
    plateau: {
      id: "plateau",
      icon: "activity" as SectionIcon,
      question: "Cutting back, training hard, and the scale still will not move?",
      answer: "Srikanth looks at the whole week, not just the workout: training, food and recovery, then adjusts the plan.",
      cta: { label: "Talk to Srikanth", href: "#contact" },
      whatsappMessage: "Hi Srikanth, I am training hard and eating less but the scale will not move. Can we talk?",
    },
    nutrition: {
      id: "nutrition",
      icon: "utensils" as SectionIcon,
      question: "Eating \u201chealthy\u201d but not feeling or looking any different?",
      answer: "Srikanth's nutrition consultations turn what you already eat into a plan you can follow.",
      cta: { label: "Talk to Srikanth", href: "#contact" },
      whatsappMessage: "Hi Srikanth, I eat healthy but do not see a difference. Can we talk about nutrition?",
    },
    beginner: {
      id: "beginner",
      icon: "target" as SectionIcon,
      question: "Never trained before and not sure where to begin?",
      answer: "Start with a conversation. Srikanth builds your first month around your fitness level, step by step.",
      cta: { label: "Talk to Srikanth", href: "#contact" },
      whatsappMessage: "Hi Srikanth, I have never trained before and do not know where to begin. Can we talk?",
    },
    home: {
      id: "home",
      icon: "briefcase" as SectionIcon,
      question: "Prefer to train in the comfort of your home?",
      answer: "Srikanth brings the session to you, with a plan that fits the space and equipment you have.",
      cta: { label: "Talk to Srikanth", href: services.inPerson.href },
      whatsappMessage: "Hi Srikanth, I would prefer to train at home. Can we talk about home training?",
    },
  },
  pricing,
  approach,
  coachSection,
  contactCard,
  images,
  footer,
} as const;
export type SiteContent = typeof siteContent;
export const whatsappHref = `https://wa.me/${siteContent.contact.whatsappNumber}?text=${encodeURIComponent(siteContent.contact.whatsappMessage)}`;
export const telHref = `tel:${siteContent.contact.phoneTel}`;
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteContent.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export function pageMetadata(title: string, description: string, path = "/"): Metadata { return { title: `${title} | ${siteContent.name}`, description, robots: siteContent.draftPreview ? { index: false, follow: false } : { index: true, follow: true }, ...(siteContent.domain ? { alternates: { canonical: `${siteContent.domain.replace(/\/$/, "")}${path}` } } : {}) }; }


// ---------------------------------------------------------------------------
// Homepage FAQ section. Every figure is read from the config above, so the copy cannot drift from the counters
// and the price list. In an answer, a link is written [anchor text]({{token}}); the tokens resolve through faqRoutes.
// ---------------------------------------------------------------------------
export type FaqIcon = "ClipboardList" | "MonitorPlay" | "IndianRupee" | "Salad" | "TrendingUp";
export type FaqItem = { q: string; lead: string; body: string };
export type FaqGroup = { id: string; title: string; descriptor: string; icon: FaqIcon; items: FaqItem[] };

/**
 * Where each link token in an answer points. `null` means no such page exists yet: the link is dropped and the
 * anchor text stays as plain text. The in-person page covers both gym and home sessions, which is also where the
 * hero and the formats cards send "At your home".
 */
export const faqRoutes: Record<string, string | null> = {
  gym: services.inPerson.href,
  home: services.inPerson.href,
  online: services.online.href,
  formats: "#formats",
  pricing: "#pricing",
  // There is no nutrition page and no "how to choose a trainer" guide yet. Set these when the pages exist.
  nutrition: null,
  chooseGuide: null,
};

// The lowest monthly fee in the price list, formatted for display.
const startingPrice = formatRupees(lowestMonthly(pricing.groups));
const clientsStat = stats.find((stat) => stat.icon === "users");
const clientsCount = clientsStat ? `${new Intl.NumberFormat("en-IN").format(clientsStat.value)}${clientsStat.suffix}` : "";
// A sentence that points at a page is only shown while that page exists, so no answer refers to a missing resource.
const whenRouted = (token: string, sentence: string) => (faqRoutes[token] ? ` ${sentence}` : "");

export const faqSection = {
  anchorId: "faqs",
  headline: "Your questions about personal training in Hyderabad, ",
  accent: `answered by ${coachName}.`,
  intro: `Choosing a personal trainer in Hyderabad usually comes with the same questions: what happens in the first session, whether home training works as well as the gym, what it costs, and how nutrition fits in. ${coachName}, a NASM-certified fitness trainer who also gives nutrition consultations, has answered them for ${clientsCount} clients across Hyderabad and online. Here are the straight answers. If yours is missing, message him on WhatsApp.`,
  chipsLabel: "Jump to a topic",
};

export const faqGroups: FaqGroup[] = [
  {
    id: "faq-getting-started",
    title: "Getting started",
    descriptor: "What happens before and during your first week.",
    icon: "ClipboardList",
    items: [
      {
        q: `How do I start personal training with ${coachName}?`,
        lead: "Message him on WhatsApp or call, and tell him your goal, your schedule and where you want to train.",
        body: "He suggests a format and a start date that suit you. Your first session begins with a short movement and fitness check, so the plan is built around where you are today, not a generic template.",
      },
      {
        q: "Are sessions suitable for complete beginners?",
        lead: "Yes. Beginners are a big part of his client list, and you do not need to be fit or experienced with gyms to start.",
        body: "Early sessions focus on learning basic movements, using lighter loads and building a routine you can keep. The pace goes up only when your form and confidence do.",
      },
      {
        q: "What should I bring or prepare for the first session?",
        lead: "Comfortable workout clothes, training shoes, a water bottle and a small towel are enough.",
        body: "Have a light meal one to two hours before. Mention any past injuries, advice from your doctor and your usual daily routine so the session is planned safely.",
      },
      {
        q: "Can I train if I have an injury or a health condition?",
        lead: `Often yes, but tell ${coachName} before the first session, and check with your doctor first if the condition is recent or diagnosed.`,
        body: "He is a fitness trainer, not a medical professional, so he does not diagnose or treat conditions. He can adjust exercises around the advice your doctor or physiotherapist gives you.",
      },
    ],
  },
  {
    id: "faq-formats",
    title: "Gym, home and online",
    descriptor: "Pick the format that fits your week.",
    icon: "MonitorPlay",
    items: [
      {
        q: "Do you offer gym, home and online personal training in Hyderabad?",
        lead: "Yes. You can train one-to-one at the gym, at your home or on video, and switch formats if your routine changes.",
        body: "Each format has its own page with what is included: [gym personal training]({{gym}}), [a personal trainer at home in Hyderabad]({{home}}) and [online personal training]({{online}}).",
      },
      {
        q: "Where do home sessions take place?",
        lead: `${coachName} comes to your home, apartment gym or a nearby open space within the areas he covers in Hyderabad.`,
        body: "Share your locality when you message and he confirms whether it fits his schedule and travel range. You need very little space or equipment to begin.",
      },
      {
        q: "Does online personal training work as well as in-person?",
        lead: "For most goals, yes, as long as you show up consistently and he can see your form on video.",
        body: "Live video sessions keep the coaching one-to-one with form corrections in real time, and you can train from anywhere in India. In-person sessions suit you better if you want hands-on set-up for heavier lifts.",
      },
      {
        q: "Which format should I choose?",
        lead: "Choose the gym if you want equipment and an hour away from home, home training if time or travel is your barrier, and online if you travel often or live outside Hyderabad.",
        body: "Not sure? Send your goal and schedule on WhatsApp and he will suggest one. You can also [compare the formats]({{formats}}).",
      },
    ],
  },
  {
    id: "faq-fees",
    title: "Fees and plans",
    descriptor: "What it costs and what you get.",
    icon: "IndianRupee",
    items: [
      {
        q: "How much does personal training cost in Hyderabad?",
        lead: `Fees depend on the format and how many sessions you take each week, and plans start from ${startingPrice} a month.`,
        body: "Gym, home and online plans are priced separately, and nutrition guidance can be added. Current rates are in the [pricing section]({{pricing}}).",
      },
      {
        q: "What is included in a training plan?",
        lead: "One-to-one sessions, a programme built around your goal, regular progress check-ins and WhatsApp support between sessions.",
        body: "Plans come as training only, nutrition only, or training plus nutrition guidance. The [pricing section]({{pricing}}) lists what each one includes.",
      },
      {
        q: "Can I reschedule a session?",
        lead: `Yes. Tell ${coachName} a few hours before the session and he moves it to another slot in the same week where possible.`,
        body: "Consistency matters more than perfect attendance, so he plans around work and travel.",
      },
    ],
  },
  {
    id: "faq-nutrition",
    title: "Nutrition",
    descriptor: "Food guidance that fits the training.",
    icon: "Salad",
    items: [
      {
        q: "Do you give nutrition and diet guidance?",
        lead: `Yes. ${coachName} is a fitness trainer who also gives nutrition consultations covering everyday eating, portions and food habits.`,
        body: `The guidance is built around Indian meals you already eat and your goal, whether that is fat loss, muscle gain or steady energy.${whenRouted("nutrition", "Read more about [nutrition consultation in Hyderabad]({{nutrition}}).")}`,
      },
      {
        q: "Will I get a fixed diet chart?",
        lead: "You get a practical eating plan you can follow, and he adjusts it as your schedule, progress and preferences change.",
        body: "Vegetarian, eggetarian and non-vegetarian eating patterns all work. The aim is habits you can keep, not a strict plan you abandon in two weeks.",
      },
      {
        q: "Can you help with diabetes, PCOS or thyroid conditions?",
        lead: "He gives general fitness and nutrition guidance, not medical treatment, so please follow your doctor's advice for any medical condition.",
        body: "Share what your doctor has recommended and he can plan training and everyday food choices around it. For diagnosis, medication or a medical diet, a doctor or clinical dietitian is the right person.",
      },
    ],
  },
  {
    id: "faq-results",
    title: "Results and expectations",
    descriptor: "What to expect, honestly.",
    icon: "TrendingUp",
    items: [
      {
        q: "How soon will I see results?",
        lead: "Many clients feel stronger and more energetic within the first few weeks, while visible body changes take longer and vary from person to person.",
        body: `Consistency, sleep, food and your starting point all matter. ${coachName} sets realistic targets, reviews progress with you regularly and does not promise a fixed number of kilos in a fixed number of days.`,
      },
      {
        q: "How do I choose the best fitness trainer in Hyderabad?",
        lead: "Look for a recognised certification, a clear process, honest expectations and someone you feel comfortable asking questions.",
        body: `${coachName} holds the NASM Certified Personal Trainer credential and starts every client with an assessment and a plan.${whenRouted("chooseGuide", "Our [guide to choosing the best fitness trainer in Hyderabad]({{chooseGuide}}) lists what to ask before you sign up.")}`,
      },
      {
        q: "How is my progress tracked?",
        lead: "Through regular check-ins on strength, measurements, how your clothes fit and how you feel, not just the weighing scale.",
        body: `${coachName} reviews the plan with you at set intervals and changes the programme when something stops working.`,
      },
    ],
  },
];

import type { ProgressStory } from "./site-content";

/**
 * Progress-story records. Real client names, photos, quotes and figures live ONLY in this module,
 * and it must be imported only from Server Components (see components/progress-gallery.tsx). Do not
 * import it from a "use client" file or from src/lib/site-content.ts, because that would ship every
 * record, verified or not, to every visitor's browser.
 *
 * A record is published in production only when its own `verified` flag is true. See getVisibleStories().
 */
const progressStoryRecords: ProgressStory[] = [
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
];

/**
 * The single gate for progress stories. In a production build a story renders only when its own
 * `verified` flag is true. No environment variable can override that, so one setting can never
 * publish unverified client names, photos, quotes or figures. Unverified stories are shown only
 * outside production (local development), as layout placeholders.
 */
export function getVisibleStories(): ProgressStory[] {
  const isProduction = process.env.NODE_ENV === "production";
  return progressStoryRecords.filter((story) => story.verified === true || !isProduction);
}

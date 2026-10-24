import type { ProgressStory, StoryImage } from "@/src/lib/site-content";

const numberFormat = new Intl.NumberFormat("en-IN");
const MINUS = "\u2212";
const NBSP = "\u00A0";

const withUnit = (value: string, unit: string) => (unit === "%" ? `${value}%` : `${value}${NBSP}${unit}`);

/** Change from before to after, computed from the two figures: "+7 kg", "\u221215 kg". */
export function formatDelta(before: number, after: number, unit: string): string {
  const change = after - before;
  const sign = change > 0 ? "+" : change < 0 ? MINUS : "";
  return withUnit(`${sign}${numberFormat.format(Math.abs(change))}`, unit);
}

export type StoryView = {
  id: string;
  goal: string;
  client: string;
  title: string;
  duration: string;
  format: string;
  quote: string;
  delta: string;
  deltaLabel: string;
  metrics: { label: string; before: string; after: string; unit: string }[];
  before: StoryImage;
  after: StoryImage;
};

/** Plain, serialisable view of a story with every figure formatted. Only visible stories are ever passed in. */
export function toStoryView(story: ProgressStory): StoryView {
  const [headline] = story.metrics;
  return {
    id: story.id,
    goal: story.goal,
    client: story.client,
    title: story.title,
    duration: story.duration,
    format: story.format,
    quote: story.quote,
    delta: formatDelta(headline.before, headline.after, headline.unit),
    deltaLabel: headline.label.toLowerCase(),
    metrics: story.metrics.map((m) => ({
      label: m.label,
      before: numberFormat.format(m.before),
      after: numberFormat.format(m.after),
      unit: m.unit,
    })),
    before: story.before,
    after: story.after,
  };
}

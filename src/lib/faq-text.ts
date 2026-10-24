import { faqRoutes, type FaqGroup } from "./site-content";

export type FaqSegment = { text: string; href?: string };

// [anchor text](route). The route is either a {{token}} resolved through faqRoutes or a literal path.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function resolveRoute(target: string): string | null {
  const token = /^\{\{(\w+)\}\}$/.exec(target);
  return token ? faqRoutes[token[1]] ?? null : target;
}

/** Splits an answer into plain and linked segments. A link with no route is kept as plain text. */
export function parseFaqBody(body: string): FaqSegment[] {
  const segments: FaqSegment[] = [];
  let cursor = 0;
  for (const match of body.matchAll(LINK)) {
    const [whole, text, target] = match;
    if (match.index > cursor) segments.push({ text: body.slice(cursor, match.index) });
    const href = resolveRoute(target);
    segments.push(href ? { text, href } : { text });
    cursor = match.index + whole.length;
  }
  if (cursor < body.length) segments.push({ text: body.slice(cursor) });
  return segments;
}

/** The answer as plain text, for structured data. It is exactly what the visitor reads. */
export function faqPlainText(body: string): string {
  return parseFaqBody(body).map((segment) => segment.text).join("");
}

/** FAQPage structured data built from the visible groups. */
export function buildFaqJsonLd(groups: readonly FaqGroup[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: `${item.lead} ${faqPlainText(item.body)}` },
      })),
    ),
  };
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guide-article";
import { getGuide, guideSlugs } from "@/src/lib/guides-content";
import { pageMetadata } from "@/src/lib/site-content";

export function generateStaticParams() { return guideSlugs.map((slug) => ({ slug })); }

// Guide content is fully static (an in-memory lookup, no external data) and every slug is
// prerendered via generateStaticParams. Reading `params.slug` at the top level is safe here, so
// opt this route out of instant-navigation validation (Cache Components) rather than wrapping a
// synchronous render in <Suspense>. The page still prerenders as static HTML.
export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  return guide ? pageMetadata(guide.seoTitle, guide.description, `/guides/${slug}/`) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}

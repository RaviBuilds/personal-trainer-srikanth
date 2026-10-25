import type { MetadataRoute } from "next";
import { guideSlugs } from "@/src/lib/guides-content";
import { siteContent } from "@/src/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  if (siteContent.draftPreview || !siteContent.domain) return [];
  const baseUrl = siteContent.domain.replace(/\/$/, "");
  return ["/", "/services/in-person-personal-training-hyderabad/", "/services/online-personal-training/", "/guides/", ...guideSlugs.map((slug) => `/guides/${slug}/`), "/privacy/", "/disclaimer/"].map((path) => ({ url: `${baseUrl}${path}` }));
}

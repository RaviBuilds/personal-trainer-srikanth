import type { MetadataRoute } from "next";
import { siteContent } from "@/src/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  if (siteContent.draftPreview || !siteContent.domain) return [];
  return ["/", "/services/in-person-personal-training-hyderabad/", "/services/online-personal-training/", "/guides/", "/guides/personal-trainer-fees-hyderabad/", "/guides/first-month-personal-training/", "/guides/gym-home-online-training/", "/privacy/", "/disclaimer/"].map((path) => ({ url: `${siteContent.domain}${path}`, lastModified: new Date() }));
}

import type { MetadataRoute } from "next";
import { siteContent } from "@/src/lib/site-content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteContent.draftPreview ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    ...(siteContent.domain ? { sitemap: `${siteContent.domain.replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}

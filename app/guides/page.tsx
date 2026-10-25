import type { Metadata } from "next";
import { GuidesIndex } from "@/components/guides-index";
import { guidesIndex } from "@/src/lib/guides-content";
import { pageMetadata } from "@/src/lib/site-content";

export const metadata: Metadata = pageMetadata(guidesIndex.seo.title, guidesIndex.seo.description, guidesIndex.path);

export default function Page() { return <GuidesIndex />; }

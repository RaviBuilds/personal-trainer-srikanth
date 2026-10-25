import type { Metadata } from "next";
import { OnlinePage } from "@/components/online-page";
import { onlinePage, pageMetadata } from "@/src/lib/site-content";

export const metadata: Metadata = pageMetadata(onlinePage.seo.title, onlinePage.seo.description, onlinePage.path);

export default function Page() { return <OnlinePage />; }

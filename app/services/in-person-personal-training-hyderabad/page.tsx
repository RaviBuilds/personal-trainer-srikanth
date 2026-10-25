import type { Metadata } from "next";
import { InPersonPage } from "@/components/in-person-page";
import { inPersonPage, pageMetadata } from "@/src/lib/site-content";

export const metadata: Metadata = pageMetadata(inPersonPage.seo.title, inPersonPage.seo.description, inPersonPage.path);

export default function Page() { return <InPersonPage />; }

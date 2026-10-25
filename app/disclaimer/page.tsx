import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { disclaimerPage } from "@/src/lib/legal-content";
import { pageMetadata } from "@/src/lib/site-content";

export const metadata: Metadata = pageMetadata(disclaimerPage.seo.title, disclaimerPage.seo.description, disclaimerPage.path);

export default function Page() { return <LegalPage page={disclaimerPage} />; }

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacyPage } from "@/src/lib/legal-content";
import { pageMetadata } from "@/src/lib/site-content";

export const metadata: Metadata = pageMetadata(privacyPage.seo.title, privacyPage.seo.description, privacyPage.path);

export default function Page() { return <LegalPage page={privacyPage} />; }

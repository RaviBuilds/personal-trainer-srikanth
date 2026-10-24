import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/src/lib/site-content";

export const metadata: Metadata = pageMetadata("Privacy notice", "Read the privacy information and pre-launch data-handling scope for Srikanth Personal Training.", "/privacy/");
export default function Page() { return <><SiteHeader /><main><article className="article"><p className="eyebrow">Privacy scaffold</p><h1>Privacy notice</h1><p>This page is a pre-launch scaffold.. Before publication, replace it with the accurate data-handling details for the enquiry form, analytics, cookies, third-party services, retention, and contact process actually used by the business.</p><h2>What is collected</h2><p>Only collect information needed to respond to an enquiry. Do not ask visitors to submit sensitive medical information through the form.</p><h2>What still needs confirmation</h2><p>The final controller identity, contact details, retention period, processors, and user rights process must be confirmed before launch.</p></article></main><SiteFooter currentPath="/privacy/" /></>; }

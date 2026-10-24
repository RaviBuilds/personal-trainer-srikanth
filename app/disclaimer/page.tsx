import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/src/lib/site-content";

export const metadata: Metadata = pageMetadata("Training disclaimer", "Read the scope, safety, and expectations for the Shrikant Personal Training website.", "/disclaimer/");
export default function Page() { return <><SiteHeader /><main><article className="article"><p className="eyebrow">Scope and expectations</p><h1>Training disclaimer</h1><p>Information on this website is general and does not replace advice from a suitably qualified healthcare professional. Do not use the enquiry form to share urgent, sensitive, or clinical information.</p><h2>About the service</h2><p>Coaching format, location, pricing, qualifications, and scope must be confirmed with Shrikant before booking. No result, transformation, or health outcome is guaranteed.</p></article></main></>; }

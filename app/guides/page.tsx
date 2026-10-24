import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/src/lib/site-content";

export const metadata: Metadata = pageMetadata("Personal Training Guides", "Practical guides for comparing personal training fees, formats, and the first month of coaching in Hyderabad or online.", "/guides/");
const guides = [
  ["Personal trainer fees in Hyderabad: what affects the cost?", "/guides/personal-trainer-fees-hyderabad/", "How to compare scope, setting, session frequency, and terms without treating an example rate as a confirmed fee."],
  ["What to expect in your first month of personal training", "/guides/first-month-personal-training/", "A practical look at the conversations, routines, and reviews that can shape a useful start."],
  ["Gym, home, or online training: how to choose a format", "/guides/gym-home-online-training/", "A balanced comparison of settings and the questions that help you choose a workable option."],
] as const;
export default function Page() { return <><SiteHeader /><main><section className="page-hero"><div className="container"><p className="eyebrow">Useful reading</p><h1>Training questions, made clearer.</h1><p className="lede">Original, practical guides for people comparing personal training options in Hyderabad and online.</p></div></section><section className="section"><div className="container guides-grid">{guides.map(([title, href, description]) => <article className="guide-card" key={href}><p className="eyebrow">Guide</p><h2 style={{ fontSize: "32px" }}>{title}</h2><p>{description}</p><Link className="button button-secondary" href={href}>Read guide</Link></article>)}</div></section></main><SiteFooter currentPath="/guides/" /></>;
}

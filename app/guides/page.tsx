import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Personal Training Guides | Shrikant", description: "Practical guides for comparing personal training fees, formats, and the first month of coaching in Hyderabad or online." };
const guides = [
  ["Personal trainer fees in Hyderabad: what affects the cost?", "/guides/personal-trainer-fees-hyderabad/", "How to compare scope, setting, session frequency, and terms without treating an example rate as a confirmed fee."],
  ["What to expect in your first month of personal training", "/guides/first-month-personal-training/", "A practical look at the conversations, routines, and reviews that can shape a useful start."],
  ["Gym, home, or online training: how to choose a format", "/guides/gym-home-online-training/", "A balanced comparison of settings and the questions that help you choose a workable option."],
] as const;
export default function Page() { return <><SiteHeader /><main><section className="page-hero"><div className="container"><p className="eyebrow">Useful reading</p><h1>Training questions, made clearer.</h1><p className="lede">Original, practical guides for people comparing personal training options in Hyderabad and online.</p></div></section><section className="section"><div className="container guides-grid">{guides.map(([title, href, description], i) => <article className="guide-card" key={href}><p className="eyebrow">Guide {i + 1}</p><h2 style={{ fontSize: "32px" }}>{title}</h2><p>{description}</p><Link className="button button-secondary" href={href}>Read guide</Link></article>)}</div></section></main><footer className="footer"><div className="container footer-inner"><div className="wordmark"><span>SHRIKANT</span><small>PERSONAL TRAINING</small></div><div className="footer-links"><Link href="/">Home</Link><Link href="/privacy/">Privacy</Link></div></div></footer></>;
}

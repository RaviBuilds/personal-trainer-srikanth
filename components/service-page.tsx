import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export type ServicePageProps = {
  title: string;
  intro: string;
  who: string[];
  session: string[];
  preparation: string[];
  included: string[];
  excluded: string[];
  faqs: [string, string][];
  related: { href: string; label: string }[];
};

export function ServicePage({ title, intro, who, session, preparation, included, excluded, faqs, related }: ServicePageProps) {
  return <><SiteHeader /><main>
    <section className="page-hero"><div className="container"><p className="eyebrow">Personal training with Shrikant</p><h1>{title}</h1><p className="lede">{intro}</p><Link className="button" href="/#contact">Enquire about training</Link></div></section>
    <div className="article service-article">
      <section><h2>Who this may suit</h2><ul>{who.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h2>What a session or plan can involve</h2><ul>{session.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h2>Prepare for a useful start</h2><ul>{preparation.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <div className="service-columns"><section><h2>Included, as agreed</h2><ul>{included.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Not assumed</h2><ul>{excluded.map((item) => <li key={item}>{item}</li>)}</ul></section></div>
      <section><h2>Common questions</h2><div className="guide-sections">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      <section><h2>Explore related directions</h2><div className="related-links">{related.map((item) => <Link key={item.href} className="text-link" href={item.href}>{item.label} <span aria-hidden="true">↗</span></Link>)}</div></section>
      <Link className="button" href="/#contact">Start a conversation</Link>
    </div>
  </main><footer className="footer"><div className="container footer-inner"><div className="wordmark"><span>SHRIKANT</span><small>PERSONAL TRAINING</small></div><div className="footer-links"><Link href="/">Home</Link><Link href="/guides/">Guides</Link><Link href="/privacy/">Privacy</Link></div></div></footer></>;
}

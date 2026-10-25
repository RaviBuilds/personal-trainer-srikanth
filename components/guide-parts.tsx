import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRightIcon, PhoneIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { buildWhatsAppUrl, siteContent, telHref } from "@/src/lib/site-content";

// Reveal wrappers only trigger; the inner elements carry the motion (see guides.css).
export const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;
export const TALL = { amount: 0.04, rootMargin: "0px 0px -8% 0px" } as const;
export const step = (i: number) => ({ "--i": Math.min(i, 4) }) as CSSProperties;

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders text that contains [anchor](href) links. Internal paths use next/link; https links open in a new tab. */
export function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    nodes.push(
      /^https?:/.test(href)
        ? <a key={key++} className="gd-link" href={href} target="_blank" rel="noopener noreferrer">{label}</a>
        : /^(tel|mailto):/.test(href)
          ? <a key={key++} className="gd-link" href={href}>{label}</a>
          : <Link key={key++} className="gd-link" href={href}>{label}</Link>,
    );
    cursor = match.index + whole.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

/** Link text without the markup, for structured data. */
export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}

export function origin(path: string) {
  return `${siteContent.domain.replace(/\/$/, "")}${path}`;
}

export function JsonLd({ data }: { data: object }) {
  // "<" is escaped so the payload can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav className="gd-crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((item, i) => (
          <li key={item.label} aria-current={i === trail.length - 1 ? "page" : undefined}>
            {item.href && i < trail.length - 1 ? <Link href={item.href}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(trail: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.label, item: origin(item.href) })),
  };
}

type CtaProps = {
  headline: string;
  body: string;
  whatsappLabel: string;
  whatsappMessage: string;
  relatedTitle: string;
  related: { label: string; href: string }[];
};

/** Closing call to action. This is the one dark surface on a guide page, matching the service pages. */
export function GuideCta({ headline, body, whatsappLabel, whatsappMessage, relatedTitle, related }: CtaProps) {
  const { contact } = siteContent;
  return (
    <section className="gd-cta" aria-labelledby="gd-cta-title">
      <div className="container">
        <Reveal className="gd-reveal" {...OBSERVE}>
          <div className="gd-cta-card gd-step" style={step(0)}>
            <div className="gd-cta-main">
              <h2 id="gd-cta-title" className="gd-cta-h2">{headline}</h2>
              <p className="gd-cta-body">{body}</p>
              <div className="gd-ctas">
                <a className="button gd-btn gd-btn--primary" href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppLogo size={24} />
                  <span>{whatsappLabel}</span>
                </a>
                <a className="gd-btn gd-btn--outline-light" href={telHref} aria-label={`Call ${siteContent.name} on ${contact.phoneDisplay}`}>
                  <PhoneIcon size={18} />
                  <span>Call {siteContent.name}</span>
                </a>
              </div>
            </div>
            <nav className="gd-cta-related" aria-label={relatedTitle}>
              <p className="gd-cta-related-title">{relatedTitle}</p>
              <ul>
                {related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span>{link.label}</span>
                      <ArrowUpRightIcon size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

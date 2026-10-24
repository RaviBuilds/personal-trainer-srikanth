import Link from "next/link";
import type { CSSProperties } from "react";
import { FaqGlyph, PlusIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { buildFaqJsonLd, parseFaqBody } from "@/src/lib/faq-text";
import { faqGroups, faqSection } from "@/src/lib/site-content";

// Every block reveals from its own observer; the wrappers only trigger, the inner elements carry the motion.
const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;
const motion = (rise: number, duration: number) => ({ "--rise": `${rise}px`, "--dur": `${duration}ms` }) as CSSProperties;
// The first five cards in a group stagger by 70ms; later ones reveal on their own as they scroll in.
const cardDelay = (index: number) => (index < 5 ? index * 70 : 0);

function FaqBody({ body }: { body: string }) {
  return (
    <>
      {parseFaqBody(body).map((segment, i) =>
        segment.href ? (
          <Link key={i} className="faq-link" href={segment.href}>
            {segment.text}
          </Link>
        ) : (
          segment.text
        ),
      )}
    </>
  );
}

export function FaqSection() {
  const jsonLd = JSON.stringify(buildFaqJsonLd(faqGroups)).replace(/</g, "\\u003c");

  return (
    <section className="faq" id={faqSection.anchorId} aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="container">
        <div className="faq-header">
          <Reveal className="faq-reveal faq-h2-wrap" style={motion(24, 700)} {...OBSERVE}>
            <h2 id="faq-title" className="faq-h2">
              {faqSection.headline}
              <span className="faq-h2-accent">{faqSection.accent}</span>
            </h2>
          </Reveal>
          <Reveal className="faq-reveal faq-lead-wrap" delay={80} style={motion(24, 700)} {...OBSERVE}>
            <p className="faq-lead">{faqSection.intro}</p>
          </Reveal>
        </div>

        <Reveal className="faq-chips-reveal faq-chips-wrap" {...OBSERVE}>
          <nav aria-label={faqSection.chipsLabel}>
            <ul className="faq-chips">
              {faqGroups.map((group, i) => (
                <li key={group.id} className="faq-chip-item" style={{ "--i": i } as CSSProperties}>
                  <a className="faq-chip" href={`#${group.id}`}>
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <div className="faq-groups">
          {faqGroups.map((group, groupIndex) => (
            <div key={group.id} id={group.id} className="faq-group">
              <Reveal className="faq-reveal faq-group-head" style={motion(16, 600)} {...OBSERVE}>
                <div className="faq-group-head-inner">
                  <FaqGlyph className="faq-group-icon" name={group.icon} size={28} />
                  <h3 className="faq-h3">{group.title}</h3>
                  <p className="faq-descriptor">{group.descriptor}</p>
                </div>
              </Reveal>

              <ul className="faq-cards">
                {group.items.map((item, itemIndex) => (
                  <li key={item.q} className="faq-card-item">
                    <Reveal className="faq-reveal faq-card-wrap" delay={cardDelay(itemIndex)} style={motion(16, 600)} {...OBSERVE}>
                      <details className="faq-card" name={group.id} open={groupIndex === 0 && itemIndex === 0}>
                        <summary className="faq-summary">
                          <span className="faq-q">{item.q}</span>
                          <span className="faq-toggle" aria-hidden="true">
                            <PlusIcon size={18} />
                          </span>
                        </summary>
                        <div className="faq-answer">
                          <p className="faq-a-lead">{item.lead}</p>
                          <p className="faq-a-body">
                            <FaqBody body={item.body} />
                          </p>
                        </div>
                      </details>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

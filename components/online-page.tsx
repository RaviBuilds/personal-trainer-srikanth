import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, PhoneIcon, PlusIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildWhatsAppUrl, onlinePage as page, siteContent, telHref, type OnlineImage } from "@/src/lib/site-content";

const { contact } = siteContent;

// Reveal wrappers only trigger; the inner elements carry the motion. At most five items in a group are staggered.
const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;
const TALL = { amount: 0.04, rootMargin: "0px 0px -8% 0px" } as const;
const step = (i: number) => ({ "--i": Math.min(i, 4) }) as CSSProperties;
const imageVars = (image: OnlineImage) => ({ "--op-aspect": image.aspect, "--op-pos": `${image.focalPoint.x}% ${image.focalPoint.y}%` }) as CSSProperties;

function origin(path: string) {
  return `${siteContent.domain.replace(/\/$/, "")}${path}`;
}

function jsonLdScript(data: object) {
  // "<" is escaped so the payload can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function Photo({ image, sizes, preload = false, className = "" }: { image: OnlineImage; sizes: string; preload?: boolean; className?: string }) {
  return (
    <div className={`op-photo-clip ${className}`} style={imageVars(image)}>
      <Image className="op-photo-img" src={image.src} alt={image.alt} fill sizes={sizes} preload={preload} loading={preload ? undefined : "lazy"} />
    </div>
  );
}

function SectionHead({ id, title, lede }: { id: string; title: string; lede?: string | readonly string[] }) {
  const paragraphs = lede === undefined ? [] : typeof lede === "string" ? [lede] : lede;
  return (
    <Reveal className="op-reveal" {...OBSERVE}>
      <div className="op-head">
        <h2 id={id} className="op-h2 op-step" style={step(0)}>{title}</h2>
        {paragraphs.length > 0 ? (
          <div className="op-lede op-step" style={step(1)}>
            {paragraphs.map((text) => <p key={text}>{text}</p>)}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function CheckList({ items, label }: { items: readonly string[]; label?: string }) {
  return (
    <ul className="op-checks" aria-label={label}>
      {items.map((item, i) => (
        <li key={item} className="op-step" style={step(i)}>
          <CheckIcon className="op-check-icon" size={20} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Top-down setup diagram. Real text, drawn in CSS-coloured SVG; the checklist beside it carries the same advice. */
function SetupDiagram() {
  const { diagram } = page.setup;
  return (
    <figure className="op-diagram">
      <svg className="op-dg" viewBox="0 0 360 360" role="img" aria-labelledby="op-dg-title op-dg-desc">
        <title id="op-dg-title">{page.setup.headline}</title>
        <desc id="op-dg-desc">{diagram.label}</desc>
        <rect className="op-dg-room" x="8" y="8" width="344" height="344" rx="16" />
        <line className="op-dg-window" x1="352" y1="104" x2="352" y2="224" />
        <g className="op-dg-light">
          <path d="M338 126h-50m10-8-10 8 10 8" />
          <path d="M338 164h-50m10-8-10 8 10 8" />
          <path d="M338 202h-50m10-8-10 8 10 8" />
        </g>
        <text className="op-dg-text op-dg-text--light" x="338" y="244" textAnchor="end">{diagram.light}</text>
        <polygon className="op-dg-view" points="180,290 48,40 312,40" />
        <text className="op-dg-text" x="180" y="68" textAnchor="middle">{diagram.view}</text>
        <rect className="op-dg-floor" x="126" y="96" width="108" height="104" rx="12" />
        <ellipse className="op-dg-person" cx="180" cy="124" rx="20" ry="8" />
        <circle className="op-dg-person" cx="180" cy="124" r="7" />
        <text className="op-dg-text" x="180" y="162" textAnchor="middle">{diagram.floorLines[0]}</text>
        <text className="op-dg-text" x="180" y="182" textAnchor="middle">{diagram.floorLines[1]}</text>
        <rect className="op-dg-table" x="124" y="300" width="112" height="38" rx="6" />
        <rect className="op-dg-device" x="156" y="289" width="48" height="11" rx="3" />
        <text className="op-dg-text" x="180" y="326" textAnchor="middle">{diagram.device}</text>
      </svg>
      <figcaption className="op-diagram-caption">{diagram.caption}</figcaption>
    </figure>
  );
}

export function OnlinePage() {
  const { hero, glance, formats, booking, setup, process, fit, equipment, compare, nutrition, faq, cta } = page;
  const enquiryHref = buildWhatsAppUrl(hero.whatsappMessage);
  const ctaHref = buildWhatsAppUrl(cta.whatsappMessage);
  const pageUrl = origin(page.path);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin("/") },
      { "@type": "ListItem", position: 2, name: page.breadcrumbLabel, item: pageUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  return (
    <>
      <SiteHeader />
      <main className="op">
        {jsonLdScript(breadcrumbLd)}
        {jsonLdScript(faqLd)}

        {/* Hero: copy and photo are visible at first paint; only the photo settles in. */}
        <section className="op-hero" aria-labelledby="op-title">
          <div className="container">
            <nav className="op-crumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">{page.breadcrumbLabel}</li>
              </ol>
            </nav>
            <div className="op-hero-grid">
              <div className="op-hero-copy">
                <h1 id="op-title" className="op-h1">{hero.headline.before}<span className="op-h1-accent">{hero.headline.accent}</span></h1>
                <p className="op-hero-lede">{hero.lede[0]}</p>
                <p className="op-hero-sub">{hero.lede[1]}</p>
                <div className="op-ctas">
                  <a id="hero-primary-cta" className="button op-btn op-btn--primary" href={enquiryHref} target="_blank" rel="noopener noreferrer">
                    <WhatsAppLogo size={24} />
                    <span>{hero.primaryLabel}</span>
                  </a>
                  <a className="op-btn op-btn--outline" href={telHref} aria-label={`${hero.callLabel} on ${contact.phoneDisplay}`}>
                    <PhoneIcon size={18} />
                    <span>{hero.callLabel}</span>
                  </a>
                </div>
                <p className="op-hero-note">
                  {hero.inPersonNote.before}
                  <Link className="op-link" href={siteContent.services.inPerson.href}>{hero.inPersonNote.linkLabel}</Link>
                  {hero.inPersonNote.after}
                </p>
              </div>
              <div className="op-hero-media">
                <Photo image={hero.image} className="op-hero-photo" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 620px, 560px" preload />
              </div>
            </div>
          </div>
        </section>

        <div className="container op-body">
          <div className="op-body-grid">
            <div className="op-main">
              {/* Three ways to train online: one panel, three columns that share their rows */}
              <section className="op-section" id={formats.id} aria-labelledby="op-formats-title">
                <SectionHead id="op-formats-title" title={formats.headline} lede={formats.lede} />
                <Reveal className="op-reveal" {...TALL}>
                  <div className="op-ways op-step" style={step(0)}>
                    {formats.ways.map((way) => (
                      <article key={way.name} className="op-way">
                        <h3 className="op-h3 op-way-name">{way.name}</h3>
                        <div className="op-way-row">
                          <p className="op-way-label">{formats.rowLabels.how}</p>
                          <p>{way.how}</p>
                        </div>
                        <div className="op-way-row">
                          <p className="op-way-label">{formats.rowLabels.feedback}</p>
                          <p>{way.feedback}</p>
                        </div>
                        <div className="op-way-row">
                          <p className="op-way-label">{formats.rowLabels.suits}</p>
                          <p>{way.suits}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </Reveal>
                <Reveal className="op-reveal" {...OBSERVE}>
                  <p className="op-note op-step" style={step(0)}>
                    {formats.note.text}{" "}
                    <a className="op-link" href={formats.note.href}>{formats.note.linkLabel}</a>.
                  </p>
                </Reveal>
              </section>

              {/* Booking: a ledger of rows in one panel */}
              <section className="op-section" id={booking.id} aria-labelledby="op-booking-title">
                <SectionHead id="op-booking-title" title={booking.headline} lede={booking.lede} />
                <Reveal className="op-reveal" {...TALL}>
                  <ol className="op-booking op-step" style={step(0)} aria-label={booking.stepsLabel}>
                    {booking.steps.map((item) => (
                      <li key={item.name} className="op-booking-row">
                        <h3 className="op-booking-name">{item.name}</h3>
                        <p className="op-booking-body">{item.body}</p>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </section>

              {/* Setup: diagram beside the checklist */}
              <section className="op-section" id={setup.id} aria-labelledby="op-setup-title">
                <SectionHead id="op-setup-title" title={setup.headline} lede={setup.lede} />
                <div className="op-setup">
                  <Reveal className="op-reveal" {...OBSERVE}>
                    <div className="op-step" style={step(0)}>
                      <SetupDiagram />
                    </div>
                  </Reveal>
                  <Reveal className="op-reveal" {...OBSERVE}>
                    <div className="op-setup-list op-step" style={step(1)}>
                      <CheckList items={setup.items} label={setup.checklistLabel} />
                    </div>
                  </Reveal>
                </div>
                <Reveal className="op-reveal" {...OBSERVE}>
                  <p className="op-note op-step" style={step(0)}>
                    {setup.guide.before}
                    <Link className="op-link" href={setup.guide.href}>{setup.guide.linkLabel}</Link>
                    {setup.guide.after}
                  </p>
                </Reveal>
              </section>

              {/* Process: four stages along a track, with the review feeding back into the plan */}
              <section className="op-section" id={process.id} aria-labelledby="op-process-title">
                <SectionHead id="op-process-title" title={process.headline} lede={process.lede} />
                <Reveal className="op-reveal" {...TALL}>
                  <div className="op-track op-step" style={step(0)}>
                    <ol className="op-stages" aria-label={process.stagesLabel}>
                      {process.stages.map((stage) => (
                        <li key={stage.name} className="op-stage">
                          <h3 className="op-stage-name">{stage.name}</h3>
                          <p className="op-stage-body">{stage.body}</p>
                        </li>
                      ))}
                    </ol>
                    <p className="op-loop"><span>{process.loopNote}</span></p>
                  </div>
                </Reveal>
              </section>

              {/* Fit: one panel, two sides */}
              <section className="op-section" id={fit.id} aria-labelledby="op-fit-title">
                <SectionHead id="op-fit-title" title={fit.headline} lede={fit.lede} />
                <Reveal className="op-reveal" {...OBSERVE}>
                  <div className="op-fit op-step" style={step(0)}>
                    <div className="op-fit-col">
                      <h3 className="op-h3">{fit.online.title}</h3>
                      <ul className="op-dots">{fit.online.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                    <div className="op-fit-col">
                      <h3 className="op-h3">{fit.inPerson.title}</h3>
                      <ul className="op-dots">{fit.inPerson.items.map((item) => <li key={item}>{item}</li>)}</ul>
                      <Link className="op-link op-link--arrow" href={fit.inPerson.link.href}>
                        <span>{fit.inPerson.link.label}</span>
                        <ArrowRightIcon size={16} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
                <Reveal className="op-reveal" {...OBSERVE}>
                  <p className="op-note op-step" style={step(0)}>
                    {fit.guide.before}
                    <Link className="op-link" href={fit.guide.href}>{fit.guide.linkLabel}</Link>
                    {fit.guide.after}
                  </p>
                </Reveal>
              </section>

              {/* Equipment: a statement beside three options on a cream panel */}
              <section className="op-section" id={equipment.id} aria-labelledby="op-equipment-title">
                <SectionHead id="op-equipment-title" title={equipment.headline} />
                <Reveal className="op-reveal" {...OBSERVE}>
                  <div className="op-equipment op-step" style={step(0)}>
                    <div className="op-equipment-lead">
                      <p className="op-statement">{equipment.statement}</p>
                      <p className="op-equipment-lede">{equipment.lede}</p>
                    </div>
                    <div className="op-equipment-body">
                      <ul className="op-tiers" aria-label={equipment.tiersLabel}>
                        {equipment.tiers.map((tier) => (
                          <li key={tier.name}>
                            <h3 className="op-tier-name">{tier.name}</h3>
                            <p className="op-tier-text">{tier.text}</p>
                          </li>
                        ))}
                      </ul>
                      <p className="op-callout">{equipment.note}</p>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Comparing packages */}
              <section className="op-section" id={compare.id} aria-labelledby="op-compare-title">
                <SectionHead id="op-compare-title" title={compare.headline} lede={compare.lede} />
                <Reveal className="op-reveal" {...TALL}>
                  <dl className="op-compare op-step" style={step(0)} aria-label={compare.listLabel}>
                    {compare.items.map((item) => (
                      <div key={item.name} className="op-compare-item">
                        <dt>{item.name}</dt>
                        <dd>{item.text}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
                <Reveal className="op-reveal" {...OBSERVE}>
                  <div className="op-plans op-step" style={step(0)}>
                    <h3 className="op-h3">{compare.plans.title}</h3>
                    <ul>
                      {compare.plans.items.map((item) => (
                        <li key={item.id}>
                          <span className="op-plan-name">{item.name}</span>
                          <span className="op-plan-meta">{item.meta}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal className="op-reveal" {...OBSERVE}>
                  <ul className="op-link-list op-step" style={step(0)}>
                    {compare.links.map((link) => (
                      <li key={link.href}>
                        <Link className="op-link op-link--arrow" href={link.href}>
                          <span>{link.label}</span>
                          <ArrowRightIcon size={16} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>

              {/* Nutrition and recovery: a short supporting note */}
              <section className="op-section" id={nutrition.id} aria-labelledby="op-nutrition-title">
                <SectionHead id="op-nutrition-title" title={nutrition.headline} />
                <Reveal className="op-reveal" {...OBSERVE}>
                  <div className="op-nutrition op-step" style={step(0)}>
                    {nutrition.body.map((text) => <p key={text}>{text}</p>)}
                    <ul className="op-link-list">
                      <li>
                        <Link className="op-link op-link--arrow" href={nutrition.link.href}>
                          <span>{nutrition.link.label}</span>
                          <ArrowRightIcon size={16} />
                        </Link>
                      </li>
                      <li>
                        <Link className="op-link op-link--arrow" href={nutrition.disclaimerLink.href}>
                          <span>{nutrition.disclaimerLink.label}</span>
                          <ArrowRightIcon size={16} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Reveal>
              </section>

              {/* FAQs: one readable container; answers are in the HTML */}
              <section className="op-section" id={faq.id} aria-labelledby="op-faq-title">
                <SectionHead id="op-faq-title" title={faq.headline} />
                <Reveal className="op-reveal" {...TALL}>
                  <div className="op-faq op-step" style={step(0)}>
                    {faq.items.map((item, i) => (
                      <details key={item.q} className="op-faq-item" open={i === 0}>
                        <summary>
                          <span className="op-faq-q">{item.q}</span>
                          <span className="op-faq-toggle" aria-hidden="true"><PlusIcon size={18} /></span>
                        </summary>
                        <p className="op-faq-a">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </Reveal>
              </section>
            </div>

            {/* At a glance: sticky beside the content on wide screens, a plain summary elsewhere */}
            <aside className="op-aside" aria-labelledby="op-glance-title">
              <div className="op-glance">
                <h2 id="op-glance-title" className="op-glance-title">{glance.title}</h2>
                <dl className="op-glance-list">
                  <div>
                    <dt>{glance.format.label}</dt>
                    <dd>{glance.format.value}</dd>
                  </div>
                  {glance.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt>{glance.plans.label}</dt>
                    <dd>{glance.plans.text} <Link className="op-link" href={glance.plans.href}>{glance.plans.linkLabel}</Link>.</dd>
                  </div>
                  <div className="op-glance-jump">
                    <dt>{glance.jump.label}</dt>
                    <dd>
                      {glance.jump.links.map((link) => (
                        <a key={link.href} className="op-link" href={link.href}>{link.label}</a>
                      ))}
                    </dd>
                  </div>
                </dl>
                <div className="op-glance-cta">
                  <a className="button op-btn op-btn--primary" href={enquiryHref} target="_blank" rel="noopener noreferrer">
                    <WhatsAppLogo size={24} />
                    <span>{hero.primaryLabel}</span>
                  </a>
                  <a className="op-glance-call" href={telHref}>{glance.callPrefix} {contact.phoneDisplay}</a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Closing call to action */}
        <section className="op-cta" id={cta.id} aria-labelledby="op-cta-title">
          <div className="container">
            <Reveal className="op-reveal" {...OBSERVE}>
              <div className="op-cta-card op-step" style={step(0)}>
                <div className="op-cta-main">
                  <h2 id="op-cta-title" className="op-cta-h2">{cta.headline}</h2>
                  <p className="op-cta-body">{cta.body}</p>
                  <div className="op-ctas">
                    <a className="button op-btn op-btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
                      <WhatsAppLogo size={24} />
                      <span>{cta.whatsappLabel}</span>
                    </a>
                    <a className="op-btn op-btn--outline-light" href={telHref} aria-label={`${hero.callLabel} on ${contact.phoneDisplay}`}>
                      <PhoneIcon size={18} />
                      <span>{hero.callLabel}</span>
                    </a>
                  </div>
                </div>
                <nav className="op-cta-related" aria-label={cta.relatedTitle}>
                  <p className="op-cta-related-title">{cta.relatedTitle}</p>
                  <ul>
                    {cta.related.map((link) => (
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
      </main>
      <SiteFooter currentPath={page.path} />
    </>
  );
}

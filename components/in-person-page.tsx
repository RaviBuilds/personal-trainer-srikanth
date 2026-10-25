import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, PhoneIcon, PlusIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildWhatsAppUrl, inPersonPage as page, siteContent, telHref, type InPersonImage } from "@/src/lib/site-content";

const { contact, programmes } = siteContent;

// Reveal wrappers only trigger; the inner elements carry the motion. At most five items in a group are staggered.
const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;
const TALL = { amount: 0.04, rootMargin: "0px 0px -8% 0px" } as const;
const step = (i: number) => ({ "--i": Math.min(i, 4) }) as CSSProperties;
const imageVars = (image: InPersonImage) => ({ "--ip-aspect": image.aspect, "--ip-pos": `${image.focalPoint.x}% ${image.focalPoint.y}%` }) as CSSProperties;

function origin(path: string) {
  return `${siteContent.domain.replace(/\/$/, "")}${path}`;
}

function jsonLdScript(data: object) {
  // "<" is escaped so the payload can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function Photo({ image, sizes, preload = false, className = "" }: { image: InPersonImage; sizes: string; preload?: boolean; className?: string }) {
  return (
    <div className={`ip-photo-clip ${className}`} style={imageVars(image)}>
      <Image className="ip-photo-img" src={image.src} alt={image.alt} fill sizes={sizes} preload={preload} loading={preload ? undefined : "lazy"} />
    </div>
  );
}

function SectionHead({ id, title, lede }: { id: string; title: string; lede?: string }) {
  return (
    <Reveal className="ip-reveal" {...OBSERVE}>
      <div className="ip-head">
        <h2 id={id} className="ip-h2 ip-step" style={step(0)}>{title}</h2>
        {lede ? <p className="ip-lede ip-step" style={step(1)}>{lede}</p> : null}
      </div>
    </Reveal>
  );
}

function CheckList({ items, label }: { items: readonly string[]; label?: string }) {
  return (
    <ul className="ip-checks" aria-label={label}>
      {items.map((item, i) => (
        <li key={item} className="ip-step" style={step(i)}>
          <CheckIcon className="ip-check-icon" size={20} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function InPersonPage() {
  const { hero, glance, setting, process, goals, fit, prepare, frequency, compare, includes, faq, cta } = page;
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
      <main className="ip">
        {jsonLdScript(breadcrumbLd)}
        {jsonLdScript(faqLd)}

        {/* Hero: copy and photo are visible at first paint; only the photo settles in. */}
        <section className="ip-hero" aria-labelledby="ip-title">
          <div className="container">
            <nav className="ip-crumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">{page.breadcrumbLabel}</li>
              </ol>
            </nav>
            <div className="ip-hero-grid">
              <div className="ip-hero-copy">
                <h1 id="ip-title" className="ip-h1">{hero.headline.before}<span className="ip-h1-accent">{hero.headline.accent}</span></h1>
                <p className="ip-hero-lede">{hero.lede}</p>
                <div className="ip-ctas">
                  <a id="hero-primary-cta" className="button ip-btn ip-btn--primary" href={enquiryHref} target="_blank" rel="noopener noreferrer">
                    <WhatsAppLogo size={24} />
                    <span>{hero.primaryLabel}</span>
                  </a>
                  <a className="ip-btn ip-btn--outline" href={telHref} aria-label={`${hero.callLabel} on ${contact.phoneDisplay}`}>
                    <PhoneIcon size={18} />
                    <span>{hero.callLabel}</span>
                  </a>
                </div>
                <p className="ip-hero-note">
                  {hero.onlineNote.before}
                  <Link className="ip-link" href={siteContent.services.online.href}>{hero.onlineNote.linkLabel}</Link>
                  {hero.onlineNote.after}
                </p>
              </div>
              <div className="ip-hero-media">
                <Photo image={hero.image} className="ip-hero-photo" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 620px, 500px" preload />
              </div>
            </div>
          </div>
        </section>

        <div className="container ip-body">
          <div className="ip-body-grid">
            <div className="ip-main">
              {/* Where you train */}
              <section className="ip-section" id={setting.id} aria-labelledby="ip-setting-title">
                <SectionHead id="ip-setting-title" title={setting.headline} lede={setting.lede} />

                <article className="ip-gym" id={setting.gym.id} aria-labelledby="ip-gym-title">
                  <Reveal className="ip-reveal ip-photo-reveal" {...OBSERVE}>
                    <figure className="ip-figure ip-figure--wide">
                      <Photo image={setting.gym.image} sizes="(max-width: 1099px) 100vw, 810px" />
                    </figure>
                  </Reveal>
                  <div className="ip-setting-split">
                    <Reveal className="ip-reveal" {...OBSERVE}>
                      <div className="ip-setting-text">
                        <h3 id="ip-gym-title" className="ip-h3 ip-step" style={step(0)}>{setting.gym.title}</h3>
                        {setting.gym.body.map((text, i) => <p key={text} className="ip-step" style={step(i + 1)}>{text}</p>)}
                      </div>
                    </Reveal>
                    <Reveal className="ip-reveal" {...OBSERVE}>
                      <div className="ip-points ip-step" style={step(1)}>
                        <ul>{setting.gym.points.map((point) => <li key={point}><CheckIcon className="ip-check-icon" size={20} /><span>{point}</span></li>)}</ul>
                      </div>
                    </Reveal>
                  </div>
                </article>

                <article className="ip-home" id={setting.home.id} aria-labelledby="ip-home-title">
                  <Reveal className="ip-reveal" {...OBSERVE}>
                    <div className="ip-setting-text">
                      <h3 id="ip-home-title" className="ip-h3 ip-step" style={step(0)}>{setting.home.title}</h3>
                      {setting.home.body.map((text, i) => <p key={text} className="ip-step" style={step(i + 1)}>{text}</p>)}
                      <ul className="ip-bullets ip-step" style={step(3)}>
                        {setting.home.points.map((point) => <li key={point}><CheckIcon className="ip-check-icon" size={20} /><span>{point}</span></li>)}
                      </ul>
                    </div>
                  </Reveal>
                  <Reveal className="ip-reveal ip-photo-reveal" {...OBSERVE}>
                    <figure className="ip-figure ip-figure--tall">
                      <Photo image={setting.home.image} sizes="(max-width: 639px) 100vw, (max-width: 1099px) 420px, 330px" />
                    </figure>
                  </Reveal>
                </article>

                <Reveal className="ip-reveal" {...OBSERVE}>
                  <div className="ip-table-wrap ip-step" style={step(0)}>
                    <table className="ip-table" role="table">
                      <caption className="ip-sr">{setting.comparison.caption}</caption>
                      <thead role="rowgroup">
                        <tr role="row">
                          <th scope="col" role="columnheader">{setting.comparison.columns.topic}</th>
                          <th scope="col" role="columnheader">{setting.comparison.columns.gym}</th>
                          <th scope="col" role="columnheader">{setting.comparison.columns.home}</th>
                        </tr>
                      </thead>
                      <tbody role="rowgroup">
                        {setting.comparison.rows.map((row) => (
                          <tr key={row.topic} role="row">
                            <th scope="row" role="rowheader">{row.topic}</th>
                            <td role="cell" data-label={setting.comparison.columns.gym}>{row.gym}</td>
                            <td role="cell" data-label={setting.comparison.columns.home}>{row.home}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>
              </section>

              {/* How it works: a timeline on a cream panel */}
              <section className="ip-section ip-process" id="how-it-works" aria-labelledby="ip-process-title">
                <SectionHead id="ip-process-title" title={process.headline} lede={process.lede} />
                <Reveal className="ip-reveal" {...TALL}>
                  <ol className="ip-timeline" aria-label={process.stagesLabel}>
                    {process.stages.map((stage, i) => (
                      <li key={stage.name} className="ip-stage ip-step" style={step(i)}>
                        <h3 className="ip-stage-name">{stage.name}</h3>
                        <p className="ip-stage-body">{stage.body}</p>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </section>

              {/* Goals: an editorial, staggered list */}
              <section className="ip-section" aria-labelledby="ip-goals-title">
                <SectionHead id="ip-goals-title" title={goals.headline} lede={goals.lede} />
                <Reveal className="ip-reveal" {...TALL}>
                  <ul className="ip-goals" aria-label={goals.listLabel}>
                    {programmes.map((goal, i) => (
                      <li key={goal.id} className="ip-goal ip-step" style={step(i)}>
                        <h3 className="ip-goal-title">{goal.title}</h3>
                        <p className="ip-goal-summary">{goal.summary}</p>
                        <p className="ip-goal-approach">{goal.approach}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>

              {/* Fit: a balanced pair */}
              <section className="ip-section" aria-labelledby="ip-fit-title">
                <SectionHead id="ip-fit-title" title={fit.headline} />
                <Reveal className="ip-reveal" {...OBSERVE}>
                  <div className="ip-fit">
                    <div className="ip-fit-col ip-fit-col--in ip-step" style={step(0)}>
                      <h3 className="ip-h3">{fit.inPerson.title}</h3>
                      <CheckList items={fit.inPerson.items} />
                    </div>
                    <div className="ip-fit-col ip-fit-col--online ip-step" style={step(1)}>
                      <h3 className="ip-h3">{fit.online.title}</h3>
                      <CheckList items={fit.online.items} />
                      <p className="ip-fit-note">{fit.online.note}</p>
                      <Link className="ip-link ip-link--arrow" href={fit.online.link.href}>
                        <span>{fit.online.link.label}</span>
                        <ArrowRightIcon size={16} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
                <Reveal className="ip-reveal" {...OBSERVE}>
                  <p className="ip-note ip-step" style={step(0)}>
                    {fit.guide.before}
                    <Link className="ip-link" href={fit.guide.href}>{fit.guide.linkLabel}</Link>
                    {fit.guide.after}
                  </p>
                </Reveal>
              </section>

              {/* Preparation */}
              <section className="ip-section" aria-labelledby="ip-prepare-title">
                <SectionHead id="ip-prepare-title" title={prepare.headline} />
                <Reveal className="ip-reveal" {...OBSERVE}>
                  <div className="ip-prepare ip-step" style={step(0)}>
                    <div className="ip-prepare-cols">
                      <div>
                        <h3 className="ip-h3">{prepare.everyone.title}</h3>
                        <CheckList items={prepare.everyone.items} />
                      </div>
                      <div>
                        <h3 className="ip-h3">{prepare.setting.title}</h3>
                        <ul className="ip-checks">
                          {prepare.setting.items.map((item) => (
                            <li key={item.label}>
                              <CheckIcon className="ip-check-icon" size={20} />
                              <span><strong>{item.label}.</strong> {item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="ip-callout">{prepare.note}</p>
                  </div>
                </Reveal>
                <Reveal className="ip-reveal" {...OBSERVE}>
                  <p className="ip-note ip-step" style={step(0)}>
                    {prepare.guide.before}
                    <Link className="ip-link" href={prepare.guide.href}>{prepare.guide.linkLabel}</Link>
                    {prepare.guide.after}
                  </p>
                </Reveal>
              </section>

              {/* Frequency */}
              <section className="ip-section" aria-labelledby="ip-frequency-title">
                <SectionHead id="ip-frequency-title" title={frequency.headline} lede={frequency.body} />
                <Reveal className="ip-reveal" {...OBSERVE}>
                  <dl className="ip-factors" aria-label={frequency.factorsLabel}>
                    {frequency.factors.map((factor, i) => (
                      <div key={factor.name} className="ip-factor ip-step" style={step(i)}>
                        <dt>{factor.name}</dt>
                        <dd>{factor.text}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
                <Reveal className="ip-reveal" {...OBSERVE}>
                  <p className="ip-note ip-step" style={step(0)}>
                    {frequency.who.before}
                    <a className="ip-link" href={frequency.who.href} target="_blank" rel="noopener noreferrer">{frequency.who.linkLabel}</a>
                    {frequency.who.after}
                  </p>
                </Reveal>
              </section>

              {/* Comparing packages */}
              <section className="ip-section" aria-labelledby="ip-compare-title">
                <SectionHead id="ip-compare-title" title={compare.headline} lede={compare.lede} />
                <Reveal className="ip-reveal" {...TALL}>
                  <ul className="ip-compare" aria-label={compare.listLabel}>
                    {compare.items.map((item, i) => (
                      <li key={item.name} className="ip-compare-item ip-step" style={step(i)}>
                        <CheckIcon className="ip-check-icon" size={20} />
                        <div>
                          <p className="ip-compare-name">{item.name}</p>
                          <p className="ip-compare-text">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal className="ip-reveal" {...OBSERVE}>
                  <ul className="ip-link-list ip-step" style={step(0)}>
                    {compare.links.map((link) => (
                      <li key={link.href}>
                        <Link className="ip-link ip-link--arrow" href={link.href}>
                          <span>{link.label}</span>
                          <ArrowRightIcon size={16} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>

              {/* What is included */}
              <section className="ip-section" aria-labelledby="ip-includes-title">
                <SectionHead id="ip-includes-title" title={includes.headline} lede={includes.lede} />
                <Reveal className="ip-reveal" {...OBSERVE}>
                  <div className="ip-includes">
                    <div className="ip-step" style={step(0)}>
                      <CheckList items={includes.items} />
                    </div>
                    <div className="ip-scope ip-step" style={step(1)}>
                      <h3 className="ip-h3">{includes.scope.title}</h3>
                      <p>{includes.scope.body}</p>
                      <div><Link className="ip-link ip-link--arrow" href={includes.scope.link.href}>
                        <span>{includes.scope.link.label}</span>
                        <ArrowRightIcon size={16} />
                      </Link></div>
                      <div><Link className="ip-link ip-link--arrow" href={includes.scope.moreLink.href}>
                        <span>{includes.scope.moreLink.label}</span>
                        <ArrowRightIcon size={16} />
                      </Link></div>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* FAQs: one readable container; answers are in the HTML */}
              <section className="ip-section" id="in-person-faqs" aria-labelledby="ip-faq-title">
                <SectionHead id="ip-faq-title" title={faq.headline} />
                <Reveal className="ip-reveal" {...TALL}>
                  <div className="ip-faq ip-step" style={step(0)}>
                    {faq.items.map((item, i) => (
                      <details key={item.q} className="ip-faq-item" open={i === 0}>
                        <summary>
                          <span className="ip-faq-q">{item.q}</span>
                          <span className="ip-faq-toggle" aria-hidden="true"><PlusIcon size={18} /></span>
                        </summary>
                        <p className="ip-faq-a">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </Reveal>
              </section>
            </div>

            {/* At a glance: sticky beside the content on wide screens, a plain summary elsewhere */}
            <aside className="ip-aside" aria-labelledby="ip-glance-title">
              <div className="ip-glance">
                <h2 id="ip-glance-title" className="ip-glance-title">{glance.title}</h2>
                <dl className="ip-glance-list">
                  <div>
                    <dt>{glance.format.label}</dt>
                    <dd>{glance.format.value}</dd>
                  </div>
                  <div>
                    <dt>{glance.settings.label}</dt>
                    <dd>
                      <a className="ip-link" href={`#${page.setting.gym.id}`}>{glance.settings.gym}</a>
                      {glance.settings.joiner}
                      <a className="ip-link" href={`#${page.setting.home.id}`}>{glance.settings.home}</a>
                    </dd>
                  </div>
                  {glance.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt>{glance.plans.label}</dt>
                    <dd>{glance.plans.text} <Link className="ip-link" href={glance.plans.href}>{glance.plans.linkLabel}</Link>.</dd>
                  </div>
                </dl>
                <div className="ip-glance-cta">
                  <a className="button ip-btn ip-btn--primary" href={enquiryHref} target="_blank" rel="noopener noreferrer">
                    <WhatsAppLogo size={24} />
                    <span>{hero.primaryLabel}</span>
                  </a>
                  <a className="ip-glance-call" href={telHref}>{glance.callPrefix} {contact.phoneDisplay}</a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Closing call to action */}
        <section className="ip-cta" aria-labelledby="ip-cta-title">
          <div className="container">
            <Reveal className="ip-reveal" {...OBSERVE}>
              <div className="ip-cta-card ip-step" style={step(0)} id="contact-card">
                <div className="ip-cta-main">
                  <h2 id="ip-cta-title" className="ip-cta-h2">{cta.headline}</h2>
                  <p className="ip-cta-body">{cta.body}</p>
                  <div className="ip-ctas">
                    <a className="button ip-btn ip-btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
                      <WhatsAppLogo size={24} />
                      <span>{cta.whatsappLabel}</span>
                    </a>
                    <a className="ip-btn ip-btn--outline-light" href={telHref} aria-label={`${hero.callLabel} on ${contact.phoneDisplay}`}>
                      <PhoneIcon size={18} />
                      <span>{hero.callLabel}</span>
                    </a>
                  </div>
                </div>
                <nav className="ip-cta-related" aria-label={cta.relatedTitle}>
                  <p className="ip-cta-related-title">{cta.relatedTitle}</p>
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

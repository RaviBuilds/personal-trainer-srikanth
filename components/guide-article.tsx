import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, PlusIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs, GuideCta, Inline, JsonLd, OBSERVE, TALL, breadcrumbJsonLd, plainText, step } from "@/components/guide-parts";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getGuide, guidesIndex, type Guide, type GuideBlock } from "@/src/lib/guides-content";
import { buildWhatsAppUrl, siteContent } from "@/src/lib/site-content";

const FAQ_ID = "guide-faq";

/** Wraps a block so it rises once as it enters view. Plain paragraphs and lists are not animated. */
function Rise({ children, className = "", tall = false }: { children: React.ReactNode; className?: string; tall?: boolean }) {
  return (
    <Reveal className="gd-reveal" {...(tall ? TALL : OBSERVE)}>
      <div className={`gd-step ${className}`.trim()} style={step(0)}>{children}</div>
    </Reveal>
  );
}

function Table({ block }: { block: Extract<GuideBlock, { type: "table" }> }) {
  const { caption, columns, rows } = block;
  return (
    <Rise className="gd-table-wrap" tall>
      <table className="gd-table">
        <caption className="gd-sr">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i} scope="col">{column === "" ? <span className="gd-sr">Topic</span> : column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row"><Inline text={row[0]} /></th>
              {row.slice(1).map((cell, i) => (
                <td key={i} data-label={columns[i + 1] || undefined}><Inline text={cell} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Rise>
  );
}

function FormatRows({ block }: { block: Extract<GuideBlock, { type: "formats" }> }) {
  return (
    <div className="gd-formats" role="list" aria-label={block.label}>
      {block.items.map((item) => {
        const image = siteContent.formats.find((format) => format.id === item.id)?.image;
        return (
          <Reveal key={item.id} className="gd-reveal" {...OBSERVE}>
            <article className="gd-format gd-step" style={step(0)} role="listitem" aria-labelledby={`gd-format-${item.id}`}>
              {image ? (
                <div className="gd-format-photo">
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 719px) 100vw, 340px" loading="lazy" style={{ objectPosition: image.objectPosition }} />
                </div>
              ) : null}
              <div className="gd-format-body">
                <h3 id={`gd-format-${item.id}`} className="gd-h3">{item.title}</h3>
                <dl className="gd-format-facts">
                  <div><dt>May suit you if</dt><dd>{item.suits}</dd></div>
                  <div><dt>Trade-offs</dt><dd>{item.tradeoffs}</dd></div>
                  <div><dt>Clarify first</dt><dd>{item.check}</dd></div>
                </dl>
                {item.link ? (
                  <Link className="gd-link gd-link--arrow" href={item.link.href}>
                    <span>{item.link.label}</span>
                    <ArrowRightIcon size={16} />
                  </Link>
                ) : null}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Renders one content block. Shared with the privacy and disclaimer pages (components/legal-page.tsx). */
export function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return <p className="gd-p"><Inline text={block.text} /></p>;
    case "h3":
      return <h3 className="gd-h3 gd-h3--block">{block.text}</h3>;
    case "list":
      return (
        <ul className={`gd-list${block.columns ? " gd-list--cols" : ""}`}>
          {block.items.map((item) => <li key={item}><Inline text={item} /></li>)}
        </ul>
      );
    case "checks":
      return (
        <Rise>
          <ul className={`gd-checks${block.columns ? " gd-checks--cols" : ""}`} aria-label={block.label}>
            {block.items.map((item) => (
              <li key={item}>
                <CheckIcon className="gd-check-icon" size={20} />
                <span><Inline text={item} /></span>
              </li>
            ))}
          </ul>
        </Rise>
      );
    case "terms":
      return (
        <Rise tall>
          <dl className="gd-terms" aria-label={block.label}>
            {block.items.map((item) => (
              <div key={item.name} className="gd-term">
                <dt>{item.name}</dt>
                <dd><Inline text={item.text} /></dd>
              </div>
            ))}
          </dl>
        </Rise>
      );
    case "steps":
      return (
        <Rise tall>
          <ol className="gd-steps" aria-label={block.label}>
            {block.items.map((item) => (
              <li key={item.name} className="gd-stepitem">
                <h3 className="gd-stepname">{item.name}</h3>
                <p><Inline text={item.text} /></p>
              </li>
            ))}
          </ol>
        </Rise>
      );
    case "table":
      return <Table block={block} />;
    case "callout":
      return (
        <Rise>
          <div className="gd-callout">
            {block.title ? <p className="gd-callout-title">{block.title}</p> : null}
            <p><Inline text={block.text} /></p>
          </div>
        </Rise>
      );
    case "groups":
      return (
        <Rise tall>
          <div className={`gd-groups gd-groups--${block.groups.length}`} role="list" aria-label={block.label}>
            {block.groups.map((group) => (
              <div key={group.title} className="gd-group" role="listitem">
                <h3 className="gd-h3">{group.title}</h3>
                <ul className="gd-checks">
                  {group.items.map((item) => (
                    <li key={item}>
                      <CheckIcon className="gd-check-icon" size={20} />
                      <span><Inline text={item} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Rise>
      );
    case "split":
      return (
        <Rise tall>
          <div className="gd-split">
            <div className="gd-split-col gd-split-col--left">
              <h3 className="gd-h3">{block.left.title}</h3>
              <ul className="gd-list">{block.left.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="gd-split-col gd-split-col--right">
              <h3 className="gd-h3">{block.right.title}</h3>
              <ul className="gd-checks">
                {block.right.items.map((item) => (
                  <li key={item}>
                    <CheckIcon className="gd-check-icon" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Rise>
      );
    case "formats":
      return <FormatRows block={block} />;
  }
}

export function GuideArticle({ guide }: { guide: Guide }) {
  const path = `/guides/${guide.slug}/`;
  const trail = [
    { label: "Home", href: "/" },
    { label: guidesIndex.breadcrumbLabel, href: guidesIndex.path },
    { label: guide.title, href: path },
  ];
  const toc = [...guide.sections.map((section) => ({ id: section.id, label: section.heading })), { id: FAQ_ID, label: "Questions readers ask" }];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: plainText(item.a) } })),
  };
  const related = guide.related.map((slug) => getGuide(slug)).filter((item): item is Guide => Boolean(item));

  return (
    <>
      <SiteHeader />
      <main className="gd">
        <JsonLd data={breadcrumbJsonLd(trail)} />
        <JsonLd data={faqLd} />

        <section className="gd-hero" aria-labelledby="gd-title">
          <div className="container">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: guidesIndex.breadcrumbLabel, href: guidesIndex.path }, { label: guide.title }]} />
            <div className="gd-hero-grid">
              <div className="gd-hero-copy">
                <h1 id="gd-title" className="gd-h1">{guide.title}</h1>
                <p className="gd-hero-lede">{guide.lede}</p>
              </div>
              <aside className="gd-take" aria-labelledby="gd-take-title">
                <h2 id="gd-take-title" className="gd-take-title">The short version</h2>
                <ul className="gd-checks">
                  {guide.takeaways.map((item) => (
                    <li key={item}>
                      <CheckIcon className="gd-check-icon" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <div className="container gd-body">
          <div className="gd-body-grid">
            <aside className="gd-rail">
              <nav className="gd-toc" aria-labelledby="gd-toc-title">
                <h2 id="gd-toc-title" className="gd-toc-title">In this guide</h2>
                <ul>
                  {toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}
                </ul>
              </nav>
              <div className="gd-rail-cta">
                <a className="button gd-btn gd-btn--primary" href={buildWhatsAppUrl(guide.cta.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppLogo size={24} />
                  <span>Ask {siteContent.name} a question</span>
                </a>
              </div>
            </aside>

            <article className="gd-article">
              {guide.sections.map((section) => (
                <section key={section.id} className="gd-section" aria-labelledby={section.id}>
                  <Reveal className="gd-reveal" {...OBSERVE}>
                    <h2 id={section.id} className="gd-h2 gd-step" style={step(0)}>{section.heading}</h2>
                  </Reveal>
                  <div className="gd-blocks">
                    {section.blocks.map((block, i) => <Block key={i} block={block} />)}
                  </div>
                </section>
              ))}

              <section className="gd-section" aria-labelledby={FAQ_ID}>
                <Reveal className="gd-reveal" {...OBSERVE}>
                  <h2 id={FAQ_ID} className="gd-h2 gd-step" style={step(0)}>Questions readers ask</h2>
                </Reveal>
                <Reveal className="gd-reveal" {...TALL}>
                  <div className="gd-faq gd-step" style={step(0)}>
                    {guide.faq.map((item, i) => (
                      <details key={item.q} className="gd-faq-item" open={i === 0}>
                        <summary>
                          <span className="gd-faq-q">{item.q}</span>
                          <span className="gd-faq-toggle" aria-hidden="true"><PlusIcon size={18} /></span>
                        </summary>
                        <p className="gd-faq-a"><Inline text={item.a} /></p>
                      </details>
                    ))}
                  </div>
                </Reveal>
              </section>

              <p className="gd-scope">
                This guide is general information about personal training. It is not medical advice, and it does not replace a conversation about your own situation. Read the <Link className="gd-link" href="/disclaimer/">disclaimer</Link>.
              </p>
            </article>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="gd-more" aria-labelledby="gd-more-title">
            <div className="container">
              <Reveal className="gd-reveal" {...OBSERVE}>
                <div className="gd-more-panel gd-step" style={step(0)}>
                  <h2 id="gd-more-title" className="gd-more-h2">Keep reading</h2>
                  <ul className="gd-more-list">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/guides/${item.slug}/`}>
                          <span className="gd-more-title">{item.title}</span>
                          <span className="gd-more-text">{item.index.description}</span>
                          <ArrowRightIcon className="gd-more-arrow" size={18} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        <GuideCta
          headline={guide.cta.headline}
          body={guide.cta.body}
          whatsappLabel="Chat on WhatsApp"
          whatsappMessage={guide.cta.whatsappMessage}
          relatedTitle="Explore training"
          related={[
            { label: "In-person personal training in Hyderabad", href: siteContent.services.inPerson.href },
            { label: "Online personal training", href: siteContent.services.online.href },
            { label: "See the plans and pricing", href: "/#pricing" },
          ]}
        />
      </main>
      <SiteFooter currentPath={path} />
    </>
  );
}

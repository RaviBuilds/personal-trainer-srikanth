import { CheckIcon, WhatsAppLogo } from "@/components/icons";
import { Block } from "@/components/guide-article";
import { Breadcrumbs, GuideCta, JsonLd, OBSERVE, breadcrumbJsonLd, step } from "@/components/guide-parts";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { LegalPageContent } from "@/src/lib/legal-content";
import { buildWhatsAppUrl, siteContent } from "@/src/lib/site-content";

/**
 * Privacy notice and disclaimer. Same visual system as the guides (guides.css): breadcrumb, a heading with a
 * "short version" card, a contents rail beside the sections, and the closing contact band.
 */
export function LegalPage({ page }: { page: LegalPageContent }) {
  const trail = [
    { label: "Home", href: "/" },
    { label: page.breadcrumbLabel, href: page.path },
  ];
  const toc = page.sections.map((section) => ({ id: section.id, label: section.heading }));

  return (
    <>
      <SiteHeader />
      <main className="gd gd-legal">
        <JsonLd data={breadcrumbJsonLd(trail)} />

        <section className="gd-hero" aria-labelledby="gd-title">
          <div className="container">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: page.breadcrumbLabel }]} />
            <div className="gd-hero-grid">
              <div className="gd-hero-copy">
                <p className="gd-eyebrow">{page.eyebrow}</p>
                <h1 id="gd-title" className="gd-h1">{page.title}</h1>
                <p className="gd-hero-lede">{page.lede}</p>
                <p className="gd-updated">{page.updatedLabel}</p>
              </div>
              <aside className="gd-take" aria-labelledby="gd-take-title">
                <h2 id="gd-take-title" className="gd-take-title">{page.summaryTitle}</h2>
                <ul className="gd-checks">
                  {page.summary.map((item) => (
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
                <h2 id="gd-toc-title" className="gd-toc-title">On this page</h2>
                <ul>
                  {toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}
                </ul>
              </nav>
              <div className="gd-rail-cta">
                <a className="button gd-btn gd-btn--primary" href={buildWhatsAppUrl(page.cta.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppLogo size={24} />
                  <span>Ask {siteContent.name} a question</span>
                </a>
              </div>
            </aside>

            <article className="gd-article">
              {page.sections.map((section) => (
                <section key={section.id} className="gd-section" aria-labelledby={section.id}>
                  <Reveal className="gd-reveal" {...OBSERVE}>
                    <h2 id={section.id} className="gd-h2 gd-step" style={step(0)}>{section.heading}</h2>
                  </Reveal>
                  <div className="gd-blocks">
                    {section.blocks.map((block, i) => <Block key={i} block={block} />)}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>

        <GuideCta {...page.cta} />
      </main>
      <SiteFooter currentPath={page.path} />
    </>
  );
}

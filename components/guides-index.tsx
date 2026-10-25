import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Breadcrumbs, GuideCta, JsonLd, TALL, breadcrumbJsonLd, step } from "@/components/guide-parts";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { guides, guidesIndex as page } from "@/src/lib/guides-content";

export function GuidesIndex() {
  const { image } = page;
  const imageVars = { "--gd-aspect": image.aspect, "--gd-pos": `${image.focalPoint.x}% ${image.focalPoint.y}%` } as CSSProperties;

  return (
    <>
      <SiteHeader />
      <main className="gd">
        <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: page.breadcrumbLabel, href: page.path }])} />

        <section className="gd-hero gd-hero--index" aria-labelledby="gd-title">
          <div className="container">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: page.breadcrumbLabel }]} />
            <div className="gd-hero-grid">
              <div className="gd-hero-copy">
                <h1 id="gd-title" className="gd-h1">{page.title}</h1>
                <p className="gd-hero-lede">{page.lede}</p>
                <p className="gd-hero-note">
                  {page.note.before}
                  <Link className="gd-link" href={page.note.href}>{page.note.linkLabel}</Link>
                  {page.note.after}
                </p>
              </div>
              <div className="gd-hero-media">
                <div className="gd-photo-clip" style={imageVars}>
                  <Image className="gd-photo-img" src={image.src} alt={image.alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 620px, 480px" preload />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="gd-index" aria-labelledby="gd-index-title">
          <div className="container">
            <h2 id="gd-index-title" className="gd-sr">All guides</h2>
            <Reveal className="gd-reveal" {...TALL}>
              <ul className="gd-entries gd-step" style={step(0)} aria-label={page.listLabel}>
                {guides.map((guide) => (
                  <li key={guide.slug} className="gd-entry">
                    <p className="gd-entry-question">{guide.index.question}</p>
                    <div className="gd-entry-main">
                      <h3 className="gd-entry-title">
                        <Link href={`/guides/${guide.slug}/`}>{guide.title}</Link>
                      </h3>
                      <p className="gd-entry-text">{guide.index.description}</p>
                      <span className="gd-entry-more" aria-hidden="true">
                        <span>{page.readLabel}</span>
                        <ArrowRightIcon size={16} />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <GuideCta {...page.cta} />
      </main>
      <SiteFooter currentPath={page.path} />
    </>
  );
}

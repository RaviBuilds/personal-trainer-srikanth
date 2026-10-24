import { FormatPassCard } from "@/components/format-pass-card";
import { ArrowUpRightIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { buildWhatsAppUrl, siteContent } from "@/src/lib/site-content";
import type { CSSProperties } from "react";

const { formatsSection, formats } = siteContent;

export function FormatsSection() {
  const helperHref = buildWhatsAppUrl(formatsSection.helper.whatsappMessage);

  return (
    <section className="section fmt" id="formats" aria-labelledby="formats-title">
      <div className="container fmt-container">
        <Reveal className="fmt-header-reveal" rootMargin="0px 0px -18% 0px">
          <div className="fmt-header">
            <div className="fmt-header-intro">
              <p className="fmt-eyebrow">{formatsSection.eyebrow}</p>
              <h2 id="formats-title" className="fmt-h2">
                {formatsSection.headline}{" "}
                <span className="fmt-h2-accent">{formatsSection.accent}</span>
              </h2>
            </div>
            <p className="fmt-lead">{formatsSection.lead}</p>
          </div>
        </Reveal>

        <ul className="fmt-grid" aria-label="Three ways to train">
          {formats.map((format, index) => (
            <li className="fmt-item" key={format.id}>
              <Reveal
                className="fmt-card-reveal"
                rootMargin="0px 0px -12% 0px"
                style={{ "--card-delay": `${index * 120}ms` } as CSSProperties}
              >
                <FormatPassCard format={format} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="fmt-helper-reveal" rootMargin="0px 0px -10% 0px">
          <p className="fmt-helper">
            <span className="fmt-helper-text">{formatsSection.helper.text}</span>{" "}
            <a
              className="fmt-helper-link"
              href={helperHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppLogo size={20} aria-hidden="true" />
              <span>{formatsSection.helper.linkLabel}</span>
              <ArrowUpRightIcon className="fmt-helper-arrow" size={15} aria-hidden="true" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

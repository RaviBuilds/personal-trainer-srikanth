import type { CSSProperties } from "react";
import { ApproachPath } from "@/components/approach-path";
import { ApproachGlyph, CheckIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { buildWhatsAppUrl, siteContent, telHref } from "@/src/lib/site-content";

const { approach, contact } = siteContent;
const LINK_TOKEN = /<link text='([^']*)' href='([^']*)'\/>/;

/** Renders step copy, turning the single <link text='' href=''/> token into an anchor. */
function StepBody({ text }: { text: string }) {
  const match = LINK_TOKEN.exec(text);
  if (!match) return <>{text}</>;
  const [token, label, href] = match;
  return (
    <>
      {text.slice(0, match.index)}
      <a className="ap-link" href={href}>
        {label}
      </a>
      {text.slice(match.index + token.length)}
    </>
  );
}

export function ApproachSection() {
  const { cta } = approach;

  return (
    <section className="ap" id={approach.anchorId} aria-labelledby="approach-steps-title">
      <div className="container">
        <Reveal className="ap-reveal ap-head-reveal" amount={0.15} rootMargin="0px 0px -8% 0px">
          <h2 id="approach-steps-title" className="ap-h2">
            {approach.headingBefore}
            <span className="ap-h2-accent">{approach.headingAccent}</span>
          </h2>
        </Reveal>

        <Reveal className="ap-reveal ap-stage" amount={0.12} rootMargin="0px 0px -8% 0px">
          <Reveal className="ap-reveal ap-lede-reveal" amount={0.15} rootMargin="0px 0px -8% 0px">
            <p className="ap-lede">{approach.lede}</p>
          </Reveal>

          <ol className="ap-list" role="list" aria-label={approach.stepsLabel}>
            {approach.steps.map((step, index) => (
              <li className="ap-step" key={step.id} style={{ "--i": index } as CSSProperties}>
                <Reveal className="ap-reveal ap-card-reveal" amount={0.12} rootMargin="0px 0px -6% 0px">
                  <div className="ap-card">
                    <span className="ap-node" data-ap-node="" aria-hidden="true" />
                    <div className="ap-card-top">
                      <p className="ap-timing">{step.timing}</p>
                      <ApproachGlyph className="ap-icon" name={step.icon} size={28} />
                    </div>
                    <h3 className="ap-h3">{step.name}</h3>
                    <p className="ap-body">
                      <StepBody text={step.body} />
                    </p>
                    <p className="ap-comfort">
                      <CheckIcon className="ap-check" size={18} />
                      <span>{step.comfort}</span>
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="ap-reveal ap-cta-reveal" amount={0.15} rootMargin="0px 0px -6% 0px">
            <div className="ap-cta">
              <h3 className="ap-cta-title">{cta.title}</h3>
              <p className="ap-cta-body">{cta.body}</p>
              <a
                className="button ap-btn"
                href={buildWhatsAppUrl(cta.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppLogo size={24} />
                <span>{cta.primaryLabel}</span>
              </a>
              <a className="ap-call" href={telHref}>
                {cta.callLabel.replace("{phone}", contact.phoneDisplay)}
              </a>
            </div>
          </Reveal>

          <ApproachPath />
        </Reveal>
      </div>
    </section>
  );
}

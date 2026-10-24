import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRightIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { formatRupees, groupStartingPrice, lowestMonthly, termTotal } from "@/src/lib/pricing";
import { buildWhatsAppUrl, siteContent, telHref, whatsappHref, type PricingGroup } from "@/src/lib/site-content";

const { pricing } = siteContent;
const { image, terms, groups, help, notes, feesGuide } = pricing;

const panelId = (group: PricingGroup) => `pricing-${group.id}`;
const titleId = (group: PricingGroup) => `pricing-${group.id}-title`;

export function PricingSection() {
  const focal = `${image.focalPoint.x}% ${image.focalPoint.y}%`;
  const photoVars = { "--pr-aspect": image.aspect, "--pr-focal": focal } as CSSProperties;

  return (
    <section className="section pr" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="pr-band">
          <Reveal className="pr-reveal pr-photo-reveal" amount={0.12} rootMargin="0px 0px -8% 0px">
            <div className="pr-photo" style={photoVars}>
              <div className="pr-photo-clip">
                <Image
                  className="pr-photo-img"
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1240px) 1240px, 100vw"
                  quality={80}
                  loading="lazy"
                  style={{ objectPosition: focal }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="pr-reveal pr-head-reveal" amount={0.15} rootMargin="0px 0px -8% 0px">
            <div className="pr-head">
              <h2 id="pricing-title" className="pr-h2">
                <span className="pr-h2-accent">{pricing.headline.accent}</span>
                {pricing.headline.rest}
              </h2>
              <p className="pr-lede">
                {pricing.lede.before}
                {formatRupees(lowestMonthly(groups))}
                {pricing.lede.after}
              </p>
            </div>
          </Reveal>

          <Reveal className="pr-reveal pr-index-reveal" amount={0.15} rootMargin="0px 0px -8% 0px">
            <nav aria-label={pricing.indexLabel}>
              <ul className="pr-index">
                {groups.map((group, i) => {
                  const { amount, isFrom } = groupStartingPrice(group);
                  return (
                    <li key={group.id} className="pr-index-item" style={{ "--i": i } as CSSProperties}>
                      <a className="pr-index-link" href={`#${panelId(group)}`}>
                        <span className="pr-index-name">{group.title}</span>
                        <span className="pr-index-price">
                          {isFrom && <span className="pr-index-from">{pricing.fromLabel} </span>}
                          <span className="pr-index-amount">{formatRupees(amount)}</span>
                          <span className="pr-index-per"> {pricing.perMonthLabel}</span>
                        </span>
                        <ArrowRightIcon className="pr-arrow" size={20} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Reveal>
        </div>

        <div className="pr-card">
          {groups.map((group) => (
            <Reveal key={group.id} className="pr-reveal pr-panel-reveal" amount={0.12} rootMargin="0px 0px -8% 0px">
              <section id={panelId(group)} className={`pr-panel pr-panel--${group.tone}`} aria-labelledby={titleId(group)}>
                <div className="pr-rail">
                  {group.tag && <span className="pr-tag">{group.tag}</span>}
                  <h3 id={titleId(group)} className="pr-h3">
                    {group.title}
                  </h3>
                  <p className="pr-desc">{group.description}</p>
                  {group.cta && (
                    <a className="button pr-btn" href={buildWhatsAppUrl(group.cta.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                      <WhatsAppLogo size={24} />
                      <span>{group.cta.label}</span>
                    </a>
                  )}
                </div>

                <div className="pr-table-wrap">
                  <table className="pr-table" role="table" aria-labelledby={titleId(group)}>
                    <thead role="rowgroup">
                      <tr role="row">
                        <th scope="col" role="columnheader">{pricing.columns.plan}</th>
                        <th scope="col" role="columnheader">{pricing.columns.monthly}</th>
                        {terms.map((term) => (
                          <th key={term.months} scope="col" role="columnheader">{term.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody role="rowgroup">
                      {group.plans.map((plan) => (
                        <tr key={plan.id} role="row">
                          <th scope="row" role="rowheader" className="pr-plan">
                            <span id={`${plan.id}-name`} className="pr-plan-name">{plan.name}</span>
                            <span className="pr-plan-meta">{plan.meta}</span>
                            <a
                              id={`${plan.id}-ask`}
                              className="pr-ask"
                              href={buildWhatsAppUrl(plan.waMessage)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-labelledby={`${plan.id}-ask ${plan.id}-name`}
                            >
                              <span>{pricing.rowLinkLabel}</span>
                              <ArrowRightIcon className="pr-arrow" size={18} />
                            </a>
                          </th>
                          <td role="cell" className="pr-monthly">
                            <span className="pr-price">{formatRupees(plan.monthly)}</span>
                            <span className="pr-per">{pricing.perMonthLabel}</span>
                          </td>
                          {terms.map((term) => (
                            <td key={term.months} role="cell" className="pr-term" data-label={term.label}>
                              {formatRupees(termTotal(plan.monthly, term.months))}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <div className="pr-help">
          <div className="pr-help-copy">
            <h3 className="pr-help-title">{help.title}</h3>
            <p className="pr-help-body">{help.body}</p>
          </div>
          <div className="pr-help-actions">
            <a className="button pr-btn" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppLogo size={24} />
              <span>{help.ctaLabel}</span>
            </a>
            <a className="pr-call" href={telHref}>
              {help.callLabel} {siteContent.contact.phoneDisplay}
            </a>
          </div>
          <div className="pr-notes">
            {notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
            <p>
              {feesGuide.before}
              <a className="pr-notes-link" href={feesGuide.href}>
                {feesGuide.linkLabel}
              </a>
              {feesGuide.after}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

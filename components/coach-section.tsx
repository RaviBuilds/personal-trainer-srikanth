import Image from "next/image";
import type { CSSProperties } from "react";
import { CredentialChip } from "@/components/credential-chip";
import { ArrowUpRightIcon, CheckIcon, InstagramIcon, PhoneIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { siteContent, telHref, whatsappHref } from "@/src/lib/site-content";

const { coachSection, hero, contact, name, instagram } = siteContent;
const { image } = coachSection;
const numberFormat = new Intl.NumberFormat("en-IN");
const index = (i: number) => ({ "--i": i }) as CSSProperties;

// Every block reveals from its own observer; the wrappers only trigger, the inner elements carry the motion.
const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;

export function CoachSection() {
  const focal = `${image.focalPoint.x}% ${image.focalPoint.y}%`;
  const photoVars = { "--co-aspect": image.aspect, "--co-focal": focal } as CSSProperties;

  return (
    <section className="co" id="coach" aria-labelledby="coach-title">
      <div className="container">
        <Reveal className="co-reveal co-card-reveal" {...OBSERVE}>
          <div className="co-card">
            <Reveal className="co-reveal co-photo-reveal" {...OBSERVE}>
              <div className="co-photo" style={photoVars}>
                <div className="co-photo-clip">
                  <Image
                    className="co-photo-img"
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1024px) 560px, calc(100vw - 80px)"
                    quality={80}
                    loading="lazy"
                    style={{ objectPosition: focal }}
                  />
                </div>
                <CredentialChip className="co-chip" />
              </div>
            </Reveal>

            <div className="co-content">
              <Reveal className="co-reveal co-head-reveal" {...OBSERVE}>
                <h2 id="coach-title" className="co-h2">
                  {coachSection.headingBefore}
                  <span className="co-h2-accent">{coachSection.headingAccent}</span>
                </h2>
                <p className="co-lede">{coachSection.lede}</p>
              </Reveal>

              <Reveal className="co-reveal co-list-reveal" {...OBSERVE}>
                <ul className="co-list">
                  {coachSection.principles.map((item, i) => (
                    <li key={item.lead} className="co-principle" style={index(i)}>
                      <CheckIcon className="co-check" size={20} />
                      <p>
                        <span className="co-lead">{item.lead}</span>
                        <span className="co-text">{item.text}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="co-reveal co-contact-reveal" {...OBSERVE}>
                <div className="co-contact">
                  <div className="co-actions">
                    <a className="button co-btn" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      <WhatsAppLogo size={24} />
                      <span>{hero.whatsappLabel}</span>
                    </a>
                    <a className="co-link" href={telHref}>
                      <PhoneIcon size={20} />
                      <span>{hero.callLabel} {contact.phoneDisplay}</span>
                    </a>
                    <a
                      className="co-link"
                      href={instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name} on Instagram, opens in a new tab`}
                    >
                      <InstagramIcon size={20} />
                      <span>@{instagram.handle} on Instagram</span>
                      <ArrowUpRightIcon className="co-link-arrow" size={16} />
                    </a>
                  </div>
                  <p className="co-languages">{coachSection.languagesLine}</p>
                </div>
              </Reveal>
            </div>

            <Reveal className="co-reveal co-stats-reveal" {...OBSERVE}>
              <div className="co-stats">
                <dl className="co-stat-list">
                  {hero.stats.map((stat, i) => (
                    <div key={stat.label} className="co-stat" style={index(i)}>
                      <dt>{stat.label}</dt>
                      <dd>{`${numberFormat.format(stat.value)}${stat.suffix}`}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

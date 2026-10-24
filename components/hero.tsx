import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRightIcon, HeroGlyph, PhoneIcon, StarIcon, WhatsAppLogo } from "@/components/icons";
import { CountUp } from "@/components/count-up";
import { CredentialChip } from "@/components/credential-chip";
import { siteContent, telHref, whatsappHref } from "@/src/lib/site-content";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const { hero, contact, assets } = siteContent;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hx-eyebrow hx-rise" style={delay(150)}>{hero.eyebrow}</p>
          <h1 id="hero-title" className="hx-h1">
            <span className="hx-line"><span className="hx-line-in" style={delay(250)}>Personal training</span></span>{" "}
            <span className="hx-line"><span className="hx-line-in" style={delay(340)}>in <em>Hyderabad,</em></span></span>{" "}
            <span className="hx-line"><span className="hx-line-in" style={delay(430)}>built around <span className="hx-hl"><span className="hx-hl-text">you.</span></span></span></span>
          </h1>
          <p className="hx-lead hx-rise" style={delay(600)}>{hero.lead}</p>
          <ul className="hx-paths" aria-label="Ways to train">
            {hero.pathways.map((path, index) => (
              <li key={path.label} className="hx-rise hx-rise-sm" style={delay(700 + index * 60)}>
                <Link className="hx-path" href={path.href}>
                  <HeroGlyph name={path.icon} size={18} />
                  <span className="hx-path-label">{path.label}</span>
                  <ArrowUpRightIcon className="hx-path-arrow" size={13} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="hx-ctas hx-rise" style={delay(800)}>
            <a id="hero-primary-cta" className="hx-btn hx-btn-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppLogo size={24} />
              <span>{hero.whatsappLabel}</span>
            </a>
            <a className="hx-btn hx-btn-secondary" href={telHref} aria-label={`${hero.callLabel} ${contact.phoneDisplay}`}>
              <PhoneIcon size={18} />
              <span>{hero.callLabel}<span className="hx-call-number"> {contact.phoneDisplay}</span></span>
            </a>
          </div>
          <p className="hx-proof hx-fade" style={delay(900)}>
            <span className="hx-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={14} />)}</span>
            <strong>{hero.rating.score}</strong>
            <span>from {hero.rating.count} {hero.rating.source} reviews</span>
          </p>
        </div>

        <div className="hero-media">
          <div className="hero-arc" aria-hidden="true" />
          <div className="hero-photo">
            <Image src={assets.hero.src} alt={assets.hero.alt} fill priority sizes="(max-width: 1023px) 100vw, 660px" />
          </div>
          <CredentialChip className="hero-chip hx-slide" style={delay(700)} />
          <span className="hero-region" aria-hidden="true">{hero.regionLabel}</span>
        </div>

        <div className="hero-stats hx-panel" style={delay(900)} data-count-root>
          <ul>
            {hero.stats.map((stat) => (
              <li key={stat.label}>
                <span className="hx-stat-top">
                  <HeroGlyph name={stat.icon} size={24} className="hx-stat-icon" />
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="hx-stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

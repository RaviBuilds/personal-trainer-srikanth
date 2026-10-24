import Image from "next/image";
import { ArrowUpRightIcon, InstagramBenefitGlyph, InstagramGlyph } from "@/components/icons";
import { ReelStage } from "@/components/reel-stage";
import { Reveal } from "@/components/reveal";
import { siteContent } from "@/src/lib/site-content";

const { instagram } = siteContent;

// Each wrapper only triggers its reveal; the inner elements carry the motion.
const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;

export function InstagramSection() {
  const footer = (
    <div className="ig-strip">
      <p className="ig-strip-handle">
        <InstagramGlyph gradient size={24} />
        <span>@{instagram.handle}</span>
      </p>
      <a className="ig-strip-link" href={instagram.url} target="_blank" rel="noopener noreferrer">
        <span>{instagram.seeAllLabel}</span>
        <ArrowUpRightIcon size={18} />
      </a>
    </div>
  );

  return (
    <section className="ig" id="instagram" aria-labelledby="instagram-title">
      <div className="container ig-grid">
        <Reveal className="ig-reveal ig-head-reveal" {...OBSERVE}>
          <h2 id="instagram-title" className="ig-h2">
            {instagram.headingBefore}
            <span className="ig-h2-accent">{instagram.headingAccent}</span>
          </h2>
          <p className="ig-lede">{instagram.lede}</p>
        </Reveal>

        <ReelStage reels={instagram.reels} labels={instagram.labels} footer={footer} />

        <Reveal className="ig-reveal ig-profile-reveal" {...OBSERVE}>
          <div className="ig-profile">
            <div className="ig-profile-id">
              <span className="ig-avatar">
                <span className="ig-avatar-gap">
                  <Image className="ig-avatar-img" src={instagram.avatar.src} alt={instagram.avatar.alt} width={64} height={64} sizes="64px" />
                </span>
              </span>
              <div className="ig-profile-text">
                <p className="ig-name">{instagram.displayName}</p>
                <a className="ig-handle" href={instagram.url} target="_blank" rel="noopener noreferrer">@{instagram.handle}</a>
                <p className="ig-bio">{instagram.bio}</p>
              </div>
            </div>
            <a className="ig-follow" href={instagram.url} target="_blank" rel="noopener noreferrer">
              <InstagramGlyph size={20} />
              <span>{instagram.followLabel}</span>
            </a>
          </div>
          <ul className="ig-benefits" role="list">
            {instagram.benefits.map((benefit) => (
              <li key={benefit.label}>
                <InstagramBenefitGlyph name={benefit.icon} size={22} />
                <span>{benefit.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

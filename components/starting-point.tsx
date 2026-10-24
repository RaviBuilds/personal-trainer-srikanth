import Image from "next/image";
import { CheckIcon, PhoneIcon, SectionGlyph, WhatsAppLogo } from "@/components/icons";
import { HookBand } from "@/components/hook-band";
import { Reveal } from "@/components/reveal";
import { buildWhatsAppUrl, siteContent } from "@/src/lib/site-content";

const { startingPoint, hooks, contact } = siteContent;

export function StartingPoint() {
  const ctaHref = buildWhatsAppUrl(startingPoint.cta.whatsappMessage);

  return (
    <section className="section sp" id="approach" aria-labelledby="approach-title">
      <div className="container sp-container">
        {/* Act 1: headline and photo */}
        <div className="sp-act1">
          <Reveal className="sp-intro-reveal" rootMargin="0px 0px -18% 0px">
            <div className="sp-intro">
              <h2 id="approach-title" className="sp-h2">
                Going to the gym for years, but not seeing the{" "}
                <span className="sp-h2-accent">result?</span>
              </h2>
              <p className="sp-reassurance">
                Not to worry.{" "}
                <span className="sp-reassurance-accent">Srikanth</span> is here to help.
              </p>
              <p className="sp-lead">{startingPoint.lead}</p>
            </div>
          </Reveal>
          <Reveal className="sp-photo-reveal" rootMargin="0px 0px -15% 0px">
            <div className="sp-photo">
              <Image
                src={startingPoint.image.src}
                alt={startingPoint.image.alt}
                fill
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>

        {/* Act 2: the starting-point card */}
        <Reveal className="sp-card-reveal" rootMargin="0px 0px -12% 0px">
          <div className="sp-card">
            <p className="sp-tab">{startingPoint.cardTab}</p>
            <div className="sp-card-grid">
              <div className="sp-card-left">
                <h3 className="sp-card-title">{startingPoint.cardTitle}</h3>
                <p className="sp-card-intro">{startingPoint.cardIntro}</p>
                <ul className="sp-leave" aria-label="What you leave with">
                  {startingPoint.youLeaveWith.map((item) => (
                    <li key={item}>
                      <CheckIcon className="sp-leave-icon" size={18} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="sp-cta">
                  <a
                    className="sp-btn sp-btn-primary"
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppLogo size={24} />
                    <span>{startingPoint.cta.label}</span>
                  </a>
                  <a
                    className="sp-call"
                    href={`tel:${contact.phoneTel}`}
                    aria-label={`${startingPoint.cta.callPrefix} ${contact.phoneDisplay}`}
                  >
                    <PhoneIcon size={15} aria-hidden="true" />
                    <span>{startingPoint.cta.callPrefix} {contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
              <ul className="sp-criteria" aria-label="The six things Srikanth looks at">
                {startingPoint.criteria.map((item) => (
                  <li key={item.id} className="sp-criterion">
                    <span className="sp-criterion-icon" aria-hidden="true">
                      <SectionGlyph name={item.icon} size={24} />
                    </span>
                    <span className="sp-criterion-text">
                      <span className="sp-criterion-label">{item.label}</span>
                      <span className="sp-criterion-desc">{item.descriptor}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Act 3: hook band */}
        <HookBand hook={hooks.noTime} />
      </div>
    </section>
  );
}

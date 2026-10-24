import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/button";
import { WhatsAppGlyph } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { WhatsAppComposer } from "@/components/whatsapp-composer";
import { siteContent, whatsappHref } from "@/src/lib/site-content";

const { contactCard: card, images, hero, name } = siteContent;
const image = images.contactCard;

// The wrappers only trigger; the inner elements carry the motion.
const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;
const step = (i: number) => ({ "--i": i }) as CSSProperties;

/** Closing call to action: a dark card on the page background that opens WhatsApp with the visitor's message. */
export function ContactCard() {
  const focal = `${image.focalPoint.x}% ${image.focalPoint.y}%`;

  return (
    <section className="cc" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="cc-reveal cc-card-reveal" {...OBSERVE}>
          <div className="cc-card" id="contact-card">
            <Reveal className="cc-reveal cc-photo-reveal" {...OBSERVE}>
              <div className="cc-photo">
                <div className="cc-photo-clip">
                  <Image
                    className="cc-photo-img"
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    quality={80}
                    loading="lazy"
                    style={{ objectPosition: focal }}
                  />
                </div>
                <p className="cc-photo-chip">{name} · {hero.credential}</p>
              </div>
            </Reveal>

            <div className="cc-content">
              <Reveal className="cc-reveal cc-body-reveal" {...OBSERVE}>
                <h2 id="contact-title" className="cc-h2 cc-step" style={step(0)}>
                  {card.headingBefore}
                  <span className="cc-h2-accent">{card.headingAccent}</span>
                </h2>
                <p className="cc-lede cc-step" style={step(1)}>{card.lede}</p>
                <WhatsAppComposer />
                <noscript>
                  <Button variant="whatsapp" href={whatsappHref} className="cc-submit">
                    <WhatsAppGlyph size={24} />
                    <span>{card.noscriptLabel}</span>
                  </Button>
                </noscript>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

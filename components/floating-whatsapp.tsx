"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppLogo } from "@/components/icons";
import { siteContent, whatsappHref } from "@/src/lib/site-content";

const APPEAR_DELAY_MS = 1400;

export function FloatingWhatsApp() {
  const [ready, setReady] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);
  const [cardInView, setCardInView] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const pathname = usePathname();

  // Appearance delay (skipped for reduced motion).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setReady(true), reduce ? 0 : APPEAR_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // On small screens, stay out of the way while the hero's primary CTA is on screen.
  useEffect(() => {
    const target = document.getElementById("hero-primary-cta");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setCtaInView(entry.isIntersecting));
    observer.observe(target);
    return () => { observer.disconnect(); setCtaInView(false); };
  }, [pathname]);

  // The footer carries the same contact links, so step aside once 15% of it is on screen (it covers the last footer link otherwise).
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setOverFooter(entry.intersectionRatio >= 0.15), { threshold: [0, 0.15, 0.3] });
    observer.observe(footer);
    return () => { observer.disconnect(); setOverFooter(false); };
  }, [pathname]);

  // Hide while the contact card is mostly on screen: the card offers the same action.
  useEffect(() => {
    const target = document.getElementById("contact-card");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setCardInView(entry.intersectionRatio >= 0.3), { threshold: [0, 0.3] });
    observer.observe(target);
    return () => { observer.disconnect(); setCardInView(false); };
  }, [pathname]);

  return (
    <a
      className={`fwa${ready ? " is-ready" : ""}${ctaInView ? " cta-in-view" : ""}${overFooter ? " is-over-footer" : ""}${cardInView ? " card-in-view" : ""}`}
      aria-hidden={overFooter || cardInView || undefined}
      tabIndex={overFooter || cardInView ? -1 : undefined}
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${siteContent.contact.floatingLabel} on WhatsApp`}
    >
      <span className="fwa-label" aria-hidden="true">{siteContent.contact.floatingLabel}</span>
      <span className="fwa-ring" aria-hidden="true" />
      <span className="fwa-icon"><WhatsAppLogo size={32} onGreen /></span>
    </a>
  );
}

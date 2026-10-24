"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppLogo } from "@/components/icons";
import { siteContent, telHref, whatsappHref } from "@/src/lib/site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const anchorHref = (href: string) => pathname === "/" ? href : `/${href}`;
  useEffect(() => { if (!open) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; document.addEventListener("keydown", onKeyDown); return () => document.removeEventListener("keydown", onKeyDown); }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <header className={`site-header${scrolled ? " is-scrolled" : ""}`}><div className="container header-inner"><Link href="/" className="wordmark" onClick={() => setOpen(false)}><Image src={siteContent.logo.src} alt={siteContent.logo.alt} width={200} height={68} /></Link><nav className="desktop-nav" aria-label="Primary navigation">{siteContent.navigation.map(({ label, href }) => <a key={href} href={anchorHref(href)}>{label}</a>)}</nav><a className="header-phone" href={telHref}>{siteContent.contact.phoneDisplay}</a><a className="button button-small header-cta header-wa" href={whatsappHref} target="_blank" rel="noopener noreferrer"><WhatsAppLogo size={22} /><span>WhatsApp</span></a><a className="header-wa-icon" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WhatsAppLogo size={32} /></a><button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}><span aria-hidden="true" /><span aria-hidden="true" /></button></div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{siteContent.navigation.map(({ label, href }) => <a key={href} href={anchorHref(href)} onClick={() => setOpen(false)}>{label}</a>)}<a className="button" href={anchorHref("#contact")} onClick={() => setOpen(false)}>Enquire about training</a></nav>}</header>;
}

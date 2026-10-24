"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteContent } from "@/src/lib/site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; document.addEventListener("keydown", onKeyDown); return () => document.removeEventListener("keydown", onKeyDown); }, [open]);
  return <header className="site-header"><div className="container header-inner"><Link href="/" className="wordmark" onClick={() => setOpen(false)}><span>{siteContent.brand}</span><small>{siteContent.descriptor}</small></Link><nav className="desktop-nav" aria-label="Primary navigation">{siteContent.navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}</nav>{siteContent.draftPreview && <span className="draft-label">Draft preview</span>}<a className="button button-small header-cta" href="#contact">Enquire</a><button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}><span aria-hidden="true" /><span aria-hidden="true" /></button></div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{siteContent.navigation.map(({ label, href }) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="button" href="#contact" onClick={() => setOpen(false)}>Enquire about training</a></nav>}</header>;
}

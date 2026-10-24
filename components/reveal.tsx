"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() => typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const element = ref.current;
    if (!element || active) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [active]);

  return <div ref={ref} className={`reveal ${active ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}

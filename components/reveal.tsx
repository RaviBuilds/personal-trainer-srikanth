"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  /** Fraction of the element that must be visible before it reveals (default 0.1). */
  amount?: number;
  /** Override the observer rootMargin; fires the reveal as the element rises into view. */
  rootMargin?: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
  amount = 0.1,
  rootMargin = "0px 0px -12% 0px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Same initial value on server and client (avoids a hydration mismatch).
  // Reduced-motion and no-JS users never see a hidden state: the hidden start
  // styles only exist under html.js-motion and prefers-reduced-motion: no-preference.
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || active) return;

    // The observer also fires immediately for elements already in view on mount,
    // so a mid-page reload still reveals above-the-fold content.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: amount, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [active, amount, rootMargin]);

  return (
    <div
      ref={ref}
      className={`reveal ${active ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

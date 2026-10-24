"use client";

import { useEffect, useRef } from "react";

const PANEL_DELAY_MS = 900; // the stat panel stays invisible until this point of its entrance animation
const COUNT_START_MS = 1000;
const COUNT_DURATION_MS = 1400;
const formatter = new Intl.NumberFormat("en-IN");
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

type CountUpProps = { value: number; suffix?: string };

/**
 * Server-renders the final value. In the browser, and only while the stat panel is
 * still hidden by its entrance animation, it resets to 0 and counts up.
 */
export function CountUp({ value, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${formatter.format(value)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    const text = node?.firstChild;
    if (!node || !text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!document.documentElement.classList.contains("js-motion")) return;
    const panel = node.closest("[data-count-root]");
    const animation = panel?.getAnimations().find((a) => a instanceof CSSAnimation);
    const now = Number(animation?.currentTime ?? Number.NaN);
    if (!animation || Number.isNaN(now) || now >= PANEL_DELAY_MS) return; // panel already visible: keep final value

    text.nodeValue = `0${suffix}`;
    let frame = 0;
    let startedAt = 0;
    const tick = (time: number) => {
      if (!startedAt) {
        if (Number(animation.currentTime ?? 0) < COUNT_START_MS) {
          frame = requestAnimationFrame(tick);
          return;
        }
        startedAt = time;
      }
      const progress = Math.min((time - startedAt) / COUNT_DURATION_MS, 1);
      text.nodeValue = `${formatter.format(Math.round(value * easeOutExpo(progress)))}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      text.nodeValue = final;
    };
  }, [value, suffix, final]);

  return <span ref={ref} className="hx-stat-value" role="img" aria-label={final}>{final}</span>;
}

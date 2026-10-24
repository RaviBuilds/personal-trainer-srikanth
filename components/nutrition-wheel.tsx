"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon, WhatsAppLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import type { NutritionSlice } from "@/src/lib/site-content";

type NutritionWheelProps = {
  /** Server-rendered heading block (h2 and lede). */
  header: ReactNode;
  /** Server-rendered general-education caption. */
  caption: ReactNode;
  slices: readonly NutritionSlice[];
  image: { src: string; alt: string; width: number; height: number; aspect: string; focalPoint: string };
  angleOffsetDeg: number;
  tabsLabel: string;
  tipLabel: string;
  footnote: string;
  prevLabel: string;
  nextLabel: string;
  ctaLabel: string;
  ctaHref: string;
};

const SLICE_DEG = 60;
const HUB_RADIUS = 18; // hub is 36% of the diameter, in the 100-unit SVG space
const subscribeNoop = () => () => {};

/** Point on the wheel in SVG space for a clock angle (0 = 12 o'clock, clockwise). */
function coords(clockDeg: number, radius: number): [string, string] {
  const rad = (clockDeg * Math.PI) / 180;
  const x = 50 + radius * Math.sin(rad);
  const y = 50 - radius * Math.cos(rad);
  // Fixed precision keeps server and client markup identical.
  return [x.toFixed(3), y.toFixed(3)];
}

function point(clockDeg: number, radius: number): string {
  return coords(clockDeg, radius).join(" ");
}

/** Slice i is centred at clock angle 90 + 60i, so it spans 60 + 60i to 120 + 60i. */
function wedgePath(index: number): string {
  const start = 60 + SLICE_DEG * index;
  return `M50 50 L${point(start, 50)} A50 50 0 0 1 ${point(start + SLICE_DEG, 50)} Z`;
}

/** Cumulative angle that brings slice `index` to 3 o'clock by the shortest turn. */
function angleFor(current: number, index: number, offset: number): number {
  const target = -SLICE_DEG * index + offset;
  const delta = ((((target - current) % 360) + 540) % 360) - 180;
  return current + delta;
}

export function NutritionWheel({
  header,
  caption,
  slices,
  image,
  angleOffsetDeg,
  tabsLabel,
  tipLabel,
  footnote,
  prevLabel,
  nextLabel,
  ctaLabel,
  ctaHref,
}: NutritionWheelProps) {
  const base = useId();
  const count = slices.length;
  const [active, setActive] = useState(0);
  const [angle, setAngle] = useState(angleOffsetDeg);
  // Skips the swap animation on first paint; set on the first selection.
  const [switched, setSwitched] = useState(false);
  // False on the server and during hydration, true afterwards.
  const enhanced = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const firstRun = useRef(true);

  const select = useCallback(
    (index: number) => {
      setActive(index);
      setAngle((current) => angleFor(current, index, angleOffsetDeg));
      setSwitched(true);
    },
    [angleOffsetDeg],
  );

  // Slide the underline under the active tab and keep it there on reflow.
  useEffect(() => {
    const place = () => {
      const bar = indicatorRef.current;
      const tab = tabRefs.current[active];
      if (!bar || !tab) return;
      const top = tab.offsetTop + tab.offsetHeight - 8;
      bar.style.transform = `translate(${tab.offsetLeft}px, ${top}px) scaleX(${tab.offsetWidth})`;
    };
    place();
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  // In the scrolling tab row, bring the active tab into view (scrolls the row only).
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (active + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (active - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div
      className="nw-grid"
      data-enhanced={enhanced ? "true" : "false"}
      data-switched={switched ? "true" : "false"}
    >
      {header}

      <div className="nw-tablist" role="tablist" aria-label={tabsLabel} ref={listRef}>
        <span className="nw-indicator" aria-hidden="true" ref={indicatorRef} />
        {slices.map((slice, index) => {
          const selected = index === active;
          return (
            <button
              key={slice.id}
              id={`${base}-tab-${slice.id}`}
              className="nw-tab"
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${base}-panel-${slice.id}`}
              tabIndex={selected ? 0 : -1}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              onClick={() => select(index)}
              onKeyDown={onKeyDown}
            >
              {slice.tabLabel}
            </button>
          );
        })}
      </div>

      <Reveal className="nw-reveal nw-wheel-reveal" amount={0.13}>
        <div className="nw-wheel">
          <div className="nw-disc">
            <div className="nw-disc-media">
              <div className="nw-scale">
                <div className="nw-spin" style={{ transform: `rotate(${angle}deg)` }}>
                  <Image
                    className="nw-photo"
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1024px) 604px, 88vw"
                    quality={80}
                    loading="lazy"
                    style={{ objectPosition: image.focalPoint }}
                  />
                  <svg
                    className="nw-veils"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                    focusable="false"
                  >
                    {slices.map((slice, index) => (
                      <path
                        key={slice.id}
                        className="nw-wedge"
                        d={wedgePath(index)}
                        data-active={index === active ? "true" : "false"}
                        onClick={() => select(index)}
                      />
                    ))}
                    {slices.map((slice, index) => {
                      const clock = SLICE_DEG * index;
                      const [x1, y1] = coords(clock, HUB_RADIUS);
                      const [x2, y2] = coords(clock, 50);
                      return (
                        <line
                          key={`divider-${slice.id}`}
                          className="nw-divider"
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="nw-hub" aria-hidden="true">
            {slices.map((slice, index) => (
              <div
                key={slice.id}
                className="nw-hub-item"
                data-active={index === active ? "true" : "false"}
              >
                <span className="nw-hub-value">{slice.hubValue}</span>
                <span className="nw-hub-caption">{slice.hubCaption}</span>
              </div>
            ))}
          </div>

          <span className="nw-pointer" aria-hidden="true" />
        </div>
      </Reveal>

      <Reveal className="nw-reveal nw-card-reveal" amount={0.13}>
        <div className="nw-card">
          <div className="nw-panels">
            {slices.map((slice, index) => {
              const selected = index === active;
              return (
                <div
                  key={slice.id}
                  id={`${base}-panel-${slice.id}`}
                  className="nw-panel"
                  role="tabpanel"
                  aria-labelledby={`${base}-tab-${slice.id}`}
                  tabIndex={enhanced && selected ? 0 : undefined}
                  data-active={selected ? "true" : "false"}
                >
                  <h3 className="nw-name">{slice.name}</h3>
                  <p className="nw-role">{slice.role}</p>
                  <div className="nw-cols">
                    <div>
                      <p className="nw-label">{slice.listLabel}</p>
                      <p className="nw-text">{slice.options}</p>
                    </div>
                    <div>
                      <p className="nw-label">{tipLabel}</p>
                      <p className="nw-text">{slice.tip}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="nw-footer">
            <p className="nw-footnote">{footnote}</p>
            <div className="nw-controls">
              <button
                type="button"
                className="nw-step"
                aria-label={prevLabel}
                onClick={() => select((active - 1 + count) % count)}
              >
                <ChevronLeftIcon size={20} />
              </button>
              <button
                type="button"
                className="nw-step"
                aria-label={nextLabel}
                onClick={() => select((active + 1) % count)}
              >
                <ChevronRightIcon size={20} />
              </button>
              <a
                className="button nw-cta"
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppLogo size={24} />
                <span>{ctaLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {caption}
    </div>
  );
}

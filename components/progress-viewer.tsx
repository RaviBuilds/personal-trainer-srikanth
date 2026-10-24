"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { StoryView } from "@/src/lib/progress-stories";

type ViewerLabels = {
  region: string;
  previous: string;
  next: string;
  before: string;
  after: string;
  tabSuffix: string;
};

const SLIDE_RATIO = 0.55; // intersection ratio at which a slide counts as the active one (observer threshold is 0.6)
const IMAGE_WIDTH = 660;
const IMAGE_HEIGHT = 825; // 4:5, matching the frame

const noopSubscribe = () => () => {};

export function ProgressViewer({ stories, labels }: { stories: StoryView[]; labels: ViewerLabels }) {
  const uid = useId();
  const count = stories.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const targetRef = useRef<number | null>(null);
  const activeRef = useRef(0);
  const inViewRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);
  const [active, setActive] = useState(0);

  // False on the server and during hydration, true afterwards. Non-active slides become inert only then,
  // so without script every slide stays readable.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // A slide plays its entrance the first time it is active while the viewer is on screen; the marker is
  // written straight to the DOM so it is never replayed and never triggers a re-render.
  const markSeen = useCallback((index: number) => {
    if (inViewRef.current) slideRefs.current[index]?.setAttribute("data-seen", "true");
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Active slide follows the scroll position (swipe, keyboard, tabs and arrows all end up here).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < SLIDE_RATIO) continue;
          const index = slideRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index < 0) continue;
          // While a programmatic scroll is travelling, ignore the slides it passes over.
          if (targetRef.current !== null) {
            if (index !== targetRef.current) continue;
            targetRef.current = null;
          }
          setActive(index);
          markSeen(index);
        }
      },
      { root: track, threshold: 0.6 },
    );
    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, [count, markSeen]);

  // Entrance of the whole viewer, once, when it is about 12% visible.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        inViewRef.current = true;
        root.setAttribute("data-inview", "true");
        markSeen(activeRef.current);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [markSeen]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // Safety net for layout changes (resize, rotation): the observer only reports threshold crossings, so
  // re-read the scroll position once the track settles and keep the selected tab in step with it.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const resync = () => {
      if (targetRef.current !== null) return;
      const first = slideRefs.current[0];
      if (!first) return;
      let nearest = 0;
      let best = Infinity;
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;
        const distance = Math.abs(slide.offsetLeft - first.offsetLeft - track.scrollLeft);
        if (distance < best) {
          best = distance;
          nearest = index;
        }
      });
      setActive(nearest);
      markSeen(nearest);
    };
    let frame = 0;
    const onResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(resync);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(track);
    track.addEventListener("scrollend", resync);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      track.removeEventListener("scrollend", resync);
    };
  }, [count, markSeen]);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    const first = slideRefs.current[0];
    if (!track || !slide || !first) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    targetRef.current = index;
    setActive(index);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      targetRef.current = null;
    }, reduce ? 150 : 1000);
    track.scrollTo({ left: slide.offsetLeft - first.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const releaseTarget = () => {
    targetRef.current = null;
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (event.key === "ArrowRight") next = Math.min(count - 1, active + 1);
    else if (event.key === "ArrowLeft") next = Math.max(0, active - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    tabRefs.current[next]?.focus();
    if (next !== active) goTo(next);
  };

  const atStart = active === 0;
  const atEnd = active === count - 1;

  return (
    <div
      ref={rootRef}
      className="ps-viewer"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
    >
      <div className="ps-nav">
        <div
          className="ps-tabs"
          role="tablist"
          aria-label={labels.region}
          style={{ "--n": count, "--i": active } as CSSProperties}
        >
          {stories.map((story, i) => (
            <button
              key={story.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              className="ps-tab"
              aria-selected={i === active}
              aria-controls={`${uid}-panel-${i}`}
              aria-label={`${story.goal} ${labels.tabSuffix}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => goTo(i)}
              onKeyDown={onTabKeyDown}
            >
              <span className="ps-tab-text">
                <span className="ps-tab-goal">{story.goal}</span>
                <span className="ps-tab-delta">{story.delta}</span>
              </span>
            </button>
          ))}
          <span className="ps-underline" aria-hidden="true" />
        </div>
        {count > 1 && (
          <div className="ps-arrows">
            <button
              type="button"
              className="ps-arrow-btn"
              aria-label={labels.previous}
              aria-disabled={atStart}
              onClick={() => !atStart && goTo(active - 1)}
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              className="ps-arrow-btn"
              aria-label={labels.next}
              aria-disabled={atEnd}
              onClick={() => !atEnd && goTo(active + 1)}
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="ps-track"
        onPointerDown={releaseTarget}
        onWheel={releaseTarget}
        onTouchStart={releaseTarget}
      >
        {stories.map((story, i) => (
          <div
            key={story.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="ps-slide"
            role="tabpanel"
            id={`${uid}-panel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`}
            aria-roledescription="slide"
            inert={hydrated && i !== active}
          >
            <div className="ps-card">
              <div className="ps-head">
                <p className="ps-goal">{story.goal}</p>
                <p className="ps-client">{story.client}</p>
              </div>

              <div className="ps-visual">
                <div className="ps-photos">
                  {(["before", "after"] as const).map((side) => (
                    <div key={side} className={`ps-photo ps-photo--${side}`}>
                      <Image
                        className="ps-img"
                        src={story[side].src}
                        alt={story[side].alt}
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        sizes="(min-width: 1024px) 330px, (min-width: 768px) 45vw, 40vw"
                        quality={80}
                        loading="lazy"
                        style={{ objectPosition: `${story[side].focalPoint.x}% ${story[side].focalPoint.y}%` }}
                      />
                    </div>
                  ))}
                  <div className="ps-delta">
                    <span className="ps-delta-value">{story.delta}</span>
                    <span className="ps-delta-label">{story.deltaLabel}</span>
                  </div>
                </div>
                <div className="ps-captions">
                  <span>{labels.before}</span>
                  <span>{`${labels.after} · ${story.duration}`}</span>
                </div>
              </div>

              <div className="ps-story">
                <h3 className="ps-title">{story.title}</h3>
                <dl className="ps-metrics">
                  {story.metrics.map((metric, m) => (
                    <div key={metric.label} className="ps-metric" style={{ "--m": m } as CSSProperties}>
                      <dt>{metric.label}</dt>
                      <dd>
                        <span className="ps-sr">from </span>
                        <span className="ps-from">{metric.before}</span>
                        <ArrowRightIcon className="ps-to-arrow" size={16} />
                        <span className="ps-sr">to </span>
                        <span className="ps-to">{metric.after}</span>
                        <span className="ps-unit">{metric.unit}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="ps-meta">{`${story.duration} · ${story.format}`}</p>
                <blockquote className="ps-quote">
                  <p>{`\u201C${story.quote}\u201D`}</p>
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  type ReactNode,
} from "react";
import { CheckIcon, GoalGlyph, WhatsAppLogo } from "@/components/icons";
import type { GoalItem } from "@/src/lib/site-content";

type ExplorerGoal = GoalItem & { whatsappHref: string };

type GoalExplorerProps = {
  /** Server-rendered heading block (eyebrow, h2, lead). */
  header: ReactNode;
  /** Server-rendered note shown under the list. */
  note: ReactNode;
  goals: ExplorerGoal[];
  listLabel: string;
  includesLabel: string;
  weekLabel: string;
  weekLegend: string;
  sessionsSuffix: string;
  dayNames: readonly string[];
  dayLetters: readonly string[];
  dayStateLabels: Record<"session" | "light" | "rest", string>;
};

const subscribeNoop = () => () => {};
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export function GoalExplorer({
  header,
  note,
  goals,
  listLabel,
  includesLabel,
  weekLabel,
  weekLegend,
  sessionsSuffix,
  dayNames,
  dayLetters,
  dayStateLabels,
}: GoalExplorerProps) {
  const base = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [active, setActive] = useState(0);
  // False on the server and during hydration, true afterwards. Inactive panels
  // only become inert once scripting is confirmed, so the no-script HTML stays usable.
  const enhanced = useSyncExternalStore(subscribeNoop, () => true, () => false);
  // Flips on the first change of goal so later animations skip the entrance delays.
  const [switched, setSwitched] = useState(false);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRun = useRef(true);

  const select = useCallback((index: number) => {
    setActive((current) => {
      if (current !== index) setSwitched(true);
      return index;
    });
  }, []);

  // Place the indicator bar on the active row and keep it there on reflow.
  useEffect(() => {
    const place = () => {
      const bar = indicatorRef.current;
      const tab = tabRefs.current[active];
      if (!bar || !tab) return;
      bar.style.height = `${tab.offsetHeight}px`;
      bar.style.transform = `translateY(${tab.offsetTop}px)`;
    };
    place();
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  // In the horizontal tab strip, keep the active chip in view (scrolls the strip only).
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

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = goals.length;
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

  const onHover = (index: number) => {
    if (!window.matchMedia(HOVER_QUERY).matches) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => select(index), 120);
  };

  const cancelHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  return (
    <div
      className="goals-panel goal-explorer"
      data-enhanced={enhanced ? "true" : "false"}
      data-switched={switched ? "true" : "false"}
    >
      <div className="goal-left">
        {header}

        <div className="goal-list-wrap">
          <div
            className="goal-tablist"
            role="tablist"
            aria-label={listLabel}
            aria-orientation="vertical"
            ref={listRef}
            onMouseLeave={cancelHover}
          >
            <span className="goal-indicator" aria-hidden="true" ref={indicatorRef} />
            {goals.map((goal, index) => {
              const selected = index === active;
              return (
                <button
                  key={goal.id}
                  id={`${base}-tab-${goal.id}`}
                  className="goal-tab"
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${base}-panel-${goal.id}`}
                  tabIndex={selected ? 0 : -1}
                  data-active={selected ? "true" : "false"}
                  style={{ "--i": index } as CSSProperties}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  onClick={() => select(index)}
                  onKeyDown={onKeyDown}
                  onMouseEnter={() => onHover(index)}
                >
                  <GoalGlyph className="goal-tab-icon" name={goal.icon} size={24} />
                  <span className="goal-tab-label">{goal.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {note}
      </div>

      <div className="goal-panels">
        {goals.map((goal, index) => {
          const selected = index === active;
          const hidden = enhanced && !selected;
          return (
            <div
              key={goal.id}
              id={`${base}-panel-${goal.id}`}
              className="goal-panel"
              role="tabpanel"
              aria-labelledby={`${base}-tab-${goal.id}`}
              tabIndex={0}
              data-active={selected ? "true" : "false"}
              aria-hidden={hidden ? true : undefined}
              inert={hidden ? true : undefined}
            >
              <div className="goal-panel-media">
                <Image
                  src={goal.image.src}
                  alt={goal.image.alt}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 700px, 100vw"
                  style={{ objectPosition: goal.image.objectPosition }}
                />
                <span className="goal-chip">
                  <GoalGlyph name={goal.icon} size={16} />
                  <span className="goal-chip-label">
                    {goal.sessionsLabel}
                    {sessionsSuffix}
                  </span>
                </span>
              </div>

              <div className="goal-panel-body">
                <h3 className="goal-panel-title">{goal.title}</h3>
                <p className="goal-panel-promise">{goal.promise}</p>
                <p className="goal-panel-desc">{goal.description}</p>

                <div className="goal-panel-detail">
                  <div className="goal-includes">
                    <p className="goal-mini-label">{includesLabel}</p>
                    <ul className="goal-includes-list">
                      {goal.includes.map((item) => (
                        <li key={item}>
                          <CheckIcon className="goal-includes-icon" size={18} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="goal-week">
                    <p className="goal-mini-label">{weekLabel}</p>
                    <ol className="goal-week-row">
                      {goal.week.map((state, dayIndex) => (
                        <li
                          key={dayNames[dayIndex]}
                          className="goal-day"
                          data-state={state}
                          style={{ "--i": dayIndex } as CSSProperties}
                        >
                          <span className="goal-day-dot" aria-hidden="true">
                            {dayLetters[dayIndex]}
                          </span>
                          <span className="goal-day-sr">
                            {dayNames[dayIndex]}: {dayStateLabels[state]}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <p className="goal-week-legend">
                      <span className="goal-swatch goal-swatch-session" aria-hidden="true" />
                      <span className="goal-swatch goal-swatch-light" aria-hidden="true" />
                      <span className="goal-swatch goal-swatch-rest" aria-hidden="true" />
                      <span className="goal-week-legend-text">{weekLegend}</span>
                    </p>
                  </div>
                </div>

                <div className="goal-cta-row">
                  <a
                    className="goal-cta"
                    href={goal.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppLogo size={24} />
                    <span>{goal.cta.label}</span>
                  </a>
                  {goal.learnMore ? (
                    <a className="goal-learnmore" href={goal.learnMore.href}>
                      <span>{goal.learnMore.label}</span>
                      <span className="goal-learnmore-arrow" aria-hidden="true">
                        &rarr;
                      </span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

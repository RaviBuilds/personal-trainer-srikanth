"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, VolumeIcon, VolumeXIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import type { InstagramConfig, InstagramReel } from "@/src/lib/site-content";

const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;
// Cards follow the panel by this long, then each one trails the previous by 70ms.
const CARD_BASE_DELAY = 150;
const CARD_STAGGER = 70;
// A playing reel pauses once less than this share of it is on screen.
const MIN_VISIBLE = 0.25;

type Labels = InstagramConfig["labels"];
type Status = "idle" | "playing" | "paused";

type ReelCardProps = {
  reel: InstagramReel;
  index: number;
  labels: Labels;
  status: Status;
  muted: boolean;
  register: (index: number, node: HTMLVideoElement | null) => void;
  onStart: (index: number) => void;
  onToggle: (index: number) => void;
  onToggleMute: () => void;
  onPlay: (index: number) => void;
  onPause: (index: number) => void;
  onEnded: (index: number) => void;
};

function ReelCard({ reel, index, labels, status, muted, register, onStart, onToggle, onToggleMute, onPlay, onPause, onEnded }: ReelCardProps) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [failed, setFailed] = useState(false);

  // A file that fails to load leaves the dark card with a disabled play button. The error event can fire
  // before hydration, so the element's own error state is checked once as well.
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    element.muted = true;
    const frame = requestAnimationFrame(() => {
      if (element.error) setFailed(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Pause (never reset) when less than a quarter of the card is visible.
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < MIN_VISIBLE && video.current && !video.current.paused) video.current.pause();
      },
      { threshold: [0, MIN_VISIBLE] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (status === "idle" && fill.current) fill.current.style.transform = "";
  }, [status]);

  const handleTimeUpdate = () => {
    const element = video.current;
    if (!element || !fill.current || !element.duration) return;
    fill.current.style.transform = `scaleX(${Math.min(1, element.currentTime / element.duration)})`;
  };

  const handleClick = () => {
    if (status === "idle") onStart(index);
    else onToggle(index);
    toggle.current?.focus({ preventScroll: true });
  };

  const toggleLabel = status === "idle" ? `${labels.playReel}: ${reel.label}` : status === "playing" ? labels.pauseReel : labels.playReel;

  return (
    <div ref={root} className="ig-reel" data-state={status} data-failed={failed ? "" : undefined}>
      <div className="ig-reel-frame">
        <video
          ref={(node) => {
            video.current = node;
            register(index, node);
          }}
          className="ig-reel-video"
          src={`${reel.src}#t=${reel.previewTime}`}
          preload="metadata"
          muted
          playsInline
          aria-label={reel.description}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => onPlay(index)}
          onPause={() => onPause(index)}
          onEnded={() => onEnded(index)}
          onError={() => setFailed(true)}
        />
      </div>

      <button ref={toggle} type="button" className="ig-toggle" aria-label={toggleLabel} disabled={failed} onClick={handleClick}>
        <span className="ig-play" aria-hidden="true">
          <PlayIcon size={22} />
        </span>
      </button>

      <span className="ig-chip" aria-hidden="true">
        <PlayIcon size={12} />
        <span>{reel.label}</span>
      </span>

      {status !== "idle" && (
        <button type="button" className="ig-mute" aria-label={labels.muteReel} aria-pressed={muted} onClick={onToggleMute}>
          {muted ? <VolumeXIcon size={22} /> : <VolumeIcon size={22} />}
        </button>
      )}

      <span className="ig-progress" aria-hidden="true">
        <span ref={fill} className="ig-progress-fill" />
      </span>
    </div>
  );
}

type ReelStageProps = {
  reels: InstagramReel[];
  labels: Labels;
  /** Server-rendered strip shown at the foot of the panel. */
  footer: ReactNode;
};

export function ReelStage({ reels, labels, footer }: ReelStageProps) {
  // The reel being played or paused, or null when every card is idle. Sound preference is shared.
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef<number | null>(null);

  const register = (index: number, node: HTMLVideoElement | null) => {
    videos.current[index] = node;
  };

  const returnToIdle = (index: number) => {
    const element = videos.current[index];
    if (!element) return;
    element.pause();
    element.currentTime = reels[index].previewTime;
  };

  const fail = () => {
    activeRef.current = null;
    setActive(null);
    setPaused(false);
  };

  const handleStart = (index: number) => {
    const element = videos.current[index];
    if (!element) return;
    const previous = activeRef.current;
    activeRef.current = index;
    if (previous !== null && previous !== index) returnToIdle(previous);

    // This runs inside the click, so audible playback is allowed. If the browser still refuses,
    // fall back to muted and let the mute button show it.
    element.muted = muted;
    setActive(index);
    setPaused(false);
    element.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (error instanceof DOMException && error.name === "NotAllowedError" && !element.muted) {
        element.muted = true;
        setMuted(true);
        element.play().catch((retryError: unknown) => {
          if (!(retryError instanceof DOMException && retryError.name === "AbortError")) fail();
        });
        return;
      }
      fail();
    });
  };

  const handleToggle = (index: number) => {
    const element = videos.current[index];
    if (!element) return;
    if (element.paused) element.play().catch(() => undefined);
    else element.pause();
  };

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    const current = activeRef.current;
    const element = current === null ? null : videos.current[current];
    if (element) element.muted = next;
  };

  const handlePlay = (index: number) => {
    activeRef.current = index;
    setActive(index);
    setPaused(false);
  };

  const handlePause = (index: number) => {
    const element = videos.current[index];
    if (activeRef.current === index && element && !element.ended) setPaused(true);
  };

  const handleEnded = (index: number) => {
    if (activeRef.current === index) {
      activeRef.current = null;
      setActive(null);
      setPaused(false);
    }
    returnToIdle(index);
  };

  // Hiding the tab pauses whatever is playing.
  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden) return;
      const current = activeRef.current;
      if (current !== null) videos.current[current]?.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Mobile rail: which reel is at the start of the rail, and the buttons that move it.
  const rail = useRef<HTMLUListElement>(null);
  const [railIndex, setRailIndex] = useState(0);

  const readRail = () => {
    const list = rail.current;
    if (!list) return;
    const slots = Array.from(list.children) as HTMLElement[];
    const pad = parseFloat(getComputedStyle(list).paddingLeft) || 0;
    const max = list.scrollWidth - list.clientWidth;
    if (max <= 1) return setRailIndex(0);
    // The last card can never reach the start of the rail, so the end of the scroll means the last reel.
    if (list.scrollLeft >= max - 2) return setRailIndex(slots.length - 1);
    let nearest = 0;
    slots.forEach((slot, i) => {
      if (Math.abs(slot.offsetLeft - pad - list.scrollLeft) < Math.abs(slots[nearest].offsetLeft - pad - list.scrollLeft)) nearest = i;
    });
    setRailIndex(nearest);
  };

  const goTo = (target: number) => {
    const list = rail.current;
    if (!list) return;
    const slot = list.children[target] as HTMLElement | undefined;
    if (!slot) return;
    const pad = parseFloat(getComputedStyle(list).paddingLeft) || 0;
    const left = Math.min(slot.offsetLeft - pad, list.scrollWidth - list.clientWidth);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    readRail();
    window.addEventListener("resize", readRail);
    return () => window.removeEventListener("resize", readRail);
  }, []);

  return (
    <div className="ig-stage">
      <div className="ig-board">
        <ul ref={rail} className="ig-reels" role="list" aria-label={labels.reelsGroup} onScroll={readRail}>
          {reels.map((reel, index) => (
            <li key={reel.src} className="ig-slot" style={{ "--n": index, "--d": `${CARD_BASE_DELAY + index * CARD_STAGGER}ms` } as CSSProperties}>
              <Reveal className="ig-reveal ig-reel-reveal" delay={CARD_BASE_DELAY + index * CARD_STAGGER} {...OBSERVE}>
                <ReelCard
                  reel={reel}
                  index={index}
                  labels={labels}
                  status={active === index ? (paused ? "paused" : "playing") : "idle"}
                  muted={muted}
                  register={register}
                  onStart={handleStart}
                  onToggle={handleToggle}
                  onToggleMute={handleToggleMute}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onEnded={handleEnded}
                />
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Mobile only: the rail shows one and a half reels, so these buttons step through all of them. */}
        {reels.length > 1 && (
          <div className="ig-nav">
            <button type="button" className="ig-nav-btn" aria-label={labels.previousReel} disabled={railIndex === 0} onClick={() => goTo(railIndex - 1)}>
              <ChevronLeftIcon size={22} />
            </button>
            <p className="ig-nav-count" aria-live="polite">
              {labels.reelPosition.replace("{current}", String(railIndex + 1)).replace("{total}", String(reels.length))}
            </p>
            <button type="button" className="ig-nav-btn" aria-label={labels.nextReel} disabled={railIndex === reels.length - 1} onClick={() => goTo(railIndex + 1)}>
              <ChevronRightIcon size={22} />
            </button>
          </div>
        )}

        <Reveal className="ig-reveal ig-panel-reveal" {...OBSERVE}>
          <div className="ig-panel">{footer}</div>
        </Reveal>
      </div>
    </div>
  );
}

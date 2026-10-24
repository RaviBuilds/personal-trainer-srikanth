"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Geometry = { width: number; height: number; d: string };

const TENSION = 0.5;
const round = (n: number) => Math.round(n * 100) / 100;

/** Catmull-Rom spline through the points, written as cubic Bezier segments. */
function smoothPath(points: Point[]): string {
  const k = TENSION / 3;
  let d = `M${round(points[0].x)} ${round(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) * k;
    const c1y = p1.y + (p2.y - p0.y) * k;
    const c2x = p2.x - (p3.x - p1.x) * k;
    const c2y = p2.y - (p3.y - p1.y) * k;
    d += `C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(p2.x)} ${round(p2.y)}`;
  }
  return d;
}

/**
 * Decorative path drawn over the stage, through the centres of the [data-ap-node]
 * elements. It is a direct child of the stage, so the stage is its parent element.
 */
export function ApproachPath() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const stage = svg?.parentElement;
    if (!svg || !stage) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      // The stacked layout draws its own rail, so there is nothing to measure.
      if (getComputedStyle(svg).display === "none") {
        setGeometry(null);
        return;
      }
      const box = stage.getBoundingClientRect();
      const points = Array.from(stage.querySelectorAll("[data-ap-node]")).map((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top };
      });
      if (points.length < 2 || !box.width || !box.height) return;
      setGeometry({ width: round(box.width), height: round(box.height), d: smoothPath(points) });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("resize", schedule);
    // Cards translate while they reveal; measure again once that has settled.
    stage.addEventListener("animationend", schedule);
    document.fonts?.ready.then(schedule);
    schedule();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      stage.removeEventListener("animationend", schedule);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="ap-path"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox={geometry ? `0 0 ${geometry.width} ${geometry.height}` : undefined}
    >
      {geometry && <path className="ap-path-line" d={geometry.d} />}
    </svg>
  );
}

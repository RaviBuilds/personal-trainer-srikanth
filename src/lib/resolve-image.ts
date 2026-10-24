import fs from "node:fs";
import path from "node:path";

/**
 * Returns `src` when the file exists under `public/`, otherwise `fallback`.
 * Keeps the goals section from ever rendering a broken or empty image while
 * the new goal photos are still being added to `public/images/`.
 */
export function resolveImage(src: string, fallback: string): string {
  const relative = src.replace(/^\//, "");
  const absolute = path.join(process.cwd(), "public", relative);
  try {
    return fs.existsSync(absolute) ? src : fallback;
  } catch {
    return fallback;
  }
}

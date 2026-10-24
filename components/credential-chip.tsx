import type { CSSProperties } from "react";
import { BadgeCheckIcon } from "@/components/icons";
import { siteContent } from "@/src/lib/site-content";

/** The trainer's credential, read from config. Position and surface come from the caller's class. */
export function CredentialChip({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={style}>
      <BadgeCheckIcon size={18} />
      <span>{siteContent.hero.credential}</span>
    </div>
  );
}

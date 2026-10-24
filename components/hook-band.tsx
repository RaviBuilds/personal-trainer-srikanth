import Link from "next/link";
import { ArrowRightIcon, SectionGlyph } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import type { SectionIcon } from "@/src/lib/site-content";

type Hook = {
  id: string;
  icon: SectionIcon;
  question: string;
  answer: string;
  cta: { label: string; href: string };
};

type HookBandProps = {
  hook: Hook;
  titleId?: string;
};

export function HookBand({ hook, titleId }: HookBandProps) {
  const headingId = titleId ?? `hook-${hook.id}-title`;
  return (
    <Reveal className="sp-hook-reveal">
      <div className="sp-hook">
        <span className="sp-hook-icon" aria-hidden="true">
          <SectionGlyph name={hook.icon} size={32} />
        </span>
        <div className="sp-hook-copy">
          <h3 id={headingId} className="sp-hook-title">{hook.question}</h3>
          <p className="sp-hook-body">{hook.answer}</p>
        </div>
        <Link className="sp-btn sp-btn-outline sp-hook-cta" href={hook.cta.href}>
          <span>{hook.cta.label}</span>
          <ArrowRightIcon className="sp-btn-arrow" size={18} />
        </Link>
      </div>
    </Reveal>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ClipboardCheckIcon, FormatGlyph } from "@/components/icons";
import type { FormatCard } from "@/src/lib/site-content";

type FormatPassCardProps = { format: FormatCard };

export function FormatPassCard({ format }: FormatPassCardProps) {
  const titleId = `format-${format.id}-title`;

  return (
    <article className="fmt-card">
      <div className="fmt-image">
        <Image
          src={format.image.src}
          alt={format.image.alt}
          fill
          loading="lazy"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 720px, 33vw"
          style={{ objectPosition: format.image.objectPosition }}
        />
        <span className="fmt-chip" aria-hidden="true">
          <FormatGlyph name={format.icon} size={16} />
          <span className="fmt-chip-label">{format.chip}</span>
        </span>
      </div>

      <div className="fmt-head">
        <h3 id={titleId} className="fmt-title">{format.title}</h3>
        <p className="fmt-summary">{format.summary}</p>
      </div>

      <div className="fmt-perf" aria-hidden="true">
        <span className="fmt-notch fmt-notch-left" />
        <span className="fmt-line" />
        <span className="fmt-notch fmt-notch-right" />
      </div>

      <div className="fmt-stub">
        <ul className="fmt-facts" aria-label="Session details">
          {format.facts.map((fact) => (
            <li className="fmt-fact" key={fact.label}>
              <span className="fmt-fact-value">
                <span className="fmt-num-mask">
                  <span className="fmt-num">{fact.value}</span>
                </span>
                {fact.unit ? <span className="fmt-fact-unit">{fact.unit}</span> : null}
              </span>
              <span className="fmt-fact-label">{fact.label}</span>
            </li>
          ))}
        </ul>

        <p className="fmt-bestfor">
          <span className="fmt-bestfor-key">Best for</span>{" "}
          <span className="fmt-bestfor-items">{format.bestFor.join(" \u00b7 ")}</span>
        </p>

        <p className="fmt-ready">
          <ClipboardCheckIcon className="fmt-ready-icon" size={18} aria-hidden="true" />
          <span>{format.ready}</span>
        </p>

        <Link
          className="fmt-cta"
          href={format.cta.href}
          aria-describedby={titleId}
        >
          <span>{format.cta.label}</span>
          <ArrowRightIcon className="fmt-cta-arrow" size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

import { WhatsAppLogo } from "@/components/icons";
import { ProgressViewer } from "@/components/progress-viewer";
import { Reveal } from "@/components/reveal";
import { toStoryView } from "@/src/lib/progress-stories";
import { buildWhatsAppUrl, getVisibleStories, siteContent } from "@/src/lib/site-content";

const { progressStories: copy } = siteContent;

// Wrappers only trigger the reveal; the inner elements carry the motion.
const OBSERVE = { amount: 0.12, rootMargin: "0px 0px -8% 0px" } as const;

export function ProgressGallery() {
  const stories = getVisibleStories().map(toStoryView);
  const hasStories = stories.length > 0;

  const button = (
    <a className="button ps-btn" href={buildWhatsAppUrl(copy.cta.message)} target="_blank" rel="noopener noreferrer">
      <WhatsAppLogo size={24} />
      <span>{copy.cta.label}</span>
    </a>
  );

  return (
    <section className="ps" aria-labelledby="progress-title">
      <Reveal className="ps-reveal ps-mark-reveal" {...OBSERVE}>
        <div className="ps-mark" aria-hidden="true">
          <span>{copy.effortMark.line1}</span>
          <span>{copy.effortMark.line2}</span>
        </div>
      </Reveal>

      <div className="container ps-inner">
        <Reveal className="ps-reveal ps-cell-h2" {...OBSERVE}>
          <h2 id="progress-title" className="ps-h2 ps-rise">
            {copy.headingBefore}
            <span className="ps-accent">{copy.headingAccent}</span>
          </h2>
        </Reveal>

        <Reveal className="ps-reveal ps-cell-lede" delay={80} {...OBSERVE}>
          <p className="ps-lede ps-rise">{copy.lede}</p>
        </Reveal>

        <Reveal className="ps-reveal ps-cell-para" delay={160} {...OBSERVE}>
          <div className="ps-copy ps-rise">
            {copy.paragraph.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </Reveal>

        {hasStories ? (
          <>
            <div className="ps-cell-viewer">
              <ProgressViewer stories={stories} labels={copy.labels} />
            </div>
            <div className="ps-cell-cta">{button}</div>
            <p className="ps-cell-disclaimer ps-disclaimer">{copy.disclaimer}</p>
          </>
        ) : (
          <div className="ps-cell-viewer">
            <div className="ps-empty">
              <div className="ps-empty-copy">
                <h3 className="ps-empty-title">{copy.noStories.title}</h3>
                <p>{copy.noStories.body}</p>
              </div>
              {button}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import { GoalExplorer } from "@/components/goal-explorer";
import { Reveal } from "@/components/reveal";
import { resolveImage } from "@/src/lib/resolve-image";
import { buildWhatsAppUrl, siteContent } from "@/src/lib/site-content";

const { goalsSection, goals } = siteContent;

export function GoalsSection() {
  // Resolve image paths on the server so a missing new photo falls back to an
  // existing one; the client explorer only ever receives plain strings.
  const resolved = goals.map((goal) => ({
    ...goal,
    image: { ...goal.image, src: resolveImage(goal.image.src, goal.image.fallback) },
    whatsappHref: buildWhatsAppUrl(goal.cta.whatsappMessage),
  }));

  const headline = goalsSection.headline;
  const accentIndex = headline.indexOf(goalsSection.accent);
  const before = accentIndex >= 0 ? headline.slice(0, accentIndex) : headline;
  const after = accentIndex >= 0 ? headline.slice(accentIndex + goalsSection.accent.length) : "";

  const header = (
    <div className="goals-head">
      <p className="goals-eyebrow">{goalsSection.eyebrow}</p>
      <h2 id="goals-title" className="goals-h2">
        {before}
        <span className="goals-h2-accent">{goalsSection.accent}</span>
        {after}
      </h2>
      <p className="goals-lead">{goalsSection.lead}</p>
    </div>
  );

  return (
    <section className="section goals-v2" id="goals" aria-labelledby="goals-title">
      <div className="container">
        <Reveal
          className="goals-panel-reveal"
          amount={0.15}
          rootMargin="0px 0px -8% 0px"
        >
          <GoalExplorer
            header={header}
            note={<p className="goals-note">{goalsSection.note}</p>}
            goals={resolved}
            listLabel={goalsSection.listLabel}
            includesLabel={goalsSection.includesLabel}
            weekLabel={goalsSection.weekLabel}
            weekLegend={goalsSection.weekLegend}
            sessionsSuffix={goalsSection.sessionsSuffix}
            dayNames={goalsSection.dayNames}
            dayLetters={goalsSection.dayLetters}
            dayStateLabels={goalsSection.dayStateLabels}
          />
        </Reveal>
      </div>

      {/* With scripting disabled, hide the tab list and stack every panel. */}
      <noscript>
        <style>{`.goals-v2 .goal-list-wrap{display:none}.goals-v2 .goal-panels{display:flex;flex-direction:column;gap:56px}.goals-v2 .goal-panel{opacity:1;visibility:visible;pointer-events:auto}`}</style>
      </noscript>
    </section>
  );
}

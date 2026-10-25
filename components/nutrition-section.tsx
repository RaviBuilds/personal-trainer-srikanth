import { NutritionWheel } from "@/components/nutrition-wheel";
import { Reveal } from "@/components/reveal";
import { buildWhatsAppUrl, siteContent } from "@/src/lib/site-content";

const { nutritionWheel } = siteContent;

export function NutritionSection() {
  if (!nutritionWheel.enabled) return null;

  const { headline, lede, cta } = nutritionWheel;

  // Heading and lede stay on the server; the client wheel receives them as nodes
  // so the grid can place them around the interactive parts.
  const header = (
    <Reveal className="nw-reveal nw-head-reveal" amount={0.15} rootMargin="0px 0px -8% 0px">
      <div className="nw-head">
        <h2 id="nutrition-title" className="nw-h2">
          {headline.before}
          <span className="nw-h2-accent">{headline.accent}</span>
          {headline.after}
        </h2>
        <p className="nw-lede">
          {lede.before}
          <a className="nw-lede-link" href={lede.linkHref}>
            {lede.linkLabel}
          </a>
          {lede.after}
        </p>
      </div>
    </Reveal>
  );

  return (
    <section className="section nw" id="nutrition" aria-labelledby="nutrition-title">
      <div className="container">
        <NutritionWheel
          header={header}
          caption={<p className="nw-caption">{nutritionWheel.caption}</p>}
          slices={nutritionWheel.slices}
          image={nutritionWheel.image}
          angleOffsetDeg={nutritionWheel.angleOffsetDeg}
          tabsLabel={nutritionWheel.tabsLabel}
          tipLabel={nutritionWheel.tipLabel}
          footnote={nutritionWheel.footnote}
          prevLabel={nutritionWheel.prevLabel}
          nextLabel={nutritionWheel.nextLabel}
          ctaLabel={cta.label}
          ctaHref={buildWhatsAppUrl(cta.whatsappMessage)}
        />
      </div>
    </section>
  );
}

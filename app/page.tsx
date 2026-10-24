import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/enquiry-form";
import { FAQList } from "@/components/faq-list";
import { ProgressGallery } from "@/components/progress-gallery";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/src/lib/site-content";

const method = [
  ["Understand", "Start with your goals, schedule, experience, and the context that matters to your training."],
  ["Plan", "Agree on a training direction that fits your starting point and the time you can give it."],
  ["Coach", "Get clear guidance through exercises in the format that has been confirmed for you."],
  ["Review", "Look at the signals that matter for your goals and routine, then adjust the approach."],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Personal training in Hyderabad</p>
              <h1 id="hero-title">Personal training in Hyderabad, built around you.</h1>
              <p className="lede">Coaching shaped around your goals, schedule, and starting point, with online and in-person formats to explore.</p>
              <div className="hero-actions">
                <a className="button" href="#contact">Enquire about training</a>
                <a className="text-link" href="#coaching">Explore programmes <span aria-hidden="true">↘</span></a>
              </div>
            </div>
            <div className="hero-media">
              <Image src={siteContent.assets.hero.src} alt={siteContent.assets.hero.alt} width={1200} height={1350} priority />
              <p className="image-note">Temporary image asset · replace with approved coaching photography</p>
            </div>
          </div>
        </section>

        <section className="format-strip" aria-label="Available coaching formats">
          <div className="container format-inner">
            <strong>Choose the setting that fits your week.</strong>
            <div className="format-list"><span>In-person sessions</span><span>Online coaching</span><span>Goal-led training</span></div>
          </div>
        </section>

        <section className="section approach" id="approach" aria-labelledby="approach-title">
          <div className="container split-grid">
            <div className="split-copy"><p className="eyebrow">A useful starting point</p><h2 id="approach-title">Good coaching begins with a useful conversation.</h2><p>The right training approach depends on more than a goal written down. It also depends on your routine, experience, preferences, and the format that is practical for you.</p><p>Share what you are working towards and what your week looks like. The details of coaching, scheduling, and fit can then be discussed clearly.</p></div>
            <div className="split-media"><Image src={siteContent.assets.detail.src} alt={siteContent.assets.detail.alt} width={1000} height={760} /></div>
          </div>
        </section>

        <section className="section coaching" id="coaching" aria-labelledby="coaching-title">
          <div className="container service-layout">
            <div className="section-intro"><p className="eyebrow">Coaching formats</p><h2 id="coaching-title">Start with a format that feels workable.</h2><p>Both formats are presented as options. Exact delivery details, location, session structure, and inclusions are confirmed during your enquiry.</p></div>
            <div className="service-list">
              <article className="service-panel"><div><h3>In-person fitness training</h3><p>For people who value face-to-face coaching and a dedicated training setting. Enquire with your preferred area so the delivery arrangement can be confirmed.</p></div><Link href={siteContent.services.inPerson.href}>View format <span aria-hidden="true">↗</span></Link></article>
              <article className="service-panel"><div><h3>Online fitness coaching</h3><p>For people who want training to work around their own space and schedule. The live or programme format, platform, and equipment expectations are confirmed before starting.</p></div><Link href={siteContent.services.online.href}>View format <span aria-hidden="true">↗</span></Link></article>
            </div>
          </div>
        </section>

        <section className="section programmes" id="programmes" aria-labelledby="programmes-title">
          <div className="container programme-layout">
            <div className="section-intro"><p className="eyebrow">Training directions</p><h2 id="programmes-title">Choose the work that matters to you.</h2><p>These programme directions are a useful way to begin a conversation. Each can be shaped around your experience, routine, setting, and the support you want.</p></div>
            <div className="programme-list">{siteContent.programmes.map((programme) => <details className="programme-item" key={programme.id}><summary><span><strong>{programme.title}</strong><small>{programme.summary}</small></span><b aria-hidden="true">+</b></summary><div className="programme-detail"><p><strong>May suit:</strong> {programme.suits}</p><p><strong>Approach:</strong> {programme.approach}</p><p><strong>Setting:</strong> {programme.setting}</p><a className="text-link" href="#contact">Start with this direction <span aria-hidden="true">↘</span></a></div></details>)}</div>
          </div>
        </section>

        <section className="section draft-services" aria-labelledby="draft-services-title">
          <div className="container service-layout"><div className="section-intro"><p className="eyebrow">Editable service modules</p><h2 id="draft-services-title">Ways a programme could be delivered.</h2><p>These draft modules keep the page ready for future service decisions. They can be enabled, edited, or removed centrally.</p></div><div className="draft-service-list">{siteContent.draftServices.filter((service) => service.enabled).map((service) => <article className="draft-service" key={service.id}><div><h3>{service.title}</h3><p>{service.description}</p></div><p className="service-prep"><strong>Practical preparation</strong>{service.preparation}</p>{service.id === "nutrition-recovery" && <p className="service-source">General Indian nutrition reference: <a href="https://www.nin.res.in/downloads/DietaryGuidelinesforIndians.pdf" target="_blank" rel="noreferrer">ICMR-NIN Dietary Guidelines for Indians</a>.</p>}</article>)}</div></div>
        </section>

        <section className="section pricing" id="pricing" aria-labelledby="pricing-title">
          <div className="container"><div className="pricing-heading"><div><p className="eyebrow">Sample pricing</p><h2 id="pricing-title">Clear monthly options, without invented discounts.</h2></div><p>Illustrative draft rates are shown for planning the page structure. Monthly rates and session counts are editable in the central site configuration.</p></div><div className="pricing-groups">{(["training-only", "nutrition-only", "combined"] as const).map((category) => <div className="price-group" key={category}><h3>{category === "training-only" ? "Training only" : category === "nutrition-only" ? "Nutrition only" : "Combined support"}</h3><div className="price-options">{siteContent.draftPrices.filter((price) => price.category === category).map((price) => <article className="price-option" key={price.id}><div><h4>{price.title}</h4><p>{price.detail}</p></div><strong>₹{price.monthly.toLocaleString("en-IN")}<small>/month</small></strong></article>)}</div></div>)}</div><div className="term-table" aria-label="Illustrative term totals"><div className="term-heading"><strong>Monthly sample rate</strong><span>3 months</span><span>6 months</span><span>12 months</span></div>{siteContent.draftPrices.map((price) => <div className="term-row" key={price.id}><span>{price.title}</span><strong>₹{price.monthly.toLocaleString("en-IN")}</strong><span>₹{(price.monthly * 3).toLocaleString("en-IN")}</span><span>₹{(price.monthly * 6).toLocaleString("en-IN")}</span><span>₹{(price.monthly * 12).toLocaleString("en-IN")}</span></div>)}</div><p className="pricing-note">Sample pricing · totals are simple monthly-rate calculations. No discounts or additional inclusions are assumed.</p></div>
        </section>

        <section className="section method" aria-labelledby="method-title">
          <div className="container"><div className="section-intro"><p className="eyebrow">The approach</p><h2 id="method-title">A clear process, without unnecessary noise.</h2><p>Training gets easier to understand when the next step is visible. This is a general framework for the coaching conversation, not a claim about a clinical assessment or a specific tracking system.</p></div><div className="method-grid">{method.map(([title, copy], index) => <article className="method-step" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
        </section>

        <section className="section coach-band" aria-labelledby="coach-title">
          <div className="container split-grid"><div className="split-copy"><p className="eyebrow">Meet Shrikant</p><h2 id="coach-title">Personal attention, kept practical.</h2><p>Shrikant is the working public name for this first website pass. The final public name, credentials, service details, and biography are still to be confirmed before launch.</p><p>For now, the site keeps the focus on a transparent training conversation rather than making claims that are not yet verified.</p><a className="text-link" href={siteContent.instagram} target="_blank" rel="noreferrer">View Instagram profile <span aria-hidden="true">↗</span></a></div><div className="split-media"><Image src={siteContent.assets.coach.src} alt={siteContent.assets.coach.alt} width={900} height={1100} /></div></div>
        </section>

        <ProgressGallery />

        <section className="section faq-section" id="faqs" aria-labelledby="faq-title"><div className="container faq-grid"><div><p className="eyebrow">FAQs</p><h2 id="faq-title">Before you enquire.</h2><p className="section-intro">A few practical answers, with details that still need to be confirmed kept visible.</p></div><FAQList /></div></section>

        <section className="contact" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><p className="eyebrow eyebrow-light">Start a conversation</p><h2 id="contact-title">Let&apos;s find a training approach that fits your life.</h2><p className="lede">Tell us what you are considering. This form is ready for a real endpoint once the final contact workflow is configured.</p></div><EnquiryForm /></div></section>
      </main>
      <footer className="footer"><div className="container footer-inner"><div className="wordmark"><span>{siteContent.brand}</span><small>{siteContent.descriptor}</small></div><div className="footer-links"><Link href="/guides/">Guides</Link><Link href="/privacy/">Privacy</Link><Link href="/disclaimer/">Disclaimer</Link><a href={siteContent.instagram}>Instagram</a></div></div></footer>
    </>
  );
}

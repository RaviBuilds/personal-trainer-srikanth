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
const goals = [
  ["strength", "Strength", "Foundational resistance work with a clear progression."],
  ["conditioning", "Cardio and conditioning", "Build work capacity and confidence with effort you can repeat."],
  ["fat-loss", "Fat loss", "A practical training routine without fixed-result promises."],
  ["muscle-building", "Muscle building", "Organise resistance training around a muscle-building goal."],
  ["beginner", "Beginner fitness", "A clear, approachable starting point for structured training."],
  ["mobility", "Mobility and flexibility", "Make range, control, and movement practice part of your week."],
] as const;
const formatCards = [
  ["gym", "Gym-based training", "Face-to-face coaching in a dedicated training setting."],
  ["home", "Client-location training", "A practical approach shaped around the space you have."],
  ["online", "Online coaching", "Remote guidance that works with your schedule and setup."],
] as const;

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero" aria-labelledby="hero-title"><div className="container hero-grid">
        <div className="hero-copy"><p className="eyebrow">Personal training in Hyderabad</p><h1 id="hero-title">Personal training in <em>Hyderabad</em>, built around you.</h1><p className="lede">Coaching shaped around your goals, schedule, and starting point, with online and in-person formats to explore.</p><div className="hero-actions"><a className="button" href="#contact">Enquire about training</a><a className="text-link" href="#formats">Explore formats <span aria-hidden="true">↘</span></a></div><div className="hero-proof"><span>{siteContent.credibility.clients}</span><small>credibility slot</small><span>{siteContent.credibility.sessions}</span><small>session slot</small></div></div>
        <div className="hero-visual"><Image src={siteContent.assets.hero.src} alt={siteContent.assets.hero.alt} fill priority sizes="(max-width: 800px) 100vw, 55vw" /><div className="hero-visual-note">A considered place to begin</div></div>
      </div></section>

      <section className="format-strip" aria-label="Available coaching formats"><div className="container format-inner"><strong>Choose the setting that fits your week.</strong><div className="format-list"><span><i>↗</i> In-person sessions</span><span><i>◌</i> Online coaching</span><span><i>＋</i> Goal-led training</span></div></div></section>

      <section className="section approach" id="approach" aria-labelledby="approach-title"><div className="container split-grid"><div className="split-copy"><p className="eyebrow">The starting point</p><h2 id="approach-title">Good coaching begins with a useful conversation.</h2><p>The right training approach depends on more than a goal written down. It also depends on your routine, experience, preferences, and the format that is practical for you.</p><p>Share what you are working towards and what your week looks like. The details of coaching, scheduling, and fit can then be discussed clearly.</p><a className="text-link" href="#contact">Start with your context <span aria-hidden="true">↘</span></a></div><div className="approach-media"><Image src={siteContent.assets.detail.src} alt={siteContent.assets.detail.alt} fill sizes="(max-width: 800px) 100vw, 45vw" /></div></div></section>

      <section className="section coaching" id="formats" aria-labelledby="formats-title"><div className="container"><div className="section-intro wide-intro"><p className="eyebrow">Three ways to train</p><h2 id="formats-title">Make the format fit your life.</h2><p>Explore the settings before you commit to a direction. Exact delivery details and inclusions are confirmed during your enquiry.</p></div><div className="format-cards">{formatCards.map(([id, title, copy]) => <article className="format-card" key={id}><div className="card-image"><Image src={siteContent.assets.formats[id].src} alt={siteContent.assets.formats[id].alt} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div className="format-card-copy"><h3>{title}</h3><p>{copy}</p><Link href={id === "online" ? siteContent.services.online.href : siteContent.services.inPerson.href}>View format <span aria-hidden="true">↗</span></Link></div></article>)}</div></div></section>

      <section className="section goals" id="goals" aria-labelledby="goals-title"><div className="container goals-layout"><div className="section-intro"><p className="eyebrow">Training directions</p><h2 id="goals-title">Choose the work that matters to you.</h2><p>These directions are a useful way to begin a conversation. Each can be shaped around your experience, routine, setting, and the support you want.</p></div><div className="goal-grid">{goals.map(([id, title, copy], index) => <details className={`goal-card goal-${index + 1}`} key={id}><summary><div className="goal-image">{id === "strength" || id === "conditioning" || id === "mobility" ? <Image src={siteContent.assets.goals[id].src} alt={siteContent.assets.goals[id].alt} fill sizes="(max-width: 800px) 100vw, 25vw" /> : <span className="goal-mark" aria-hidden="true">{index === 2 ? "↗" : index === 3 ? "＋" : "◌"}</span>}</div><div className="goal-title"><h3>{title}</h3><span className="goal-toggle" aria-hidden="true">+</span></div><p>{copy}</p></summary><div className="goal-detail">{siteContent.programmes.find((programme) => programme.id === id)?.approach}<a className="text-link" href="#contact">Start with this direction <span aria-hidden="true">↘</span></a></div></details>)}</div></div></section>

      <section className="section draft-services" aria-labelledby="draft-services-title"><div className="container service-layout"><div className="section-intro"><p className="eyebrow">Programme delivery</p><h2 id="draft-services-title">Ways a programme could be delivered.</h2><p>Draft modules keep the page ready for future service decisions while the overall structure remains useful today.</p></div><div className="draft-service-list">{siteContent.draftServices.filter((service) => service.enabled).map((service, index) => <article className="draft-service" key={service.id}><span className="service-index">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p><small>{service.preparation}</small></article>)}</div></div></section>

      <section className="section pricing" id="pricing" aria-labelledby="pricing-title"><div className="container"><div className="pricing-heading"><div><p className="eyebrow">Sample pricing</p><h2 id="pricing-title">A clear view of the current draft.</h2></div><p>Illustrative draft rates are shown for planning the page structure. Monthly rates and session counts remain editable in the central configuration.</p></div><div className="price-board">{siteContent.draftPrices.map((price) => <article className="price-option" key={price.id}><div><h3>{price.title}</h3><p>{price.detail}</p></div><strong>₹{price.monthly.toLocaleString("en-IN")}<small>/month</small></strong></article>)}</div><p className="pricing-note">Draft preview · no discounts or additional inclusions are assumed.</p></div></section>

      <section className="section method" aria-labelledby="method-title"><div className="container"><div className="section-intro"><p className="eyebrow">The approach</p><h2 id="method-title">A clear process, without unnecessary noise.</h2><p>Training gets easier to understand when the next step is visible. This is a general framework for the coaching conversation.</p></div><div className="method-grid">{method.map(([title, copy], index) => <article className="method-step" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="section coach-band" aria-labelledby="coach-title"><div className="container split-grid"><div className="coach-image"><Image src={siteContent.assets.coach.src} alt={siteContent.assets.coach.alt} fill sizes="(max-width: 800px) 100vw, 40vw" /></div><div className="split-copy"><p className="eyebrow">Meet {siteContent.name}</p><h2 id="coach-title">Personal attention, kept practical.</h2><p>Shrikant is the working public name for this first website pass. The final public name, credentials, service details, and biography are still to be confirmed before launch.</p><p>The site keeps the focus on a transparent training conversation rather than making claims that are not yet verified.</p><a className="text-link" href={siteContent.instagram} target="_blank" rel="noreferrer">View Instagram profile <span aria-hidden="true">↗</span></a></div></div></section>

      <ProgressGallery />
      <section className="section faq-section" id="faqs" aria-labelledby="faq-title"><div className="container faq-grid"><div><p className="eyebrow">FAQs</p><h2 id="faq-title">Before you enquire.</h2><p className="section-intro">A few practical answers, with draft details kept visible.</p></div><FAQList /></div></section>
      <section className="contact" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><p className="eyebrow eyebrow-light">Start a conversation</p><h2 id="contact-title">Let&apos;s find a training approach that fits your life.</h2><p className="lede">Tell us what you are considering. This form is ready for a real endpoint once the final contact workflow is configured.</p></div><EnquiryForm /></div></section>
    </main>
    <footer className="footer"><div className="container footer-inner"><div className="wordmark"><span>{siteContent.brand}</span><small>{siteContent.descriptor}</small></div><div className="footer-links"><Link href="/guides/">Guides</Link><Link href="/privacy/">Privacy</Link><Link href="/disclaimer/">Disclaimer</Link><a href={siteContent.instagram}>Instagram</a></div></div></footer>
  </>;
}

# Shrikant | Personal Training in Hyderabad

## Canonical Website Strategy, Content Architecture, Visual Direction, and v0 Build Brief

**Document status:** Canonical working brief for the first implementation  
**Version:** 1.1  
**Prepared:** 24 October 2026 (revised using the supplied Instagram profile screenshot)  
**Primary use:** Upload this file into the blank Next.js project and provide it to v0 as the source of truth for the website build.  
**Research basis:** *Hyderabad Personal Trainer SEO Strategy.pdf* (Gemini Deep Research, 103 pages); *Hyderabad Personal Trainer Search-First Website Strategy - Claude AI result.pdf* (36 pages, independent review dated 24 October 2026); and the user-supplied screenshot of Shrikant/Srikanth’s public Instagram profile. Instagram direct-page fetching was throttled during review, so the screenshot is the only profile evidence actually inspected in this revision.

---

## 0. Instructions to v0: treat this document as the source of truth

Build the complete first-pass website described in this document inside the existing Next.js repository. The project may start from a blank Next.js application.

### Priority order

1. Follow this brief for strategy, page structure, content, visual direction, and SEO.
2. Use the existing project configuration and installed packages where possible. Do not replace working project foundations unnecessarily.
3. Build a complete, responsive, working website, including the homepage and internal routes listed below.
4. Use polished, appropriate stock photography as temporary visual assets where needed. Centralise image references so Shrikant’s real photographs and videos can replace them later without rewriting layouts.
5. Do not invent any fact about Shrikant/Srikanth, his qualifications, experience, results, prices, service radius, language fluency, or client history. Instagram bio claims are self-reported until verified.
6. Make the design feel individually art-directed and implemented from a considered Figma design. It must not resemble a generic AI-generated landing page.
7. Before/after content must be visibly marked as a temporary demo placeholder. Never present different stock models as if they were the same person's transformation.
8. Do not leave visible Lorem ipsum, broken links, dead buttons, dummy review quotes, fake statistics, empty sections, prototype comparisons, design tests, or AI design-test sections.
9. Keep any unconfirmed specialist service pages built in the project but marked as draft/noindex and omitted from public navigation and sitemap until confirmed.
10. At the end, summarise the routes created, key components, configuration values that still require real business data, and launch blockers.

### Implementation baseline

- Use the existing Next.js App Router, TypeScript, Tailwind CSS, and installed UI libraries where available.
- Prefer Server Components. Use Client Components only where needed for mobile navigation, accordions, form interactions, or other real interactivity.
- Reuse components and keep content/configuration separate from layout.
- Use semantic HTML, accessible form controls, visible focus states, proper heading hierarchy, reduced-motion support, and responsive layouts.
- Use `next/image` or the repository's existing image approach. If remote stock images are used, configure domains correctly and centralise them for replacement.
- Do not add dependencies unless there is a clear need.
- Do not pretend a form was submitted or a WhatsApp message was sent when no real destination is configured.

---

## 1. Project summary

Create a premium, conversion-focused website for **Shrikant** (working brand spelling; confirm the exact public name before launch), an independent personal trainer in Hyderabad. The supplied Instagram screenshot describes the coach as “Srikanth Gaddam | NASM CPT” and says “In-Person & Online Fitness Coach”; it also references movement science and posture, but the bio text is cut off. Treat this as profile-supplied/self-reported information, not independently verified credentials. The high-level online and in-person formats are indicated, but the exact session formats, programme specialisations, qualifications, prices, and service localities still need confirmation.

This is a **personal trainer's professional brand**, not a gym chain website, gym membership site, fitness directory, or multi-trainer studio site.

### Primary business objective

Generate relevant enquiries from people looking for personal training in Hyderabad, then help visitors understand the coaching options and contact Shrikant through an enquiry form, phone, or WhatsApp once the real contact details are provided.

### Primary SEO objective

Build relevance for:

- `personal trainer in Hyderabad`
- `best personal trainer in Hyderabad` (a target query to compete for, not an unsupported claim that Shrikant is objectively the best)

### Secondary SEO themes

- Weight-loss personal training in Hyderabad, if Shrikant actually offers this programme.
- Strength and muscle-building coaching in Hyderabad, if this is within Shrikant's actual expertise.
- Online personal training / online fitness classes.
- In-person personal training / fitness classes in Hyderabad.
- Personal training for beginners, if appropriate to the service.
- Personal trainer fees in Hyderabad, handled with honest, current pricing context.
- At-home personal training in Hyderabad only if Shrikant truly visits clients at home.
- Nutrition guidance only to the extent supported by verified qualifications and professional scope.

### Business outcome matters more than ranking claims

The website should help qualified prospects decide whether Shrikant is a suitable trainer and make it easy to enquire. Do not guarantee rankings, weight-loss results, muscle gain, health outcomes, or a date by which Google rankings will be achieved.

---

## 2. Identity and brand positioning

### Working brand identity

Use this provisional identity consistently:

**SHRIKANT**  
**PERSONAL TRAINING**

Do not invent a surname, business name, certification, award, tagline implying a guarantee, or years of experience. The full public name and any final brand name can be updated after the trainer confirms them.

### Positioning direction

**Provisional brand territory: movement-first personal training.** The visible Instagram bio points toward online and in-person coaching and mentions movement science and posture. Use this as a promising direction for the first design, not as a medical or technical claim. Confirm with the trainer what “movement science” and “posture” mean in the actual services and what he is qualified to provide.

The website should communicate:

- Personal attention rather than an impersonal gym or directory experience.
- A clear and structured training process.
- A welcoming experience for people with different starting points, without claiming to specialise in every demographic or medical condition.
- Realistic, transparent communication about the service, schedule, price, and what clients can expect.
- Fitness that can fit into everyday life in Hyderabad and, where supported, online clients' routines.

### Voice and writing style

- Confident but not boastful.
- Clear, direct, human, and professional.
- Natural Indian English; avoid awkward keyword repetition.
- Specific about process and deliverables, not generic claims such as “transform your life,” “unleash your potential,” or “India's No. 1 trainer.”
- Never guarantee a specific amount of weight loss, body transformation, or time-bound health outcome.
- Do not use a medical, physiotherapy, rehabilitation, or clinical nutrition claim unless Shrikant's verified qualifications support it.

### Suggested provisional message

**Brand line:** Move well. Train with intent.  
**Supporting message:** Personal training in Hyderabad, with online and in-person coaching shaped around your goals, schedule, and starting point.

This is a creative direction, not a verified statement about specialisations or delivery logistics. Adapt it if the trainer confirms a more specific positioning. The phrase “Move well” is a brand concept, not a promise to diagnose or treat posture or movement problems.

---

## 3. Research conclusions to carry forward

The two supplied research reports agree on several useful points:

1. The three reference sites contain familiar trainer-website content: trainer biographies, services, coaching formats, training goals, pricing or packages, testimonials, FAQs, locality information, contact options, and supporting articles.
2. Some competitors appear to have credibility and quality-control issues such as template placeholders, duplicate testimonial text, unclear qualifications, inconsistent claims, or unclear package details. These are opportunities to be more accurate and transparent, not permission to attack competitors in public copy.
3. Directory and marketplace pages are meaningful competitors for broad personal-trainer searches. A low number of independent websites does not establish low overall competition.
4. Goal-specific pages may satisfy more distinct search intent than a single generic page, but only if the offered services are real and each page contains useful, differentiated content.
5. Local SEO and Google Business Profile work depend on the actual operating model and eligibility. Do not create an ineligible or misleading profile.
6. The site needs clear training-process information: what happens before a programme begins, how sessions work, how progress is reviewed, what is included, where sessions take place, and how booking/cancellations work.
7. The final design should prioritise authentic photography, a strong typographic hierarchy, thoughtful layout variation, real proof, and clean mobile conversion paths rather than repetitive card grids and decorative effects.

### Evidence limits

The reports do not provide a verified, comprehensive Google India dataset for search volume, keyword difficulty, personalised rankings, or map-pack positions. Their keyword priorities should be treated as reasoned hypotheses, not measured search-volume findings. Pricing figures in the reports are market context, not Shrikant's prices. Locality interpretations below are not confirmed facts about Shrikant's service area.

---

## 4. Instagram profile: what is visible and what it supports

**Profile URL:** https://www.instagram.com/_srikanth_goud_350_/

**Handle shown:** `@_srikanth_goud_350_`

**Evidence inspected:** User-provided screenshot of the Instagram profile, captured 24 October 2026. Instagram’s live page could not be fetched directly during this review because access was throttled. The complete feed, Reels, captions, Highlights, and linked media have therefore **not** been independently inspected. Do not claim that the full account has been audited. Search also surfaced fitness profiles with similar names, but no external listing has been merged into this brief because the available evidence does not confirm that it belongs to this exact Instagram account.

### Facts visible in the screenshot

- The profile bio includes the name/wording **“Srikanth Gaddam | NASM CPT”** with a medal emoji.
- The profile describes him as an **“In-Person & Online Fitness Coach.”**
- The visible bio says he is **“Specializing in movement science, posture, and…”**; the rest of this line is truncated and unknown. Do not complete or guess the missing text.
- The profile category is shown as **Athlete**.
- The visible handle is `@_srikanth_goud_350_`, which differs from the surname spelling “Gaddam” shown in the bio. The brand name provided by the project owner is “Shrikant.” Confirm the preferred public spelling and full name before publication; do not silently resolve the discrepancy.
- The screenshot displays a WhatsApp link as `wa.me/9100434337`. Do **not** wire this link into website CTAs until Shrikant confirms the intended phone number, supplies the correct full WhatsApp URL, and the link is tested. The displayed string may not be a valid complete international-format WhatsApp destination.
- A Threads handle shown in the screenshot resembles `_srikanth_goud_350_`; use a Threads link only after verifying its exact public URL.
- The screenshot shows profile counts of 251 posts, 1,098 followers, and 1,255 following at the time of capture. These are temporary snapshot values; do not place them on the website as trust statistics or hard-code them into the design.
- Visible Highlight labels include “Trainning”/training (as displayed), “one of my fav…”, travel-related highlights and a partially visible certification highlight. The labels alone do not establish details of qualifications, services, or achievements.

### What this means for brand and content

1. Use a **named individual-coach identity**, rather than a gym chain or multi-trainer studio identity.
2. The visual and copy direction may explore **movement-first coaching**, with online and in-person formats, because these are explicitly referenced in the visible bio. Confirm the exact service scope before making stronger claims.
3. Design a dedicated credential component, but keep it hidden or marked for verification until Shrikant provides evidence of the NASM credential and the exact credential title. Do not present a self-reported bio claim as an independently verified certification.
4. Do not assume that “movement science” means physiotherapy, rehabilitation, pain treatment, posture correction, injury diagnosis, or clinical care. Do not use those terms unless the trainer’s qualifications and actual service scope justify them.
5. Do not assume the trainer offers fat-loss programmes, bodybuilding coaching, nutrition consultancy, group classes, at-home visits, or any other specialised service solely from this screenshot. Keep these offerings conditional until he confirms them.
6. The screenshot includes personal/travel/cultural imagery in the visible grid. Those images are not automatically appropriate website assets. Later, review the actual feed with Shrikant and select only relevant training content that he owns or has permission to reuse.

### Instagram access limitation and v0 instructions

Do not depend on v0 being able to scrape or fully retrieve Instagram. Instagram may throttle anonymous requests, require login, or hide some profile content. This brief contains the facts that are visible from the supplied screenshot; use those facts as the starting point. If browser access to the public profile works during implementation, use it only to review publicly accessible material and verify details, not to invent facts or bypass access restrictions. Do not block the build while waiting for Instagram access.

**Instagram CTA:** The profile URL can be used as a social link: `https://www.instagram.com/_srikanth_goud_350_/`. Keep WhatsApp and phone CTAs disabled until their destination is confirmed.

**Before launch, confirm:** public name spelling; full surname and brand name; NASM CPT credential and exact designation; full wording of the movement/posture specialisation; exact WhatsApp phone/link; the real coaching formats; and permission to reuse any Instagram photos or videos.

---

## 5. SEO strategy

### 5.1 Keyword-to-page intent map

| Priority | Search theme | Target location | Publication status |
|---|---|---|---|
| P1 | Personal trainer in Hyderabad | Homepage title, H1, main content | Core launch |
| P1 | Best personal trainer in Hyderabad | Natural context within homepage/service-selection content; do not claim unprovable superiority | Core target query, no guarantee |
| P1 | In-person personal training / fitness classes in Hyderabad | In-person service page | Launch if service details are confirmed |
| P1 | Online personal training / online fitness classes | Online service page | Launch if the exact format and booking process are confirmed |
| P1 if offered | Weight-loss personal trainer in Hyderabad | Dedicated service page | Draft/noindex until confirmed and supported |
| P1 if offered | Strength and muscle-building coach in Hyderabad | Dedicated service page | Draft/noindex until confirmed and supported |
| Conditional | Personal trainer at home in Hyderabad | At-home service page | Draft/noindex until home visits and locations are confirmed |
| P2 | Personal trainer for beginners in Hyderabad | Homepage section and/or supporting guide | Use if consistent with Shrikant's offer |
| P2 | Personal trainer fees in Hyderabad | Pricing section and educational guide | Explain pricing honestly; do not invent benchmarks |
| Conditional | Nutrition consultant / nutritionist / diet plan | Relevant page or section only | Do not use professional titles or clinical claims without verified qualifications |
| Not targeted | “Katchi Boli” / “Mendi Bhutan” | None | Do not publish these strings as locality targets |

### 5.2 Locality verification

The reports infer that:

- “Katchi Boli” may have meant **Gachibowli**.
- “Mendi Bhutan” may have meant **Mehdipatnam**.

Claude correctly notes these are plausible interpretations, not proven facts. The trainer/client must confirm the intended locality and actual service range. Do not silently convert or publish either term.

Use a “Where I coach” section only after confirming the real locations and delivery arrangements. The Instagram screenshot confirms a high-level claim of in-person and online coaching, but not the physical base, travel radius, session locations, or areas served. Do not produce dozens of near-identical pages for each locality. Neighbourhood content must reflect genuine service availability and add distinct user value.

### 5.3 Metadata rules

Draft patterns to customise after the domain and service facts are confirmed:

**Homepage title:** `Personal Trainer in Hyderabad | Shrikant – Personal Training` (confirm preferred public name spelling before launch)

**Homepage H1:** `Personal Trainer in Hyderabad for Personalised Fitness Coaching`

**Homepage description:** `Explore personal training in Hyderabad with Shrikant. Compare available online and in-person coaching options and enquire about a programme that fits your goals.` Update this when the confirmed name and service details are final.

**Online service title:** `Online Personal Training | Shrikant`

**In-person service title:** `Personal Training in Hyderabad | Shrikant`

**Weight-loss page title (conditional):** `Weight-Loss Personal Training in Hyderabad | Shrikant`

**Strength/muscle page title (conditional):** `Strength and Muscle-Building Coaching in Hyderabad | Shrikant`

These are starting templates. Avoid keyword stuffing and do not repeat the same phrase unnaturally across all headings. Use a clear H1, ordered H2s/H3s, descriptive anchor/link text, and meaningful alt text for informative images.

### 5.4 Technical SEO implementation

- Generate unique title and meta description values per indexable route.
- Use semantic HTML and crawlable links between the homepage, services, and guides.
- Use a single clear H1 per page and a logical heading hierarchy.
- Provide a canonical URL only when the actual production domain is configured. Do not leave a fake `example.com` canonical.
- Create a sitemap from pages intended to be indexed. Exclude draft/noindex pages.
- Configure robots directives intentionally; do not accidentally block the whole site.
- Ensure all meaningful content is present in crawlable HTML and is not only embedded in images or inaccessible client-side UI.
- Use responsive images and descriptive alt text where images convey information. Use empty alt text for decorative images.
- Set up Google Search Console after the domain is available. Submit the sitemap and monitor indexing/query performance.
- Add analytics events for actual enquiry submissions, WhatsApp clicks, and call clicks once real contact destinations are configured. A button render is not a conversion.
- Do not assume a Lighthouse score, structured data, FAQ markup, or exact-match wording guarantees rankings.
- Do not add meta keywords or `llms.txt` as supposed SEO shortcuts.

### 5.5 Structured data

Only add structured data that is accurate and matches visible page content. A `Person` entity may be suitable for Shrikant; `Service` information may be appropriate where factually supported. Only add local-business types/properties when they accurately represent the real operating model and satisfy the relevant requirements. Google LocalBusiness rich-result guidance requires an address property; do not invent or expose a private home address to satisfy markup.

Do not add fabricated reviews, AggregateRating claims, or self-serving review markup to chase stars. FAQ content should be useful and visible in HTML; do not build the strategy around FAQ rich results.

---

## 6. Recommended site architecture

The homepage should remain a single, polished, continuous landing-page experience with anchor navigation. The overall project can also include substantive internal pages to serve separate search intents.

### Core routes

1. `/` — Homepage: local proposition, trust, services, process, packages, FAQs, enquiry.
2. `/services/in-person-personal-training-hyderabad/` — In-person training details. Confirm whether sessions take place at a partner gym, a client's home, another location, or a combination. Do not invent a venue.
3. `/services/online-personal-training/` — Online coaching/classes, including format, platform, scheduling, equipment expectations, and enquiry process once confirmed.
4. `/guides/` — Guides index.
5. `/guides/personal-trainer-fees-hyderabad/` — Explains factors that affect fees and package comparison; do not publish invented market statistics or Shrikant's pricing.
6. `/guides/first-month-personal-training/` — Practical guide explaining what a client can ask and expect from a well-structured first month, without guaranteeing specific results.
7. `/guides/gym-home-online-training/` — Neutral comparison of training formats and decision criteria.
8. `/privacy/` — Accurate privacy notice, tailored to actual forms/analytics/data collection before launch.
9. `/disclaimer/` — Plain-language scope disclaimer that does not imply qualifications not held.

### Specialist routes to build in draft mode

Build the code/page templates, but default them to `noindex`, keep them out of the public nav and sitemap, and label them internally for review until Shrikant confirms the service and provides genuine detail:

- `/weight-loss-personal-trainer-hyderabad/`
- `/strength-and-muscle-coach-hyderabad/`
- `/personal-trainer-at-home-hyderabad/` (only if home visits are offered)

Once the service is confirmed, give each page its own useful content rather than copying the homepage. If there is insufficient original information to support a page, keep it unpublished rather than filling it with generic SEO text.

### Global navigation

Add an Instagram social link using the supplied profile URL: `https://www.instagram.com/_srikanth_goud_350_/`. It may appear in the footer or contact area, not as a competing primary CTA. Desktop navigation should be minimal: `Coach`, `Method`, `Programmes`, `Pricing`, `FAQs`, plus one clear CTA. Internal service links can be available in a small Services menu or a compact services section, without crowding the header.

Mobile navigation should be accessible and compact. A fixed bottom bar may contain `WhatsApp` and `Call` only when actual contact details exist. Hide or adapt it while a keyboard/form field is active so it does not cover content or controls.

---

## 7. Homepage: required section structure

Implement the sections below in this order. Content should be concise but meaningful. Avoid a long wall of SEO copy. Each section needs a clear purpose and a distinctive layout treatment; do not repeat the same three-card grid throughout the page.

### 01. Header and identity

**Purpose:** Establish the trainer's name and make navigation easy.

- Wordmark: `SHRIKANT / PERSONAL TRAINING` in typographic treatment; no generic dumbbell logo.
- Desktop anchor links: Coach, Method, Programmes, Pricing, FAQs.
- CTA: `Discuss Your Training` or `Enquire About Training`.
- Do not promise a free consultation or assessment unless Shrikant confirms it.

### 02. Hero: local value proposition

**Purpose:** Make it immediately clear what the trainer offers and where.

Suggested display headline:

> Train with intent.

Suggested supporting line:

> Personal training in Hyderabad, with online and in-person coaching shaped around your goals, schedule, and starting point.

Use an asymmetric editorial layout: text on one side and a strong portrait/action image of a trainer coaching a client on the other. Put the SEO-oriented H1 in accessible HTML; the display line can be visually distinct if needed.

- One primary CTA: `Enquire About Training`.
- One secondary CTA: `Explore Coaching` (anchor to services).
- Show only confirmed service formats and verified service area.
- No unverified numbers, ratings, years, certifications, or “best/No. 1” badge.

### 03. Proof/credential strip

**Purpose:** Establish credibility early without fake statistics.

The Instagram bio self-reports NASM CPT, but this is not yet independently verified. Keep a credential badge component available in the design, but do not publish the NASM credential as verified until Shrikant supplies confirmation of the exact qualification. Render verified credentials, experience, languages, or specialisations only after the values are supplied. Until then, use non-claim service descriptors such as `Online Coaching`, `In-Person Sessions`, and `Goal-Led Training` only if accurate. Do not display zeroes, empty counters, or invented client counts.

### 04. Who the coaching may suit

**Purpose:** Help visitors recognise their need.

Use a concise editorial block or bento-like layout with a varied composition, not three identical rounded cards. Potential audience angles include beginners, people returning to exercise, people focused on general fitness, and people interested in strength or weight management. Keep specialised goals hidden/conditional until Shrikant confirms they are part of his service.

### 05. Coaching formats / core services

**Purpose:** Explain the ways people can work with Shrikant.

Include:

- **In-person fitness training** — describe the actual session location only once confirmed.
- **Online fitness coaching/classes** — confirm whether sessions are live one-to-one, live group, or another format.
- **Goal-based programmes** — link to weight-loss or strength/muscle pages only when those services are confirmed and published.

Each row/panel should explain who it suits, what is included, how it is delivered, and how to enquire. Do not conflate one-to-one live coaching, group live classes, and asynchronous programmes.

### 06. The coaching method

**Purpose:** Explain what a client can expect.

Use a clear four- or five-step editorial timeline:

1. **Understand** — discuss goals, schedule, current exercise experience, and relevant limitations.
2. **Plan** — agree on a suitable training approach and realistic expectations.
3. **Coach** — demonstrate and guide exercises in the confirmed delivery format.
4. **Track** — review agreed, relevant progress indicators.
5. **Adjust** — adapt the plan based on participation and progress.

Do not claim formal movement screening, injury diagnosis, clinical assessment, or specific tracking technology unless Shrikant confirms it. Any sample training log must be labelled as an example, not a real client's record.

### 07. About Shrikant

**Purpose:** Make the brand personal and trustworthy.

- Real portrait and, if available, a candid coaching photo.
- Short biography based only on confirmed facts.
- Qualifications with issuing organisation and exact credential name.
- Honest explanation of coaching philosophy and target clients.
- Languages only when confirmed.

Do not invent a personal transformation story, career timeline, or credentials. If biography data is missing in the prototype, use a restrained draft that does not assert facts, and document the fields for later replacement.

### 08. Client progress / testimonials

**Purpose:** Provide social proof when real proof is available.

Temporary implementation requirement:

- Build a polished progress-story component with two image frames labelled `BEFORE IMAGE PLACEHOLDER` and `AFTER IMAGE PLACEHOLDER`.
- Use temporary stock imagery only as clearly marked visual placeholders for layout testing. Overlay or caption the component with `DEMO PLACEHOLDER — REPLACE WITH CONSENTED CLIENT PHOTOS BEFORE LAUNCH`.
- Do not use two unrelated stock models in a way that implies they are one person before and after.
- Do not add fabricated names, testimonial quotes, kilogram amounts, dates, body-fat values, or guaranteed outcomes.
- The real implementation should support before/after photos of the same person, with permission, and avoid edits, lighting, poses, or conditions that misrepresent results.
- If no real client stories exist at launch, render a neutral “Client stories will be added with permission” state or remove the section from the public version. Never launch fabricated testimonials.

### 09. Pricing and packages

**Purpose:** Help prospects understand the commercial arrangement.

Build a readable comparison table or ruled package rows, with responsive stacked rows on mobile. Do not invent final prices.

Package fields should support:

- Package name.
- Session count/frequency.
- Duration of a session.
- Delivery format.
- Inclusions and what is not included.
- Price in INR.
- Trial/assessment terms if offered.
- Cancellation/rescheduling policy.
- Payment method/terms.

Until Shrikant supplies exact details, use a clearly marked development placeholder in the code/content configuration and avoid presenting guessed prices as real. Do not use fake crossed-out prices, countdown timers, false scarcity, or “limited slots” unless accurate.

### 10. Practical lifestyle/nutrition guidance (conditional)

**Purpose:** Address lifestyle fit if this is part of the actual service.

If appropriate and qualified, the section may discuss realistic training routines and familiar Indian meal patterns. Do not call Shrikant a nutritionist or nutrition consultant without verified qualifications. Do not provide medical diet plans or make claims about treating PCOS, thyroid disease, diabetes, injury, or other conditions unless legally and professionally supported. Where needed, say that clinical dietary needs should be handled by a suitably qualified healthcare professional.

If nutrition is not part of the service, omit this section rather than padding the page.

### 11. FAQ

**Purpose:** Answer practical questions and reduce hesitation.

Implement accessible native disclosure/accordion controls and make answers visible in the page HTML when expanded. Suggested questions, to be answered only according to confirmed policies:

- Do you offer both online and in-person training?
- Where do in-person sessions take place?
- Which areas of Hyderabad do you serve?
- Are sessions one-to-one or group classes?
- Is the training suitable for beginners?
- How long is a session?
- What does a package include?
- How much does personal training cost?
- How are sessions scheduled or rescheduled?
- What equipment is needed for online sessions?
- Do you provide nutrition advice?
- How do I start?

Do not rely on FAQ schema for a special Google result. The FAQ exists for people and long-tail query usefulness.

### 12. Contact and final CTA

**Purpose:** Make the next step simple.

Suggested headline:

> Let's find a training approach that fits your life.

Provide:

- Short enquiry form: name, preferred contact, coaching format, goal, and preferred time/locality if relevant.
- Clear privacy notice and consent wording appropriate to the actual data collection.
- WhatsApp and phone actions only when real destinations have been supplied.
- A visible, helpful form validation/error state.
- A real confirmation state only when the form actually submits to a configured endpoint.

If no backend/endpoint is configured yet, implement a working, validated UI and document the integration needed before launch. Do not falsely display “Message sent” when no message was sent.

### 13. Footer

Include the wordmark, relevant internal links, confirmed contact options, public social profile only after the URL is supplied, privacy page, disclaimer, and copyright. Do not show a fictional address, made-up review score, fake opening hours, or invalid social URL.

---

## 8. Internal pages: requirements

### In-person personal training page

- Clear title and H1 describing in-person training in Hyderabad.
- Explain actual delivery location and what the client needs to know before booking.
- State confirmed service localities only.
- Describe session format, duration, schedule, inclusions, prices, and cancellation terms only when confirmed.
- Include useful FAQs, one clear CTA, and internal links to the homepage and online offering.
- Do not imply Shrikant owns or represents a particular gym unless that is confirmed.

### Online personal training page

- Explain the actual format: live one-to-one, live group class, ongoing online programme, or the specific combination offered.
- State platform and scheduling only when confirmed.
- Explain equipment/internet/space expectations without overstating requirements.
- Describe communication, check-ins, and progress tracking only if actually offered.
- Include price/inclusion details when supplied, FAQs, and a contact CTA.
- Do not claim a nationwide or international service footprint unless the trainer has confirmed it.

### Weight-loss page (draft/noindex until confirmed)

If enabled, it should explain who the service is suitable for, programme approach, how progress is discussed, practical expectations, what is and is not included, nutrition scope, pricing, and FAQs. Avoid “lose X kg in Y days,” crash-diet claims, body-shaming, and guaranteed outcomes.

### Strength and muscle-building page (draft/noindex until confirmed)

If enabled, explain the training approach, programming principles Shrikant actually uses, suitable starting points, equipment requirements, progress reviews, package details, and FAQs. Avoid claiming specialist credentials or guaranteed muscle gain.

### At-home personal training page (draft/noindex until confirmed)

Only enable when home visits genuinely exist. Include confirmed areas, travel limits, equipment brought/needed, session space/safety requirements, scheduling, package details, and booking. No fabricated service-area claims.

### Guides index and articles

Start with three human-useful guides:

1. **Personal trainer fees in Hyderabad: what affects the cost?** Explain relevant price factors and questions to ask. Do not invent current market averages or publish Shrikant's price before he confirms it.
2. **What to expect in your first month of personal training.** Explain goal discussion, routine-building, learning exercises, consistency, and review processes without guaranteeing results.
3. **Gym, home, or online training: which format may suit you?** Offer a balanced comparison and link to only the formats Shrikant genuinely offers.

These must be genuinely useful and original. Do not mass-generate generic fitness articles for keyword coverage. Include author/reviewer attribution only when it reflects the real author and expertise.

### Privacy and disclaimer pages

These are scaffolds until the real data handling is finalised. Confirm analytics, contact-form processing, third-party integrations, cookies, and retention practices before launch. Do not represent legal advice or invent a business entity/address.

---

## 9. Visual design direction: “The Coach's Logbook”

### Core concept

The website should feel like a custom-designed editorial fitness journal: precise, confident, warm, quiet, tactile, and practical. It should not look like a generic AI-generated fitness landing page or a gym franchise template.

Use editorial hierarchy and deliberate composition rather than decoration. Every section should have a distinct visual reason to exist.

### Proposed colour tokens (starting point, not final brand lock)

| Token | Hex | Intended use |
|---|---|---|
| Chalk / warm paper | `#F4F1EA` | Main background |
| Ink | `#12151A` | Main text and darkest surfaces |
| Bidri slate | `#232A33` | Selected dark sections |
| Inlay silver | `#B9C0CA` | Fine rules and secondary text on dark surfaces |
| Marigold | `#F2A900` | Sparing CTA/focus accent with dark text |
| Signal green | `#2F7D4F` | Success state only |

Test all actual colour pairs for WCAG contrast. Do not use the accent everywhere. The colours are a proposal to be checked against Shrikant's actual brand assets and training photography. The supplied Instagram screenshot does not establish a formal brand palette or logo.

### Typography

Use no more than three type families:

- Display/headings: `Archivo` or a comparable variable sans-serif with deliberate scale and tight but readable line-height.
- Body/editorial copy: `Source Serif 4` or a readable alternative, around 18px for long-form desktop body text and around 16px on mobile where appropriate.
- Labels/numbers/session details: `IBM Plex Mono` or similar, used sparingly.

Self-host font subsets when practical and use sensible fallbacks. Avoid mixing too many typefaces and avoid oversized headlines in every section.

### Grid and spacing

- Desktop content width around 1,200px, adjusted to the chosen layout.
- 12-column desktop grid, collapsing to a single-column mobile flow.
- 8px spacing base, with comfortable section spacing and consistent alignment.
- Text measure around 62–70 characters for long copy.
- Hairline rules and structured rows may be used for an editorial/logbook feeling.
- Mobile should be designed intentionally at 360px–430px widths, not merely squeezed down from desktop.

### Visual rhythm

Alternate among:

- Asymmetric split hero.
- Short trust/credential strip.
- Editorial text-and-image sections.
- Numbered coaching method timeline.
- Ruled service/programme rows.
- A photo-led trainer profile.
- An optional client progress layout with clearly marked demo placeholders.
- A restrained pricing table.
- A strong final dark contact band.

Avoid using the same three-card grid in every section. Cards should be reserved for content that benefits from grouping, not used as a default for everything.

### Photography direction

Use high-quality temporary stock photos that feel documentary and believable:

- A fitness coach instructing a client, not just a model posing in a gym.
- Natural light and practical equipment.
- Contemporary Indian fitness context where possible, without stereotypes.
- A mix of portrait, coaching action, close details, and wide environment shots.
- Consistent colour grade/crops across the page.

Prefer genuine photography of Shrikant when supplied, and review the Instagram feed with him for suitable training imagery when accessible. The supplied screenshot alone does not provide enough professional training imagery for the website. Do not generate fake photographs of Shrikant. Do not imply stock models are his clients. Avoid AI-generated people and overprocessed “AI fitness” imagery. Centralise asset paths in one configuration/module so the replacement process is simple.

### Avoid these design patterns

- Purple/blue gradients and random glow effects.
- Excessive glassmorphism or floating cards.
- Repeating identical three-column card layouts.
- Arbitrary floating badges, fake counters, animated statistics, or faux review scores.
- Scroll-jacking, autoplay, excessive parallax, and cursor effects.
- Generic dumbbell icon branding.
- Dense text walls or keyword-stuffed sections.
- A floating WhatsApp icon that obscures content or overlaps controls.
- Any AI design tests, internal review UI, concept-comparison section, or prototype label on the finished live site (except clearly marked temporary asset placeholders during development).

---

## 10. Temporary image and content replacement system

Create a central file such as `lib/site-content.ts` or `src/lib/site-content.ts` that contains:

- Working brand name and copy values (use `Shrikant` provisionally; add a TODO to confirm whether the public display name should be `Shrikant`, `Srikanth`, or `Srikanth Gaddam`).
- Contact number/WhatsApp number (empty until Shrikant confirms the correct number and tested URL; do not copy `wa.me/9100434337` into the website unverified).
- Production domain (environment-configured).
- Instagram URL: `https://www.instagram.com/_srikanth_goud_350_/` (provided profile link).
- Instagram bio claims in a draft/reference field only: `NASM CPT`; `In-Person & Online Fitness Coach`; `movement science, posture, and…` (last phrase truncated). These must not become public factual claims until confirmed.
- Confirmed service localities (empty until confirmed).
- Pricing and session fields (unset/placeholder until supplied).
- Qualification fields and years of experience (unset until supplied).
- Service page publication flags (`published` or `draft`).
- Centralised image paths/URLs.

Use a predictable public asset naming system, for example:

- `/images/shrikant-hero.jpg`
- `/images/coaching-session-01.jpg`
- `/images/coaching-session-02.jpg`
- `/images/online-training.jpg`
- `/images/in-person-training.jpg`
- `/images/progress-before-placeholder.jpg`
- `/images/progress-after-placeholder.jpg`
- `/images/guide-training-basics.jpg`

If exact stock downloads cannot be provided by v0, choose appropriate stock images supported by the tooling or create attractive local placeholder assets with clear labels. Do not insert random broken URLs. Document all temporary asset paths in a replacement checklist.

Before/after placeholder images must have visible development labelling. Never manufacture an apparent client transformation from unrelated photos. The final launch checklist must explicitly require replacing or removing this demo component before publication.

Do not use fake testimonial text for visual filler. Use a designed empty state or labelled internal placeholder and remove it from the public version until real, consented testimonials exist.

---

## 11. Component and code organisation

Keep implementation maintainable. Suggested component organisation (adapt to repository conventions):

- `components/site-header.tsx`
- `components/mobile-nav.tsx`
- `components/hero-section.tsx`
- `components/trust-strip.tsx`
- `components/audience-section.tsx`
- `components/service-rows.tsx`
- `components/coaching-method.tsx`
- `components/trainer-profile.tsx`
- `components/progress-gallery.tsx`
- `components/pricing-section.tsx`
- `components/faq-accordion.tsx`
- `components/contact-section.tsx`
- `components/site-footer.tsx`
- `components/placeholder-image.tsx` if required
- `lib/site-content.ts`
- `lib/seo.ts` or route metadata helpers

Use shared design tokens for typography, colour, spacing, borders, and buttons. Avoid one enormous homepage file full of duplicated markup. Keep repeated content data-driven but do not make all sections visually identical just because they share components.

For the contact form, provide client-side validation and accessible field labels. Wire to the real endpoint only when the endpoint is provided. If unavailable, preserve a clear TODO in the README/config and avoid false success feedback. When a WhatsApp number is configured, create the message URL from user-entered values safely and encode the text.

---

## 12. Performance, accessibility, and responsive requirements

- Responsive layouts for small mobile, large mobile, tablet, laptop, and wide desktop.
- Test mobile header, page anchors, FAQ controls, contact form, buttons, and sticky conversion bar.
- Ensure keyboard navigation and visible focus states.
- Maintain accessible contrast and semantic form labels.
- Honour `prefers-reduced-motion` and avoid unnecessary animation.
- Lazy-load below-the-fold photography when appropriate; optimise the hero image priority/size.
- Avoid layout shifts by assigning image aspect ratios/dimensions.
- Do not load large background videos for decoration. If the trainer supplies video later, use a deliberate poster/fallback and responsive media handling.
- Keep essential page content available when JavaScript is disabled or limited, where practical.
- Validate links, metadata, 404 handling, sitemap, canonical URLs, and page indexation states.
- Treat Google Core Web Vitals as user-experience targets, not as a promise of rankings.

---

## 13. Google Business Profile and local SEO guardrails

Do not create or configure a Google Business Profile until the real operating model is known.

- Google says eligible businesses must make in-person contact with customers during stated hours; online-only businesses are not eligible.
- If Shrikant visits clients, investigate service-area business eligibility and hide a private address when applicable.
- Do not claim the address of a gym or class venue unless Shrikant has authority to represent the business at that location.
- Use only the real-world business name, accurate category, true service details, real contact information, and genuine photographs.
- Do not stuff the business name with “best personal trainer in Hyderabad.”
- Invite genuine clients to leave honest feedback without incentives, review gating, or instructions to include particular keywords/localities.
- Keep the visible service area on the website and Business Profile consistent with actual coverage.
- Build appropriate local citations/partnerships only where the business identity is accurate.

Reference official guidance before launch:

- Google Business Profile eligibility: https://support.google.com/business/answer/13763036?hl=en
- Representing a business on Google: https://support.google.com/business/answer/3038177
- Google local ranking guidance: https://support.google.com/business/answer/7091
- Google Maps user-contributed content/review policy: https://support.google.com/contributionpolicy/answer/7400114

---

## 14. Measurement plan

After the domain and real contact channels are configured:

- Verify the domain in Google Search Console.
- Submit the sitemap and check URL indexing.
- Add analytics only with the correct privacy disclosures and configuration.
- Track actual form submissions, WhatsApp click-outs, and phone link clicks as separate events.
- Review page-specific impressions/clicks, search query intent, conversion rate, qualified enquiries, and service-area fit.
- Do not count page views, button renders, or failed form submissions as successful leads.
- Review data periodically and improve content based on meaningful questions and genuine enquiries.

Do not promise first-page rankings or set an arbitrary review count as a ranking goal. Evaluate progress from real observations after launch.

---

## 15. Launch checklist and unresolved facts

### Must be confirmed with Shrikant before public launch

- [ ] Full public/professional name and whether “Shrikant” alone is the brand name.
- [ ] Confirm that `https://www.instagram.com/_srikanth_goud_350_/` is the right public profile for the project and confirm exact public name spelling (`Shrikant` vs `Srikanth Gaddam`).
- [ ] Verify the Instagram bio’s self-reported `NASM CPT` claim, exact credential title, issuer, status, and permission to display it.
- [ ] Years of experience, if to be claimed.
- [ ] Actual specialisations.
- [ ] Whether online sessions are live one-to-one, group classes, online plans, or another format.
- [ ] Exact in-person delivery arrangement and whether home visits are available.
- [ ] Confirmed service areas/localities and travel boundaries.
- [ ] Languages actually spoken.
- [ ] Session length, package frequency, prices, and inclusions.
- [ ] Assessment/trial policy and cancellation/rescheduling terms.
- [ ] Real phone/WhatsApp number and email; test the displayed Instagram WhatsApp link before use.
- [ ] Actual contact form delivery endpoint.
- [ ] Whether an existing Google Business Profile exists and whether the business is eligible.
- [ ] Real testimonials and documented permission.
- [ ] Real before/after images of the same client, with permission, or remove the section.
- [ ] Ownership/permission for every image and video used; review suitable public training posts/reels with Shrikant before reuse.
- [ ] Actual website domain for canonical URLs and metadata.
- [ ] Privacy/data handling details and analytics setup.

### Do not publish until verified

- Any certificate, award, years-of-experience number, client count, rating, testimonial, transformation result, price, physical address, operating hours, service radius, language, nutrition credential, medical claim, or guarantee that is not confirmed.
- Specialist service pages that do not match Shrikant's actual offer.
- Locality targets inferred from “Katchi Boli” or “Mendi Bhutan.”
- Placeholder imagery that could be mistaken for real client results.

---

## 16. Acceptance criteria for the v0 first pass

The v0 build is ready for review when:

1. The homepage is fully laid out and responsive, with the complete section hierarchy above.
2. Core in-person and online service routes exist and contain meaningful, differentiated content, subject to confirmed service details.
3. Conditional weight-loss, strength/muscle, and at-home routes are built in draft/noindex state until confirmed; they are not in the public sitemap/nav by default.
4. The guides index and three initial guide pages are implemented with useful, non-fabricated content.
5. Privacy and disclaimer routes exist as clearly documented scaffolds awaiting final business/data details.
6. The visual direction is editorial and custom, with purposeful layout variation, not a generic repeated-card template.
7. Stock images are visually appropriate, centrally configured, and easy to replace. No AI-generated fake Shrikant portrait.
8. The before/after layout is visibly marked as demo/placeholder and cannot be mistaken for a verified result.
9. No fake testimonials, statistics, credentials, business reviews, prices, localities, or outcomes appear as facts.
10. Navigation, anchors, buttons, service links, accordions, and form validation work. Unconfigured submission destinations are clearly documented; no false success messages are shown.
11. Page metadata, sitemap, robots behavior, and canonical URL configuration are deliberate. No fake production domain is embedded.
12. Responsive layout, accessibility basics, image sizing, performance, and reduced-motion behavior are addressed.
13. The project includes a README section describing configuration values to replace and exact launch blockers.
14. No AI design-test sections, mockup comparisons, or internal design-review UI are present in the live-site pages.

---

## 17. Source register and interpretation rules

### Supplied research documents and profile evidence

1. `Hyderabad Personal Trainer SEO Strategy.pdf` — Gemini Deep Research, 103 pages. Key contribution: broad competitor inventory, content analysis, keyword clusters, a proposed single-page hub, technical SEO checklist, and a preliminary visual system.
2. `Hyderabad Personal Trainer Search-First Website Strategy- cluade-ai-result.pdf` — Claude strategy review, 36 pages, dated 24 October 2026. Key contribution: explicit evidence limitations, audit of Gemini's assumptions, comparison of single-page versus hybrid architecture, refined content structure, and a distinct “The Coach's Logbook” visual direction.
3. User-provided screenshot of `https://www.instagram.com/_srikanth_goud_350_/` — shows the public handle, self-reported name/credential text, high-level online/in-person coaching claim, movement-science/posture wording, a WhatsApp link string, and profile snapshot counts. It does not establish credential validity, the complete bio, service localities, prices, experience, or permission to reuse media.

### Official online guidance to check during implementation

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- People-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Search spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Business Profile eligibility: https://support.google.com/business/answer/13763036?hl=en
- Business Profile representation guidelines: https://support.google.com/business/answer/3038177
- Local search ranking guidance: https://support.google.com/business/answer/7091
- Google Maps review policy: https://support.google.com/contributionpolicy/answer/7400114
- LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds/

### Evidence discipline

When sources disagree, do not silently convert a hypothesis into fact. Clearly distinguish verified business details, direct observations from the reference pages, strategic inferences, and assumptions that require trainer confirmation. Prefer current official Google guidance for Google policies. The website must be built around Shrikant's real offer, not around what competitors happen to claim. Instagram data is partial: the screenshot is reviewable, but the live profile fetch was blocked/throttled; do not claim that all Instagram posts or highlights have been reviewed.

---

## Final instruction

Build the best first-pass implementation that this brief supports. Make the visual work polished and purposeful now; use temporary stock assets where necessary; centralise replaceable content and assets; and explicitly document every business fact that still needs confirmation. Do not pause the build to hunt for perfect photographs or to invent missing details. The real Shrikant imagery, videos, final copy, prices, and credentials can be swapped in during the refinement phase.

# Shrikant Personal Training — v0 Mini Master Build Prompt

**Purpose:** A single master prompt for v0 Mini to build the first complete, polished Next.js website using the canonical project brief, temporary stock/AI-generated imagery, and an intentionally art-directed design system.

**Canonical source:** `public/docs/shrikant-personal-trainer-canonical-brief-v1-1.md` (or the exact file name currently present in `public/docs`). If the actual filename differs, locate the Markdown file in that folder and read it before implementation.

---

## MASTER PROMPT — COPY FROM HERE INTO V0 MINI

You are acting as a senior product designer, art director, SEO-aware content designer, accessibility specialist, and senior Next.js engineer. Build a complete, professionally designed personal trainer website in the existing repository. Do not merely write a plan or return an outline. Implement the site, its components, styling, interactions, routes, metadata, and temporary imagery.

### Source of truth and rules

1. First inspect the existing repository, package.json, Next.js version, App Router structure, Tailwind version, global CSS, installed component libraries, and existing design skills/instructions. Preserve working foundations; do not overwrite or replace the app architecture without a clear reason.
2. Read the canonical brief in `public/docs/shrikant-personal-trainer-canonical-brief-v1-1.md` completely. It is the source of truth for business context, research, SEO, and required content. If the filename is slightly different, find the existing canonical `.md` file in `public/docs`.
3. Where these instructions differ from the canonical brief, follow the more specific directions in this master prompt for design implementation and temporary image usage. Do not invent personal facts.
4. Build all requested pages and components now. Do not stop after the homepage. Ensure the homepage and internal routes render correctly.
5. Use temporary professional stock images or AI-generated images for the first implementation. Do not wait for the trainer's real photos. Make every image easy to replace later through one central asset configuration.
6. No AI design-test sections, concept comparison screens, alternate mockups, internal review panels, or prototype labels other than clearly marked temporary media placeholders. The live website preview must look like a finished professional website.
7. Never invent Shrikant's surname, qualifications, certificates, years of experience, exact specialisations, prices, location coverage, customer count, reviews, transformations, languages, medical expertise, or guaranteed outcomes. The visible Instagram screenshot shows the working profile name “Srikanth Gaddam | NASM CPT” and says in-person and online fitness coaching, but details remain to be confirmed. Use one central configuration value for the display name and clearly mark unconfirmed data internally; do not expose technical placeholder text in polished page copy.
8. Do not fabricate business information to make the design look complete. If a real fact is missing, use natural non-committal copy or hide the relevant field/section until configured.
9. The user explicitly wants a highly designed visual experience. Content should be composed in a deliberate grid with clear grouping, varied visual treatments, good typography, carefully proportioned cards, images, icons, and meaningful motion. Do not simply place headings and paragraphs on a blank page.
10. No section numbers or numbered eyebrow labels such as “01”, “02”, “03”. Do not use repeated rows separated by endless horizontal lines as the main design language.

### Design goal

Create a warm, premium, modern fitness-coaching brand website. It must look like a professional designer built it in Figma and a careful developer implemented it. It should feel individual and art-directed, not like a generic AI-generated landing page or a default shadcn template.

The site should be light-first, photography-led, confident, approachable, and visually memorable. Keep the background white or warm off-white and most text near-black. Use exactly one major dark section near the contact/footer. Do not use a full dark website, dramatic black-on-black gym aesthetics, blue-purple gradients, random neon accents, glassmorphism, glow effects, or decorative floating elements.

#### Non-negotiable design rules

- Establish and use a consistent design-token system in CSS variables.
- Use Archivo for display/headings and Figtree for body/UI via `next/font` if possible. Check the existing font setup before replacing it.
- Main container: approximately 1240px maximum width, with 20px mobile, 32px tablet, and 48px desktop side padding.
- Use a 12-column desktop grid with sensible responsive gutters. Use intentional column ratios and alignment, not arbitrary placements.
- Base spacing unit: 8px. Target section spacing around 72px mobile, 96px tablet, and 120px desktop; tighten where the content calls for it.
- Use three main corner radii only: 8px for buttons/inputs/chips, 16px for ordinary cards, and 28px for large panels. A distinctive large top-right corner can be used on the hero/coach imagery only.
- Use no more than two shadow tokens. Shadows should be soft and warm-tinted, not heavy black shadows.
- Do not make every item a card. Use cards to group related content, but vary composition section by section: image-led panels, asymmetric layouts, editorial feature blocks, programme cards, pricing panels, testimonial layouts, and a strong contact band.
- Avoid repeated equal-width three-card grids, centred content in every section, icon-in-rounded-square tiles, repetitive eyebrow labels above every heading, decorative statistic counters, pill badges with dots, excessive tags, and generic “Why choose us” card lists.
- Use Lucide icons only where an icon communicates meaning. Keep one stroke weight and visual scale. Do not put every icon inside a rounded square. Icons may sit inline with labels or in simple circular icon wells when there is a clear reason.
- Every section must have a specific content purpose and a distinctive, coherent composition. Avoid visual randomness.
- The visual hierarchy must remain strong in grayscale; do not rely on colour alone.
- Use tasteful background texture/pattern at extremely low contrast only if it adds depth. Do not let a repeating pattern compete with the content or look like generic AI decoration.
- Use no gradient text. If a gradient is used, restrict it to a decorative arc/backdrop detail and not text, body content, cards, or page backgrounds.
- Do not use em dashes in website copy. Prefer commas, full stops, or parentheses.

### Colour system

Use the following warm palette as the initial implementation palette, selected from the supplied palette references and refined for functional contrast. Keep colours centralised as design tokens rather than hard-coded separately throughout components.

- Main page background: `#FFFBF5`
- Secondary warm surface: `#FCF0E1`
- Card surface: `#FFFFFF`
- Primary text: `#1E140B`
- Secondary text: `#5A4838`
- Muted/caption text: `#7A6755`
- Dark contact/footer surface: `#2B1A0E`
- Primary CTA/accent amber: `#F2AC50`
- Decorative burnt-orange accent: `#D4601E`
- Small accent text/link colour: `#A8440F`
- Decorative border: `#E8D8BF`
- Form/control border: `#8A7660`
- Success: `#2E6B3E` on `#E6F1E7`
- Error: `#B3261E` on `#FCE9E6`

Colour hierarchy:

- About 80–90% of the interface should be neutrals: warm off-white, cream, white, ink, and restrained secondary text.
- Use amber for primary CTAs, one highlighted phrase/swash, and a few important active states. It should be a controlled accent, not a background colour for whole sections.
- Burnt orange is for decorative graphic marks or large accents only, not small body text.
- Use the darker ember colour for small accent links when needed.
- Only the contact/footer section should use the dark-brown background as a large surface.
- Primary button: amber fill and near-black text. On hover, darken the amber slightly and use a subtle 1px lift. Keep contrast legible.
- Secondary button: transparent/white surface, near-black text, thin warm border.
- Focus ring: high-contrast, clearly visible, consistent across controls.
- Keep text black/near-black. Do not randomly colour ordinary paragraphs green, red, blue, or orange.
- Check all actual contrast pairs and adjust tokens if any fail WCAG AA. The provided hex values are the design starting point, not a substitute for testing.
- Set the application to light colour scheme. Remove default dark-mode variables if they would silently alter this design.

### Temporary imagery and media (important)

Use stock or AI-generated temporary imagery now so the website looks complete in v0. Real assets will be supplied later. Do not leave large empty image blocks or substitute a monogram where a photograph is needed.

Preferred workflow:

1. If v0's image-generation capability is available, generate cohesive, editorial-quality temporary fitness images with a realistic Indian/South Asian fitness context, warm natural lighting, neutral gym/home-training settings, understated styling, believable anatomy, and consistent colour grading.
2. Otherwise use real, accessible stock photographs from a dependable source such as Unsplash or Pexels. Use actual image URLs or downloaded files only; never invent an image URL. Configure remote image domains if necessary.
3. Prefer local files in `/public/images/stock/` when the assets are downloaded/generated. If generation or downloads are not available, use verified working remote URLs, centralised in a single configuration.
4. Create `src/lib/site-assets.ts` (or the equivalent path used by the repository) with all asset paths and their metadata. Components must not scatter image URLs throughout the code.
5. Use `next/image` where appropriate, set meaningful dimensions/aspect ratios, use responsive sizes, and avoid layout shift. Use an image fallback component when a file is absent.
6. Keep temporary images visually cohesive: warm neutral grade, natural light, candid coaching moments, real equipment, uncluttered backgrounds, no neon colour grading, no fake logos, no watermarks, no obvious AI artefacts.
7. Temporary stock/AI-generated people must not be described as Shrikant or presented as actual clients. Use the imagery as illustrative fitness photography, not evidence of his identity or achievements. Later replacement must require changing the central asset map only.
8. For the hero, use a compelling portrait/action photograph of an Indian personal training scene, preferably a coaching moment or side-angle action. It must look premium and human. A temporary stock/AI image is acceptable for the demo, but never caption it as Shrikant.
9. For the coach/about section, use a well-composed temporary fitness portrait or candid coaching image. It will be replaced later by the trainer's own photo.
10. Create image slots for the hero, trainer/about, in-person coaching, online coaching, weight-loss programme (conditional), strength/muscle programme (conditional), method, guide cards, and temporary transformation mockup.
11. Before/after layout: create a polished, reusable component for future authentic client progress photographs. For the v0 demo, use temporary images only if you can make it clear they are not real client results. Add a visible but tasteful label such as “Demo layout · replace with real client photos before launch”. Do not invent a person's weight loss, measurements, date range, testimonial, or result. Do not imply that two unrelated stock people are the same person. If a realistic same-person before/after cannot be created without misleading imagery, use two neutral demo frames with temporary image placeholders while keeping the layout visually complete.
12. Put a single configuration flag such as `SHOW_TRANSFORMATION_DEMO` in the central content config. Keep the component easy to hide before production launch until genuine, consented client assets and facts are provided.
13. Add a small `CREDITS.md` in the stock-assets folder if stock attribution/licence notes are needed.

### Content configuration and factual discipline

Create a central content file such as `src/lib/site-content.ts` containing:

- Working display name: `Shrikant` until confirmed. Store the full name in one configurable field; do not hard-code it separately in headers, metadata, footer, and content.
- Instagram URL: `https://www.instagram.com/_srikanth_goud_350_/`
- Website/service content.
- Qualification details, each with a verification state.
- Service routes and whether each is published.
- Prices, session lengths, service areas, languages, phone, WhatsApp, business profile, social links, testimonial content, and transformation data as configurable fields.
- For unconfirmed items, use `null`, empty arrays, or `published: false`, and hide them from user-facing UI rather than rendering a raw placeholder.

The visible Instagram screenshot suggests the trainer identifies himself as Srikanth Gaddam, mentions NASM CPT, and offers in-person and online coaching. Those details still require confirmation before launch. Show the Instagram link, but do not rely on it as the only contact option. Do not activate a WhatsApp link until its number is confirmed in full international format. The profile screenshot's `wa.me/9100434337` may be incomplete; do not silently correct it or use it as a live CTA.

Do not invent prices, a free consultation, a free trial, response-time promises, exact service locations, languages, client totals, ratings, awards, guarantees, health outcomes, or credentials. If no verified price is provided, present an “Enquire about coaching options” CTA rather than fake pricing.

Nutrition content must remain hidden unless the trainer confirms his qualifications and service scope. Do not claim to treat posture conditions, injuries, pain, or medical issues. Do not use “nutritionist”, “dietitian”, “physiotherapist”, “rehabilitation specialist”, or equivalent titles unless verified.

Do not invent testimonials. If none are supplied, use a visually polished “Client stories will appear here” state only in preview mode, or omit the section from the production display. Use the transformation demo flag described above for temporary presentation.

### Website routes and architecture

Implement the following routes with the Next.js App Router, adapting only if the repository already has a sensible routing structure.

**Core homepage** `/`

A complete single-page experience with anchor navigation. It should be polished enough to present to the client in v0.

**Core service page** `/services/in-person-personal-training-hyderabad/`

Build a substantive page for in-person coaching, while keeping exact venue and localities configurable. Do not invent a partner gym, home-visit coverage, or address.

**Core service page** `/services/online-personal-training/`

Build a substantive page for online coaching. Keep the exact format (live one-to-one, group class, or programme check-ins), platform, schedule, and inclusions configurable. Do not present a format as confirmed if unknown.

**Conditional service pages**

- `/services/weight-loss-personal-trainer-hyderabad/`
- `/services/strength-and-muscle-coaching-hyderabad/`
- `/services/personal-trainer-at-home-hyderabad/`

Build their page templates and sample structure so they are ready for future use, but mark them unpublished by default. Hide them from public navigation and exclude them from sitemap/crawlable internal links while unpublished. In production, return `notFound()` for unpublished routes unless an explicit preview environment variable is enabled. Do not ship a thin or invented page just to populate a route.

**Guides**

- `/guides/`
- `/guides/personal-trainer-fees-hyderabad/`
- `/guides/first-month-personal-training/`
- `/guides/gym-home-online-training/`

Create useful article layouts and initial editorial copy that avoids unverified local fee statistics or fitness claims. Distinguish general educational content from facts about Shrikant. If a guide cannot be completed with useful original content, keep it unpublished rather than filling it with generic filler.

**Legal pages**

- `/privacy/`
- `/disclaimer/`

Build plain, readable pages. The privacy policy must accurately describe the actual forms, analytics, and data collection used; mark it for review before launch.

### Homepage content and visual composition

Build these sections in the following narrative order. Each section must use a deliberate composition rather than the same card template repeatedly.

#### Header and navigation

- Typographic wordmark: “SHRIKANT” with “PERSONAL TRAINING” as a smaller label. It is a working identity; the name must come from the central config.
- Desktop navigation anchors: Coach, Coaching, Method, Pricing, FAQs.
- Primary CTA: “Enquire About Coaching” or another confirmed neutral CTA.
- Mobile navigation with accessible menu behaviour.
- Header may become a subtle sticky header after scroll. Do not add an excessive blur/glass effect.

#### Hero

- Asymmetric 7/5 desktop split: text occupies about seven grid columns, portrait/action image occupies five.
- H1: “Personal Training in Hyderabad. Built Around You.” Use clean, confident line breaks rather than keyword-stuffed prose.
- Supporting copy: “Explore one-to-one and online coaching options designed around your goals, schedule, and starting point.” Adjust wording so it does not promise any unconfirmed programme inclusions.
- Primary CTA: “Explore Coaching” (anchor to coaching options) or “Enquire About Coaching” (contact section).
- Secondary CTA: “Meet Your Coach” (anchor to coach section).
- Include small format chips for online and in-person only, since those are visible in the supplied profile screenshot, with a note to confirm precise services before launch.
- Hero image should have intentional crop and an asymmetrical signature corner. Add one subtle curved/arc graphic motif that can recur in the method or contact section. Do not use floating badges, fake statistics, rating stars, or an empty logo tile.
- At 360px width, the H1 and CTA must remain prominent and not be pushed far below the fold by the image.

#### Coach / identity section

- Place this directly after the hero.
- Use a strong image-and-copy split; image may be temporary stock/AI-generated and must be replaceable.
- Introduce the trainer without inventing personal history or an inspirational backstory.
- Include credential rows only when confirmed. If a credential is pending, hide it in production or mark it as a temporary internal placeholder, not public factual copy.
- The section should be human, personable, and professionally composed, not a plain biography paragraph.

#### Coaching formats

- Present in-person and online coaching as two visually distinct, unequal panels rather than two identical cards.
- One can be image-led and the other surface-led, while sharing design tokens and CTA placement.
- Each panel should explain who the format suits and what a visitor should enquire about.
- Add up to three inclusion bullets only when confirmed. Hide empty features.
- Add a clear route link to the corresponding service detail page.
- Any group classes, home visits, or other formats must be configured as unpublished until confirmed.

#### Training method

- Show a clear, visually engaging process with the stages: Understand, Plan, Coach, Track, Adjust.
- Do not number the stages. Do not make the section a bare list separated by lines.
- Use an art-directed connected composition such as staggered cards with a restrained curved arc/path detail, transitioning to a clean vertical layout on mobile. Cards must be visually grouped and readable, not floating randomly.
- Each stage gets a meaningful Lucide icon, a short label, and concise copy. No invented medical screening or specific assessment protocol. Describe generic training-planning steps only where appropriate.
- A visual “example session log” can be used as a small decorative information panel, but clearly label it as an example, not Shrikant's real training data.

#### Programme/goal section

- Build a visually rich programme section for weight loss, strength/muscle building, and beginner training only as configurable items.
- Use asymmetrical cards with editorial images, purposeful visual scale, and clear descriptions. Avoid equal three-card grids if a stronger layout is possible.
- Hide unpublished or unconfirmed specialist programmes from production navigation. In the v0 preview, show the layout with “demo content” only if clearly identified and not presented as a verified Shrikant service.
- Each published programme must link to a real, substantive service page.

#### Client stories and progress

- Create a complete visual component for future before/after images or client stories, but make it clear that any initial demo imagery is temporary.
- Do not invent a weight-loss result, timeframe, number, quote, name, or achievement.
- Use the transformation placeholder configuration flag so the section can be hidden with one setting before launch.
- Do not use unrelated stock people to imply a before-and-after transformation of the same client.
- If possible, create paired neutral demo image frames with the “Demo layout, replace before launch” label so the visual design can be reviewed without misleading claims.

#### Pricing and packages

- Provide a polished pricing area without inventing prices.
- Default to a refined “Enquire about coaching options” presentation until Shrikant provides actual fees and package details.
- Prepare reusable pricing-card/table components that can be enabled from config once confirmed.
- When confirmed, each package should state inclusions, number of sessions, session duration, validity, cancellation terms, and price. Do not invent discounts, crossed-out prices, countdowns, scarcity, or guaranteed results.

#### Nutrition and lifestyle

- Do not publish a nutrition consultant, diet-plan, or clinical nutrition service as fact without verified qualifications.
- A generic, modest lifestyle/habit note may be included only if it is clearly within the confirmed coaching scope. Otherwise omit the section entirely.

#### FAQs

- Use an accessible accordion that supports keyboard and touch.
- Answers must be available in server-rendered HTML and not depend on clicking to be injected.
- Include only questions with answers supported by confirmed facts or neutral process information.
- Useful examples: how to enquire, what information to share initially, whether online/in-person formats are available (after confirmation), what happens after an enquiry, and which equipment may be needed (only when known).
- Do not invent exact prices, locations, session durations, cancellation rules, language availability, or a guaranteed timeline.

#### Contact band and form

- The only large dark section: dark brown surface, warm cream text, amber CTA, decorative arc as restrained detail.
- Desktop composition: copy on one side, a white or warm card containing the enquiry form on the other.
- Form fields: name, preferred contact, coaching format, primary goal, and optional preferred time. Keep fields accessible and minimal. Add a privacy/consent note consistent with the actual data handling.
- If there is no form backend, create a clearly identified integration placeholder in code and show an accurate “enquiry submission is not configured yet” state on submit. Never show false success or pretend a message has been sent.
- Do not activate phone or WhatsApp actions until the full destination has been confirmed. Once configured, use `tel:` and a correctly encoded `wa.me` URL built from the central config.
- Include the Instagram link in the contact area/footer.

#### Footer

- Continue the dark band into a compact footer with the wordmark, working navigation, confirmed social links, privacy, disclaimer, and copyright.
- Do not print unconfirmed addresses or business names.

### Internal page design

Do not make every internal page the same long set of generic cards.

- Service pages: compact asymmetric hero, strong representative stock/AI image, a readable content body, a distinct “At a glance” panel for confirmed details, who the service suits, method, what's included, equipment/format details when known, relevant FAQ, and clear enquiry CTA. The panel must hide empty fields. Conditional unpublished services must remain gated.
- Guides index: one featured editorial article card plus smaller cards with intentionally different crops and content hierarchy.
- Guide articles: comfortable 680–720px reading column, readable H2 structure, short intro, a key-takeaways panel where useful, related guides, and an understated CTA. Avoid a blog-template look made of repeated boxed paragraphs.
- Privacy/disclaimer pages: plain, narrow, readable layouts. Keep them consistent with the palette, but do not over-design legal text.

### Motion and interaction system

Motion is important. Make it visibly polished, particularly on initial load and while scrolling, but avoid a flashy animation demo.

Use CSS animations/transitions and, if needed, one small reusable `Reveal` component using IntersectionObserver. Do not add an animation library unless essential and justified by the existing repository.

Motion rules:

- Use a consistent easing such as `cubic-bezier(0.22, 1, 0.36, 1)` for entrances.
- Hero image: gentle scale settle, approximately 700–900ms, with image visible immediately and no opacity-zero LCP issue.
- Hero heading: sequential line entrance with a short stagger, approximately 550–700ms.
- Hero supporting text and CTAs: staggered fade/rise, approximately 400–550ms.
- Section headings: fade/rise about 20–24px, around 500–650ms.
- Service images/panels: subtle clip reveal or transform, around 650–800ms.
- Related cards: stagger at roughly 60–90ms, capped at a few items.
- Button hover/focus/press: clear, fast 150–220ms feedback.
- FAQ open/close: around 220–300ms where supported, otherwise native accessible behaviour.
- Header: subtle background/border change after scroll, no large glass effect.
- Mobile menu: controlled slide/fade with a short stagger.

Do not animate every paragraph independently. Animate related groups in a single sequence, and let static content balance the moving elements. Use only transform, opacity, and clip-path where possible. No bouncing, endless loops, parallax, scroll-jacking, cursor effects, or full-page transitions.

Accessibility/performance requirements:

- Respect `prefers-reduced-motion`. With reduced motion enabled, all content remains immediately visible and animation is removed or near-instant.
- Never make essential content permanently invisible unless JavaScript is enabled.
- Ensure hero image loading does not delay Largest Contentful Paint. Prioritise the hero image appropriately and avoid lazy-loading it when above the fold.
- Ensure scroll reveals trigger once and do not repeatedly animate as the user scrolls up and down.
- Keep keyboard focus states visible and do not make motion the only way information is communicated.

### Technical, SEO, and accessibility requirements

- Use Next.js App Router and TypeScript, matching the installed project setup.
- Use Server Components by default. Use Client Components only for real interactions (mobile menu, accordions when necessary, reveal observer, form validation).
- Use semantic landmarks and correctly ordered headings. One clear H1 per page.
- Unique title and description metadata on each published route. Use canonical URLs only when a real production domain is configured. Never create a fake canonical.
- Build sitemap and robots metadata from the published-route configuration. Do not include unpublished pages in the sitemap or public links.
- Generate crawlable internal links and useful anchor navigation.
- Use appropriate image alt text. Decorative images should have empty alt text.
- Check keyboard access, visible focus, form labels/errors, colour contrast, touch target sizes, reduced motion, and mobile overflow.
- Only add structured data that is valid, factual, and consistent with visible content. Do not add invented local business addresses, fake reviews, aggregate ratings, or unsupported credentials.
- A valid Google Business Profile is not part of the website code and must depend on the real operating model; do not imply eligibility is confirmed.
- Do not add meta keywords or claim that schema, a Lighthouse score, or keyword density guarantees ranking.
- Include analytics hooks/events only where configuration is available; never count a button render as a conversion.

### Suggested implementation structure

Adapt paths to the existing repository rather than forcing a new structure:

- `src/lib/site-content.ts` — all business copy, configuration, service publication flags, verified facts, social links, contact destinations, transformation demo flag.
- `src/lib/site-assets.ts` — all stock/AI image paths, alt text, aspect ratio, focal point, whether the asset is temporary, and credit if needed.
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/components/sections/` — hero, coach, formats, method, programmes, proof, pricing, FAQ, contact.
- `src/components/ui/` — buttons, containers, image frame/fallback, chips, form fields, accordions, reusable cards, reveal component.
- `src/app/` — homepage, service pages, guides, privacy, disclaimer, sitemap/robots/metadata as needed.

Keep content/configuration separated from presentation. Avoid giant components, duplicated hard-coded copy, and adding packages that are not needed. Ensure all image paths are replaceable centrally later.

### Acceptance criteria

Before completing the task, verify the implementation against these requirements:

1. The homepage looks complete and intentionally designed, not like raw content in a default template.
2. The palette is consistently applied, with warm light backgrounds, near-black text, amber CTA hierarchy, and one restrained dark contact/footer band.
3. No section-number labels, no repetitive rules-only layouts, no icon-in-rounded-square tiles, no excessive gradients, no generic glowing elements, and no repetitive three-card grids.
4. There is meaningful visual variation among hero, coach profile, format panels, method, programme section, proof, pricing, FAQ, contact, and footer.
5. Stock/AI temporary images actually render, have intentional crops, and can all be replaced centrally without editing each component.
6. Temporary transformation media is clearly labelled and does not invent a real client/result. It can be hidden with one config flag.
7. All requested core routes work. Unpublished service pages are gated properly, absent from navigation and sitemap, and not indexed in production.
8. Navigation, internal links, buttons, mobile menu, accordions, and forms behave honestly. No dead links, false form success, or fake WhatsApp destination.
9. The layout works at mobile, tablet, laptop, and wide desktop widths without horizontal overflow.
10. Motion is visible but controlled, runs once, and respects reduced-motion preferences.
11. Each published page has correct metadata, a logical heading hierarchy, crawlable content, and no fake canonical URL.
12. No fabricated prices, reviews, credentials, client counts, locations, languages, or service claims appear as verified facts.
13. The site is maintainable and uses reusable components and central configuration.
14. Run available lint/type checks/build where the environment permits. Fix issues you can verify. If a command cannot be run, state that clearly.
15. At the end, provide a concise implementation report: routes created, major components, image assets/config path, remaining facts to confirm, any required environment variables, form integration status, and anything preventing safe publication.

Implement the website now. Do not reply with another plan or a textual mockup. Make the actual changes in the existing project.

---

## End of master prompt

## Persistent v0 Project Instructions (add separately in v0)

```text
PROJECT SOURCE OF TRUTH
Read public/docs/shrikant-personal-trainer-canonical-brief-v1-1.md for scope, business context, SEO, routes and verified/unverified facts. Never invent qualifications, experience, prices, service areas, contact details, testimonials, statistics or results. Keep all trainer facts in one central config, and never hard-code the display name in multiple components.

DESIGN DIRECTION
Warm, premium, light-first fitness brand. Warm off-white/white background, near-black text, amber CTA, restrained burnt-orange graphics, one dark contact/footer band. Use Archivo + Figtree if compatible with the repo. Use a 12-column desktop grid, deliberate responsive alignment, 8px spacing base, and three main radii (8/16/28px). Use design tokens, not scattered hex values.

NO GENERIC AI DESIGN
No section numbers (01/02/03), repeated equal three-card grids, icon-in-rounded-square tiles, endless divider rows, centered-everything layouts, glowing effects, glassmorphism, floating decorative cards, fake stats, gradient text, emoji UI, or arbitrary animation. Cards should group meaningful information. Give sections purposeful, varied compositions. Do not make every section a card.

TEMPORARY IMAGERY
Use professional stock or AI-generated temporary images now. Centralise all image paths and metadata in the site asset config so real photos/videos can replace them later. Do not invent remote URLs. Do not identify stock/AI people as Shrikant or real clients. Before/after imagery is demo-only, clearly labelled and controlled by one config flag; never invent claims/results.

MOTION
Use CSS and one lightweight Reveal component if needed. Visible, tasteful hero and scroll animations are expected, but motion must be purposeful, run once, preserve performance and respect prefers-reduced-motion. No parallax, scroll-jacking, loops or page transitions. Essential content must remain visible without JavaScript.

SEO AND ACCESSIBILITY
Next.js App Router, semantic HTML, one H1 per page, unique metadata, canonical only for a configured real domain, published routes only in the sitemap, valid facts-only structured data, meaningful alt text, keyboard access, visible focus, form labels/errors, AA contrast, and mobile layout checks. Unpublished service routes must stay out of navigation and sitemap and be gated in production.

IMPLEMENTATION
Inspect the current repository and reuse working dependencies. Server Components by default; client components only for real interactivity. Keep content separate from layout, centralise image assets, avoid unnecessary dependencies, check links/forms, run available build/type/lint checks, and report any remaining launch blockers. Do not leave dead buttons or pretend a form succeeded without a real endpoint.
```

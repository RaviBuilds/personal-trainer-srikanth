import type { GuideSection } from "./guides-content";
import { buildWhatsAppUrl, siteContent } from "./site-content";

/**
 * Privacy notice and disclaimer.
 *
 * Both pages share one layout (components/legal-page.tsx) and the same block types as the guides, so the copy lives
 * here and the design lives in guides.css. Business facts (name, credential, phone) are read from siteContent.
 *
 * Privacy statements describe what this codebase actually does: there is no analytics, no cookies, no local storage,
 * no account system and no form that posts to a server. The contact form only builds a wa.me link in the visitor's
 * browser. If any of that changes (analytics, a booking tool, an email form), update this notice in the same change.
 *
 * Inline links inside any text field are written [anchor text](/path/). https, tel: and mailto: links render as plain anchors.
 */

const { name, hero, contact } = siteContent;
const brand = `${name} Personal Training`;
const updated = "25 October 2026";
const phoneLink = `[${contact.phoneDisplay}](tel:${contact.phoneTel})`;
const askOnWhatsApp = (topic: string) => buildWhatsAppUrl(`Hi ${name}, I have a question about ${topic} on your website.`);

export type LegalPageContent = {
  path: string;
  breadcrumbLabel: string;
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  lede: string;
  updatedLabel: string;
  summaryTitle: string;
  summary: string[];
  sections: GuideSection[];
  cta: { headline: string; body: string; whatsappLabel: string; whatsappMessage: string; relatedTitle: string; related: { label: string; href: string }[] };
};

/* ------------------------------------------------------------------------------------------------ */
/* Privacy                                                                                           */
/* ------------------------------------------------------------------------------------------------ */

export const privacyPage: LegalPageContent = {
  path: "/privacy/",
  breadcrumbLabel: "Privacy",
  seo: {
    title: "Privacy Notice",
    description: `How ${brand} handles your information: what this website collects (very little), what happens when you message ${name} on WhatsApp, and your choices.`,
  },
  eyebrow: "Privacy notice",
  title: "How your information is handled",
  lede: `This website is built to collect as little as possible. There are no accounts, no cookies and no tracking tools, and the contact form hands your message to WhatsApp instead of storing it. This page explains what that means in practice, and what happens to your details once you get in touch with ${name}.`,
  updatedLabel: `Last updated ${updated}`,
  summaryTitle: "The short version",
  summary: [
    "This website has no accounts, cookies, analytics or advertising trackers.",
    "The contact form builds a WhatsApp message on your own device. Nothing is sent until you press send in WhatsApp.",
    `${name} uses what you share only to reply to you and to plan your training.`,
    "Please keep detailed medical information out of your first message.",
    "You can ask to see, correct or delete what he holds about you at any time.",
  ],
  sections: [
    {
      id: "who-this-covers",
      heading: "Who this notice covers",
      blocks: [
        { type: "p", text: `This website presents the personal training services of ${name} (${brand}) in Hyderabad, Telangana. ${name} decides what information he collects from people who get in touch and why, so he is the person responsible for it.` },
        { type: "p", text: `This notice covers visiting the website, using its contact form, and messaging or calling ${name} as a result. It does not cover other websites that this one links to. Those are described under [other services and links](#other-services).` },
      ],
    },
    {
      id: "what-the-website-collects",
      heading: "What the website itself collects",
      blocks: [
        { type: "p", text: "Very little. At the time of writing, this is the full list:" },
        {
          type: "terms",
          label: "What this website collects",
          items: [
            { name: "Accounts and sign-ups", text: "None. You do not need to register, log in or create a profile to read the site or to get in touch." },
            { name: "Cookies and local storage", text: "The site does not set cookies or save anything in your browser's storage, so there is no cookie banner to dismiss." },
            { name: "Analytics and advertising", text: "None. The site does not use analytics, advertising pixels, session recording or similar tracking tools." },
            { name: "Server logs", text: "Like any website, this one is delivered by a hosting provider. Hosting providers commonly keep short-term technical logs, such as your IP address, browser type, the page requested and the time, to keep the service secure and working. They are not used here to identify or profile visitors." },
            { name: "Fonts, images and videos", text: "These are served from the site itself rather than loaded from third-party tracking networks." },
          ],
        },
      ],
    },
    {
      id: "when-you-get-in-touch",
      heading: "When you get in touch",
      blocks: [
        { type: "p", text: "The contact form on the homepage is a message builder, not a data-collection form. Here is exactly what happens:" },
        {
          type: "steps",
          label: "What happens when you use the contact form",
          items: [
            { name: "You write a message", text: "You enter your name and a short message, optionally adding topic suggestions. This stays in your browser while you type." },
            { name: "WhatsApp opens", text: `When you press the button, your browser opens a WhatsApp link addressed to ${name}, with your name and message already filled in. The website does not send this text to a server and does not store it.` },
            { name: "You decide whether to send", text: "Nothing reaches anyone until you press send inside WhatsApp. You can edit the message first, or close WhatsApp without sending." },
            { name: "He replies", text: `If you send it, ${name} receives your message, your WhatsApp name and your phone number in his own WhatsApp account, and replies from there. Calling ${phoneLink} works the same way, through your phone.` },
          ],
        },
        { type: "callout", text: "If you never press send in WhatsApp, no one receives your details." },
      ],
    },
    {
      id: "what-is-done-with-it",
      heading: "What is done with your details",
      blocks: [
        { type: "p", text: `${name} uses what you share for the purposes below, and for nothing else. He does not sell your details, and does not use them to send promotions you have not asked for.` },
        {
          type: "table",
          caption: "The information you may share, why it is needed and where it is kept",
          columns: ["Information", "Why it is used", "Where it lives"],
          rows: [
            ["Your name, phone number and WhatsApp profile", "To reply to you and to arrange sessions", `${name}'s phone and WhatsApp account`],
            ["Your goal, schedule, location and preferred format", "To suggest a suitable plan and format", "The WhatsApp or call conversation, and any notes he keeps"],
            ["Limits, injuries or doctor's guidance you choose to share", "To plan exercise safely around them", "The conversation and his coaching notes for you"],
            ["Progress details, such as measurements or photos, if you choose to share them", "To review how your plan is working", "The conversation and his coaching notes for you"],
          ],
        },
        { type: "p", text: "Client progress stories shown on this website appear only with the client's written consent, and a client can ask for theirs to be removed." },
      ],
    },
    {
      id: "health-information",
      heading: "Health information",
      blocks: [
        { type: "p", text: "Training is safer when your coach knows about any limits, so he will ask about them. But a first enquiry is not the place for a full medical history." },
        {
          type: "checks",
          label: "How to share health information",
          items: [
            "In your first message, keep to your goal, your schedule and your preferred format.",
            "Share limits, injuries or doctor's guidance later, in conversation, and only what is needed to plan training around them.",
            "Do not send medical reports, scans or prescriptions through the website's form.",
            "In an emergency, contact emergency services or a doctor, not this website or WhatsApp.",
          ],
        },
      ],
    },
    {
      id: "other-services",
      heading: "Other services and links",
      blocks: [
        { type: "p", text: "Some parts of getting in touch run on other companies' services. Once you leave this website, their own privacy policies apply to what they handle." },
        {
          type: "terms",
          label: "Other services involved",
          items: [
            { name: "WhatsApp", text: `Messages sent to ${name} travel through WhatsApp, which is run by Meta. WhatsApp states that personal messages are end-to-end encrypted by default. Read the [WhatsApp privacy policy](https://www.whatsapp.com/legal/privacy-policy).` },
            { name: "Instagram", text: `This site links to ${name}'s [Instagram profile](${siteContent.instagram.url}). It does not embed Instagram content. If you follow the link, Instagram's own policy applies.` },
            { name: "Phone calls", text: "Calls are handled by your phone network provider under its own terms." },
            { name: "Hosting provider", text: "The company that delivers this website to your browser, as described under server logs above." },
            { name: "Other websites", text: "Some pages link to outside sources, such as the World Health Organization. This notice does not cover them." },
          ],
        },
      ],
    },
    {
      id: "how-long-and-how-safe",
      heading: "How long it is kept, and how it is protected",
      blocks: [
        { type: "p", text: `${name} keeps enquiry conversations only for as long as they are useful for replying to you or, if you become a client, for coaching you. He does not set a fixed retention period for them, so if you want a conversation or the information in it deleted, ask and he will delete what he holds, apart from anything he must keep by law.` },
        { type: "p", text: "Messages also sit on your own phone and in WhatsApp's systems. Those are outside his control, so delete them there as you would any other chat." },
        { type: "p", text: "Your details are held in a personal WhatsApp account and a phone, and he takes reasonable care of both. No method of storing or sending information is completely secure, which is another reason to avoid sending sensitive documents." },
      ],
    },
    {
      id: "your-choices",
      heading: "Your choices",
      blocks: [
        { type: "p", text: "You are in control of what you share, and you can ask for any of the following at any time:" },
        {
          type: "list",
          items: [
            "To know what information he holds about you, and why.",
            "To have inaccurate information corrected.",
            "To have your information, or a whole conversation, deleted.",
            "To stop receiving messages. Reply \"stop\" and he will not message you again unless you contact him first.",
            "To withdraw your consent to your photo or progress details being used, if you ever agreed to that.",
          ],
        },
        { type: "p", text: `To make a request, message or call ${name} using the details below. Indian law, including the Digital Personal Data Protection Act, 2023, may give you further rights, and nothing in this notice limits them.` },
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        { type: "p", text: `This website is written for adults. If you are under 18, please ask a parent or guardian to get in touch with ${name} on your behalf, and to agree to any training, before you share your details.` },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this notice",
      blocks: [
        { type: "p", text: `If the website starts to collect more, for example by adding analytics or an online booking tool, this notice will be updated before that begins. The date at the top shows when it last changed (${updated}).` },
      ],
    },
    {
      id: "contact",
      heading: "Questions or requests",
      blocks: [
        { type: "p", text: `Ask ${name} directly. He is the person who holds your details, so he can answer any question about them.` },
        {
          type: "terms",
          label: "How to reach him about privacy",
          items: [
            { name: "WhatsApp", text: `[Message ${name} on WhatsApp](${askOnWhatsApp("privacy")})` },
            { name: "Phone", text: phoneLink },
            { name: "Location", text: siteContent.footer.locality },
          ],
        },
      ],
    },
  ],
  cta: {
    headline: "Still have a question about your information?",
    body: `Message ${name} and ask. He will tell you plainly what he holds and what he does with it.`,
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: `Hi ${name}, I read your privacy notice and have a question about my information.`,
    relatedTitle: "Also worth reading",
    related: [
      { label: "Read the training disclaimer", href: "/disclaimer/" },
      { label: "What a personal trainer can and cannot help with", href: "/guides/what-a-personal-trainer-can-help-with/" },
      { label: "See the plans and pricing", href: "/#pricing" },
    ],
  },
};

/* ------------------------------------------------------------------------------------------------ */
/* Disclaimer                                                                                        */
/* ------------------------------------------------------------------------------------------------ */

export const disclaimerPage: LegalPageContent = {
  path: "/disclaimer/",
  breadcrumbLabel: "Disclaimer",
  seo: {
    title: "Training Disclaimer",
    description: `What ${brand} and this website do and do not cover: exercise coaching and general nutrition guidance, not medical advice, with no guaranteed results.`,
  },
  eyebrow: "Training disclaimer",
  title: "What this website and the coaching cover",
  lede: `Personal training can help a lot, and it also has clear limits. This page says plainly what ${name}'s coaching and this website are for, what they are not, and what to do before you start if you have a health concern.`,
  updatedLabel: `Last updated ${updated}`,
  summaryTitle: "The short version",
  summary: [
    "Everything on this website is general information, not medical advice.",
    `${name} is a ${hero.credential}. He coaches exercise and gives general nutrition guidance. He does not diagnose or treat conditions.`,
    "If you have a medical condition, an injury, are pregnant or postpartum, take regular medication or have a history of difficulty with eating, speak to a doctor first.",
    "No result or timeline is guaranteed. Outcomes depend on you.",
    "Stop and get help if something feels wrong during exercise.",
  ],
  sections: [
    {
      id: "general-information",
      heading: "General information only",
      blocks: [
        { type: "p", text: "The pages, guides and answers on this website are written to help you understand personal training and ask better questions. They are general information for a wide audience. They are not advice about your own health, and they do not replace a conversation with a doctor or another qualified healthcare professional." },
        { type: "p", text: "Do not use the website's contact form to share urgent, sensitive or clinical information. It is not monitored for emergencies." },
      ],
    },
    {
      id: "scope-of-coaching",
      heading: "What the coaching is, and what it is not",
      blocks: [
        { type: "p", text: `${name} holds the ${hero.credential} credential. His work is exercise coaching, with general nutrition guidance alongside it. He does not claim to be a doctor, physiotherapist or registered dietitian.` },
        {
          type: "split",
          left: {
            title: "What the coaching covers",
            items: [
              "Goal-setting and planning around your week",
              "Teaching and correcting exercise technique",
              "Training in a gym, at home or online",
              "General guidance on everyday eating, hydration, sleep and recovery",
              "Reviewing progress and adjusting the plan",
            ],
          },
          right: {
            title: "What it does not cover",
            items: [
              "Diagnosing a condition or an injury",
              "Treating pain, physiotherapy or injury rehabilitation",
              "Medical nutrition therapy, or diets for health conditions",
              "Prescribing or advising on medication",
              "Replacing advice from your doctor",
            ],
          },
        },
        { type: "p", text: "For a longer explanation, read [what a personal trainer can and cannot help with](/guides/what-a-personal-trainer-can-help-with/)." },
      ],
    },
    {
      id: "speak-to-a-professional-first",
      heading: "Speak to a professional before you start",
      blocks: [
        { type: "p", text: "Check with a doctor or another suitable healthcare professional before beginning any exercise or nutrition programme if any of these apply to you:" },
        {
          type: "list",
          items: [
            "You have a medical condition, or you are unsure whether you are ready to exercise.",
            "You have an injury, or pain that has not been assessed.",
            "You are pregnant or postpartum.",
            "You take regular medication.",
            "You have a history of difficulty with eating.",
          ],
        },
        { type: "callout", text: `Once you have that advice, share it with ${name} before training begins. Exercise can then be planned around it. He plans around guidance you share, but he does not manage the condition itself.` },
      ],
    },
    {
      id: "exercise-and-safety",
      heading: "Exercise and safety",
      blocks: [
        { type: "p", text: "Exercise asks your body to work hard, and that carries some risk of injury or discomfort, however well it is coached. You can reduce the risk by training within your limits, learning technique before adding load, and telling your coach how you feel." },
        {
          type: "checks",
          label: "Stop exercising and say so if you notice",
          items: [
            "Sharp, sudden or unusual pain, as opposed to normal muscle effort",
            "Dizziness, light-headedness or feeling faint",
            "Unusual breathlessness, or tightness or discomfort in the chest",
            "Nausea, or feeling generally unwell",
          ],
        },
        { type: "callout", title: "In an emergency", text: "Stop immediately and seek urgent medical help. In India, call 112. Do not wait for a reply on WhatsApp." },
      ],
    },
    {
      id: "nutrition-guidance",
      heading: "Nutrition guidance",
      blocks: [
        { type: "p", text: `The nutrition guidance on this site and in ${name}'s coaching is general education about everyday eating: food choices, portions, hydration, and sleep and recovery. It is built around the food you already eat and the goal you have.` },
        { type: "p", text: "It is not medical nutrition therapy, and it is not a diet plan for a health condition. Questions about diabetes, thyroid conditions, PCOS, allergies, pregnancy, eating disorders or any other medical issue belong with your doctor or a registered dietitian." },
      ],
    },
    {
      id: "results",
      heading: "Results are not guaranteed",
      blocks: [
        { type: "p", text: "No coach can promise a particular result by a particular date, and this website does not. What you achieve depends on many things that sit partly or wholly outside any trainer's control." },
        {
          type: "list",
          columns: true,
          items: [
            "Your starting point and health",
            "How consistently you train",
            "What and how you eat",
            "Sleep, stress and recovery",
            "Your schedule and how it changes",
            "Age, genetics and other personal factors",
          ],
        },
        { type: "p", text: "Client progress stories on this website show individual people, shared with their written consent. They are examples, not predictions, and your own result may be different." },
      ],
    },
    {
      id: "fees-and-arrangements",
      heading: "Fees and arrangements",
      blocks: [
        { type: "p", text: `The plans and fees shown on this website are ${name}'s listed packages, in Indian rupees, and are for coaching. They are not a market average for Hyderabad and not an offer that binds either side until the arrangement has been agreed with him.` },
        {
          type: "checks",
          label: "Agree these with him before you start",
          items: [
            "Which plan, format and number of sessions you are taking.",
            "Where sessions take place, and any gym membership or venue charges, which are separate from the coaching fee.",
            "Payment dates, rescheduling, cancellation and renewal terms.",
            "Whether online coaching is live, plan-based or both.",
          ],
        },
        { type: "p", text: "Ask for the answers in a message so you can refer back to them. The [pricing section](/#pricing) lists the current plans, and the [fees guide](/guides/personal-trainer-fees-hyderabad/) shows how to compare offers." },
      ],
    },
    {
      id: "your-responsibilities",
      heading: "Your part in it",
      blocks: [
        {
          type: "checks",
          label: "What you are responsible for",
          items: [
            "Giving accurate information about your health, limits and goals.",
            "Deciding whether you are well enough to train on a given day.",
            "For home and online sessions, using a safe, clear space and suitable footwear.",
            "Not pushing through pain, and speaking up when something feels wrong.",
            "If you are under 18, having a parent or guardian agree to your training.",
          ],
        },
      ],
    },
    {
      id: "this-website",
      heading: "About this website",
      blocks: [
        { type: "p", text: "The content is reviewed with care but may be out of date or incomplete, and plans, prices and availability can change. Where a page and a direct reply from him differ, go by what he confirms in writing." },
        { type: "p", text: "Links to other websites, such as the World Health Organization, are there for convenience. They are not endorsements, and he is not responsible for what other sites say or do. How your details are handled is covered in the [privacy notice](/privacy/)." },
      ],
    },
    {
      id: "questions",
      heading: "Questions",
      blocks: [
        { type: "p", text: `If anything here is unclear, ask before you book. ${name} would rather answer a question now than have you start unsure.` },
        {
          type: "terms",
          label: "How to reach him",
          items: [
            { name: "WhatsApp", text: `[Message ${name} on WhatsApp](${askOnWhatsApp("your disclaimer")})` },
            { name: "Phone", text: phoneLink },
          ],
        },
      ],
    },
  ],
  cta: {
    headline: "Ready to talk it through?",
    body: `Tell ${name} your goal and anything he should know about your health. He will explain how coaching could work and what it would and would not cover.`,
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: `Hi ${name}, I read your disclaimer and I'd like to ask about training.`,
    relatedTitle: "Also worth reading",
    related: [
      { label: "Read the privacy notice", href: "/privacy/" },
      { label: "What to expect in your first month", href: "/guides/first-month-personal-training/" },
      { label: "See the plans and pricing", href: "/#pricing" },
    ],
  },
};

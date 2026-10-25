import { siteContent } from "./site-content";

/**
 * Guide articles and the guides index.
 *
 * Every guide lives in this one file. Business facts (the coach's name, credential, languages, plan names, what the
 * plans cover and the approach stages) are read from siteContent, so a guide cannot drift from the rest of the site.
 * No fee is written here: the pricing section owns every figure and the guides link to it.
 *
 * Inline links inside any text field are written [anchor text](/path/). Internal paths render as next/link,
 * https links open in a new tab.
 */

const { name, services, pricing, hero, languages, programmes, approach } = siteContent;
const inPerson = services.inPerson.href;
const online = services.online.href;

const joinList = (items: readonly string[]) => (items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items.join(""));
const stripFinalStop = (text: string) => (text.endsWith(".") ? text.slice(0, -1) : text);
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

export type FormatId = "gym" | "home" | "online";

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; columns?: boolean }
  | { type: "checks"; items: string[]; label: string; columns?: boolean }
  | { type: "terms"; items: { name: string; text: string }[]; label: string }
  | { type: "steps"; items: { name: string; text: string }[]; label: string }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "callout"; title?: string; text: string }
  | { type: "groups"; groups: { title: string; items: string[] }[]; label: string }
  | { type: "split"; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { type: "formats"; label: string; items: { id: FormatId; title: string; suits: string; tradeoffs: string; check: string; link?: { label: string; href: string } }[] };

export type GuideSection = { id: string; heading: string; blocks: GuideBlock[] };

export type Guide = {
  slug: string;
  /** The H1. */
  title: string;
  /** Title tag. pageMetadata appends the site name, so this carries no brand. */
  seoTitle: string;
  description: string;
  lede: string;
  takeaways: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  /** Slugs of the guides offered under "Keep reading". */
  related: string[];
  cta: { headline: string; body: string; whatsappMessage: string };
  /** What the guides index shows for this guide. */
  index: { question: string; description: string };
};

const linkedPlans = pricing.groups.flatMap((group) => group.plans.map((plan) => [group.title, plan.name, stripFinalStop(plan.meta)]));
const reviewTiming = lowerFirst(approach.steps.find((step) => step.id === "review")?.timing ?? "");
const yearsStat = hero.stats.find((stat) => stat.icon === "calendar");
const clientsStat = hero.stats.find((stat) => stat.icon === "users");
const statText = (stat?: { value: number; suffix: string }) => (stat ? `${new Intl.NumberFormat("en-IN").format(stat.value)}${stat.suffix}` : "");

export const guides: Guide[] = [
  /* ------------------------------------------------------------------------------------------------ */
  {
    slug: "what-a-personal-trainer-can-help-with",
    title: "What a personal trainer can help with, and what they cannot",
    seoTitle: "What a Personal Trainer Can (and Can't) Help With",
    description: "What personal training covers, from goal-setting and exercise instruction to planning and review, and where its limits are on medical and nutrition questions.",
    lede: "A personal trainer is an exercise coach. The role is narrower than people sometimes expect and more useful than a gym membership on its own. Knowing where it starts and stops helps you ask for the right help, and see a different professional when you need one.",
    takeaways: [
      "A trainer helps you set a goal, learn exercises properly, follow a plan and review how it is going.",
      "Nutrition guidance from a trainer is general education about everyday habits.",
      "Personal training is not diagnosis, treatment, physiotherapy, injury rehabilitation or clinical dietetic care.",
      "No trainer can guarantee a result. Outcomes depend on you, your starting point and your week.",
    ],
    sections: [
      {
        id: "what-a-trainer-does",
        heading: "What a personal trainer does",
        blocks: [
          { type: "p", text: "The job comes down to five things. Different coaches weight them differently, but a good arrangement covers all of them, and each is easier to judge once you can name it." },
          {
            type: "terms",
            label: "What personal training covers",
            items: [
              { name: "Goal-setting", text: "Turning “I want to feel fitter” into something specific enough to plan around, and agreeing what is realistic for your starting point and your week." },
              { name: "Exercise instruction", text: "Showing you how to set up, move and breathe through each exercise, and correcting it as you go. This is where technique comes before load." },
              { name: "Planning", text: "Choosing which exercises, how often and in what order, so the sessions add up to something. A plan fits the equipment, space and time you actually have." },
              { name: "Accountability", text: "A fixed appointment and someone who notices when you turn up, or do not. For many people this is the part that makes training happen." },
              { name: "Review", text: "Looking back at what is working, what is not and what should change, so the plan keeps pace with you instead of staying fixed." },
            ],
          },
          { type: "p", text: `In ${name}'s coaching these map to four stages: Understand, Plan, Coach and Review. You can see each one described on the [in-person training page](${inPerson}#how-it-works) and the [online training page](${online}#how-it-works).` },
        ],
      },
      {
        id: "goals-people-train-for",
        heading: "What people commonly train for",
        blocks: [
          { type: "p", text: "Goals are where personal training becomes specific. Most people come with one or two of these, and the plan is built around them." },
          { type: "terms", label: "Training goals", items: programmes.map((goal) => ({ name: goal.title, text: goal.summary })) },
          { type: "p", text: `Each goal can be coached at the gym, at home or online. [Compare gym, home and online training](/guides/gym-home-online-training/) if you are still deciding where it should happen.` },
        ],
      },
      {
        id: "nutrition-scope",
        heading: "Nutrition and recovery: what is in scope",
        blocks: [
          { type: "p", text: `Food, water and sleep decide a lot of how training feels. ${name} gives general nutrition guidance as a fitness trainer: everyday eating and portions, hydration, and sleep and recovery. It is practical education built around the food you already eat and the goal you have.` },
          { type: "p", text: "It is not medical nutrition therapy, and it is not a diet plan for a health condition. If you have a medical condition, are pregnant or postpartum, take regular medication, or have a history of difficulty with eating, speak to your doctor or a registered dietitian first." },
          { type: "p", text: `You can see how the guidance works in the [nutrition section of the homepage](/#nutrition), and the full wording is in the [disclaimer](/disclaimer/).` },
        ],
      },
      {
        id: "what-it-cannot-do",
        heading: "What personal training cannot do",
        blocks: [
          {
            type: "split",
            left: {
              title: "Outside the role of a personal trainer",
              items: [
                "Diagnosing a condition or an injury",
                "Treating pain, physiotherapy or injury rehabilitation",
                "Clinical dietetic care, or diets for medical conditions",
                "Replacing advice from your doctor",
                "Guaranteeing a result or a timeline",
              ],
            },
            right: {
              title: "What you can do instead",
              items: [
                "Tell your trainer about any limit before training begins",
                "Share guidance you have been given by a doctor or physiotherapist",
                "Ask for exercises to be planned around that guidance",
                "Stop and say so if something hurts or you feel unwell",
              ],
            },
          },
          { type: "p", text: `${name} can plan exercise around guidance you share, but he does not manage the condition itself.` },
        ],
      },
      {
        id: "speak-to-a-professional-first",
        heading: "When to speak to a healthcare professional first",
        blocks: [
          { type: "p", text: "Check with a doctor or another suitable professional before you start if any of these apply:" },
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
          { type: "callout", text: "Once you have that advice, share it. A good trainer wants to know your limits before the first session, not after." },
        ],
      },
      {
        id: "is-it-right-for-you",
        heading: "Is personal training right for you?",
        blocks: [
          { type: "p", text: `It tends to help when you want structure, correction and someone to answer to, and it matters less if you already train confidently on your own. If it sounds right, the next questions are practical: [how to choose a trainer](/guides/how-to-choose-a-personal-trainer-hyderabad/), where to train, and what a start looks like. ${name} coaches [in person at a gym or at home](${inPerson}) and [online](${online}).` },
        ],
      },
    ],
    faq: [
      { q: "Can a personal trainer help me lose weight?", a: "A trainer can support a fat-loss goal with a training routine you can keep up, and with general guidance on everyday habits. Results depend on more than training, including food, sleep, stress and consistency, so no outcome or timeline can be promised." },
      { q: "Can a personal trainer give me a diet plan?", a: `${name} offers general nutrition guidance as a fitness trainer, covering everyday eating, hydration, sleep and recovery. It is not a medical or clinical diet plan, and it is not designed for health conditions. For those, see a doctor or a registered dietitian.` },
      { q: "Can a trainer help with an old injury?", a: "Personal training is exercise coaching, not injury care. Tell your trainer about the injury and share any advice from your doctor or physiotherapist, and exercise can be planned around it. A trainer does not diagnose, treat or rehabilitate injuries." },
      { q: "I already go to the gym. Do I still need a trainer?", a: "Not necessarily. A trainer is most useful if you want a plan that fits you, technique feedback, or someone to keep you accountable, for example when you have trained for a while without the change you expected." },
      { q: "Is online personal training still personal training?", a: `Yes. Online coaching is one-to-one too, as live video sessions, a written plan with check-ins, or both. The main difference is how much feedback you get in the moment. The [online training page](${online}) explains the formats.` },
      { q: "Will a trainer guarantee results?", a: "No, and be wary of anyone who does. Outcomes depend on your starting point, consistency, food and recovery. A trainer can make the process clearer and more consistent, not certain." },
    ],
    related: ["how-to-choose-a-personal-trainer-hyderabad", "first-month-personal-training", "gym-home-online-training"],
    cta: {
      headline: "Ask what personal training could look like for you",
      body: `Tell ${name} your goal and what you are unsure about. He will explain how coaching could work and what it would and would not cover.`,
      whatsappMessage: `Hi ${name}, I read your guide on what a personal trainer can help with. I'd like to ask about training.`,
    },
    index: {
      question: "What does a personal trainer actually do?",
      description: "The five parts of the job, the goals people train for, and where personal training stops, including nutrition, injuries and medical questions.",
    },
  },

  /* ------------------------------------------------------------------------------------------------ */
  {
    slug: "how-to-choose-a-personal-trainer-hyderabad",
    title: "How to choose the best fitness trainer in Hyderabad",
    seoTitle: "Choosing the Best Fitness Trainer in Hyderabad",
    description: "What to check, what to ask and which warning signs to watch for when choosing a fitness trainer in Hyderabad, with a practical way to compare your options.",
    lede: `Search for the best fitness trainer in Hyderabad and you will find plenty of claims and very few ways to check them. “Best” usually means best for a particular person. This guide is about fit: what to look at, what to ask and what should make you pause. It applies to any trainer you are considering, including ${name}.`,
    takeaways: [
      "The best trainer is the one who fits your goal, your week, your setting and the way you like to be coached.",
      "Credentials show training. They do not show how well someone teaches, so ask how they work too.",
      "Use the first conversation as an interview. Clear answers on scope, cost and terms are a good sign.",
      "Guaranteed results, vague costs and pressure to pay in advance are reasons to slow down.",
    ],
    sections: [
      {
        id: "what-best-means",
        heading: "What “best” should mean for you",
        blocks: [
          { type: "p", text: "A trainer who suits a competitive lifter may be wrong for someone returning to exercise after years away. Before you compare anyone, decide what you need from the person, because that is what “best” has to answer to." },
          {
            type: "terms",
            label: "What best depends on",
            items: [
              { name: "Fit with your goal", text: "Experience with people who start where you do and want what you want, whether that is strength, fat loss, conditioning or a first step into training." },
              { name: "Fit with your week", text: "A schedule, setting and format you can keep up. A trainer you cannot realistically reach is not the best choice, however good." },
              { name: "How they teach", text: "Whether they explain things, welcome questions and adjust, or simply tell you what to do. People differ on what they like." },
              { name: "Clarity and honesty", text: "Plain answers about what is included, what it costs and what a trainer will not do." },
            ],
          },
        ],
      },
      {
        id: "what-to-check",
        heading: "What to check before you decide",
        blocks: [
          { type: "p", text: "These are the points worth putting side by side for every trainer on your list." },
          {
            type: "table",
            caption: "What to check about a personal trainer and what a good answer sounds like",
            columns: ["Check", "What to ask", "A good answer"],
            rows: [
              ["Certification", "Which certification do you hold, who issued it, and is it current?", "A named certification and a willingness to show it. Check with the issuer if you want to be sure."],
              ["Experience", "Who do you usually coach, and how do you start with someone like me?", "Specific examples of the kind of person and goal, not a list of general claims."],
              ["How they start", "What happens before the first session?", "A conversation about your goal, history, schedule and limits before any exercise."],
              ["Planning and review", "How is my plan built, and when is it reviewed?", "A plan shaped around your routine and equipment, with agreed points to adjust it."],
              ["Setting and logistics", "Where do sessions happen, and what is needed from me?", "A clear venue or space, access arrangements and what to bring."],
              ["Cost and terms", "What exactly does the fee cover, and what is extra?", "Every cost and term explained, including rescheduling and renewal, and willingness to put it in writing."],
              ["Scope", "What will you not help with?", "A straight answer that includes medical conditions, injuries and diets for health conditions."],
            ],
          },
          { type: "p", text: "A certificate shows that someone completed a course and passed an exam. It does not tell you how well they teach or listen, which is why the other rows matter as much as the first." },
        ],
      },
      {
        id: "first-conversation",
        heading: "Use the first conversation as an interview",
        blocks: [
          { type: "p", text: "A short call or message before you commit costs nothing and tells you a lot. Come with questions, and notice how they are answered as much as what the answers are." },
          {
            type: "checks",
            label: "Questions to ask a trainer",
            columns: true,
            items: [
              "What would you want to know about me before we begin?",
              "How would you plan around my schedule and the equipment I have?",
              "What does a typical session look like?",
              "How will we know whether the plan is working?",
              "How do you handle a limitation or an old injury?",
              "What happens if I miss a session or my week changes?",
              "What does the fee include, and what is extra?",
              "Can you send the answers in a message so I can refer back?",
            ],
          },
          { type: "p", text: "For the money side in detail, see [personal trainer fees in Hyderabad: what affects the cost](/guides/personal-trainer-fees-hyderabad/)." },
        ],
      },
      {
        id: "signs-to-slow-down",
        heading: "Signs to slow down",
        blocks: [
          { type: "p", text: "None of these proves a trainer is a poor choice, but each is a reason to ask more before you pay." },
          {
            type: "callout",
            title: "Pause if you hear",
            text: "A guaranteed result or timeline. A claim to treat an injury or a medical condition. Pressure to pay for a long package before you have met. Reluctance to explain what is included or what it costs. Dismissal of a limit you mention or advice your doctor has given. Before-and-after photos that cannot be tied to one person who agreed to share them.",
          },
        ],
      },
      {
        id: "nutrition-guidance",
        heading: "What to look for in a trainer who offers nutrition consultations",
        blocks: [
          { type: "p", text: "Some fitness trainers also offer nutrition consultations. If that matters to you, the questions are the same as for training, with a few more about scope. Ask exactly what the guidance covers, whether it is general education or something more, and what the person is qualified to do." },
          { type: "p", text: "Be careful with anyone who claims to treat or manage a medical condition through diet. That belongs with a doctor or a registered dietitian. A fitness trainer's nutrition guidance should be about everyday habits that support training, and it should say so plainly. See [what a personal trainer can help with](/guides/what-a-personal-trainer-can-help-with/) for the boundaries." },
        ],
      },
      {
        id: "how-srikanth-answers",
        heading: `How ${name} answers these questions`,
        blocks: [
          { type: "p", text: `Here is what this site says about ${name}, set against the checks above. Put the same table together for every trainer you are considering and compare them like for like. Whether he is right for you is something only a conversation can settle.` },
          {
            type: "table",
            caption: `What this site says about ${name}, by question`,
            columns: ["Question", "What the site says", "Read more"],
            rows: [
              ["Certification", `${hero.credential}.`, "[Meet " + name + "](/#coach)"],
              ["Experience", `${statText(yearsStat)} years in fitness${clientsStat ? `, with ${statText(clientsStat)} clients trained` : ""}.`, "[Meet " + name + "](/#coach)"],
              ["Languages", `Coaching in ${joinList(languages)}.`, "[Meet " + name + "](/#coach)"],
              ["Settings", "One-to-one at a gym, at your home or another suitable place, and online.", `[In-person training](${inPerson}), [online training](${online})`],
              ["How he starts", "Four stages: Understand, Plan, Coach and Review.", "[The approach](/#process)"],
              ["Cost and terms", "Plans and monthly fees are listed. Gym membership or venue charges, where they apply, are separate and confirmed before you start.", "[Pricing](/#pricing), [fees guide](/guides/personal-trainer-fees-hyderabad/)"],
              ["Scope", "Exercise coaching and general nutrition guidance. Not medical advice or treatment.", "[Disclaimer](/disclaimer/)"],
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "What qualifications should a personal trainer have?", a: "Look for a named certification from a recognised body, then ask whether it is current and to see it. A certification shows formal training. How someone teaches, listens and plans matters just as much, so use the first conversation to find out." },
      { q: "Is the most expensive trainer the best?", a: "Not by default, and the cheapest is not automatically poor value either. A fee only means something next to what it covers. Compare scope, setting, planning and terms before comparing prices." },
      { q: "How much should I trust online reviews and ratings?", a: "Read them for specifics, such as what the trainer did and how the client's goal was handled, rather than for the star count. A rating cannot show whether someone fits your goals and your week, so treat reviews as one input among several." },
      { q: "Should I speak to more than one trainer?", a: "Yes, if you can. A short conversation with two or three people shows how differently they work, and how they answer questions is often more telling than what they advertise." },
      { q: "Does the trainer's language matter?", a: `It can. Being coached in the language you think in makes instructions easier to follow. ${name} coaches in ${joinList(languages)}.` },
      { q: "Is it reasonable to ask for terms in writing?", a: "Yes. Ask for the fee, the sessions it covers, payment dates, rescheduling and cancellation terms, and what happens at renewal, in a message you can keep." },
    ],
    related: ["personal-trainer-fees-hyderabad", "what-a-personal-trainer-can-help-with", "gym-home-online-training"],
    cta: {
      headline: `Talk it through with ${name}`,
      body: `Tell ${name} your goal, your preferred setting and the days that suit you, and ask him anything from the checklist above.`,
      whatsappMessage: `Hi ${name}, I read your guide on choosing a personal trainer. I'd like to ask a few questions before I decide.`,
    },
    index: {
      question: "How do I choose the right trainer?",
      description: "What “best” should mean for you, a checklist of what to ask, warning signs, and how to compare trainers on equal terms.",
    },
  },

  /* ------------------------------------------------------------------------------------------------ */
  {
    slug: "gym-home-online-training",
    title: "Gym, home, or online training: how to choose a format",
    seoTitle: "Gym, Home or Online Training: How to Choose",
    description: "Compare gym, home and online personal training on travel, equipment, feedback, privacy and schedule, then choose a format you can keep up week after week.",
    lede: `The right format is the one you can keep doing week after week. That depends less on what sounds appealing and more on your travel time, your space, how much hands-on feedback you want and how predictable your week is. ${name} coaches one-to-one in all three, so this guide does not pick a winner.`,
    takeaways: [
      "No format is best for everyone, or always the cheapest.",
      "The deciding factors are usually travel, space, equipment, feedback and how steady your week is.",
      "Online can mean live video sessions, a written plan with check-ins, or both. Ask which one is offered.",
      "Pick the format that makes it easiest to show up next week.",
    ],
    sections: [
      {
        id: "side-by-side",
        heading: "The three formats side by side",
        blocks: [
          {
            type: "table",
            caption: "Gym, home and online personal training compared",
            columns: ["Topic", "Gym", "Home", "Online"],
            rows: [
              ["Setting", "At a gym", "Your home or another suitable location", "Wherever you have suitable space"],
              ["Travel", "You travel to the venue", "None for you, once the location is confirmed", "None to a venue"],
              ["Equipment", "Whatever the venue has", "What you have, with the plan adapted to your space", "What you can access"],
              ["Feedback", "Your coach demonstrates, observes and corrects in person", "The same, in your own space", "Depends on whether sessions are live or plan-based"],
              ["Schedule", "Tied to a place and its access", "No travel, but your locality must suit the coach's schedule", "Often more flexible around space and time"],
              ["Privacy", "A shared training environment, apart from home", "Private and familiar", "At home, or a space you choose"],
              ["Clarify first", "Venue, access arrangements and any membership or venue charges", "Location, space, access and building arrangements", "Live or plan-based, device, internet, lighting and floor space"],
            ],
          },
        ],
      },
      {
        id: "each-format",
        heading: "Each format in turn",
        blocks: [
          {
            type: "formats",
            label: "Gym, home and online training in turn",
            items: [
              {
                id: "gym",
                title: "Gym-based training",
                suits: "You prefer live demonstration and feedback while you move, want a dedicated appointment in a separate setting, are learning exercises, or want to use the equipment a gym has.",
                tradeoffs: "You travel, your schedule depends on being in a particular place, and you share the space with others. Gym membership or venue charges are separate from coaching fees and are confirmed in advance.",
                check: "Which venue, how access works, and any membership or venue charges.",
                link: { label: "How gym sessions work", href: `${inPerson}#gym-sessions` },
              },
              {
                id: "home",
                title: "Training at home",
                suits: "You want to cut travel, keep the routine close and train in a private, familiar space.",
                tradeoffs: `It works best when the floor is safe and you know what equipment you have, which will usually be less than a gym offers. Share your locality when you enquire, as ${name} confirms whether it fits his schedule.`,
                check: "Where in your home, how much clear floor, and building or access arrangements.",
                link: { label: "How home sessions work", href: `${inPerson}#home-sessions` },
              },
              {
                id: "online",
                title: "Online coaching",
                suits: "Travel or scheduling is the main thing stopping you from training regularly, or your week changes often and you need sessions that move with it.",
                tradeoffs: "You need a suitable space and some setup, and how much real-time feedback you get depends on the arrangement. Online can mean quite different things, so check which one you are being offered.",
                check: "Live or plan-based, and what device, internet, lighting and floor space are expected.",
                link: { label: "How online coaching works", href: online },
              },
            ],
          },
        ],
      },
      {
        id: "live-or-plan",
        heading: "Online: live sessions or a written plan?",
        blocks: [
          { type: "p", text: "The word online covers two quite different services. Some arrangements combine them, so do not assume. Ask which is included, and how often you will hear from your coach." },
          {
            type: "table",
            caption: "Live online sessions compared with a written plan and check-ins",
            columns: ["", "Live video sessions", "Written plan with check-ins"],
            rows: [
              ["How it works", "You train at a booked time while your coach watches and guides you over video", "You follow a plan in your own time and report back at agreed check-ins"],
              ["Feedback", "In the moment, as you move", "At the check-ins, after the fact"],
              ["Flexibility", "Fixed slots", "Train when it suits you"],
              ["What affects it", "Camera angle, lighting, floor space and your connection", "How consistently you can follow the plan on your own"],
            ],
          },
          { type: "p", text: `The [online personal training page](${online}) shows how ${name}'s online coaching is arranged, including the set-up for live sessions.` },
        ],
      },
      {
        id: "choose-by-your-week",
        heading: "Choosing by your real week",
        blocks: [
          { type: "p", text: "If one thing matters more than the rest, this table is a starting point rather than a verdict." },
          {
            type: "table",
            caption: "Which format to lean towards, by what matters most",
            columns: ["If this matters most", "You may lean towards", "Check before deciding"],
            rows: [
              ["Hands-on feedback and gym equipment", "Gym", "Travel time, venue access and charges"],
              ["No travel and a private setting", "Home", "Space, safety of the floor, building access, your locality"],
              ["A flexible, changeable week", "Online", "Live or plan-based, device and space, support between sessions"],
            ],
          },
          { type: "h3", text: "Questions to answer honestly" },
          {
            type: "list",
            columns: true,
            items: [
              "Where could I realistically train in my busiest week?",
              "How much travel can I fit in?",
              "What equipment can I actually use?",
              "How much live correction do I want, especially if I am learning new exercises?",
              "How predictable is my schedule?",
              "How private do I want my training to be?",
              "What happens if I miss a session?",
              "Which format makes it easier to show up next week?",
            ],
          },
          { type: "callout", text: "Convenience matters only if the format still gives you clear guidance." },
        ],
      },
      {
        id: "clarify-before-you-start",
        heading: "What to clarify before you start",
        blocks: [
          {
            type: "checks",
            label: "Things to clarify before starting",
            items: [
              "Where sessions take place, and how access works.",
              "Whether online coaching is live or plan-based.",
              "What equipment, space, device or connection you need.",
              "How scheduling works, and how a missed or moved session is handled.",
              "What support is included between sessions.",
              "Which costs sit outside the coaching fee.",
            ],
          },
          { type: "p", text: "No format is automatically cheaper, so see [what affects the cost](/guides/personal-trainer-fees-hyderabad/) before you compare prices. Once you have chosen, [what to expect in your first month](/guides/first-month-personal-training/) explains how a start usually unfolds." },
        ],
      },
    ],
    faq: [
      { q: "Which format is best for beginners?", a: "There is no single answer. Some beginners want live demonstration and correction, so they lean towards training in person. Others do well online when the arrangement gives clear guidance. Choose the one you will keep up." },
      { q: "Is online training as good as in-person?", a: "It depends on the arrangement and on what you need. The main difference is how much real-time feedback you get, which is why it matters whether sessions are live or plan-based." },
      { q: "Do I need a gym membership?", a: "Not for home or online training. For gym sessions, venue and access arrangements are made clear before you start, and any membership or venue charges are separate from coaching fees." },
      { q: "Can I train at home with very little equipment?", a: "Yes. The plan adapts to what you have, including nothing at all. Tell your coach what you own when you enquire, and ask before buying anything." },
      { q: "Is training at home private?", a: "It is a private, familiar setting. Check building and access arrangements as part of the plan." },
      { q: "Which format costs less?", a: "There is no rule. It depends on the number of sessions, the setting and what is included. The fees guide shows how to compare like with like." },
      { q: "Can I switch format later?", a: "Ask before you start, so you know how it works for your arrangement." },
    ],
    related: ["personal-trainer-fees-hyderabad", "first-month-personal-training", "how-to-choose-a-personal-trainer-hyderabad"],
    cta: {
      headline: "Not sure which format fits your week?",
      body: `Tell ${name} how your week usually looks and where you could train. He will suggest a format and explain what it involves.`,
      whatsappMessage: `Hi ${name}, I read your guide on gym, home and online training. I'd like help choosing a format.`,
    },
    index: {
      question: "Gym, home or online?",
      description: "A balanced comparison of travel, equipment, feedback and privacy, with a way to decide based on your actual week.",
    },
  },

  /* ------------------------------------------------------------------------------------------------ */
  {
    slug: "personal-trainer-fees-hyderabad",
    title: "Personal trainer fees in Hyderabad: what affects the cost?",
    seoTitle: "Personal Trainer Fees in Hyderabad Explained",
    description: "Why personal training fees are hard to compare, what changes the total cost, and how to compare two offers fairly before you pay for either.",
    lede: "Ask two trainers what they charge and you will often hear two numbers that cannot be compared. A fee might describe one session, a month of sessions, a written plan with check-ins, or a mix, with or without travel, venue or equipment costs. This guide shows what moves the price and how to put offers on equal terms.",
    takeaways: [
      "A fee only means something next to what it covers.",
      "This guide gives no citywide average for Hyderabad, because a single average would hide the differences that matter.",
      "Compare offers by filling in the same rows for each, then dividing the total by the sessions you will actually use.",
      "Ask for the answers in writing before you pay.",
    ],
    sections: [
      {
        id: "why-one-number-is-not-enough",
        heading: "Why one number rarely tells you enough",
        blocks: [
          { type: "p", text: "A monthly figure could cover a few sessions with a lot of planning behind them. Another could cover many sessions with a lighter plan. A third might include a venue charge, while a fourth leaves that to you. Until you know what each one covers, the lower number is not necessarily the better deal." },
          { type: "p", text: `This guide does not quote a market rate. ${name}'s own plans are in the [pricing section on the homepage](/#pricing). They are his displayed package prices, not an average for Hyderabad.` },
        ],
      },
      {
        id: "what-changes-the-cost",
        heading: "What changes the total cost",
        blocks: [
          {
            type: "terms",
            label: "Factors that change the cost of personal training",
            items: [
              { name: "Coaching format", text: "Training at a gym, at home or online each brings different costs, such as venue access, travel or the technology you need. None is automatically cheaper or dearer." },
              { name: "Sessions: how many, how long", text: "A lower monthly figure may simply mean fewer or shorter sessions. For every offer, note how many sessions are included in the period and how long each one runs." },
              { name: "Setting, venue and travel", text: `Where you train can add costs outside the coaching fee. On ${name}'s [in-person page](${inPerson}), any gym membership or venue charges are described as separate and confirmed in advance. Ask any trainer the same question, whether the answer is “included” or “extra”.` },
              { name: "Equipment", text: "At a gym you use what the venue has. At home you use what you have, and a good plan adapts to your space. Ask whether you would need to buy anything, and whether that falls outside the quoted fee." },
              { name: "Planning", text: "Some offers include a plan built around your routine and equipment, updated as your week changes. Others are session-only. Ask how much planning is included and whether the plan is revisited." },
              { name: "Check-ins and reviews", text: "Time between sessions is still coaching time. Ask what communication is included and how often progress is reviewed." },
              { name: "Nutrition guidance, where offered", text: "Some plans include it. If one does, ask exactly what it covers. On this site it is general education, not medical advice." },
              { name: "Package terms", text: "Payment timing, rescheduling, cancellation and renewal can change what an offer is worth. A flexible arrangement and a fixed one are not the same product, even at the same price." },
            ],
          },
        ],
      },
      {
        id: "in-person-and-online",
        heading: "In-person and online costs: a balanced view",
        blocks: [
          { type: "p", text: "Both are one-to-one coaching, but the costs behind them differ in kind. Neither is always cheaper or better." },
          {
            type: "table",
            caption: "Where the costs of in-person and online coaching differ",
            columns: ["", "In-person", "Online"],
            rows: [
              ["What you may pay for", "Travel (yours to a venue, or the coach's to your home) and venue or membership charges, in exchange for live demonstration and correction", "A device, a reliable connection, decent lighting and floor space. Live sessions or a plan with check-ins changes how much of the coach's time you are buying"],
              ["What to confirm", "Who covers venue access, and whether travel is included", "Whether sessions are live, plan-based or both"],
            ],
          },
          { type: "p", text: "The real comparison is the total cost for the same scope. Then ask which one your week will actually support, since an offer you use regularly is worth more than a cheaper one you skip. [Gym, home or online training: how to choose a format](/guides/gym-home-online-training/) helps with that decision." },
        ],
      },
      {
        id: "compare-two-offers",
        heading: "How to compare two offers on equal terms",
        blocks: [
          {
            type: "steps",
            label: "Steps for comparing two personal training offers",
            items: [
              { name: "Write both offers on the same rows", text: "Use the rows in the table below, one column per offer." },
              { name: "Fill every row", text: "A blank is a question to ask, not a zero." },
              { name: "Match the period", text: "Compare the same number of weeks or months." },
              { name: "Add the extras", text: "Include venue or membership charges, travel and any equipment you would have to buy." },
              { name: "Divide by sessions you will use", text: "Take the total for the period and divide it by the sessions you can realistically attend, not the maximum on paper. Only compare per-session figures when the scope is similar." },
              { name: "Compare what is left", text: "Look at planning, check-ins, reviews and flexibility." },
            ],
          },
          {
            type: "table",
            caption: "Rows to fill in for each offer you compare",
            columns: ["Row", "What to write down"],
            rows: [
              ["Format", "Gym, home or online, and for online whether it is live or plan-based"],
              ["Sessions in the period", "How many, and how long each one runs"],
              ["Planning and plan updates", "Whether a plan is built for you and how often it changes"],
              ["Check-ins and communication", "What is included and how it works"],
              ["Reviews", "How often progress is looked at"],
              ["Setting and venue charge", "Where sessions happen and who pays for access"],
              ["Travel", "Yours or the coach's, and whether it is included"],
              ["Equipment you would need", "Anything you would have to buy"],
              ["Payment timing", "When and how you pay"],
              ["Rescheduling and cancellation", "Notice needed and what happens to unused sessions"],
              ["Total cost for the period", "Everything above added together"],
            ],
          },
          { type: "callout", text: "Copy these rows into a notes app and give each offer its own column. Two minutes of filling in blanks usually shows which questions you still need to ask." },
        ],
      },
      {
        id: "questions-before-you-pay",
        heading: "Questions to ask before you pay",
        blocks: [
          {
            type: "checks",
            label: "Questions to ask before paying for personal training",
            columns: true,
            items: [
              "What exactly does the fee cover, and what is extra?",
              "How many sessions are included, and how long is each one?",
              "Where will sessions happen, and who covers any venue or membership cost?",
              "Is online coaching live, plan-based with check-ins, or a mix?",
              "How much planning is included, and how is the plan updated?",
              "How can I reach you between sessions, and what can I expect in reply?",
              "When and how is my progress reviewed?",
              "What are the payment dates and terms?",
              "What happens if I need to reschedule, miss a session or cancel?",
              "What happens at renewal, and can I change format later?",
              "If nutrition guidance is included, what does it cover?",
              "Can you put the answers in a message so I can refer back to them?",
            ],
          },
        ],
      },
      {
        id: "reading-srikanths-pricing",
        heading: `Reading ${name}'s pricing with this checklist`,
        blocks: [
          { type: "p", text: `The pricing section lists plans in three groups. This table shows what each one is described as covering, without repeating the fees, which stay in one place. Run them through the checklist like any other offer.` },
          {
            type: "table",
            caption: `The plans in ${name}'s pricing section and what each covers`,
            columns: ["Group", "Plan", "What it covers"],
            rows: linkedPlans,
          },
          { type: "p", text: `Fees are for coaching, in Indian rupees, and longer terms are the monthly fee multiplied by the number of months. Gym membership or venue charges, where they apply, are separate and confirmed before you start. If a detail is unclear, such as the arrangements at your gym or whether your locality suits home sessions, ask before you decide.` },
          { type: "p", text: `See the current fees in the [pricing section](/#pricing), and read how [in-person training](${inPerson}) and [online coaching](${online}) work.` },
        ],
      },
    ],
    faq: [
      { q: "Is the cheapest personal trainer good value?", a: "Not automatically, and it is not automatically poor value either. A price alone does not show what is included. Compare scope first, then ask how the coach works and what support you get." },
      { q: "Is online personal training cheaper than in-person?", a: "It can differ, but there is no rule. It depends on the number of sessions, whether they are live or plan-based, and what is included. Compare totals for the same scope." },
      { q: "Do I pay for a gym membership separately?", a: `That depends on the arrangement. For ${name}'s gym sessions, membership or venue charges are separate from the coaching fees and confirmed in advance. Home sessions do not involve a venue.` },
      { q: "What should I check about cancellations?", a: "Ask how much notice is needed, whether sessions can be rescheduled, what happens to unused sessions and what the renewal terms are. Keep the answer in writing, even if it is a message." },
      { q: `Does ${name} show his prices?`, a: "Yes. His plans are in the pricing section on the homepage. They are his package prices, not an average for Hyderabad." },
      { q: "Can I get help choosing a plan?", a: `Yes. Tell ${name} your goal, your preferred setting and how your week usually looks, and he will suggest one.` },
    ],
    related: ["gym-home-online-training", "how-to-choose-a-personal-trainer-hyderabad", "first-month-personal-training"],
    cta: {
      headline: "Ready to compare?",
      body: `Look at the plans, then tell ${name} your goal and how your week looks. He will help you pick the one that fits and explain what it covers.`,
      whatsappMessage: `Hi ${name}, I read your guide on personal trainer fees. Could you help me choose a plan?`,
    },
    index: {
      question: "What will it cost, and how do I compare?",
      description: "What changes the total cost of personal training, a fair way to compare two offers, and the questions to ask before you pay.",
    },
  },

  /* ------------------------------------------------------------------------------------------------ */
  {
    slug: "first-month-personal-training",
    title: "What to expect in your first month of personal training",
    seoTitle: "What to Expect in Your First Month of Training",
    description: "A realistic look at the first month of personal training: the first conversation, early sessions, building a routine and a first review, plus what to prepare.",
    lede: "Starting personal training can feel like arriving for a test you did not study for. It should not. A good first month is less about performing and more about finding out what works for you: what you want, what your week can hold and how the sessions feel.",
    takeaways: [
      "The first month is for learning how coaching fits your week, not for proving anything.",
      `${name}'s four stages, Understand, Plan, Coach and Review, overlap and feed into each other. They are not weeks one to four.`,
      "Pace is set with you. Nobody should promise a particular result by a particular date.",
      "Tell your coach early when something is unclear, does not fit or needs to change.",
    ],
    sections: [
      {
        id: "how-the-month-unfolds",
        heading: "How the first month can unfold",
        blocks: [
          { type: "p", text: `${name}'s coaching follows four stages. They feed into each other, there is no fixed timeline, and you may revisit them, so please do not read them as a week-by-week schedule. What follows is the kind of ground a first month often covers.` },
          {
            type: "steps",
            label: "What a first month of personal training can cover",
            items: [
              { name: "Understand: the first conversation", text: "A useful first conversation covers your goal, your experience, your schedule, your preferred setting and any limits that matter. You do not need a perfect routine before asking for support, and nobody expects you to perform on day one. If a doctor has given you guidance about exercise, share it before training begins." },
              { name: "Plan: your goal and your schedule", text: "Describe your goal in your own words, then agree a direction shaped around your routine, your setting and the equipment you have. Be honest about the days and times you can train. A plan that fits the week you actually have is worth more than an ambitious one you cannot keep." },
              { name: "Coach: learning how sessions work", text: "Early sessions often involve learning how to set up, the movement cues, the pace and rest, and how to use the space or equipment available. Each exercise is explained and demonstrated, with technique before load. Ask why an exercise is in your plan whenever it is unclear." },
              { name: "Routine: something you can repeat", text: "The most useful starting routine is the one you can repeat. Frequency, session length, travel, online access and recovery between sessions all affect what is workable. Some parts will suit you and others will not, and both are useful to know. Agree your schedule with your coach rather than copying someone else's." },
              { name: "Review: what fits and what should change", text: `A review is a conversation about the next adjustment, not a promise of a fixed result on a fixed timeline.${reviewTiming ? ` The approach on the homepage places reviews ${reviewTiming}, which makes a month a natural point to look back, though your own timing is agreed with you.` : ""} Bring simple notes on what you managed, what you missed and why.` },
            ],
          },
        ],
      },
      {
        id: "what-to-prepare",
        heading: "What to prepare",
        blocks: [
          {
            type: "groups",
            label: "What to prepare before you start",
            groups: [
              { title: "For every start", items: ["Know your main goal and your current routine, so the first conversation can be specific.", "Note any limits, and any guidance a doctor has given you.", "Wear comfortable clothing and shoes, and bring water."] },
              { title: "For gym sessions", items: ["Understand the venue's access arrangements before you arrive.", "Ask whether any membership or venue charge applies."] },
              { title: "For home sessions", items: ["Clear a safe, suitable space.", "Make a note of the equipment you have."] },
              { title: "For online coaching", items: ["Ask what device, internet connection, lighting and floor space are expected.", "Try your set-up before the first session."] },
            ],
          },
          { type: "callout", text: "Personal training is exercise coaching. It is not diagnosis, treatment, physiotherapy or injury care. If you have a medical condition, an injury or any concern about exercising, speak to an appropriate healthcare professional first." },
        ],
      },
      {
        id: "in-person-and-online-starts",
        heading: "In-person and online: how a start can differ",
        blocks: [
          {
            type: "table",
            caption: "How starting in person differs from starting online",
            columns: ["", "In-person (gym or home)", "Online"],
            rows: [
              ["Where sessions happen", "At a gym or at your home", "Wherever you have suitable space"],
              ["How technique is watched", "Your coach demonstrates, observes and corrects in person", "Depends on whether sessions are live or plan-based, so ask"],
              ["What to sort out first", "Venue access, or space and equipment at home", "Device, connection, lighting and floor space"],
              ["Staying in touch", "Agree what communication is included", "Agree what is included, especially between sessions"],
            ],
          },
          { type: "p", text: `Read how [in-person training](${inPerson}) and [online training](${online}) work, or see [how to choose between gym, home and online](/guides/gym-home-online-training/).` },
        ],
      },
      {
        id: "questions-to-ask",
        heading: "Questions worth asking in the first month",
        blocks: [
          {
            type: "list",
            columns: true,
            items: [
              "What should I do between sessions?",
              "How will I record or remember my plan?",
              "When should I raise a concern or ask for a change?",
              "What communication is included between sessions?",
              "How are changes to my schedule and missed sessions handled?",
              "When is my first review, and what will we look at?",
            ],
          },
          { type: "p", text: "For the money side, see [how to compare personal trainer fees](/guides/personal-trainer-fees-hyderabad/)." },
        ],
      },
      {
        id: "how-much-activity",
        heading: "How much activity is typical?",
        blocks: [
          { type: "p", text: "For general context, the World Health Organization advises adults aged 18 to 64 to do 150 to 300 minutes of moderate-intensity aerobic activity a week, or 75 to 150 minutes of vigorous-intensity activity, or an equivalent mix, along with muscle-strengthening activity on two or more days a week. It also says that some activity is better than none. See the [WHO physical activity fact sheet](https://www.who.int/news-room/fact-sheets/detail/physical-activity)." },
          { type: "callout", text: "This is guidance for the general population, not a programme prescribed for you. How often you train with a coach depends on your goal, your ability, how well you recover and your schedule. If you live with a health condition, speak to your healthcare professional first." },
        ],
      },
      {
        id: "first-month-checklist",
        heading: "A first-month checklist",
        blocks: [
          {
            type: "groups",
            label: "A checklist for the first month",
            groups: [
              { title: "Before the first session", items: ["I can say my goal and my routine in a sentence or two.", "I have noted my limits and any doctor's guidance.", "My clothing, space or access arrangements are sorted."] },
              { title: "During the month", items: ["I know why each exercise is in my plan.", "I have a routine I can repeat in a normal week.", "I have said when something was unclear or did not fit."] },
              { title: "At the review", items: ["I can say what felt practical and what did not.", "I know what is changing next, and why.", "I know how to reach my coach between sessions."] },
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "Will I see results in the first month?", a: "It depends on your starting point, consistency, food and recovery, and no one can promise a result. A realistic first month gives you clarity about your routine and growing comfort with the exercises." },
      { q: "Do I need to be fit before I start?", a: "No. The first conversation is about context, not a performance test." },
      { q: "How many sessions a week should I plan?", a: "There is no single right number. It depends on your goal, your current ability, how you recover and the schedule you can sustain. Settle it in your first conversation." },
      { q: "What if I miss sessions?", a: "Ask beforehand how missed sessions and rescheduling are handled, and tell your coach what got in the way. It is useful information for your plan." },
      { q: "Should I mention an old injury or a medical condition?", a: "Yes, share any limits so training can be planned around them. Personal training is not medical care, so speak to a healthcare professional about any concern before you begin." },
      { q: "Will nutrition guidance be part of my first month?", a: "That depends on the plan you choose. Where it is included, it is general education, not medical advice." },
      { q: "Do I need to buy equipment?", a: "Note what you have and ask before buying anything. For home sessions, a clear floor area and a few basics can go a long way, and the plan adapts to what you have." },
    ],
    related: ["gym-home-online-training", "personal-trainer-fees-hyderabad", "what-a-personal-trainer-can-help-with"],
    cta: {
      headline: "Start with a conversation",
      body: `Tell ${name} where you are starting from and what you want to change. He will tell you honestly what to expect, with no pressure to join.`,
      whatsappMessage: `Hi ${name}, I read your guide on the first month of personal training. I'd like to start with a conversation.`,
    },
    index: {
      question: "What happens once I start?",
      description: "How a first conversation, early sessions, a repeatable routine and a first review can fit together, and what to prepare.",
    },
  },
];

/** The order guides appear in on the index: understand the role, choose, decide the format, compare cost, then start. */
export const guideSlugs = guides.map((guide) => guide.slug);

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export const guidesIndex = {
  path: "/guides/",
  breadcrumbLabel: "Guides",
  seo: {
    title: "Personal Training Guides for Hyderabad",
    description: "Practical guides on choosing a personal trainer in Hyderabad, comparing fees, picking gym, home or online training, and what your first month looks like.",
  },
  title: "Personal training guides for Hyderabad",
  lede: "Choosing a personal trainer raises practical questions well before the first session. What does a trainer actually do? How do you pick one, and compare what they charge? Where should you train, and what does the first month look like? These guides take those questions one at a time.",
  note: {
    before: "They are general information to help you ask better questions, not advice about your own health. See the ",
    linkLabel: "disclaimer",
    href: "/disclaimer/",
    after: " for how this site's guidance should be read.",
  },
  image: {
    src: "/images/training-detail.png",
    alt: "A training notebook open beside a kettlebell, where a coach plans a client's programme",
    width: 1408,
    height: 768,
    aspect: "4 / 3",
    focalPoint: { x: 50, y: 50 },
  },
  listLabel: "Guides, by the question they answer",
  readLabel: "Read the guide",
  cta: {
    headline: "Ready to talk it through?",
    body: `Tell ${name} what you want to work on and what you are unsure about. He will explain how coaching could work for you.`,
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: `Hi ${name}, I've been reading your guides and I'd like to ask about personal training.`,
    relatedTitle: "Explore training",
    related: [
      { label: "In-person personal training in Hyderabad", href: inPerson },
      { label: "Online personal training", href: online },
      { label: "See the plans and pricing", href: "/#pricing" },
    ],
  },
};

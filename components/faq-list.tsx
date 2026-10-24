"use client";

const faqs = [
  ["Do you offer gym-based, client-location, and online training?", "Yes. The homepage outlines gym-based personal training, training at your location, and online personal training. The right setting depends on your space, schedule, and goals."],
  ["Where do client-location sessions take place?", "They can be discussed around your home or another suitable location. A clear floor area, stable non-slip surface, water, and a mat if useful are practical starting points."],
  ["Are sessions suitable for beginners?", "Yes. Training can start from your current experience, goals, schedule, and comfort level, with simple movement practice and clear guidance."],
  ["How much does personal training cost?", "Sample monthly rates are shown on this draft page for planning: training-only, nutrition-only, and combined examples. Venue, membership, travel, equipment, and other terms are not included unless stated."],
  ["How do I start?", "Share a little about your goals, experience, schedule, and preferred format. The next step is a conversation about fit and a practical starting point."],
];

export function FAQList() {
  return <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary><span>{question}</span><span className="faq-icon" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>;
}

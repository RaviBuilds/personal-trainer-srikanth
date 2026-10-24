"use client";

const faqs = [
  ["Do you offer both online and in-person training?", "The current website presents both formats as available options. Exact delivery details, session format, and scheduling are confirmed during your enquiry."],
  ["Where do in-person sessions take place?", "The specific venue and service localities are being confirmed. Enquire with your preferred area and the format you are considering."],
  ["Are sessions suitable for beginners?", "Training conversations can start from your current experience, goals, schedule, and comfort level. The right starting point is discussed before any plan is agreed."],
  ["How much does personal training cost?", "Pricing is not published yet because package details and session terms are still being finalised. Use the enquiry form to ask about current options."],
  ["How do I start?", "Share a little about your goals and preferred format. The next step is a conversation about fit, availability, and the details that need to be confirmed."],
];

export function FAQList() {
  return <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary><span>{question}</span><span className="faq-icon" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>;
}

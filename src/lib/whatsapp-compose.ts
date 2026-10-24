import { siteContent } from "./site-content";

const { compose } = siteContent.contactCard;

/**
 * The exact text that opens in WhatsApp: a greeting with the visitor's name, their message, and a signature,
 * separated by blank lines. Three or more newlines in a row collapse to two.
 */
export function composeWhatsAppText(name: string, message: string): string {
  const greeting = compose.greeting.replace("{coach}", siteContent.name).replace("{name}", name.trim());
  return `${greeting}\n\n${message.trim()}\n\n${compose.signature}`.replace(/\n{3,}/g, "\n\n");
}

/**
 * Adds a suggested topic to the message. An empty message becomes the sentence; otherwise the sentence is added
 * after a space. A sentence that is already there, or that would pass the length limit, leaves the message as it is.
 */
export function addTopic(current: string, sentence: string, maxLength: number): string {
  const trimmed = current.trim();
  if (!trimmed) return sentence;
  if (trimmed.includes(sentence)) return current;
  const next = `${trimmed} ${sentence}`;
  return next.length > maxLength ? current : next;
}

"use client";

import { useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Button } from "@/components/button";
import { WhatsAppGlyph } from "@/components/icons";
import { buildWhatsAppUrl, siteContent, telHref } from "@/src/lib/site-content";
import { addTopic, composeWhatsAppText } from "@/src/lib/whatsapp-compose";

const { contactCard: card, contact } = siteContent;
const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The only interactive part of the contact card. It builds a wa.me link from the visitor's name and message and
 * opens WhatsApp. Nothing is stored or sent to a server: the browser just navigates to WhatsApp.
 */
export function WhatsAppComposer() {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    nameError: `${uid}-name-error`,
    message: `${uid}-message`,
    messageError: `${uid}-message-error`,
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [openedUrl, setOpenedUrl] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const next = {
      name: trimmedName ? undefined : card.nameField.error,
      message: trimmedMessage ? undefined : card.messageField.error,
    };
    setErrors(next);
    if (next.name || next.message) {
      setOpenedUrl(null);
      (next.name ? nameRef.current : messageRef.current)?.focus();
      return;
    }

    const url = buildWhatsAppUrl(composeWhatsAppText(trimmedName, trimmedMessage));
    if (window.matchMedia("(pointer: coarse)").matches) {
      // On a phone, navigate in the same tab so the WhatsApp app takes over.
      window.location.assign(url);
    } else {
      // A temporary link clicked inside the submit handler opens a new tab and keeps rel="noopener".
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    setOpenedUrl(url);
  }

  function handleTopic(sentence: string) {
    setMessage((current) => addTopic(current, sentence, card.messageField.maxLength));
    setErrors((current) => ({ ...current, message: undefined }));
    setOpenedUrl(null);
  }

  return (
    <form className="cc-form" noValidate onSubmit={handleSubmit}>
      <div className="cc-step" style={step(2)}>
        <div className="cc-chips" role="group" aria-label={card.topicsLabel}>
          {card.topics.map((topic) => (
            <button key={topic.id} type="button" className="cc-chip" onClick={() => handleTopic(topic.sentence)}>
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cc-step cc-fields" style={step(3)}>
        <div className="cc-field">
          <label htmlFor={ids.name}>{card.nameField.label}</label>
          <input
            ref={nameRef}
            id={ids.name}
            className="cc-input"
            type="text"
            name="name"
            autoComplete="name"
            maxLength={card.nameField.maxLength}
            placeholder={card.nameField.placeholder}
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? ids.nameError : undefined}
            onChange={(event) => {
              setName(event.target.value);
              setErrors((current) => ({ ...current, name: undefined }));
              setOpenedUrl(null);
            }}
          />
          <div className="cc-error">{errors.name ? <p id={ids.nameError} role="alert">{errors.name}</p> : null}</div>
        </div>

        <div className="cc-field">
          <label htmlFor={ids.message}>{card.messageField.label}</label>
          <textarea
            ref={messageRef}
            id={ids.message}
            className="cc-input cc-textarea"
            name="message"
            rows={4}
            maxLength={card.messageField.maxLength}
            placeholder={card.messageField.placeholder}
            value={message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? ids.messageError : undefined}
            onChange={(event) => {
              setMessage(event.target.value);
              setErrors((current) => ({ ...current, message: undefined }));
              setOpenedUrl(null);
            }}
          />
          <div className="cc-error">{errors.message ? <p id={ids.messageError} role="alert">{errors.message}</p> : null}</div>
        </div>
      </div>

      <div className="cc-step cc-actions" style={step(4)}>
        <Button variant="whatsapp" type="submit" className="cc-submit">
          <WhatsAppGlyph size={24} />
          <span>{card.submitLabel}</span>
        </Button>
        <p className="cc-helper">{card.helper}</p>
        <a className="cc-call" href={telHref}>
          {card.callPrefix} {contact.phoneDisplay}
        </a>
        <div className="cc-status" role="status">
          {openedUrl ? (
            <p>
              {card.opening.before}
              <a href={openedUrl} target="_blank" rel="noopener noreferrer">{card.opening.linkLabel}</a>
              {card.opening.after}
            </p>
          ) : null}
        </div>
        <p className="cc-note">{card.note}</p>
      </div>
    </form>
  );
}

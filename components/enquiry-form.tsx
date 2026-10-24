"use client";

import { FormEvent, useState } from "react";
import { siteContent } from "@/src/lib/site-content";

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!siteContent.contact.enquiryEndpoint) {
      event.preventDefault();
      setSubmitted(true);
    }
  }
  return <form className="contact-form" action={siteContent.contact.enquiryEndpoint || undefined} method="post" onSubmit={handleSubmit}><div className="form-grid"><label htmlFor="enquiry-name">Name<input id="enquiry-name" required name="name" type="text" autoComplete="name" /></label><label htmlFor="enquiry-contact">Preferred contact<input id="enquiry-contact" required name="contact" type="text" autoComplete="email" /></label></div><label htmlFor="enquiry-format">Coaching format<select id="enquiry-format" name="format" defaultValue="" required><option value="" disabled>Select one</option><option>In-person training</option><option>Online coaching</option><option>Not sure yet</option></select></label><label htmlFor="enquiry-goal">What would you like to work on?<textarea id="enquiry-goal" required name="goal" /></label><p className="form-note">Please do not include sensitive medical information. This preview does not send enquiries yet.</p>{submitted ? <p className="form-status" role="status">Preview only: the enquiry was not sent because no destination is configured yet.</p> : <button className="button" type="submit">Prepare enquiry</button>}</form>;
}

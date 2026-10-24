import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "whatsapp";
type Base = { variant?: Variant; children: ReactNode };
type AsLink = Base & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;
type AsButton = Base & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * Shares the site's `.button` shape. "primary" is the amber action button. "whatsapp" uses the --wa-* tokens
 * and is for actions that open WhatsApp (styles in contact-card.css).
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", children, className, ...rest } = props;
  const classes = ["button", variant === "whatsapp" ? "button--whatsapp" : "", className ?? ""].filter(Boolean).join(" ");
  if (typeof rest.href === "string") {
    return <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>{children}</a>;
  }
  return <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>{children}</button>;
}

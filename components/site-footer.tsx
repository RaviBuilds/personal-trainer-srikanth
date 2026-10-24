import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { InstagramGlyph, WhatsAppLogo } from "@/components/icons";
import { siteContent, telHref, whatsappHref } from "@/src/lib/site-content";

const { footer, instagram, contact, logo } = siteContent;

/** Captured on the server and refreshed daily, so the static shell never serves a stale year for long. */
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/**
 * Site footer: a Server Component with no client JavaScript. Pass `currentPath` (the route being rendered, for
 * example "/guides/") so the matching link gets aria-current="page".
 */
export async function SiteFooter({ currentPath }: { currentPath: string }) {
  const year = await currentYear();
  const here = normalise(currentPath);
  const isCurrent = (href: string) => !href.includes("#") && normalise(href) === here;

  return (
    <footer className="sf" id="site-footer">
      <div className="sf-wrap">
        <div className="sf-grid">
          <div className="sf-brand">
            <Link href="/" className="sf-logo" aria-label={`${footer.brandName} home`}>
              <Image src={logo.src} alt={footer.brandName} width={140} height={48} />
            </Link>
            <p className="sf-blurb">{footer.blurb}</p>
            <div className="sf-social">
              <a className="sf-social-link" href={instagram.url} target="_blank" rel="noopener noreferrer">
                <InstagramGlyph size={20} />
                <span>@{instagram.handle}</span>
              </a>
              <a className="sf-social-link" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppLogo size={20} />
                <span>{footer.whatsappLabel}</span>
              </a>
            </div>
          </div>

          <div className="sf-nav">
            {footer.navGroups.map((group, index) => {
              const titleId = `sf-title-${index}`;
              return (
                <nav key={group.title} aria-labelledby={titleId} className="sf-col">
                  <p id={titleId} className="sf-title">{group.title}</p>
                  <ul>
                    {group.links.map((link) => {
                      const current = isCurrent(link.href);
                      return (
                        <li key={link.href}>
                          <Link className="sf-link" href={link.href} aria-current={current ? "page" : undefined}>{link.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              );
            })}
            <address className="sf-col" aria-labelledby="sf-title-contact">
              <p id="sf-title-contact" className="sf-title">{footer.contactTitle}</p>
              <ul>
                <li><a className="sf-link" href={telHref}>{contact.phoneDisplay}</a></li>
                <li><span className="sf-text">{footer.locality}</span></li>
              </ul>
            </address>
          </div>
        </div>

        <div className="sf-bottom">
          <p className="sf-note">
            {footer.note.before}
            <Link className="sf-inline" href={footer.note.linkHref}>{footer.note.linkLabel}</Link>
            {footer.note.after}
          </p>
          <div className="sf-bar">
            <p className="sf-copy">&copy; {year} {footer.brandName}. All rights reserved.</p>
            <nav aria-label="Legal" className="sf-legal">
              <ul>
                {footer.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link className="sf-link sf-link-sm" href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="sf-credit">
              {footer.credit.prefix}{" "}
              <a className="sf-credit-link" href={footer.credit.href} target="_blank" rel="noopener noreferrer">{footer.credit.label}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

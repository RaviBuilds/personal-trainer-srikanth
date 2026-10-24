/**
 * Footer link groups. Kept free of imports so scripts/check-footer-links.mjs can load this file directly with
 * Node; site-content.ts exposes the result as `siteContent.footer.navGroups`.
 *
 * Every href is a real route under app/ (or a homepage section id written as "/#id" so it also works from
 * internal pages). Run `npm run check:footer` after changing a link.
 */
export type FooterLink = { label: string; href: string };
export type FooterNavGroup = { title: string; links: FooterLink[] };

export function buildFooterNavGroups(name: string): FooterNavGroup[] {
  return [
    {
      title: "Personal training",
      links: [
        { label: "In-person training in Hyderabad", href: "/services/in-person-personal-training-hyderabad/" },
        { label: "Online personal training", href: "/services/online-personal-training/" },
        { label: "Training formats", href: "/#formats" },
        { label: "Training goals", href: "/#goals" },
      ],
    },
    {
      title: "Guides",
      links: [
        { label: "All training guides", href: "/guides/" },
        { label: "Personal trainer fees in Hyderabad", href: "/guides/personal-trainer-fees-hyderabad/" },
        { label: "Your first month of training", href: "/guides/first-month-personal-training/" },
        { label: "Gym, home or online training", href: "/guides/gym-home-online-training/" },
      ],
    },
    {
      title: name,
      links: [
        { label: "Home", href: "/" },
        { label: "Approach", href: "/#approach" },
        { label: `Meet ${name}`, href: "/#coach" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQs", href: "/#faqs" },
        { label: "Contact", href: "/#contact" },
      ],
    },
  ];
}

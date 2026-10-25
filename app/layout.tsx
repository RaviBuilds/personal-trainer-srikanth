import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { pageMetadata, siteContent } from "@/src/lib/site-content";
import "./globals.css";
import "./hero.css";
import "./starting-point.css";
import "./formats.css";
import "./goals.css";
import "./nutrition.css";
import "./pricing.css";
import "./approach.css";
import "./coach.css";
import "./progress-stories.css";
import "./instagram.css";
import "./faq.css";
import "./contact-card.css";
import "./footer.css";
import "./in-person.css";
import "./online.css";
import "./guides.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  ...pageMetadata("Personal Trainer in Hyderabad", `Explore online and in-person personal training options in Hyderabad with ${siteContent.name}. Enquire about coaching shaped around your goals and schedule.`),
  metadataBase: siteContent.domain ? new URL(siteContent.domain) : undefined,
  icons: {
    icon: "/images/SRIKANTH-Personal-Training-logo.png",
    apple: "/images/SRIKANTH-Personal-Training-logo.png",
  },
};

export const viewport: Viewport = { themeColor: "#fffbf5", width: "device-width", initialScale: 1 };

// Marks the document as script-enabled before first paint so hero entrance states can be applied safely.
const motionFlag = `document.documentElement.classList.add("js-motion")`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${archivo.variable} ${figtree.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: motionFlag }} /></head><body>{children}<FloatingWhatsApp /></body></html>;
}

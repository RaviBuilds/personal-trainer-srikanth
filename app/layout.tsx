import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { siteContent } from "@/src/lib/site-content";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Trainer in Hyderabad | Shrikant",
  description: "Explore online and in-person personal training options in Hyderabad with Shrikant. Enquire about coaching shaped around your goals and schedule.",
  metadataBase: siteContent.domain ? new URL(siteContent.domain) : undefined,
  robots: siteContent.draftPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#fffbf5", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${archivo.variable} ${figtree.variable}`}><body>{children}</body></html>;
}

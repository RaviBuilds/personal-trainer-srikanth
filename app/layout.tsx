import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { pageMetadata, siteContent } from "@/src/lib/site-content";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  ...pageMetadata("Personal Trainer in Hyderabad", `Explore online and in-person personal training options in Hyderabad with ${siteContent.name}. Enquire about coaching shaped around your goals and schedule.`),
  metadataBase: siteContent.domain ? new URL(siteContent.domain) : undefined,
};

export const viewport: Viewport = { themeColor: "#fffbf5", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${archivo.variable} ${figtree.variable}`}><body>{children}</body></html>;
}

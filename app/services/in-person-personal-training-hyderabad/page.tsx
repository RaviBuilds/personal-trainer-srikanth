import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
export const metadata: Metadata = { title: "Personal Training in Hyderabad | Shrikant", description: "Learn what to clarify about in-person personal training in Hyderabad with Shrikant." };
export default function Page() { return <ServicePage title="In-person personal training in Hyderabad" intro="Face-to-face coaching for people who want a dedicated training setting, with the delivery details confirmed around your location and routine." points={["Preferred area or training setting", "Session format and duration", "Schedule, inclusions, and price", "Cancellation and rescheduling terms"]} />; }

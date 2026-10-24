import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
export const metadata: Metadata = { title: "Online Personal Training | Shrikant", description: "Learn what to clarify about online personal training and coaching with Shrikant." };
export default function Page() { return <ServicePage title="Online personal training and coaching" intro="A flexible coaching option for people who want training to fit around their own space and schedule, with the exact format confirmed before starting." points={["Live, programme, or combined delivery format", "Platform and scheduling", "Equipment, space, and internet expectations", "Communication, check-ins, and package details"]} />; }

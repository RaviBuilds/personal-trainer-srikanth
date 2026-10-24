import { ApproachSection } from "@/components/approach-section";
import { ContactCard } from "@/components/contact-card";
import { FaqSection } from "@/components/faq-section";
import { CoachSection } from "@/components/coach-section";
import { Hero } from "@/components/hero";
import { InstagramSection } from "@/components/instagram-section";
import { ProgressGallery } from "@/components/progress-gallery";
import { SiteHeader } from "@/components/site-header";
import { StartingPoint } from "@/components/starting-point";
import { FormatsSection } from "@/components/formats-section";
import { GoalsSection } from "@/components/goals-section";
import { NutritionSection } from "@/components/nutrition-section";
import { PricingSection } from "@/components/pricing-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return <><SiteHeader /><main>
    <Hero />
    <StartingPoint />
    <FormatsSection />
    <GoalsSection />
    <NutritionSection />
    <PricingSection />
    <ApproachSection />
    <CoachSection />
    <ProgressGallery /><InstagramSection /><FaqSection /><ContactCard />
  </main><SiteFooter currentPath="/" /></>;
}

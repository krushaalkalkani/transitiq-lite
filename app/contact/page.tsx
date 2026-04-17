import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { MarketingPageShell } from "@/components/MarketingPageShell";

export const metadata: Metadata = {
  title: "Contact | TransitIQ Lite",
  description: "Contact TransitIQ Lite.",
};

export default function ContactPage() {
  return (
    <MarketingPageShell
      title="Contact Us"
      subtitle="Have a question, found a bug, or want to collaborate?"
    >
      <ContactForm />
    </MarketingPageShell>
  );
}

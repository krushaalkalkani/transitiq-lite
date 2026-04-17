import type { Metadata } from "next";

import { ListUniversityForm } from "@/components/ListUniversityForm";
import { MarketingPageShell } from "@/components/MarketingPageShell";

export const metadata: Metadata = {
  title: "List My University | TransitIQ Lite",
  description: "Request a university to be added to TransitIQ Lite.",
};

export default function ListUniversityPage() {
  return (
    <MarketingPageShell
      title="List My University"
      subtitle="Don't see your university? Submit a request and we'll add it."
    >
      <ListUniversityForm />
    </MarketingPageShell>
  );
}

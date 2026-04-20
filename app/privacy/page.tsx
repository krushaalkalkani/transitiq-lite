import type { Metadata } from "next";

import { MarketingPageShell } from "@/components/MarketingPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | TransitIQ Lite",
  description: "Privacy policy for TransitIQ Lite.",
};

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/50">
      <h2 className="text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <MarketingPageShell
      title="Privacy Policy"
      subtitle="Effective Date: April 17, 2026"
    >
      <div className="space-y-6">
        <PolicySection title="Introduction">
          <p>
            TransitIQ Lite is an AI-powered campus transit assistant. This
            policy explains how we handle your information when you use
            TransitIQ Lite.
          </p>
        </PolicySection>

        <PolicySection title="Information We Collect">
          <p>
            We do not require user accounts or login. When you use the app, we
            process uploaded transit images, your typed questions, and your
            selected university.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Uploaded transit images are sent to OpenAI&apos;s API for
              analysis and are not stored on our servers.
            </li>
            <li>
              Typed questions are sent to OpenAI&apos;s API for processing and
              are not stored by TransitIQ Lite.
            </li>
            <li>
              Your selected university is used only during your session to
              provide relevant transit context.
            </li>
          </ul>
          <p>
            We do not store any images, questions, or answers after your
            session ends.
          </p>
        </PolicySection>

        <PolicySection title="Third-Party Services">
          <p>
            We use OpenAI&apos;s GPT-4o API to analyze images and generate
            answers. Your uploaded images and questions are sent to OpenAI for
            processing. Please review OpenAI&apos;s privacy policy at{" "}
            <a
              href="https://openai.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-fau-blue hover:underline"
            >
              openai.com/privacy
            </a>
            .
          </p>
          <p>
            We may use Vercel Analytics in the future to collect anonymous
            usage data such as page views and device type. No personally
            identifiable information would be collected.
          </p>
        </PolicySection>

        <PolicySection title="Cookies">
          <p>
            We do not currently use cookies or tracking technologies. If
            analytics are added in the future, this policy will be updated.
          </p>
        </PolicySection>

        <PolicySection title="Data Retention">
          <p>
            We do not store your data. All processing happens in real time
            during your session. Once you close the app, your data is gone.
          </p>
        </PolicySection>

        <PolicySection title="Children's Privacy">
          <p>
            TransitIQ Lite is designed for university students. We do not
            knowingly collect information from children under 13.
          </p>
        </PolicySection>

        <PolicySection title="Your Rights">
          <p>
            Since we do not store personal data, there is nothing to delete or
            export. If you have questions, contact us.
          </p>
        </PolicySection>

        <PolicySection title="Changes to This Policy">
          <p>
            We may update this policy. Changes will be posted on this page with
            a new effective date.
          </p>
        </PolicySection>

        <PolicySection title="Contact">
          <p>
            Questions about this policy can be sent to{" "}
            <a
              href="mailto:support@transitiqlite.app"
              className="font-semibold text-fau-blue hover:underline"
            >
              support@transitiqlite.app
            </a>
          </p>
        </PolicySection>
      </div>
    </MarketingPageShell>
  );
}

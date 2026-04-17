import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageShell } from "@/components/MarketingPageShell";

export const metadata: Metadata = {
  title: "About | TransitIQ Lite",
  description: "Learn about TransitIQ Lite and the builder behind it.",
};

const techStack = [
  "Next.js 14",
  "TypeScript",
  "Tailwind CSS",
  "OpenAI GPT-4o",
  "Vercel",
];

export default function AboutPage() {
  return (
    <MarketingPageShell title="About TransitIQ Lite">
      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fau-blue">
            The Story
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            TransitIQ Lite was built by Krushal Kalkani, a Master&apos;s student
            in Computer Science at Florida Atlantic University. Every day,
            thousands of students struggle to understand shuttle schedules -
            printed signs at bus stops, PDF routes on websites, and temporary
            notices that are hard to read. TransitIQ Lite solves this with AI.
            Upload any transit document, ask a question in plain English, and
            get a clear answer. Built for the OpenAI Codex Creator Challenge
            2026, TransitIQ Lite started as a solution for FAU students and has
            grown to support 50+ universities across the United States.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fau-blue">
            The Builder
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
            Krushal Kalkani
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            MS Computer Science, Florida Atlantic University, 2026
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Passionate about AI, software engineering, and building products
            that solve real problems.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fau-blue">
            Tech Stack
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-fau-sky px-4 py-2 text-sm font-semibold text-fau-blue"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-fau-blue to-blue-600 p-8 text-center text-white shadow-2xl shadow-blue-500/20">
          <h2 className="text-2xl font-bold tracking-tight">
            Ready to try it?
          </h2>
          <Link
            href="/app"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-fau-blue transition-all duration-200 hover:scale-105"
          >
            Try TransitIQ Lite
          </Link>
        </section>
      </div>
    </MarketingPageShell>
  );
}

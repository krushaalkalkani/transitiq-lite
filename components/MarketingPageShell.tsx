import Link from "next/link";
import { ReactNode } from "react";

import { MarketingFooter } from "@/components/MarketingFooter";

type MarketingPageShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

function BackArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function MarketingPageShell({
  title,
  subtitle,
  children,
}: MarketingPageShellProps) {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="landing-cinematic-bg relative min-h-[220px] overflow-hidden px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="landing-grid-overlay absolute inset-0" aria-hidden="true" />
        <div className="landing-orb-small absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col">
          <Link
            href="/"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-1 text-sm font-semibold text-slate-300 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-fau-blue"
          >
            <BackArrowIcon />
            Back to home
          </Link>

          <div className="flex flex-1 flex-col justify-center py-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div
          className="absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fau-blue/5 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-3xl">{children}</div>
      </section>

      <MarketingFooter />
    </main>
  );
}

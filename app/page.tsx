"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

import { MarketingFooter } from "@/components/MarketingFooter";
import { ScrollReveal } from "@/components/ScrollReveal";

const headlineWords = [
  { word: "Your", lineBreak: false },
  { word: "Campus", lineBreak: false },
  { word: "Shuttle,", lineBreak: true },
  { word: "Explained", lineBreak: false },
  { word: "by", lineBreak: false },
  { word: "AI.", lineBreak: false },
];

const features = [
  {
    title: "Snap & Ask",
    description:
      "Take a photo of any shuttle sign, printed schedule, or route map. No manual data entry needed.",
    icon: <CameraIcon />,
  },
  {
    title: "AI-Powered Answers",
    description:
      "GPT-4o reads your image, understands the transit context, and answers your question with structured detail.",
    icon: <SparkleBrainIcon />,
  },
  {
    title: "Built for Students",
    description:
      "Designed for 50+ US university campuses. Get route info, service hours, and stop details in seconds.",
    icon: <GraduationCapIcon />,
  },
];

const steps = [
  {
    number: "01",
    title: "Upload",
    description:
      "Take a photo or upload a shuttle schedule, route map, or transit notice.",
    variant: "slide-left" as const,
  },
  {
    number: "02",
    title: "Ask",
    description:
      "Type your question in plain English. Like talking to a friend who knows every route.",
    variant: "fade-in" as const,
  },
  {
    number: "03",
    title: "Get Your Answer",
    description:
      "Receive a structured response with the direct answer, extracted details, and next steps.",
    variant: "slide-right" as const,
  },
];

type CountUpStatProps = {
  icon: ReactNode;
  label: string;
  countTo?: number;
  suffix?: string;
};

function CameraIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2L10 4h4l1.5 2h2A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z" />
      <path d="M15.5 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
    </svg>
  );
}

function SparkleBrainIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M10 5.5A3.5 3.5 0 0 0 6.5 9v.5A3.5 3.5 0 0 0 5 16a3 3 0 0 0 5.7 1.3" />
      <path d="M14 5.5A3.5 3.5 0 0 1 17.5 9v.5A3.5 3.5 0 0 1 19 16a3 3 0 0 1-5.7 1.3" />
      <path d="M12 6v13" />
      <path d="M8 11h2" />
      <path d="M14 11h2" />
      <path d="M7 3l.6 1.4L9 5l-1.4.6L7 7l-.6-1.4L5 5l1.4-.6L7 3Z" />
      <path d="M18 2l.7 1.6L20.5 4.3l-1.8.7L18 6.6 17.3 5l-1.8-.7 1.8-.7L18 2Z" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="m3 8.5 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V11" />
      <path d="M20 9v5" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M4 21h16" />
      <path d="M6 21V5.5A1.5 1.5 0 0 1 7.5 4h9A1.5 1.5 0 0 1 18 5.5V21" />
      <path d="M9 8h1.5" />
      <path d="M13.5 8H15" />
      <path d="M9 12h1.5" />
      <path d="M13.5 12H15" />
      <path d="M10 21v-5h4v5" />
    </svg>
  );
}

function SparkleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="m12 3 1.55 4.3L18 9l-4.45 1.7L12 15l-1.55-4.3L6 9l4.45-1.7L12 3Z" />
      <path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
      <path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function LandingNavbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 12);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        hasScrolled
          ? "border-slate-200 bg-white/95 shadow-sm"
          : "border-white/10 bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`text-lg font-bold tracking-tight transition ${
            hasScrolled ? "text-fau-blue" : "text-white"
          }`}
        >
          TransitIQ Lite
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors duration-200 ${
              hasScrolled
                ? "text-slate-500 hover:text-fau-blue"
                : "text-slate-300 hover:text-white"
            }`}
          >
            About
          </Link>
          <Link
            href="/app"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
              hasScrolled
                ? "bg-fau-blue text-white shadow-sm hover:bg-[#00284F]"
                : "bg-white text-fau-blue hover:bg-slate-100"
            }`}
          >
            Try it now
          </Link>
        </div>
      </div>
    </nav>
  );
}

function CountUpStat({ icon, label, countTo, suffix = "" }: CountUpStatProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || countTo === undefined || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasAnimated(true);
        const shouldReduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (shouldReduceMotion) {
          setValue(countTo);
          observer.unobserve(entry.target);
          return;
        }

        const duration = 1500;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * countTo));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        observer.unobserve(entry.target);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [countTo, hasAnimated]);

  return (
    <div
      ref={elementRef}
      className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600"
    >
      <span className="text-fau-blue">{icon}</span>
      <span>
        {countTo === undefined ? label : `${value}${suffix} ${label}`}
      </span>
    </div>
  );
}

function BrowserMockup() {
  return (
    <div className="hero-mockup relative mx-auto mt-14 w-full max-w-5xl">
      <div className="absolute inset-x-10 -bottom-8 h-24 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-[0_40px_80px_rgba(0,51,102,0.4)] [transform:perspective(1000px)_rotateX(2deg)]">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100/95 px-4 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 rounded-full bg-white px-4 py-1.5 text-center text-xs font-medium text-slate-500">
            transitiq-lite.vercel.app
          </div>
        </div>

        <div className="grid gap-5 bg-white p-4 sm:grid-cols-[0.9fr_1.1fr] sm:p-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fau-transit-sample.png"
              alt="Sample FAU shuttle route sheet"
              className="h-56 w-full rounded-lg object-cover"
            />
          </div>

          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-fau-blue">
                Question
              </p>
              <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Does the Blue Route run on Sundays?
              </p>
            </div>

            <div className="rounded-xl bg-fau-sky p-4 text-left">
              <p className="text-xs font-bold uppercase tracking-wide text-fau-blue">
                Direct Answer
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-800">
                No. The Blue Route runs Monday through Saturday from 7AM to
                10PM.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3 text-left">
                <p className="text-xs text-slate-500">Extracted Info</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Mon-Sat • 7AM-10PM
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3 text-left">
                <p className="text-xs text-slate-500">Suggested Action</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Check Green Route
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingRouteCards() {
  return (
    <>
      <div className="landing-float-five absolute left-4 top-32 hidden w-44 rounded-2xl border border-white/20 bg-white/10 p-4 text-white/85 shadow-2xl shadow-blue-950/20 backdrop-blur-sm sm:block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
          Blue Route
        </p>
        <p className="mt-2 text-sm font-semibold">Housing → Library</p>
      </div>
      <div className="landing-float-seven absolute right-6 top-48 hidden w-48 rounded-2xl border border-white/20 bg-white/10 p-4 text-white/85 shadow-2xl shadow-blue-950/20 backdrop-blur-sm md:block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
          Green Route
        </p>
        <p className="mt-2 text-sm font-semibold">Mon-Sun • 8AM-11PM</p>
      </div>
    </>
  );
}

function GradientArrow({
  className = "",
  gradientId,
}: {
  className?: string;
  gradientId: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 34"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="180" y1="17" y2="17">
          <stop stopColor="#003366" stopOpacity="0.08" />
          <stop offset="1" stopColor="#003366" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d="M2 17h160"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="m151 5 22 12-22 12"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof features)[number];
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay} variant="fade-up">
      <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-fau-blue to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-fau-blue to-blue-500 text-white shadow-lg shadow-blue-500/10">
          {feature.icon}
        </div>
        <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950">
          {feature.title}
        </h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          {feature.description}
        </p>
      </article>
    </ScrollReveal>
  );
}

function StatsBar() {
  return (
    <section className="border-y border-slate-100 bg-slate-50 py-6">
      <div className="mx-auto grid max-w-5xl gap-4 px-4 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
        <CountUpStat
          icon={<BuildingIcon />}
          countTo={50}
          suffix="+"
          label="Universities"
        />
        <CountUpStat icon={<SparkleIcon />} label="AI-Powered by GPT-4o" />
        <CountUpStat icon={<CodeIcon />} label="Built with OpenAI Codex" />
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
    />
  );
}

function HeroSection() {
  return (
    <section className="landing-cinematic-bg relative flex min-h-screen items-center overflow-hidden px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
      <div className="landing-grid-overlay absolute inset-0" aria-hidden="true" />
      <div className="landing-orb absolute left-1/2 top-[18%] h-[600px] w-[600px] -translate-x-1/2 rounded-full" />
      <FloatingRouteCards />

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            {headlineWords.map((item, index) => (
              <span key={`${item.word}-${index}`}>
                <span
                  className="hero-word inline-block"
                  style={{ animationDelay: `${0.2 + index * 0.2}s` }}
                >
                  {item.word}
                </span>
                {item.lineBreak ? <br /> : " "}
              </span>
            ))}
          </h1>
          <p
            className="hero-fade-in mx-auto mt-7 max-w-xl text-lg leading-8 text-slate-300/80 md:text-xl md:leading-9"
            style={{ animationDelay: "1.2s" }}
          >
            Upload any shuttle schedule, route map, or transit notice. Ask a
            question in plain English. Get a clear, structured answer instantly.
          </p>
          <Link
            href="/app"
            className="hero-cta mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-fau-blue shadow-2xl shadow-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Try TransitIQ Lite
            <ArrowRightIcon />
          </Link>
        </div>

        <BrowserMockup />
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div
        className="features-orb-large absolute left-[-320px] top-10 h-[800px] w-[800px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="features-orb-small absolute right-[-120px] top-8 h-[400px] w-[400px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="section-diagonal-pattern absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center" variant="fade-up">
          <h2 className="text-4xl font-bold tracking-tight text-slate-950">
            Built Different.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500">
            Everything you need to navigate campus transit, powered by AI.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-fau-blue/20 to-transparent"
        aria-hidden="true"
      />
      <span className="section-float-6 absolute left-[9%] top-[22%] h-1 w-1 rounded-full bg-fau-blue/5" />
      <span className="section-float-8 absolute left-[22%] top-[72%] h-2 w-2 rounded-full bg-fau-blue/5" />
      <span className="section-float-10 absolute left-[48%] top-[18%] h-1.5 w-1.5 rounded-full bg-fau-blue/10" />
      <span className="section-float-12 absolute right-[18%] top-[66%] h-2 w-2 rounded-full bg-fau-blue/5" />
      <span className="section-float-8 absolute right-[8%] top-[28%] h-1 w-1 rounded-full bg-fau-blue/10" />
      <span className="section-float-10 absolute bottom-[14%] left-[62%] h-1.5 w-1.5 rounded-full bg-fau-blue/5" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center" variant="fade-up">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            How It Works
          </h2>
        </ScrollReveal>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <GradientArrow
            className="absolute left-[27%] top-1/2 z-0 hidden w-44 -translate-y-1/2 md:block"
            gradientId="step-arrow-left"
          />
          <GradientArrow
            className="absolute right-[27%] top-1/2 z-0 hidden w-44 -translate-y-1/2 md:block"
            gradientId="step-arrow-right"
          />
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              delay={index * 140}
              variant={step.variant}
              className="relative z-10"
            >
              <article className="relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="pointer-events-none absolute -right-2 top-2 bg-gradient-to-b from-slate-200 to-transparent bg-clip-text text-8xl font-black leading-none text-transparent">
                  {step.number}
                </span>
                <div className="relative">
                  <h3 className="text-xl font-bold tracking-tight text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fau-blue/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center" variant="fade-up">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            See It In Action
          </h2>
        </ScrollReveal>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-8">
          <div className="demo-card-grid absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
            <ScrollReveal variant="slide-left">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/fau-transit-sample.png"
                  alt="Sample shuttle schedule"
                  className="h-72 w-full rounded-xl object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal
              className="flex justify-center"
              delay={180}
              variant="fade-in"
            >
              <div className="demo-flow-arrow flex h-16 w-16 items-center justify-center rounded-full bg-white text-fau-blue shadow-lg shadow-blue-500/10 ring-1 ring-slate-200">
                <ArrowRightIcon className="h-7 w-7" />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-right" delay={260}>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Question
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Does the Blue Route run on Sundays?
                  </p>
                </div>
                <div className="mt-4 rounded-xl bg-gradient-to-br from-fau-blue to-blue-600 p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/65">
                    Direct Answer
                  </p>
                  <p className="mt-2 text-base font-medium leading-7">
                    No. The Blue Route runs Monday through Saturday from 7AM to
                    10PM.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Mon-Sat", "7AM-10PM", "Student Union", "Library"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="landing-cinematic-bg relative overflow-hidden px-4 py-20 text-center text-white sm:px-6 sm:py-24 lg:px-8">
      <div className="landing-grid-overlay absolute inset-0" aria-hidden="true" />
      <div className="cta-white-orb absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <span className="cta-particle section-float-6 absolute left-[14%] top-[24%] h-1.5 w-1.5 rounded-full bg-white/10" />
      <span className="cta-particle section-float-8 absolute left-[28%] bottom-[18%] h-1 w-1 rounded-full bg-white/10" />
      <span className="cta-particle section-float-10 absolute right-[19%] top-[21%] h-2 w-2 rounded-full bg-white/10" />
      <span className="cta-particle section-float-12 absolute right-[10%] bottom-[24%] h-1.5 w-1.5 rounded-full bg-white/10" />
      <span className="cta-particle section-float-8 absolute left-[52%] top-[14%] h-1 w-1 rounded-full bg-white/10" />
      <ScrollReveal className="relative z-10 mx-auto max-w-3xl" variant="fade-up">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Try it now. No sign-up needed.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Upload a photo, pick a campus, or paste a transit page. TransitIQ Lite
          turns scattered route info into a clear answer.
        </p>
        <Link
          href="/app"
          className="landing-cta-button mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-fau-blue shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_46px_rgba(255,255,255,0.35)]"
        >
          Launch TransitIQ Lite
          <ArrowRightIcon />
        </Link>
        <p className="mt-5 text-xs font-medium text-slate-400">
          Free • No login • Instant answers
        </p>
      </ScrollReveal>
    </section>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <LandingNavbar />
      <HeroSection />
      <StatsBar />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <HowItWorksSection />
      <SectionDivider />
      <DemoPreviewSection />
      <SectionDivider />
      <CtaSection />
      <MarketingFooter />
    </main>
  );
}

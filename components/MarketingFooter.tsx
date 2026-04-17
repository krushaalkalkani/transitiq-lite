import Link from "next/link";

const marqueeUniversities = [
  "FAU",
  "UCLA",
  "MIT",
  "Stanford",
  "Harvard",
  "Ohio State",
  "Michigan",
  "Berkeley",
  "Georgia Tech",
  "NYU",
  "Columbia",
  "UT Austin",
  "Purdue",
  "Duke",
  "Georgetown",
];

const productLinks = [
  { label: "Try TransitIQ Lite", href: "/app" },
  { label: "List My University", href: "/list-university" },
  { label: "About", href: "/about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export function MarketingFooter() {
  const marqueeItems = [...marqueeUniversities, ...marqueeUniversities];

  return (
    <footer className="relative overflow-hidden bg-slate-950 py-16 text-sm text-slate-400">
      <div
        className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-fau-blue/5 to-transparent"
        aria-hidden="true"
      />
      <span className="footer-particle section-float-8 absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-slate-700" />
      <span className="footer-particle section-float-10 absolute right-[18%] top-[28%] h-1 w-1 rounded-full bg-slate-700" />
      <span className="footer-particle section-float-12 absolute left-[42%] bottom-[22%] h-1 w-1 rounded-full bg-slate-700" />
      <span className="footer-particle section-float-6 absolute right-[8%] bottom-[18%] h-1 w-1 rounded-full bg-slate-700" />

      <div className="relative z-10">
        <div className="mb-8 border-b border-slate-800 py-6">
          <div className="landing-marquee-track flex w-max gap-4 whitespace-nowrap text-sm tracking-wide text-slate-600">
            {marqueeItems.map((university, index) => (
              <span key={`${university}-${index}`} className="inline-flex gap-4">
                <span>{university}</span>
                <span>•</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 px-4 text-center sm:grid-cols-3 sm:px-6 sm:text-left lg:px-8">
          <div>
            <p className="font-bold text-white">TransitIQ Lite</p>
            <p className="mt-1">Built by Krushal Kalkani</p>
          </div>
          <div className="sm:text-center">Codex Creator Challenge 2026</div>
          <div className="sm:text-right">Powered by OpenAI GPT-4o</div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="mx-auto mt-8 max-w-6xl space-y-3 px-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8"
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-slate-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-slate-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mx-auto mt-6 max-w-6xl border-t border-slate-800 px-4 pt-6 text-center text-xs text-slate-600 sm:px-6 lg:px-8">
          © 2026 Krushal Kalkani. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

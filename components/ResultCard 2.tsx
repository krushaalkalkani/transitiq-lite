import type { ReactNode } from "react";
import type { TransitResponse } from "@/lib/types";

type ResultCardProps = {
  result: TransitResponse;
};

type Section = {
  label: string;
  icon: ReactNode;
  content: ReactNode;
};

function CheckCircleIcon() {
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
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

function DocumentListIcon() {
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
      <path d="M7 3.5h7l3 3V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5V7h3" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
      <path d="M9 18h4" />
    </svg>
  );
}

function LightbulbIcon() {
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
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.3 1.5-1.5 2.5h-4c-.2-1-.7-1.9-1.5-2.5Z" />
    </svg>
  );
}

function WarningTriangleIcon() {
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
      <path d="m12 3 9 16H3L12 3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function ArrowRightCircleIcon() {
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
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path d="M8 12h8" />
      <path d="m13 8 4 4-4 4" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M12 17v-5" />
      <path d="M12 8h.01" />
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

export function ResultCard({ result }: ResultCardProps) {
  const sections: Section[] = [
    {
      label: "Direct Answer",
      icon: <CheckCircleIcon />,
      content: result.directAnswer,
    },
    {
      label: "Extracted Info",
      icon: <DocumentListIcon />,
      content: result.extractedInfo.length ? (
        <ul className="list-disc space-y-1 pl-5">
          {result.extractedInfo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        "No extracted details returned."
      ),
    },
    {
      label: "Explanation",
      icon: <LightbulbIcon />,
      content: result.explanation,
    },
    {
      label: "Assumptions",
      icon: <WarningTriangleIcon />,
      content: result.assumptions,
    },
    {
      label: "Suggested Action",
      icon: <ArrowRightCircleIcon />,
      content: result.suggestedAction,
    },
  ];

  return (
    <article className="animate-fade-slide-up rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900 sm:p-6">
      <div className="mb-4 space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <InfoIcon />
          AI-generated answer • Based on uploaded document
        </span>
        <h2 className="text-xl font-bold text-fau-blue dark:text-white">
          Transit answer
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Review the answer, extracted details, and suggested next step.
        </p>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {sections.map((section) => (
          <section key={section.label} className="py-4 first:pt-0 last:pb-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-fau-sky text-xs font-bold text-fau-blue">
                {section.icon}
              </span>
              <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-700 dark:text-slate-200">
                {section.label}
              </h3>
            </div>
            <div className="text-sm leading-6 text-slate-700 dark:text-slate-300">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

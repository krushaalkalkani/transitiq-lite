import type { ReactNode } from "react";
import type { TransitResponse } from "@/lib/types";

export type QueryHistoryItem = {
  id: string;
  question: string;
  result: TransitResponse;
};

type QueryHistoryProps = {
  items: QueryHistoryItem[];
};

type HistorySectionProps = {
  label: string;
  icon: ReactNode;
  children: ReactNode;
};

function ClockIcon() {
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
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ChevronDownIcon() {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckCircleIcon() {
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
      className="h-3.5 w-3.5"
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
    </svg>
  );
}

function LightbulbIcon() {
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
      className="h-3.5 w-3.5"
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
      className="h-3.5 w-3.5"
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

function HistorySection({ label, icon, children }: HistorySectionProps) {
  return (
    <section className="border-t border-slate-100 px-4 py-3">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          {icon}
        </span>
        <h4>{label}</h4>
      </div>
      <div className="text-xs leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

function HistoryResult({ result }: { result: TransitResponse }) {
  return (
    <div className="overflow-hidden border-t border-slate-100 bg-white/80 backdrop-blur-sm">
      <section className="bg-gradient-to-r from-fau-blue to-blue-600 px-4 py-3">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/70">
          <CheckCircleIcon />
          <h4>Direct Answer</h4>
        </div>
        <p className="text-sm font-medium leading-relaxed text-white">
          {result.directAnswer}
        </p>
      </section>

      <HistorySection label="Extracted Info" icon={<DocumentListIcon />}>
        {result.extractedInfo.length ? (
          <div className="flex flex-wrap gap-1.5">
            {result.extractedInfo.map((item) => (
              <span
                key={item}
                className="rounded-lg border-l-2 border-blue-400 bg-blue-50/70 px-2.5 py-1 text-[11px] font-medium text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p>No extracted details returned.</p>
        )}
      </HistorySection>

      <HistorySection label="Explanation" icon={<LightbulbIcon />}>
        <p>{result.explanation}</p>
      </HistorySection>

      <HistorySection label="Assumptions" icon={<WarningTriangleIcon />}>
        <p>{result.assumptions}</p>
      </HistorySection>

      <HistorySection label="Suggested Action" icon={<ArrowRightCircleIcon />}>
        <p>{result.suggestedAction}</p>
      </HistorySection>
    </div>
  );
}

export function QueryHistory({ items }: QueryHistoryProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-fau-blue to-blue-500 text-white shadow-sm">
          <ClockIcon />
        </span>
        <h2>Recent Questions</h2>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <details
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-slate-100 bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md open:bg-white"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-3 px-4 py-3 text-left transition-all duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 [&::-webkit-details-marker]:hidden">
              <span className="text-sm font-medium leading-5 text-slate-700">
                {item.question}
              </span>
              <span className="mt-0.5 text-slate-400 transition-all duration-300 group-open:rotate-180">
                <ChevronDownIcon />
              </span>
            </summary>
            <HistoryResult result={item.result} />
          </details>
        ))}
      </div>
    </section>
  );
}

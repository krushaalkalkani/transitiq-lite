import type { TransitResponse } from "@/lib/types";

export type QueryHistoryItem = {
  id: string;
  question: string;
  result: TransitResponse;
};

type QueryHistoryProps = {
  items: QueryHistoryItem[];
};

type HistorySection = {
  label: string;
  value: string | string[];
};

function HistoryResult({ result }: { result: TransitResponse }) {
  const sections: HistorySection[] = [
    {
      label: "Direct Answer",
      value: result.directAnswer,
    },
    {
      label: "Extracted Info",
      value: result.extractedInfo,
    },
    {
      label: "Explanation",
      value: result.explanation,
    },
    {
      label: "Assumptions",
      value: result.assumptions,
    },
    {
      label: "Suggested Action",
      value: result.suggestedAction,
    },
  ];

  return (
    <div className="space-y-4 border-t border-slate-200 px-4 py-4 dark:border-slate-700">
      {sections.map((section) => (
        <section key={section.label} className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
            {section.label}
          </h4>
          {Array.isArray(section.value) ? (
            section.value.length ? (
              <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {section.value.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                No extracted details returned.
              </p>
            )
          ) : (
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
              {section.value}
            </p>
          )}
        </section>
      ))}
    </div>
  );
}

export function QueryHistory({ items }: QueryHistoryProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
          Recent question history
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Open a previous question to review its full answer.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.id}
            className="group rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-fau-blue transition hover:bg-fau-sky focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 dark:text-white dark:hover:bg-slate-800 dark:focus:ring-offset-slate-950">
              <span>{item.question}</span>
              <span
                className="mt-0.5 text-slate-500 transition group-open:rotate-180 dark:text-slate-400"
                aria-hidden="true"
              >
                v
              </span>
            </summary>
            <HistoryResult result={item.result} />
          </details>
        ))}
      </div>
    </section>
  );
}

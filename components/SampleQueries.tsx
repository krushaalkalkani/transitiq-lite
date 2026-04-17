"use client";

import type { University } from "@/lib/types";

type SampleQueriesProps = {
  disabled?: boolean;
  sampleImageUrl?: string;
  university?: University | null;
  onSelect: (question: string) => void;
};

const defaultSampleQuestions = [
  "Does the Blue Route run on Sundays?",
  "Which shuttle stops at the Library?",
  "What time does the Green Route stop running?",
];

function getSampleQuestions(university: University | null | undefined) {
  if (!university) {
    return defaultSampleQuestions;
  }

  const firstRouteName = university.routes[0]?.name ?? university.transitSystemName;
  const secondRouteName = university.routes[1]?.name ?? firstRouteName;

  return [
    `Does the ${firstRouteName} run on weekends?`,
    `Which stops does the ${secondRouteName} serve?`,
    `What are the operating hours for ${university.transitSystemName}?`,
  ];
}

export function SampleQueries({
  disabled = false,
  onSelect,
  university = null,
}: SampleQueriesProps) {
  const sampleQuestions = getSampleQuestions(university);

  return (
    <section className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
      <span className="font-medium">Try:</span>
      <div className="contents">
        {sampleQuestions.map((sampleQuestion, index) => (
          <span key={sampleQuestion} className="inline-flex items-center gap-2">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(sampleQuestion)}
              className="rounded-full text-left text-xs font-medium text-slate-500 transition-all duration-200 hover:text-fau-blue hover:underline focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:no-underline"
            >
              {sampleQuestion}
            </button>
            {index < sampleQuestions.length - 1 ? (
              <span className="text-slate-300">·</span>
            ) : null}
          </span>
        ))}
      </div>
    </section>
  );
}

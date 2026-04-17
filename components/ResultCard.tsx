"use client";

import { useMemo, useState } from "react";
import type { TransitResponse } from "@/lib/types";

type ResultCardProps = {
  result: TransitResponse;
  transitUrl?: string;
};

type DetailKey = "extractedInfo" | "explanation" | "assumptions" | "suggestedAction";

const detailLabels: Record<DetailKey, string> = {
  extractedInfo: "Extracted Info",
  explanation: "Explanation",
  assumptions: "Assumptions",
  suggestedAction: "Next Steps",
};

function SparkleIcon() {
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
      <path d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1L6.5 8.5l4.1-1.4L12 3Z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
    </svg>
  );
}

function needsMoreInfo(result: TransitResponse) {
  const combinedText = [
    result.directAnswer,
    result.explanation,
    result.assumptions,
    result.suggestedAction,
  ]
    .join(" ")
    .toLowerCase();

  return (
    combinedText.includes("not enough") ||
    combinedText.includes("insufficient") ||
    combinedText.includes("cannot determine") ||
    combinedText.includes("can't determine") ||
    combinedText.includes("not available")
  );
}

export function ResultCard({ result, transitUrl }: ResultCardProps) {
  const [activeDetail, setActiveDetail] = useState<DetailKey | null>(null);
  const sources = Array.isArray(result.sources)
    ? result.sources.filter(Boolean)
    : [];
  const showSuggestion = needsMoreInfo(result);
  const timestamp = useMemo(() => {
    return new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }, []);

  const activeContent = activeDetail ? (
    activeDetail === "extractedInfo" ? (
      result.extractedInfo.length ? (
        <div className="flex flex-wrap gap-2">
          {result.extractedInfo.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p>No extracted details returned.</p>
      )
    ) : (
      <p>
        {activeDetail === "explanation"
          ? result.explanation
          : activeDetail === "assumptions"
            ? result.assumptions
            : result.suggestedAction}
      </p>
    )
  ) : null;

  return (
    <article className="animate-slide-up w-full rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-600">
          <span className="text-fau-blue">
            <SparkleIcon />
          </span>
          TransitIQ Lite
        </div>
        <span className="text-slate-400">{timestamp}</span>
      </div>

      <section className="rounded-2xl bg-gradient-to-br from-fau-blue to-blue-600 p-5 text-white shadow-lg shadow-blue-900/10">
        <p className="text-base font-medium leading-relaxed">
          {result.directAnswer}
        </p>
      </section>

      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(detailLabels) as DetailKey[]).map((detailKey) => (
          <button
            key={detailKey}
            type="button"
            onClick={() =>
              setActiveDetail((currentDetail) =>
                currentDetail === detailKey ? null : detailKey,
              )
            }
            className={`min-h-9 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 ${
              activeDetail === detailKey
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {detailLabels[detailKey]}
          </button>
        ))}
      </div>

      {activeDetail ? (
        <div className="mt-4 grid grid-rows-[1fr] transition-all duration-300">
          <section className="animate-fade-slide-up overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {detailLabels[activeDetail]}
            </h3>
            {activeContent}
          </section>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        {sources.length ? (
          sources.map((source) => (
            <span
              key={source}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500"
            >
              {source}
            </span>
          ))
        ) : (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
            Source metadata unavailable
          </span>
        )}
      </div>

      {showSuggestion ? (
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          For more details, try uploading a photo of the actual schedule
          {transitUrl ? (
            <>
              {" "}
              or check{" "}
              <a
                href={transitUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-fau-blue hover:underline"
              >
                transit info
              </a>
            </>
          ) : null}
          .
        </p>
      ) : null}
    </article>
  );
}

"use client";

import { useEffect, useState } from "react";

const loadingSteps = [
  "Reading transit data...",
  "Analyzing...",
  "Generating answer...",
];

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

export function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStepIndex((currentStep) => (currentStep + 1) % loadingSteps.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="animate-slide-up rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <span className="text-fau-blue">
          <SparkleIcon />
        </span>
        TransitIQ Lite
      </div>

      <div className="flex items-center gap-1.5" aria-label="TransitIQ Lite is typing">
        <span className="h-2 w-2 animate-typing-dot rounded-full bg-slate-400" />
        <span className="h-2 w-2 animate-typing-dot rounded-full bg-slate-400 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-typing-dot rounded-full bg-slate-400 [animation-delay:300ms]" />
      </div>

      <p className="mt-3 text-xs font-medium text-slate-400">
        {loadingSteps[stepIndex]}
      </p>
    </div>
  );
}

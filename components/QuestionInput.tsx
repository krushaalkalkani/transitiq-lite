"use client";

import { ChangeEvent, useEffect, useRef } from "react";

type QuestionInputProps = {
  value: string;
  disabled?: boolean;
  compact?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
};

function ChatBubbleIcon() {
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
      <path d="M21 11.5a8.5 8.5 0 0 1-9.5 8.45 8.7 8.7 0 0 1-3.2-.95L3 20l1.2-4.4A8.4 8.4 0 0 1 3.5 12 8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

export function QuestionInput({
  value,
  disabled = false,
  compact = false,
  placeholder = "What would you like to know about this route?",
  onChange,
}: QuestionInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "112px";
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 112), 180)}px`;
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <section className="space-y-2">
      {!compact ? (
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-fau-blue to-blue-500 text-white shadow-sm">
            <ChatBubbleIcon />
          </span>
          <label htmlFor="question" className="font-semibold">
            Your Question
          </label>
        </div>
      ) : null}
      <textarea
        ref={textareaRef}
        id="question"
        value={value}
        disabled={disabled}
        rows={3}
        placeholder={placeholder}
        onChange={handleChange}
        className="min-h-28 w-full resize-none overflow-hidden rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      />
    </section>
  );
}

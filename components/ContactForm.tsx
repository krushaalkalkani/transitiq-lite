"use client";

import { FormEvent, useState } from "react";

const emailAddress = "support@transitiqlite.app";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    setHasCopied(true);
    window.setTimeout(() => setHasCopied(false), 1800);

    try {
      await navigator.clipboard.writeText(emailAddress);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = emailAddress;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Email
            </p>
            <a
              href={`mailto:${emailAddress}`}
              className="mt-2 block break-all text-base font-semibold text-slate-900 hover:text-fau-blue"
            >
              {emailAddress}
            </a>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-fau-blue transition-all duration-200 hover:border-fau-blue hover:bg-fau-sky"
          >
            {hasCopied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Support
            </p>
            <p className="mt-2 font-medium text-slate-700">
              Online support
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Response time
            </p>
            <p className="mt-2 font-medium text-slate-700">
              Usually within 24 hours
            </p>
          </div>
        </div>
      </div>

      {isSubmitted ? (
        <div className="animate-fade-slide-up rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
          <div className="flex items-start gap-3">
            <span className="animate-check-pop flex h-9 w-9 flex-none items-center justify-center rounded-full bg-emerald-600 text-white">
              <CheckIcon />
            </span>
            <p className="text-sm font-semibold leading-6">
              Thanks! Your message has been received.
            </p>
          </div>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">Name</span>
            <input
              required
              name="name"
              type="text"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">Email</span>
            <input
              required
              name="email"
              type="email"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-slate-900">
              Subject
            </span>
            <select
              required
              name="subject"
              defaultValue="General"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option>General</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>University Request</option>
              <option>Other</option>
            </select>
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-slate-900">
              Message
            </span>
            <textarea
              required
              name="message"
              rows={6}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-fau-blue to-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
        >
          Send message
        </button>
      </form>
    </div>
  );
}

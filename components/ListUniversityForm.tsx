"use client";

import { FormEvent, useState } from "react";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

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

export function ListUniversityForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-6">
      {isSubmitted ? (
        <div className="animate-fade-slide-up rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
          <div className="flex items-start gap-3">
            <span className="animate-check-pop flex h-9 w-9 flex-none items-center justify-center rounded-full bg-emerald-600 text-white">
              <CheckIcon />
            </span>
            <p className="text-sm font-semibold leading-6">
              Thanks! We&apos;ve received your request. We&apos;ll review it
              and add your university soon.
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
            <span className="text-sm font-semibold text-slate-900">
              University Name
            </span>
            <input
              required
              name="universityName"
              type="text"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">City</span>
            <input
              required
              name="city"
              type="text"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">State</span>
            <select
              required
              name="state"
              defaultValue=""
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="" disabled>
                Select a state
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Transit System Name
            </span>
            <input
              name="transitSystemName"
              type="text"
              placeholder="e.g. BruinBus, CrimsonRide"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-slate-900">
              Transit Website URL
            </span>
            <input
              name="transitUrl"
              type="url"
              placeholder="https://..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-slate-900">
              Your Email
            </span>
            <input
              required
              name="email"
              type="email"
              placeholder="your.email@university.edu"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-slate-900">
              Additional Notes
            </span>
            <textarea
              name="notes"
              rows={5}
              placeholder="Anything else we should know?"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-fau-blue to-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
        >
          Submit request
        </button>
      </form>

      <p className="text-center text-sm font-medium text-slate-500">
        Currently supporting 50+ universities across the United States
      </p>
    </div>
  );
}

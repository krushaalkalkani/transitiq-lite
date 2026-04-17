"use client";

type TransitLinkInputProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
};

function LinkIcon() {
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
      <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
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

export function TransitLinkInput({
  value,
  disabled,
  onChange,
}: TransitLinkInputProps) {
  const hasValue = value.trim().length > 0;
  const isValidUrl = /^https?:\/\//i.test(value.trim());

  return (
    <div className="relative flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-slate-400 shadow-sm backdrop-blur-sm">
      <LinkIcon />
      <input
        id="transit-link"
        type="text"
        value={value}
        disabled={disabled}
        placeholder="Paste transit page URL"
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-8 min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-600 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:text-slate-400 ${
          hasValue && !isValidUrl ? "text-red-600" : ""
        }`}
      />
      {hasValue && isValidUrl ? (
        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckIcon />
        </span>
      ) : null}
    </div>
  );
}

"use client";

import { KeyboardEvent, useMemo, useState } from "react";
import universitiesData from "@/data/universities.json";
import type { University } from "@/lib/types";

type UniversitySelectorProps = {
  selectedId: string | null;
  disabled: boolean;
  onSelect: (university: University) => void;
  onClear?: () => void;
};

const universities = universitiesData as University[];

function SearchIcon() {
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
      <path d="m21 21-4.3-4.3" />
      <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
    </svg>
  );
}

function XIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function UniversitySelector({
  selectedId,
  disabled,
  onSelect,
  onClear,
}: UniversitySelectorProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedUniversity = universities.find(
    (university) => university.id === selectedId,
  );

  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return universities
      .filter((university) =>
        [
          university.name,
          university.city,
          university.state,
          university.transitSystemName,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 8);
  }, [query]);

  const selectUniversity = (university: University) => {
    onSelect(university);
    setQuery("");
    setIsOpen(false);
    setActiveIndex(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && event.key !== "Escape") {
      setIsOpen(true);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        matches.length ? (currentIndex + 1) % matches.length : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        matches.length
          ? (currentIndex - 1 + matches.length) % matches.length
          : 0,
      );
    }

    if (event.key === "Enter" && matches[activeIndex]) {
      event.preventDefault();
      selectUniversity(matches[activeIndex]);
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(0);
    }
  };

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <section className="space-y-2">
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-slate-400">
          <SearchIcon />
        </span>
        <input
          id="university-search"
          type="text"
          value={query}
          disabled={disabled}
          placeholder="Search your university..."
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="university-options"
          aria-autocomplete="list"
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="min-h-11 w-full rounded-2xl border border-white/70 bg-white/80 py-2 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        />

        {showDropdown ? (
          <div
            id="university-options"
            role="listbox"
            className="absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-white/70 bg-white/90 p-2 shadow-xl backdrop-blur-xl"
          >
            {matches.length ? (
              matches.map((university, index) => (
                <button
                  key={university.id}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectUniversity(university)}
                  className={`w-full rounded-2xl px-3 py-3 text-left transition-all duration-300 ${
                    index === activeIndex
                      ? "scale-[1.01] bg-blue-50 text-fau-blue"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-sm font-bold">
                    {university.name}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {university.city}, {university.state}
                  </span>
                  <span className="mt-1 block text-xs text-slate-400">
                    {university.transitSystemName}
                  </span>
                </button>
              ))
            ) : (
              <p className="px-3 py-4 text-sm text-slate-400">
                No universities found.
              </p>
            )}
          </div>
        ) : null}
      </div>

      {selectedUniversity ? (
        <div className="university-card-shimmer relative overflow-hidden rounded-2xl bg-gradient-to-r from-fau-blue to-blue-600 px-3 py-2.5 text-white shadow-lg shadow-blue-500/15 transition-all duration-300 hover:scale-[1.01]">
          <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/10" />
          <div className="flex min-w-0 items-center gap-2 pr-8">
            <p className="truncate text-sm font-bold leading-5 tracking-tight text-white">
              {selectedUniversity.name}
            </p>
            <span className="h-1 w-1 flex-none rounded-full bg-blue-100/70" />
            <p className="truncate text-xs font-medium text-blue-100">
              {selectedUniversity.transitSystemName}
            </p>
          </div>

          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              onClear?.();
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:text-white/30"
            aria-label="Clear selected university"
          >
            <XIcon />
          </button>
        </div>
      ) : null}
    </section>
  );
}

"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

type ImageUploaderProps = {
  imageName?: string;
  previewUrl: string | null;
  disabled?: boolean;
  onClear: () => void;
  onImageSelected: (file: File) => void;
};

export function ImageUploader({
  imageName,
  previewUrl,
  disabled = false,
  onClear,
  onImageSelected,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    onImageSelected(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleBrowse = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <section>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) {
            setIsDragging(true);
          }
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-3 transition-all duration-200 ${
          isDragging
            ? "border-fau-blue bg-blue-50/50"
            : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-50"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          disabled={disabled}
          onChange={handleInputChange}
        />

        {previewUrl ? (
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Uploaded transit document preview"
                className="h-64 w-full object-contain sm:h-80"
              />
              <button
                type="button"
                disabled={disabled}
                onClick={handleBrowse}
                className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-fau-blue focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                Change
              </button>
            </div>

            <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="truncate text-sm font-medium text-slate-600">
                {imageName || "Selected transit document"}
              </p>
              <button
                type="button"
                disabled={disabled}
                onClick={onClear}
                className="self-start text-xs font-semibold text-slate-400 transition-all duration-200 hover:text-fau-blue hover:underline disabled:cursor-not-allowed disabled:text-slate-300 sm:self-auto"
              >
                Remove image
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={handleBrowse}
            className="flex min-h-64 w-full flex-col items-center justify-center rounded-xl px-4 py-8 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              >
                <path d="M16 16l-4-4-4 4" />
                <path d="M12 12v8" />
                <path d="M20.4 16.5A5 5 0 0 0 16 9h-1.3A6 6 0 1 0 5 15.8" />
                <path d="M6 20h12" />
              </svg>
            </span>
            <span className="mt-4 text-base font-medium text-slate-500">
              Drop your transit photo here
            </span>
            <span className="mt-2 text-xs text-slate-400">
              or click to browse • supports PNG, JPG
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

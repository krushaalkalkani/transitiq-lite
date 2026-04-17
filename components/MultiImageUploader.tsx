"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

type MultiImageUploaderProps = {
  images: File[];
  previews: string[];
  disabled: boolean;
  showOptionalMessage?: boolean;
  compact?: boolean;
  onImagesChange: (files: File[], previews: string[]) => void;
};

const MAX_IMAGES = 5;

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
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

function CameraIcon() {
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
      <path d="M8 7h8l1.5 2H21v10H3V9h3.5L8 7Z" />
      <path d="M12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );
}

function revokePreview(preview: string) {
  if (preview.startsWith("blob:")) {
    URL.revokeObjectURL(preview);
  }
}

export function MultiImageUploader({
  images,
  previews,
  disabled,
  showOptionalMessage = false,
  compact = false,
  onImagesChange,
}: MultiImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const uploadStatusText =
    showOptionalMessage && images.length === 0
      ? "Photos optional — university data and transit link will be used"
      : `${images.length} of ${MAX_IMAGES} photos uploaded`;

  const addFiles = (fileList: FileList | File[]) => {
    if (disabled) {
      return;
    }

    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      return;
    }

    const acceptedFiles = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remainingSlots);

    const nextPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));

    onImagesChange([...images, ...acceptedFiles], [...previews, ...nextPreviews]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const removeImage = (indexToRemove: number) => {
    const previewToRemove = previews[indexToRemove];
    revokePreview(previewToRemove);

    onImagesChange(
      images.filter((_, index) => index !== indexToRemove),
      previews.filter((_, index) => index !== indexToRemove),
    );
  };

  if (compact) {
    return (
      <section>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          disabled={disabled}
          onChange={handleInputChange}
        />

        <div
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) {
              setIsDragging(true);
            }
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex min-h-14 items-center gap-3 rounded-2xl border border-white/70 bg-white/55 p-2 backdrop-blur-sm transition-all duration-300 ${
            isDragging ? "border-fau-blue bg-blue-50/60" : ""
          } ${disabled ? "opacity-60" : ""}`}
        >
          {previews.slice(0, 3).map((preview, index) => (
            <div
              key={`${preview}-${index}`}
              className="relative h-14 w-14 flex-none overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={`Transit document preview ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                disabled={disabled}
                onClick={() => removeImage(index)}
                className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-all duration-200 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2"
                aria-label={`Remove image ${index + 1}`}
              >
                <XIcon />
              </button>
            </div>
          ))}

          {images.length < MAX_IMAGES ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              className="flex h-14 w-14 flex-none items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/80 text-slate-400 transition-all duration-300 hover:border-fau-blue hover:bg-blue-50/60 hover:text-fau-blue focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
              aria-label="Add photos"
            >
              <PlusIcon />
            </button>
          ) : null}

          <button
            type="button"
            disabled={disabled || images.length >= MAX_IMAGES}
            onClick={() => inputRef.current?.click()}
            className="min-h-11 min-w-0 text-left text-sm font-semibold text-slate-600 transition-all duration-200 hover:text-fau-blue disabled:cursor-not-allowed disabled:text-slate-300"
          >
            Add photos
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-fau-blue to-blue-500 text-white shadow-sm">
          <CameraIcon />
        </span>
        Transit Photos (optional)
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) {
            setIsDragging(true);
          }
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-3 backdrop-blur-sm transition-all duration-300 ${
          isDragging
            ? "border-fau-blue bg-blue-50/50"
            : "border-white/70 bg-white/55"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          disabled={disabled}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-2 gap-3">
          {previews.map((preview, index) => (
            <div
              key={`${preview}-${index}`}
              className="relative overflow-hidden rounded-2xl border border-white/70 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={`Transit document preview ${index + 1}`}
                className="h-20 w-full object-cover"
              />
              <button
                type="button"
                disabled={disabled}
                onClick={() => removeImage(index)}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:text-slate-300"
                aria-label={`Remove image ${index + 1}`}
              >
                <XIcon />
              </button>
            </div>
          ))}

          {images.length < MAX_IMAGES ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              className="flex h-20 min-h-11 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/80 text-slate-400 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-fau-blue hover:bg-blue-50/60 hover:text-fau-blue focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
            >
              <PlusIcon />
              <span className="mt-1 text-xs font-semibold">Add photo</span>
            </button>
          ) : null}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-slate-400">{uploadStatusText}</p>
    </section>
  );
}

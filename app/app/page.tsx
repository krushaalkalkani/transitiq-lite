"use client";

import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { LoadingState } from "@/components/LoadingState";
import { RouteInfoPanel } from "@/components/RouteInfoPanel";
import { ResultCard } from "@/components/ResultCard";
import { TransitLinkInput } from "@/components/TransitLinkInput";
import { UniversitySelector } from "@/components/UniversitySelector";
import universitiesData from "@/data/universities.json";
import type { TransitResponse, University } from "@/lib/types";

const SAMPLE_IMAGE_URL = "/fau-transit-sample.png";
const SAMPLE_IMAGE_NAME = "fau-transit-sample.png";
const MAX_IMAGES = 5;
const universities = universitiesData as University[];
const defaultUniversity =
  universities.find((university) => university.id === "fau") ?? null;
const quickSelectUniversities = ["fau", "ucla", "mit"]
  .map((id) => universities.find((university) => university.id === id))
  .filter((university): university is University => Boolean(university));

type QueryHistoryItem = {
  id: string;
  question: string;
  result: TransitResponse;
};

function revokePreviewUrls(previewUrls: string[]) {
  previewUrls.forEach((previewUrl) => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
  });
}

function BackArrowIcon() {
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
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function SparkleIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
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

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <path d="m21 21-4.3-4.3" />
      <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
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

function MemoryCameraIcon() {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function LinkIcon() {
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
      className="h-3.5 w-3.5"
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

function SendIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

function ButtonSpinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
    />
  );
}

function formatUniversityCrumb(university: University) {
  return `${university.id.toUpperCase()} → ${university.transitSystemName}`;
}

function getSampleQuestions(university: University | null) {
  if (!university) {
    return [];
  }

  const firstRouteName = university.routes[0]?.name ?? university.transitSystemName;
  const secondRouteName = university.routes[1]?.name ?? firstRouteName;

  return [
    `Does the ${firstRouteName} run on weekends?`,
    `Which stops does the ${secondRouteName} serve?`,
    `What are the operating hours for ${university.transitSystemName}?`,
  ];
}

function RouteSourcesPanel({
  selectedUniversity,
  isLoading,
  transitLink,
  isEditingTransitLink,
  onTransitLinkChange,
  onEditTransitLink,
  onUniversitySelect,
  onUniversityClear,
}: {
  selectedUniversity: University | null;
  isLoading: boolean;
  transitLink: string;
  isEditingTransitLink: boolean;
  onTransitLinkChange: (value: string) => void;
  onEditTransitLink: () => void;
  onUniversitySelect: (university: University) => void;
  onUniversityClear: () => void;
}) {
  return (
    <div className="space-y-4">
      <UniversitySelector
        selectedId={selectedUniversity?.id ?? null}
        disabled={isLoading}
        onSelect={onUniversitySelect}
        onClear={onUniversityClear}
      />

      {selectedUniversity && !isEditingTransitLink ? (
        <div className="flex items-center gap-2 px-1 text-xs text-slate-400">
          <LinkIcon />
          <a
            href={transitLink || selectedUniversity.transitUrl}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 truncate font-medium text-slate-500 hover:text-fau-blue hover:underline"
          >
            {transitLink || selectedUniversity.transitUrl}
          </a>
          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckIcon />
          </span>
          <button
            type="button"
            onClick={onEditTransitLink}
            className="font-semibold text-slate-400 transition-all duration-200 hover:text-fau-blue hover:underline"
          >
            edit
          </button>
        </div>
      ) : (
        <TransitLinkInput
          value={transitLink}
          disabled={isLoading}
          onChange={onTransitLinkChange}
        />
      )}

      <RouteInfoPanel university={selectedUniversity} />
    </div>
  );
}

function UserQuestionBubble({
  question,
  previewUrls = [],
}: {
  question: string;
  previewUrls?: string[];
}) {
  return (
    <div className="animate-slide-in-right ml-auto max-w-xl">
      <div className="rounded-2xl rounded-br-md bg-fau-blue px-4 py-3 text-sm font-medium leading-6 text-white shadow-sm">
        {question}
      </div>

      {previewUrls.length ? (
        <div className="mt-2 flex justify-end gap-1.5">
          {previewUrls.slice(0, 5).map((previewUrl, index) => (
            <div
              key={`${previewUrl}-${index}`}
              className="h-8 w-8 overflow-hidden rounded-lg border border-white bg-slate-100 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={`Attached transit photo ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MemoryCard({
  imageFiles,
  previewUrls,
  isLoading,
  onAddPhoto,
  onRemoveImage,
}: {
  imageFiles: File[];
  previewUrls: string[];
  isLoading: boolean;
  onAddPhoto: () => void;
  onRemoveImage: (index: number) => void;
}) {
  return (
    <div className="animate-fade-in rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-fau-blue">
            <MemoryCameraIcon />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Memory
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          {imageFiles.length}/{MAX_IMAGES} photos
        </span>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2">
        {previewUrls.map((previewUrl, index) => (
          <div
            key={`${previewUrl}-${index}`}
            className="group relative aspect-square overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={`Attached transit photo ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onRemoveImage(index)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 disabled:cursor-not-allowed"
              aria-label={`Remove attached photo ${index + 1}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-600 shadow-sm">
                <XIcon />
              </span>
            </button>
          </div>
        ))}

        {imageFiles.length < MAX_IMAGES ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={onAddPhoto}
            className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400 transition-all duration-200 hover:border-fau-blue hover:bg-blue-50 hover:text-fau-blue focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Add more transit photos"
          >
            <PlusIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function WelcomeState({
  university,
  disabled,
  onSampleSelect,
}: {
  university: University;
  disabled: boolean;
  onSampleSelect: (question: string) => void;
}) {
  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
      <p className="text-lg font-medium text-slate-900">{university.name}</p>
      <p className="mt-2 text-sm text-slate-400">
        Ask me anything about {university.transitSystemName}
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
        {getSampleQuestions(university).map((sampleQuestion) => (
          <button
            key={sampleQuestion}
            type="button"
            disabled={disabled}
            onClick={() => onSampleSelect(sampleQuestion)}
            className="group min-h-24 rounded-xl bg-slate-50 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="text-sm font-medium leading-5 text-slate-700">
                {sampleQuestion}
              </span>
              <span className="text-slate-300 transition-all duration-200 group-hover:text-fau-blue">
                →
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectUniversityState({
  disabled,
  onUniversitySelect,
}: {
  disabled: boolean;
  onUniversitySelect: (university: University) => void;
}) {
  return (
    <div className="mx-auto flex min-h-full max-w-xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 text-slate-300">
        <SearchIcon />
      </div>
      <p className="mt-5 text-lg font-medium text-slate-900">
        Select your university to get started
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {quickSelectUniversities.map((university) => (
          <button
            key={university.id}
            type="button"
            disabled={disabled}
            onClick={() => onUniversitySelect(university)}
            className="min-h-11 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-fau-blue transition-all duration-200 hover:bg-fau-sky focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {university.id.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

function ErrorResponse({
  message,
  canRetry,
  onRetry,
}: {
  message: string;
  canRetry: boolean;
  onRetry: () => void;
}) {
  return (
    <div className="animate-slide-up rounded-2xl border border-red-200 bg-red-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-red-700">
        <SparkleIcon />
        TransitIQ Lite
      </div>
      <p className="text-sm font-medium leading-relaxed text-red-700">
        {message}
      </p>
      <button
        type="button"
        disabled={!canRetry}
        onClick={onRetry}
        className="mt-3 min-h-10 text-sm font-semibold text-red-600 transition-all duration-200 hover:underline disabled:cursor-not-allowed disabled:text-red-300 disabled:hover:no-underline"
      >
        Try again
      </button>
    </div>
  );
}

export default function TransitAppPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const previewUrlsRef = useRef<string[]>([]);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const questionInputRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationEndRef = useRef<HTMLDivElement | null>(null);
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(defaultUniversity);
  const [transitLink, setTransitLink] = useState(
    defaultUniversity?.transitUrl ?? "",
  );
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<TransitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);
  const [isEditingTransitLink, setIsEditingTransitLink] = useState(false);
  const hasTransitLinkSource = /^https?:\/\//i.test(transitLink.trim());
  const hasInformationSource =
    imageFiles.length > 0 || hasTransitLinkSource || Boolean(selectedUniversity);
  const canSubmit =
    !isLoading && Boolean(question.trim()) && hasInformationSource;
  const orderedConversation = [...queryHistory].reverse();
  const latestQuestionId = queryHistory[0]?.id ?? null;

  useEffect(() => {
    previewUrlsRef.current = previewUrls;
  }, [previewUrls]);

  useEffect(() => {
    return () => revokePreviewUrls(previewUrlsRef.current);
  }, []);

  useEffect(() => {
    const textarea = questionInputRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 48), 96)}px`;
  }, [question]);

  useEffect(() => {
    if (selectedUniversity && !isLoading) {
      questionInputRef.current?.focus();
    }
  }, [isLoading, selectedUniversity]);

  useEffect(() => {
    const endNode = conversationEndRef.current;

    if (!endNode) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    endNode.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [queryHistory, isLoading, error]);

  const handleImagesChange = (files: File[], previews: string[]) => {
    setImageFiles(files);
    setPreviewUrls(previews);
    setResult(null);
    setError(null);
  };

  const addImageFiles = (fileList: FileList | File[]) => {
    if (isLoading) {
      return;
    }

    const remainingSlots = MAX_IMAGES - imageFiles.length;

    if (remainingSlots <= 0) {
      return;
    }

    const acceptedFiles = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remainingSlots);

    if (!acceptedFiles.length) {
      return;
    }

    const nextPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    handleImagesChange([...imageFiles, ...acceptedFiles], [...previewUrls, ...nextPreviews]);
  };

  const handlePhotoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addImageFiles(event.target.files);
    }

    event.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    const previewToRemove = previewUrls[indexToRemove];

    if (previewToRemove?.startsWith("blob:")) {
      URL.revokeObjectURL(previewToRemove);
    }

    handleImagesChange(
      imageFiles.filter((_, index) => index !== indexToRemove),
      previewUrls.filter((_, index) => index !== indexToRemove),
    );
  };

  const loadSampleImage = async () => {
    const response = await fetch(SAMPLE_IMAGE_URL);

    if (!response.ok) {
      throw new Error("Sample image could not be loaded.");
    }

    const blob = await response.blob();
    return new File([blob], SAMPLE_IMAGE_NAME, {
      type: blob.type || "image/png",
    });
  };

  const handleSampleSelect = async (sampleQuestion: string) => {
    setQuestion(sampleQuestion);
    setResult(null);
    setError(null);

    if (selectedUniversity) {
      await analyzeCurrentQuestion(sampleQuestion);
      return;
    }

    try {
      const file = await loadSampleImage();
      revokePreviewUrls(previewUrlsRef.current);
      setImageFiles([file]);
      setPreviewUrls([SAMPLE_IMAGE_URL]);

      if (defaultUniversity) {
        setSelectedUniversity(defaultUniversity);
        setTransitLink(defaultUniversity.transitUrl);
      }
    } catch (sampleError) {
      const message =
        sampleError instanceof Error
          ? sampleError.message
          : "Sample image could not be loaded.";
      setError(`${message} Upload a transit document instead.`);
    }
  };

  const analyzeCurrentQuestion = async (questionOverride = question) => {
    const questionToAnalyze = questionOverride.trim();

    if (!hasInformationSource) {
      setError(
        "Upload a transit photo, paste a transit link, or select your university to get started.",
      );
      return;
    }

    if (!questionToAnalyze) {
      setError("Enter a transit question before analyzing.");
      return;
    }

    const formData = new FormData();
    imageFiles.forEach((imageFile) => {
      formData.append("images", imageFile);
    });
    formData.append("question", questionToAnalyze);

    if (selectedUniversity) {
      formData.append("universityId", selectedUniversity.id);
    }

    if (transitLink.trim()) {
      formData.append("transitLink", transitLink.trim());
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to analyze the document.");
      }

      const nextResult = payload as TransitResponse;

      setResult(nextResult);
      setQueryHistory((currentHistory) =>
        [
          {
            id: `${Date.now()}-${currentHistory.length}`,
            question: questionToAnalyze,
            result: nextResult,
          },
          ...currentHistory,
        ].slice(0, 5),
      );
      setQuestion("");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to analyze the document.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await analyzeCurrentQuestion();
  };

  const handleQuestionKeyDown = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (canSubmit) {
      await analyzeCurrentQuestion();
    }
  };

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    setTransitLink(university.transitUrl);
    setIsEditingTransitLink(false);
    setResult(null);
    setError(null);
  };

  const handleUniversityClear = () => {
    setSelectedUniversity(null);
    setTransitLink("");
    setIsEditingTransitLink(false);
    setResult(null);
    setError(null);
  };

  const routeSourcesPanel = (
    <RouteSourcesPanel
      selectedUniversity={selectedUniversity}
      isLoading={isLoading}
      transitLink={transitLink}
      isEditingTransitLink={isEditingTransitLink}
      onTransitLinkChange={setTransitLink}
      onEditTransitLink={() => setIsEditingTransitLink(true)}
      onUniversitySelect={handleUniversitySelect}
      onUniversityClear={handleUniversityClear}
    />
  );
  const questionPlaceholder = selectedUniversity
    ? `Ask about ${selectedUniversity.name} transit...`
    : "Select a university above to get started";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 h-14 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
        <div className="grid h-full grid-cols-[1fr_auto] items-center gap-3 px-4 sm:grid-cols-[1fr_minmax(0,1fr)_1fr] sm:px-5">
          <Link
            href="/"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-2xl text-sm font-bold tracking-tight text-slate-900 transition-all duration-200 hover:text-fau-blue focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2"
          >
            <BackArrowIcon />
            TransitIQ Lite
          </Link>

          <div className="hidden min-w-0 justify-center sm:flex">
            {selectedUniversity ? (
              <span className="max-w-full truncate rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                {formatUniversityCrumb(selectedUniversity)}
              </span>
            ) : null}
          </div>

          <div className="flex justify-end">
            <span className="inline-flex min-h-8 items-center gap-1.5 text-xs font-medium text-slate-400">
              <SparkleIcon className="h-3 w-3" />
              Transit assistant
            </span>
          </div>
        </div>
      </header>

      <main className="lg:grid lg:min-h-[calc(100vh-56px)] lg:grid-cols-[400px_minmax(0,1fr)]">
        <aside className="hidden border-r border-slate-200/40 bg-slate-50/50 p-5 lg:block lg:h-[calc(100vh-56px)] lg:overflow-y-auto">
          {routeSourcesPanel}
        </aside>

        <section className="flex min-h-[calc(100vh-56px)] min-w-0 flex-col bg-white lg:h-[calc(100vh-56px)]">
          <details className="group border-b border-slate-200/60 bg-slate-50/50 lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-semibold text-slate-700 [&::-webkit-details-marker]:hidden">
              Routes and sources
              <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
                ↓
              </span>
            </summary>
            <div className="space-y-4 px-4 pb-4">{routeSourcesPanel}</div>
          </details>

          <div
            className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
            aria-live="polite"
          >
            <div className="mx-auto flex min-h-full max-w-4xl flex-col gap-6">
              {previewUrls.length > 0 ? (
                <MemoryCard
                  imageFiles={imageFiles}
                  previewUrls={previewUrls}
                  isLoading={isLoading}
                  onAddPhoto={() => photoInputRef.current?.click()}
                  onRemoveImage={removeImage}
                />
              ) : null}

              {!orderedConversation.length && !isLoading && !error ? (
                selectedUniversity ? (
                  <WelcomeState
                    university={selectedUniversity}
                    disabled={isLoading}
                    onSampleSelect={handleSampleSelect}
                  />
                ) : (
                  <SelectUniversityState
                    disabled={isLoading}
                    onUniversitySelect={handleUniversitySelect}
                  />
                )
              ) : null}

              {orderedConversation.map((item) => (
                <div key={item.id} className="space-y-4">
                  <UserQuestionBubble
                    question={item.question}
                    previewUrls={
                      item.id === latestQuestionId ? previewUrls : []
                    }
                  />
                  <ResultCard
                    result={item.result}
                    transitUrl={selectedUniversity?.transitUrl || transitLink}
                  />
                </div>
              ))}

              {(isLoading || error) && question.trim() ? (
                <UserQuestionBubble question={question.trim()} previewUrls={previewUrls} />
              ) : null}

              {isLoading ? <LoadingState /> : null}

              {!isLoading && error ? (
                <ErrorResponse
                  message={error}
                  canRetry={Boolean(question.trim()) && hasInformationSource}
                  onRetry={() => analyzeCurrentQuestion()}
                />
              ) : null}

              <div ref={conversationEndRef} />
            </div>
          </div>

          <form
            className="sticky bottom-0 border-t border-slate-200/60 bg-white p-4 pb-safe"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto max-w-4xl">
              <div className="flex items-end gap-3">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  multiple
                  className="hidden"
                  disabled={isLoading}
                  onChange={handlePhotoInputChange}
                />

                <div className="group relative flex flex-none flex-col items-center gap-1">
                  <button
                    type="button"
                    disabled={isLoading || imageFiles.length >= MAX_IMAGES}
                    onClick={() => photoInputRef.current?.click()}
                    title="Upload schedule, route map, or transit notice"
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed ${
                      imageFiles.length
                        ? "bg-fau-blue text-white hover:bg-blue-700"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                    aria-label="Upload transit photos"
                  >
                    {imageFiles.length ? (
                      <span className="text-xs font-bold">{imageFiles.length}</span>
                    ) : (
                      <PlusIcon />
                    )}
                  </button>
                  <span className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 hidden w-56 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-lg group-hover:block">
                    Upload schedule, route map, or transit notice
                  </span>
                </div>

                <textarea
                  ref={questionInputRef}
                  value={question}
                  disabled={isLoading}
                  rows={1}
                  placeholder={questionPlaceholder}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={handleQuestionKeyDown}
                  className="max-h-24 min-h-12 flex-1 resize-none overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-fau-blue focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                />

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed ${
                    canSubmit || isLoading
                      ? "bg-gradient-to-r from-fau-blue to-blue-600 hover:scale-105 hover:shadow-lg"
                      : "bg-slate-200"
                  }`}
                  aria-label="Send question"
                >
                  {isLoading ? <ButtonSpinner /> : <SendIcon />}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

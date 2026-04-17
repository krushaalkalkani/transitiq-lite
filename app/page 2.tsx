"use client";

import { FormEvent, useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageUploader } from "@/components/ImageUploader";
import { LoadingState } from "@/components/LoadingState";
import { QuestionInput } from "@/components/QuestionInput";
import {
  QueryHistory,
  type QueryHistoryItem,
} from "@/components/QueryHistory";
import { ResultCard } from "@/components/ResultCard";
import { SampleQueries } from "@/components/SampleQueries";
import type { TransitResponse } from "@/lib/types";

const SAMPLE_IMAGE_URL = "/fau-transit-sample.png";
const SAMPLE_IMAGE_NAME = "fau-transit-sample.png";

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<TransitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageSelected = (file: File) => {
    const objectUrl = URL.createObjectURL(file);

    setImageFile(file);
    setPreviewUrl(objectUrl);
    setResult(null);
    setError(null);
  };

  const handleClearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setQueryHistory([]);
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

    try {
      const file = await loadSampleImage();
      setImageFile(file);
      setPreviewUrl(SAMPLE_IMAGE_URL);
    } catch (sampleError) {
      const message =
        sampleError instanceof Error
          ? sampleError.message
          : "Sample image could not be loaded.";
      setError(`${message} Upload a transit document instead.`);
    }
  };

  const analyzeCurrentQuestion = async () => {
    if (!imageFile) {
      setError("Upload a transit document or choose a sample question first.");
      return;
    }

    if (!question.trim()) {
      setError("Enter a transit question before analyzing.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("question", question.trim());

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
            question: question.trim(),
            result: nextResult,
          },
          ...currentHistory,
        ].slice(0, 5),
      );
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

  const handleAskAnotherQuestion = () => {
    setResult(null);
    setQuestion("");
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main className="flex-1 bg-white dark:bg-slate-950">
        <section className="mx-auto flex w-full max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fau-red">
              Florida Atlantic University
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-fau-blue dark:text-white sm:text-5xl">
              Ask a route question from a schedule photo.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Upload a shuttle flyer, route map, or screenshot and get a direct
              answer grounded in FAU shuttle context.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <ImageUploader
              imageName={imageFile?.name}
              previewUrl={previewUrl}
              disabled={isLoading}
              onClear={handleClearImage}
              onImageSelected={handleImageSelected}
            />

            <QuestionInput
              value={question}
              disabled={isLoading}
              onChange={setQuestion}
            />

            <SampleQueries
              disabled={isLoading}
              onSelect={handleSampleSelect}
              sampleImageUrl={SAMPLE_IMAGE_URL}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-fau-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00284F] focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                Analyze document
              </button>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                The answer includes extracted details and any assumptions.
              </p>
            </div>
          </form>

          <div className="mt-8 space-y-4" aria-live="polite">
            {error ? (
              <div className="flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200 sm:flex-row sm:items-center sm:justify-between">
                <span>{error}</span>
                <button
                  type="button"
                  disabled={isLoading || !imageFile || !question.trim()}
                  onClick={analyzeCurrentQuestion}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-red-200 disabled:text-red-300 dark:border-red-800 dark:bg-slate-900 dark:text-red-200 dark:hover:bg-red-950/60 dark:focus:ring-offset-slate-950"
                >
                  Try again
                </button>
              </div>
            ) : null}

            {isLoading ? <LoadingState /> : null}

            {!isLoading && result ? (
              <div className="space-y-4">
                <ResultCard result={result} />
                <button
                  type="button"
                  onClick={handleAskAnotherQuestion}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-fau-blue bg-white px-4 py-2 text-sm font-semibold text-fau-blue transition hover:bg-fau-sky focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 dark:focus:ring-offset-slate-950"
                >
                  Ask another question
                </button>
              </div>
            ) : null}

            <QueryHistory items={queryHistory} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

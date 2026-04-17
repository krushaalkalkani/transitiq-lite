import OpenAI from "openai";
import type { TransitResponse } from "@/lib/types";

type AnalyzeTransitImageArgs = {
  images: Array<{
    imageBase64: string;
    mimeType: string;
  }>;
  question: string;
  transitContext: unknown;
  systemPrompt: string;
};

const toStringValue = (value: unknown, fallback = "") => {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
};

const normalizeTransitResponse = (value: unknown): TransitResponse => {
  const record =
    value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  const extractedInfo = Array.isArray(record.extractedInfo)
    ? record.extractedInfo
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
    : [];
  const sources = Array.isArray(record.sources)
    ? record.sources
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
    : [];

  return {
    directAnswer: toStringValue(record.directAnswer, "No direct answer returned."),
    extractedInfo,
    explanation: toStringValue(record.explanation, "No explanation returned."),
    assumptions: toStringValue(record.assumptions, "No assumptions returned."),
    suggestedAction: toStringValue(
      record.suggestedAction,
      "Check the latest FAU transit notice before traveling.",
    ),
    sources,
  };
};

export async function analyzeTransitImage({
  images,
  question,
  transitContext,
  systemPrompt,
}: AnalyzeTransitImageArgs): Promise<TransitResponse> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const textContent = [
    `Question: ${question}`,
    "Reference transit data:",
    JSON.stringify(transitContext, null, 2),
    images.length
      ? "Use all uploaded transit document images together with the reference data. Return only valid JSON in the requested shape."
      : "No images were uploaded. Use the text reference data and fetched transit page content. Return only valid JSON in the requested shape.",
  ].join("\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: images.length
          ? [
              {
                type: "text",
                text: textContent,
              },
              ...images.map((image) => ({
                type: "image_url",
                image_url: {
                  url: `data:${image.mimeType};base64,${image.imageBase64}`,
                },
              }) as const),
            ]
          : textContent,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI returned an empty response.");
  }

  try {
    return normalizeTransitResponse(JSON.parse(content));
  } catch {
    throw new Error("OpenAI returned a response that was not valid JSON.");
  }
}

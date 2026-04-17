import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import universities from "@/data/universities.json";
import { analyzeTransitImage } from "@/lib/openai";
import type { University } from "@/lib/types";

export const runtime = "nodejs";

const MAX_IMAGES = 5;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 5000;
const universitiesData = universities as University[];

const isFileLike = (value: FormDataEntryValue | null): value is File => {
  return (
    value !== null &&
    typeof value !== "string" &&
    typeof value.arrayBuffer === "function"
  );
};

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value.trim());

const stripHtmlToText = (html: string) => {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 3000);
};

const fetchTransitLinkContent = async (transitLink: string) => {
  if (!isHttpUrl(transitLink)) {
    return "";
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(transitLink, {
      signal: controller.signal,
      headers: {
        "user-agent": "TransitIQ-Lite/1.0",
      },
    });

    if (!response.ok) {
      return "";
    }

    return stripHtmlToText(await response.text());
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
};

const formatRouteContext = (university: University) => {
  return university.routes
    .map((route) => {
      return [
        `${route.name}:`,
        `Stops: ${route.stops.join(" → ")}.`,
        `Service: ${route.days}, ${route.hours}.`,
      ].join(" ");
    })
    .join("\n");
};

const buildSystemPrompt = (
  university: University | null,
  linkContent: string,
  hasImages: boolean,
) => {
  const universityContext = university
      ? [
          `The selected university is ${university.name} in ${university.city}, ${university.state}.`,
          `The campus transit system is ${university.transitSystemName}.`,
          `Known routes, stops, and operating windows:\n${formatRouteContext(university)}`,
        ]
    : [
        "No university was selected, so use any uploaded images and fetched transit page content as the primary context.",
      ];

  return [
    university
      ? `You are TransitIQ Lite, an AI campus transit assistant for ${university.name}.`
      : "You are TransitIQ Lite, an AI campus transit assistant.",
    ...universityContext,
    linkContent
      ? `Additional transit page content fetched from the provided link:\n${linkContent}`
      : "No additional transit page content was available from the optional link.",
    hasImages
      ? "Analyze all uploaded transit document images together and answer the user's question."
      : "No images were uploaded. Answer using the university route data and fetched transit page content available in the text context.",
    "Use the provided university transit data, fetched link content, and uploaded images as reference context when available.",
    'Always respond in this exact JSON format: { directAnswer: string, extractedInfo: string[], explanation: string, assumptions: string, suggestedAction: string }',
  ].join("\n\n");
};

const buildResponseSources = ({
  hasImages,
  linkContent,
  university,
}: {
  hasImages: boolean;
  linkContent: string;
  university: University | null;
}) => {
  const sources: string[] = [];

  if (hasImages) {
    sources.push("Photos analyzed");
  }

  if (linkContent) {
    sources.push("Transit page fetched");
  }

  if (university) {
    sources.push(`${university.name} data`);
  }

  return sources;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageEntries = formData.getAll("images");
    const legacyImage = formData.get("image");
    const images = imageEntries.filter(isFileLike);
    const question = formData.get("question");
    const universityId = formData.get("universityId");
    const transitLink = formData.get("transitLink");
    const universityIdValue =
      typeof universityId === "string" ? universityId.trim() : "";
    const transitLinkValue =
      typeof transitLink === "string" ? transitLink.trim() : "";
    const hasTransitLink = isHttpUrl(transitLinkValue);

    if (!images.length && isFileLike(legacyImage)) {
      images.push(legacyImage);
    }

    if (images.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: "Upload a maximum of 5 images." },
        { status: 400 },
      );
    }

    const oversizedImage = images.find((image) => image.size > MAX_IMAGE_BYTES);

    if (oversizedImage) {
      return NextResponse.json(
        { error: "Each image must be 10MB or smaller." },
        { status: 400 },
      );
    }

    if (typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 },
      );
    }

    const university = universityIdValue
      ? universitiesData.find((entry) => entry.id === universityIdValue)
      : null;

    if (universityIdValue && !university) {
      return NextResponse.json(
        { error: "Selected university was not found." },
        { status: 400 },
      );
    }

    if (!images.length && !hasTransitLink && !university) {
      return NextResponse.json(
        {
          error:
            "Provide at least one transit photo, a transit link, or select your university.",
        },
        { status: 400 },
      );
    }

    const linkContent = hasTransitLink
      ? await fetchTransitLinkContent(transitLinkValue)
      : "";

    const encodedImages = await Promise.all(
      images.map(async (image) => {
        const imageBuffer = Buffer.from(await image.arrayBuffer());

        return {
          imageBase64: imageBuffer.toString("base64"),
          mimeType: image.type || "image/png",
        };
      }),
    );

    const result = await analyzeTransitImage({
      images: encodedImages,
      question: question.trim(),
      transitContext: {
        university: university || null,
        fetchedTransitLinkContent: linkContent || null,
      },
      systemPrompt: buildSystemPrompt(university || null, linkContent, images.length > 0),
    });
    const sources = buildResponseSources({
      hasImages: images.length > 0,
      linkContent,
      university: university || null,
    });

    return NextResponse.json({ ...result, sources });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to analyze the transit document.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

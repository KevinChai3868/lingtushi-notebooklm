import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dedupe(items: string[]) {
  return [...new Set(items.filter(Boolean).map((item) => item.trim()))];
}

export function joinSentence(items: string[], fallback = "未特別指定") {
  const cleaned = dedupe(items);
  return cleaned.length > 0 ? cleaned.join("、") : fallback;
}

export function downloadText(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

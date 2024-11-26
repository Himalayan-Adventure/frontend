import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const newDate = new Date(date);
  const temp = newDate.toDateString().split(" ").splice(1);
  return [temp[1], temp[0], temp[2]].join(" ");
}

export async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch the image.");
  }

  const blob = await response.blob();
  const mimeType = blob.type;

  return new File([blob], filename, { type: mimeType });
}

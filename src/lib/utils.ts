import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { enUS } from "date-fns/locale";
import { endOfDay, format, isSameDay, startOfDay } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const newDate = new Date(date);
  const temp = newDate.toDateString().split(" ").splice(1);
  return [temp[1], temp[0], temp[2]].join(" ");
}

export function formatDateRange(date1: string | Date, date2: string | Date) {
  const start = new Date(date1);
  const end = new Date(date2);
  const endMonth = format(end, "LLLL", { locale: enUS }).slice(0, 3);
  return `${start.getDate()} - ${end.getDate()} ${endMonth}`;
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

export const errorMsg = (status: number, fallback?: string) => {
  switch (status) {
    case 401:
      return "You are not authorized. Please login/register to continue!";

    case 403:
      return "Your roles are not enough to perform this action";
    default:
      return fallback || "Error occureed. Please try again";
  }
};

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getDateBounds = (dateStr: string) => {
  const date = new Date(dateStr);

  const today = new Date();
  if (isSameDay(date, today)) {
    return {
      start: new Date(),
      end: endOfDay(date),
    };
  }

  return {
    start: startOfDay(date),
    end: endOfDay(date),
  };
};

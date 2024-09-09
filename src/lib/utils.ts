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

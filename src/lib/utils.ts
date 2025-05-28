import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the current date adjusted to UTC.
 * This function creates a new Date object that represents the current time in UTC,
 * accounting for the local timezone offset.
 *
 * @returns {Date} A Date object representing the current time in UTC.
 */
export function getUTCDate(date?: Date): Date {
  if (date) {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
  } else {
    const now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  }
}

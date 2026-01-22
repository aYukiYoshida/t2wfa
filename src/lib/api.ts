import {format, isValid} from "date-fns";

import {InvalidApiKeyError, TooManyRequestsError} from "@/lib/errors";
import {ApodImageResponse} from "@/lib/types";
import {getUTCDate} from "@/lib/utils";

const baseUrl = "https://api.nasa.gov/planetary/apod";

function getApodDate(date: Date): string {
  const utcDate = getUTCDate(date);
  if (isValid(date)) {
    return format(utcDate, "yyyy-MM-dd");
  } else {
    const utcNow = getUTCDate();
    return format(utcNow, "yyyy-MM-dd");
  }
}

async function getApodImage(
  options: {apiKey?: string; date?: Date} = {}
): Promise<ApodImageResponse> {
  const params: {api_key?: string; date?: string} = {
    api_key: options.apiKey !== undefined ? options.apiKey : "DEMO_KEY",
    date: options.date ? getApodDate(options.date) : undefined,
  };
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== null && v !== undefined)
  );
  const query = new URLSearchParams(filteredParams).toString();

  const response = await fetch(`${baseUrl}?${query}`);

  if (!response.ok) {
    if (response.status === 403) {
      throw new InvalidApiKeyError("Input API key is invalid.");
    }
    if (response.status === 429) {
      throw new TooManyRequestsError(
        "You have reached your rate limit. Try again later."
      );
    }
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }
  const image: ApodImageResponse = await response.json();
  return image;
}

export default {getApodImage};

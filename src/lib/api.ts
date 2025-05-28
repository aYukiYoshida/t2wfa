import {format, isValid} from "date-fns";

import {ApodImageResponse} from "@/lib/types";
import {getUTCDate} from "@/lib/utils";

const baseUrl = "https://api.nasa.gov/planetary/apod";

async function getApodImage(
  options: {key?: string; date?: Date} = {}
): Promise<ApodImageResponse> {
  const params: {api_key?: string; date?: string} = {};
  params.api_key = options.key !== undefined ? options.key : "DEMO_KEY";
  if (options.date) {
    const utcDate = getUTCDate(options.date);
    params.date = isValid(utcDate) ? format(utcDate, "yyyy-MM-dd") : undefined;
  }
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== null && v !== undefined)
  );
  const query = new URLSearchParams(filteredParams).toString();

  const response = await fetch(`${baseUrl}?${query}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }
  const image: ApodImageResponse = await response.json();
  return image;
}

export default {getApodImage};

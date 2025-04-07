import {parse, isValid} from "date-fns";

import {ApodImageResponse} from "@/lib/types";

const baseUrl = "https://api.nasa.gov/planetary/apod";

async function getApodImage(
  options: {key?: string; date?: string} = {}
): Promise<ApodImageResponse> {
  const params: {api_key?: string; date?: string} = {};
  params.api_key = options.key !== undefined ? options.key : "DEMO_KEY";
  if (options.date) {
    const parsedDate = parse(options.date, "yyyy-MM-dd", new Date());
    params.date = isValid(parsedDate) ? options.date : undefined;
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

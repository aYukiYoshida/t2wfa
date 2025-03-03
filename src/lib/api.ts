import {ApodImageResponse} from "@/lib/types";

const baseUrl = "https://api.nasa.gov/planetary/apod";

async function getApodImage(apiKey: string | null): Promise<ApodImageResponse> {
  const url = apiKey
    ? `${baseUrl}?api_key=${apiKey}`
    : `${baseUrl}?api_key=DEMO_KEY`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }
  const image: ApodImageResponse = await response.json();
  return image;
}

export default {getApodImage};

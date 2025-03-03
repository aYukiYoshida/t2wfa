import {ApodImageResponse} from "@/lib/types";

export class ApodImageClient {
  private url: string;
  private baseUrl = "https://api.nasa.gov/planetary/apod";

  constructor(apiKey?: string | null) {
    this.url = apiKey
      ? `${this.baseUrl}?api_key=${apiKey}`
      : `${this.baseUrl}?api_key=DEMO_KEY`;
  }

  async get(): Promise<ApodImageResponse> {
    const response = await fetch(this.url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const image: ApodImageResponse = await response.json();
    return image;
  }
}

export default {ApodImageClient};

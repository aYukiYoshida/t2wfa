type ApodImageResponse = {
  title: string;
  explanation: string;
  copyright: string;
  media_type: "image" | "video";
  hdurl?: string;
  url: string;
  service_version: string;
  date: string;
};

export type {ApodImageResponse};

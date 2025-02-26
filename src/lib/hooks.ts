import {useState, useEffect} from "react";
import {ApodImageResponse} from "@/lib/types";
import Api from "@/lib/api";

const useFetchApodImage = (apiKey: string | null) => {
  const [image, setImage] = useState<ApodImageResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const imageResponse = await Api.getApodImage(apiKey);
        setImage(imageResponse);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [apiKey]);

  return {image, loading, error};
};

export default {useFetchApodImage};

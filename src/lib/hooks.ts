import {useState, useEffect} from "react";
import {ApodImageResponse} from "@/lib/types";
import {ApodImageClient} from "@/lib/api";

const useFetchApodImage = (client: ApodImageClient) => {
  const [image, setImage] = useState<ApodImageResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const imageResponse = await client.get();
        setImage(imageResponse);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [client]);

  return {image, loading, error};
};

export default {useFetchApodImage};

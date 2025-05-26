import {useState, useEffect} from "react";
import {ApodImageResponse} from "@/lib/types";
import Api from "@/lib/api";
import Cookie from "@/lib/cookie";

const useFetchApodImage = () => {
  const [image, setImage] = useState<ApodImageResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const key: string = Cookie.getCookie("key") ?? "DEMO_KEY";
        const imageResponse = await Api.getApodImage({
          key,
        });
        setImage(imageResponse);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return {image, loading, error};
};

export default {useFetchApodImage};

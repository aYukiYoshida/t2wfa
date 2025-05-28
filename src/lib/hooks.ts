import {useState, useEffect} from "react";
import {ApodImageResponse} from "@/lib/types";
import Api from "@/lib/api";
import {useAuthStore, useDateStore} from "@/lib/store";

const useFetchApodImage = () => {
  const key: string = useAuthStore((state) => state.token) ?? "DEMO_KEY";
  const date: Date | undefined = useDateStore((state) => state.date);
  const [image, setImage] = useState<ApodImageResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const imageResponse = await Api.getApodImage({
          key,
          date,
        });
        setImage(imageResponse);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [key, date]);

  return {image, loading, error};
};

export default {useFetchApodImage};

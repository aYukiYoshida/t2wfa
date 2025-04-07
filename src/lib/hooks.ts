import {useState, useEffect} from "react";
import {ApodImageResponse} from "@/lib/types";
import Api from "@/lib/api";
import Cookie from "@/lib/cookie";
import {format} from "date-fns";

const useFetchApodImage = (date: Date) => {
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
          date: format(date, "yyyy-MM-dd"),
        });
        setImage(imageResponse);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [date]);

  return {image, loading, error};
};

export default {useFetchApodImage};

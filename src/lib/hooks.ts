import {useState, useEffect} from "react";

import Api from "@/lib/api";
import {InvalidApiKeyError} from "@/lib/errors";
import {useAuthStore, useDateStore} from "@/lib/store";
import {ApodImageResponse} from "@/lib/types";

const useFetchApodImage = () => {
  const key: string = useAuthStore((state) => state.token) ?? "DEMO_KEY";
  const date: Date | undefined = useDateStore((state) => state.date);
  const setApiKeyValid = useAuthStore((state) => state.setTokenValid);
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
        if (err instanceof InvalidApiKeyError) {
          // 403エラー時は無効キーとしてフラグを更新
          setApiKeyValid(false);
        }
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [key, date, setApiKeyValid]);

  return {image, loading, error};
};

export default {useFetchApodImage};

import {useState, useEffect} from "react";

import Api from "@/lib/api";
import {InvalidApiKeyError} from "@/lib/errors";
import {useAuthStore, useDateStore} from "@/lib/store";
import {ApodImageResponse} from "@/lib/types";

const useFetchApodImage = () => {
  const apiKey: string = useAuthStore((state) => state.apiKey) || "DEMO_KEY";
  const date: Date | undefined = useDateStore((state) => state.date);
  const setApiKeyValid = useAuthStore((state) => state.setApiKeyValid);
  const [image, setImage] = useState<ApodImageResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const imageResponse = await Api.getApodImage({
          apiKey,
          date,
        });
        setImage(imageResponse);
        setApiKeyValid(true); // API検証成功
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
  }, [apiKey, date, setApiKeyValid]);

  return {image, loading, error};
};

const useValidateApiKey = () => {
  const apiKey = useAuthStore((state) => state.apiKey);
  const isApiKeyValid = useAuthStore((state) => state.isApiKeyValid);
  const setApiKeyValid = useAuthStore((state) => state.setApiKeyValid);
  const isValidating = isApiKeyValid === null && apiKey !== "";
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isApiKeyValid !== null || apiKey === "") {
      return;
    }

    const validateApiKey = async () => {
      try {
        await Api.getApodImage({apiKey});
        setApiKeyValid(true);
        setError(null);
      } catch (err) {
        if (err instanceof InvalidApiKeyError) {
          setApiKeyValid(false);
        } else {
          // その他のエラーの場合は有効として扱う（一時的なエラーとみなす）
          setApiKeyValid(true);
        }
        setError(err as Error);
      }
    };

    validateApiKey();
  }, [apiKey, isApiKeyValid, setApiKeyValid]);

  return {isValidating, error};
};

export default {useFetchApodImage, useValidateApiKey};

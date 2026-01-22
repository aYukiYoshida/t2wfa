import {ImageContent} from "@/components/ui/image-content";
import {InputKey} from "@/components/ui/input-key";
import {useAuthStore} from "@/lib/store";

import type {FC} from "react";

const Content: FC = (): JSX.Element => {
  const apiKey = useAuthStore((state) => state.apiKey);
  const isApiKeyValid = useAuthStore((state) => state.isApiKeyValid);

  return apiKey !== "" && isApiKeyValid ? (
    <ImageContent />
  ) : (
    // APIキーがあっても無効な場合は再入力画面を表示
    <InputKey showInvalidMessage={!isApiKeyValid} />
  );
};

export {Content};

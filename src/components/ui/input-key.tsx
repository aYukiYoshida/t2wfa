import {useCallback, useRef, FC} from "react";

import {CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {MessageText} from "@/components/ui/message-text";
import {SaveKeyButton} from "@/components/ui/save-key-button";
import Hooks from "@/lib/hooks";
import {useAuthStore} from "@/lib/store";

type InputKeyProps = {
  showInvalidMessage?: boolean;
};

const InputKey: FC<InputKeyProps> = ({
  showInvalidMessage = false,
}): JSX.Element => {
  const inputApiKey = useRef<HTMLInputElement>(null);
  const setApiKey = useAuthStore((state) => state.setApiKey);

  // APIキーの検証を行う
  const {isValidating, error} = Hooks.useValidateApiKey();

  const handleSaveKeyClick = useCallback(() => {
    if (inputApiKey.current) {
      setApiKey(inputApiKey.current.value);
    }
  }, [setApiKey]);

  return (
    <CardContent>
      <div className="text-white">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            className="w-96 border-gray-400 border-2 placeholder-red placeholder-opacity-0"
            ref={inputApiKey}
            placeholder="Enter API KEY of APOD"
          />
          <SaveKeyButton
            onClick={handleSaveKeyClick}
            isValidating={isValidating}
          />
        </div>
        {showInvalidMessage && (
          <MessageText className="text-red-500 pt-1">
            {error?.message}
          </MessageText>
        )}
      </div>
    </CardContent>
  );
};

export {InputKey};

import {Loader2} from "lucide-react";
import {useRef, FC} from "react";

import {Button} from "@/components/ui/button";
import {CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
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
  const {isValidating} = Hooks.useValidateApiKey();

  const handleSaveKeyClick = () => {
    if (inputApiKey.current) {
      setApiKey(inputApiKey.current.value);
    }
  };

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
          <Button
            onClick={handleSaveKeyClick}
            disabled={isValidating}
            className="bg-gray-400 background rounded-md hover:bg-gray-700"
          >
            {isValidating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Validating...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
        {showInvalidMessage && (
          <p className="text-red-500 pt-1">Input API key is invalid.</p>
        )}
      </div>
    </CardContent>
  );
};

export {InputKey};

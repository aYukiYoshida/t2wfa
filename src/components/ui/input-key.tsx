import {useState, FC} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useAuthStore} from "@/lib/store";

const InputKey: FC = (): JSX.Element => {
  const [inputKeyValue, setInputKeyValue] = useState<string>("");
  const setToken = useAuthStore((state) => state.setToken);

  const handleInputKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyValue(event.target.value);
  };

  const handleSaveKeyClick = () => {
    setToken(inputKeyValue);
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl pb-6">Astronomy Picture of the Day</h1>
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          className="w-96 border-gray-400 border-2 placeholder-red placeholder-opacity-0"
          value={inputKeyValue}
          onChange={handleInputKeyChange}
          placeholder="Enter API KEY of APOD"
        />
        <Button
          onClick={handleSaveKeyClick}
          className="bg-gray-400 background rounded-md hover:bg-gray-700"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export {InputKey};

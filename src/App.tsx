import {useState} from "react";
import {ImageCard} from "./components/ui/image-card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import setCookie from "@/utils/cookie/setCookie";
import getCookie from "@/utils/cookie/getCookie";

function App() {
  const [inputKeyValue, setInputKeyValue] = useState<string>("");
  const [showImageCard, setShowImageCard] = useState<boolean>(false);

  const handleInputKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyValue(event.target.value);
  };

  const handleSaveKeyClick = () => {
    setCookie("key", inputKeyValue);
    setShowImageCard(true);
  };

  return (
    <>
      {!showImageCard && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              className="w-96 mt-4 px-4 py-2"
              value={inputKeyValue}
              onChange={handleInputKeyChange}
              placeholder="Enter API KEY of APOD"
            />
            <Button
              onClick={handleSaveKeyClick}
              className="mt-4 px-4 py-2 text-white rounded-md hover:bg-gray-700"
            >
              Save
            </Button>
          </div>
        </div>
      )}
      {showImageCard && <ImageCard apiKey={getCookie("key")}></ImageCard>}
      {}
    </>
  );
}

export default App;

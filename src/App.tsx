import {useState} from "react";
import {ImageCard} from "./components/ui/image-card";
import {InputKey} from "./components/ui/input-key";
import getCookie from "@/utils/cookie/getCookie";

function App() {
  const [showImageCard, setShowImageCard] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      {showImageCard ? (
        <ImageCard apiKey={getCookie("key")} />
      ) : (
        <InputKey setShowImageCard={setShowImageCard} />
      )}
    </div>
  );
}

export default App;

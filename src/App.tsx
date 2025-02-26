import {useState} from "react";
import {ImageCard} from "@/components/ui/image-card";
import {InputKey} from "@/components/ui/input-key";
import {Background} from "@/components/ui/background";
import Cookie from "@/lib/cookie";

function App() {
  const [showImageCard, setShowImageCard] = useState<boolean>(false);
  if (showImageCard) {
    return (
      <Background className="items-start">
        <ImageCard apiKey={Cookie.getCookie("key")} />
      </Background>
    );
  } else {
    return (
      <Background className="items-center">
        <InputKey setShowImageCard={setShowImageCard} />
      </Background>
    );
  }
}

export default App;

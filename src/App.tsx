import {useState} from "react";
import {ImageCard} from "@/components/ui/image-card";
import {InputKey} from "@/components/ui/input-key";
import {Background} from "@/components/ui/background";

function App() {
  const [showImageCard, setShowImageCard] = useState<boolean>(false);
  if (showImageCard) {
    return (
      <Background className="items-start">
        <ImageCard />
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

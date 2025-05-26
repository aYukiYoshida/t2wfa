import {useState} from "react";
import {ImageCard} from "@/components/ui/image-card";
import {InputKey} from "@/components/ui/input-key";
import {Background} from "@/components/ui/background";
import {useAuthStore} from "@/lib/store";

function App() {
  const token = useAuthStore((state) => state.token);
  const [showImageCard, setShowImageCard] = useState<boolean>(() => {
    return token !== null && token !== "";
  });
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

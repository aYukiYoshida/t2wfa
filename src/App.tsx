import {useState} from "react";
import {ImageCard} from "@/components/ui/image-card";
import {InputKey} from "@/components/ui/input-key";
import {Background} from "@/components/ui/background";
import getCookie from "@/utils/cookie/getCookie";

function App() {
  const [showImageCard, setShowImageCard] = useState<boolean>(false);
  const source = showImageCard ? (
    <ImageCard apiKey={getCookie("key")} />
  ) : (
    <InputKey setShowImageCard={setShowImageCard} />
  );

  return <Background source={source} />;
}

export default App;

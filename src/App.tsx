import {Background} from "@/components/ui/background";
import {ImageCard} from "@/components/ui/image-card";
import {InputKey} from "@/components/ui/input-key";
import {useAuthStore} from "@/lib/store";

function App() {
  const apiKey = useAuthStore((state) => state.apiKey);
  const isApiKeyValid = useAuthStore((state) => state.isApiKeyValid);

  // APIキーがあっても無効な場合は再入力画面を表示
  if (apiKey !== null && apiKey !== "" && isApiKeyValid) {
    return (
      <Background className="items-start">
        <ImageCard />
      </Background>
    );
  } else {
    return (
      <Background className="items-center">
        <InputKey showInvalidMessage={!isApiKeyValid} />
      </Background>
    );
  }
}

export default App;

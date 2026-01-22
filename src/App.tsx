import {Background} from "@/components/ui/background";
import {ImageCard} from "@/components/ui/image-card";
import {InputKey} from "@/components/ui/input-key";
import {useAuthStore} from "@/lib/store";

function App() {
  const token = useAuthStore((state) => state.token);
  const isApiKeyValid = useAuthStore((state) => state.isTokenValid);

  // トークンがあっても無効キーの場合は再入力画面を表示
  if (token !== null && token !== "" && isApiKeyValid) {
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

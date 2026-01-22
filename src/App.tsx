import {Background} from "@/components/ui/background";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {DatePickerDialog} from "@/components/ui/date-picker-dialog";
import {ImageContent} from "@/components/ui/image-content";
import {InputKey} from "@/components/ui/input-key";
import {useAuthStore} from "@/lib/store";

function App() {
  const apiKey = useAuthStore((state) => state.apiKey);
  const isApiKeyValid = useAuthStore((state) => state.isApiKeyValid);

  // APIキーがあっても無効な場合は再入力画面を表示
  return (
    <Background className="items-start">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl overflow-scroll my-10">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Astronomy Picture of the Day
          </CardTitle>
          <DatePickerDialog />
        </CardHeader>
        {apiKey !== "" && isApiKeyValid ? (
          <ImageContent />
        ) : (
          <InputKey showInvalidMessage={!isApiKeyValid} />
        )}
      </Card>
    </Background>
  );
}

export default App;

import {Background} from "@/components/ui/background";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Content} from "@/components/ui/content";
import {DatePickerDialog} from "@/components/ui/date-picker-dialog";

function App() {
  return (
    <Background className="items-start">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl overflow-scroll my-10">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Astronomy Picture of the Day
          </CardTitle>
          <DatePickerDialog />
        </CardHeader>
        <Content />
      </Card>
    </Background>
  );
}

export default App;

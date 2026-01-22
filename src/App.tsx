import {Background} from "@/components/ui/background";
import {Card} from "@/components/ui/card";
import {Content} from "@/components/ui/content";
import {Header} from "@/components/ui/header";

function App() {
  return (
    <Background className="items-start">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl overflow-scroll my-10">
        <Header />
        <Content />
      </Card>
    </Background>
  );
}

export default App;

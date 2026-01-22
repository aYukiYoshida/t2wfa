import {FC} from "react";

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {DatePickerDialog} from "@/components/ui/date-picker-dialog";
import {ImageContent} from "@/components/ui/image-content";
import {MessageText} from "@/components/ui/message-text";
import Hooks from "@/lib/hooks";

const ImageCard: FC = (): JSX.Element => {
  const {image, loading, error} = Hooks.useFetchApodImage();

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl overflow-scroll my-10">
      <CardHeader>
        <CardTitle className="text-3xl text-center">
          Astronomy Picture of the Day
        </CardTitle>
        <DatePickerDialog />
      </CardHeader>
      <CardContent>
        {loading ? (
          <MessageText text="Loading..." />
        ) : !image || error ? (
          <MessageText text={`Error: ${error?.message}`} />
        ) : (
          <ImageContent image={image} />
        )}
      </CardContent>
    </Card>
  );
};

export {ImageCard};

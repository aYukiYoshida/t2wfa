import {FC} from "react";

import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {DatePickerDialog} from "@/components/ui/date-picker-dialog";
import {ImageContent} from "@/components/ui/image-content";

const ImageCard: FC = (): JSX.Element => {
  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl overflow-scroll my-10">
      <CardHeader>
        <CardTitle className="text-3xl text-center">
          Astronomy Picture of the Day
        </CardTitle>
        <DatePickerDialog />
      </CardHeader>
      <ImageContent />
    </Card>
  );
};

export {ImageCard};

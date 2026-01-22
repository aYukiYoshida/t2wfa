import {FC} from "react";

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {DatePickerDialog} from "@/components/ui/date-picker-dialog";
import {ExpandableText} from "@/components/ui/expandable-text";
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
          <>
            <div className="relative aspect-square mb-6 overflow-hidden rounded-lg shadow-2xl">
              <img
                src={image.url}
                alt="Cover"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
              />
            </div>
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold m-1">{image.title}</h2>
              <p className="text-gray-400">&copy; {image.copyright}</p>
            </div>
            <ExpandableText text={image.explanation}></ExpandableText>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export {ImageCard};

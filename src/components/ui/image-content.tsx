import {FC} from "react";

import {CardContent} from "@/components/ui/card";
import {ExpandableText} from "@/components/ui/expandable-text";
import {MessageText} from "@/components/ui/message-text";
import Hooks from "@/lib/hooks";

const ImageContent: FC = (): JSX.Element => {
  const {image, loading, error} = Hooks.useFetchApodImage();

  return (
    <CardContent>
      {loading ? (
        <MessageText>Loading...</MessageText>
      ) : error ? (
        <MessageText>Error: {error.message}</MessageText>
      ) : !image ? (
        <MessageText>No image available</MessageText>
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
  );
};

export {ImageContent};

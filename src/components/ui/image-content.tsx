import {FC} from "react";

import {ExpandableText} from "@/components/ui/expandable-text";

import type {ApodImageResponse} from "@/lib/types";

type ImageContentProps = {
  image: ApodImageResponse;
};

const ImageContent: FC<ImageContentProps> = ({image}): JSX.Element => {
  return (
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
  );
};

export {ImageContent};

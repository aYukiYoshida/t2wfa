import {useState, useEffect, FC} from "react";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {ExpandableText} from "@/components/ui/expandable-text";

type Image = {
  title: string;
  explanation: string;
  copyright: string;
  media_type: "image" | "video";
  hdurl?: string;
  url: string;
  service_version: string;
  date: string;
};

type ImageCardProps = {
  apiKey: string | null;
};

const ImageCard: FC<ImageCardProps> = ({apiKey}): JSX.Element => {
  const [image, setImage] = useState<Image | null>(null);
  const url = apiKey
    ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    : `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setImage(data))
      .catch((error) => console.error("Fetching data failed", error));
  }, [url]);

  if (!image) return <div className="text-white">Loading...</div>;

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl overflow-scroll my-10">
      <CardHeader>
        <CardTitle className="text-3xl text-white text-center">
          Astronomy Picture of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export {ImageCard};

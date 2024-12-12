import {useState, useEffect, FC} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {ExpandableText} from "@/components/ui/expandable-text";

type Image = {
  title: string;
  explanation: string;
  copyright: string;
  media_type: string;
  hdurl: string;
  url: string;
  service_version: string;
  date: string;
};

interface ImageCardProps {
  apiKey: string | null;
}

const ImageCard: FC<ImageCardProps> = ({apiKey}) => {
  const [image, setImage] = useState<Image | null>(null);
  // 8HokFb6dsXwHYxoZlKLhrDtsD9cJ08KK76hFMbuE
  const url = apiKey
    ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    : `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setImage(data))
      .catch((error) => console.error("Fetching data failed", error));
  }, [url]);

  if (!image) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
        <CardContent className="p-6">
          <div className="relative aspect-square mb-6 overflow-hidden rounded-lg shadow-2xl">
            <img
              src={image.url}
              alt="Cover"
              className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              {image.title}
            </h2>
            <p className="text-gray-400">&copy; {image.copyright}</p>
            <ExpandableText text={image.explanation}></ExpandableText>
          </div>
        </CardContent>
      </Card>
      <div></div>
    </div>
  );
};

export {ImageCard};

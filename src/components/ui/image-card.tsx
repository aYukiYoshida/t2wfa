import {FC} from "react";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {ExpandableText} from "@/components/ui/expandable-text";
import Cookie from "@/lib/cookie";
import Hooks from "@/lib/hooks";
import {ApodImageClient} from "@/lib/api";

const ImageCard: FC = (): JSX.Element => {
  const apiKey = Cookie.getCookie("key");
  const client = new ApodImageClient(apiKey);
  const {image, loading, error} = Hooks.useFetchApodImage(client);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!image || error)
    return <p className="text-white">Error: {error?.message}</p>;

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

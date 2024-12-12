import {FC} from "react";

interface BackgroundProps {
  source: JSX.Element;
}

const Background: FC<BackgroundProps> = ({source}): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      {source}
    </div>
  );
};

export {Background};

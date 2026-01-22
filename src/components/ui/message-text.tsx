import {FC} from "react";

type MessageTextProps = {
  text: string;
};

const MessageText: FC<MessageTextProps> = ({text}): JSX.Element => {
  return (
    <div className="max-w-sm">
      <p className="text-white text-center">{text}</p>
    </div>
  );
};

export {MessageText};

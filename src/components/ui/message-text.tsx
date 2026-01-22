import {FC, ReactNode} from "react";

type MessageTextProps = {
  children: ReactNode;
};

const MessageText: FC<MessageTextProps> = ({children}): JSX.Element => {
  return (
    <div className="max-w-sm">
      <p className="text-white text-center">{children}</p>
    </div>
  );
};

export {MessageText};

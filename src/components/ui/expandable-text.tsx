import {useState, FC} from "react";

type ExpandableTextProps = {
  text: string; // text は文字列型
};

const ExpandableText: FC<ExpandableTextProps> = ({text}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-sm">
      <p
        onClick={toggleText}
        className={`cursor-pointer transition-all duration-300 ${
          isExpanded
            ? "text-balance whitespace-normal break-words hyphens-auto"
            : "text-ellipsis overflow-hidden whitespace-nowrap"
        }`}
        title={isExpanded ? "Click to collapse" : "Click to expand"}
      >
        {text}
      </p>
    </div>
  );
};

export {ExpandableText};

import {useState, FC} from "react";

interface ExpandableTextProps {
  text: string; // text は文字列型
}

const ExpandableText: FC<ExpandableTextProps> = ({text}) => {
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
            ? "whitespace-normal"
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

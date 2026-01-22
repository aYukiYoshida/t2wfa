import * as React from "react";

import {addTestId} from "@/lib/test-id";

const ExpandableText = React.memo(
  React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLDivElement>>(
    ({...props}, ref) => {
      const [isExpanded, setIsExpanded] = React.useState(false);

      const toggleText = React.useCallback(() => {
        setIsExpanded((prev) => !prev);
      }, []);

      return (
        <div className="max-w-sm">
          <p
            ref={ref}
            onClick={toggleText}
            className={`cursor-pointer transition-all duration-300 ${
              isExpanded
                ? "text-balance whitespace-normal break-words hyphens-auto"
                : "text-ellipsis overflow-hidden whitespace-nowrap"
            }`}
            title={isExpanded ? "Click to collapse" : "Click to expand"}
            {...props}
          />
        </div>
      );
    }
  )
);

ExpandableText.displayName = "ExpandableText";

const ExpandableTextWithTestId = addTestId(ExpandableText);

export {ExpandableTextWithTestId as ExpandableText};

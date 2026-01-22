import * as React from "react";

const MessageText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div className="max-w-sm">
    <p ref={ref} className={className} {...props} />
  </div>
));

export {MessageText};

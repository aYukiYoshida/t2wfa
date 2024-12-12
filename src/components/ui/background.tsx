import * as React from "react";

import {cn} from "@/lib/utils";

const Background = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900",
      className
    )}
    {...props}
  />
));
Background.displayName = "Background";

export {Background};

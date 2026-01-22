import {FC} from "react";

const addTestId = (WrappedComponent: FC) => {
  const ComponentWithTestId = (props: Record<string, unknown>) => {
    const componentName =
      WrappedComponent.displayName || WrappedComponent.name || "Component";
    return <WrappedComponent data-testid={componentName} {...props} />;
  };

  const displayName = `withTestId(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  ComponentWithTestId.displayName = displayName;

  return ComponentWithTestId;
};

export {addTestId};

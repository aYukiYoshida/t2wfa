import {FC} from "react";

import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";

type SaveKeyButtonProps = {
  onClick: () => void;
  isValidating: boolean;
};

const SaveKeyButton: FC<SaveKeyButtonProps> = ({
  onClick,
  isValidating,
}): JSX.Element => {
  return (
    <Button
      onClick={onClick}
      disabled={isValidating}
      className="bg-gray-400 background rounded-md hover:bg-gray-700"
    >
      {isValidating ? (
        <>
          <Spinner className="h-4 w-4 animate-spin mr-2" />
          Validating...
        </>
      ) : (
        "Save"
      )}
    </Button>
  );
};

export {SaveKeyButton};

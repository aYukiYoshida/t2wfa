import {CardHeader, CardTitle} from "@/components/ui/card";
import {DatePickerDialog} from "@/components/ui/date-picker-dialog";
import {useAuthStore} from "@/lib/store";

import type {FC} from "react";

const Header: FC = (): JSX.Element => {
  const apiKey = useAuthStore((state) => state.apiKey);
  const isApiKeyValid = useAuthStore((state) => state.isApiKeyValid);

  return (
    <CardHeader>
      <CardTitle className="text-3xl text-center">
        Astronomy Picture of the Day
      </CardTitle>
      {apiKey !== "" && isApiKeyValid && <DatePickerDialog />}
    </CardHeader>
  );
};

export {Header};

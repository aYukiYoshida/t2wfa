import {useState} from "react";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useDateStore} from "@/lib/store";
import {getUTCDate} from "@/lib/utils";

export function DatePickerDialog(): JSX.Element {
  const {date, setDate} = useDateStore();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-fit mx-auto">
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Select a date</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select a date to retrieve the APOD image.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md border w-max mx-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            disabled={(date) =>
              date > getUTCDate() || date < new Date("1995-06-16")
            }
            className="rdp-root"
          />
        </div>
        <DialogFooter>
          <Button
            className="text-white"
            variant="ghost"
            onClick={() => {
              setDate(getUTCDate());
              setOpen(false);
            }}
          >
            today
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { addDays, endOfWeek, format, startOfWeek } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function WeekPicker({ className }) {
  const today = new Date();
  const [selectedWeek, setSelectedWeek] = useState({
    from: startOfWeek(today),
    to: endOfWeek(today),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="selectedWeek"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !selectedWeek && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedWeek.from ? (
              <>
                {format(selectedWeek.from, "MM/dd/yyyy")} -{" "}
                {format(selectedWeek.to, "MM/dd/yyyy")}
              </>
            ) : (
              <span>Pick a week</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            modifiers={{
              selected: selectedWeek,
            }}
            onDayClick={(day, modifiers) => {
              if (modifiers.selected) {
                setSelectedWeek({
                  from: startOfWeek(today),
                  to: endOfWeek(today),
                });
                return;
              }
              setSelectedWeek({
                from: startOfWeek(day),
                to: endOfWeek(day),
              });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

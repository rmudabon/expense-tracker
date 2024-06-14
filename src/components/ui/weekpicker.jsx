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

export function WeekPicker({ className, onUpdate }) {
  const today = new Date();
  const [selectedWeek, setSelectedWeek] = useState(undefined);

  return (
    <div className={cn("grid gap-2 w-full", className)}>
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
            {selectedWeek !== undefined ? (
              <>
                {format(selectedWeek.from, "MM/dd/yyyy")} -{" "}
                {format(selectedWeek.to, "MM/dd/yyyy")}
              </>
            ) : (
              <span>Filter by week...</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            modifiers={{
              selected: selectedWeek,
            }}
            disabled={{
              after: today,
            }}
            onDayClick={(day, modifiers) => {
              if (modifiers.selected) {
                setSelectedWeek(undefined);
                onUpdate(undefined);
                return;
              }
              const weekRange = {
                from: startOfWeek(day),
                to: endOfWeek(day),
              };
              setSelectedWeek(weekRange);
              onUpdate(weekRange);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

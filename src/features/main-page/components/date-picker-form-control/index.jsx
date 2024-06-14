import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl } from "@/components/ui/form"

export function DatePickerFormControl(props) {
    const today = new Date();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
            <Button
            variant={"outline"}
            className={cn(
                "w-full justify-start text-left font-normal",
                !props.field.value && "text-muted-foreground"
            )}
            >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.field.value ? format(props.field.value, "PPP") : <span>Select date</span>}
            </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode={props.mode}
          selected={props.field.value}
          onSelect={props.field.onChange}
          disabled={{
            after: today
          }}
          required
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

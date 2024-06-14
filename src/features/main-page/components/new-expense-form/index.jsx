import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePickerFormControl } from "../date-picker-form-control";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useMaskito } from "@maskito/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/validation-schemas/new-expense";

import currencyMask from "@/lib/input-masks";
import { EXPENSE_KEY } from "@/constants/keys";

export function NewExpenseForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      description: "",
    },
  });

  const currencyRef = useMaskito({
    options: currencyMask,
  });

  const onSubmit = (values) => {
    const expenseData = JSON.parse(localStorage.getItem(EXPENSE_KEY));
    const currentExpenses = expenseData ? expenseData : [];
    const translatedValues = {
      amount: values.amount,
      date: values.date.toISOString(),
      description: values.description,
    };
    const newExpenses = [...currentExpenses, translatedValues];
    localStorage.setItem(EXPENSE_KEY, JSON.stringify(newExpenses));
    dispatchEvent(new Event("storageUpdate"));
    toast({
      description: "Your expense has been saved.",
    });
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>New Expense</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full">Amount</FormLabel>
                      <FormControl>
                        <div className="flex flex-row">
                          <p className="h-10 rounded-md rounded-r-none border font-medium bg-background px-3 py-2 text-sm">
                            ₱
                          </p>
                          <Input
                            placeholder="0.00"
                            {...field}
                            ref={currencyRef}
                            onInput={(event) => {
                              form.setValue(
                                "amount",
                                event.currentTarget.value
                              );
                            }}
                            className="rounded-l-none border-l-0 flex-grow-1"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full">Date</FormLabel>
                      <FormControl>
                        <DatePickerFormControl field={field} mode="single" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What did you spend on?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EXPENSE_KEY } from "@/constants/keys";
import { format } from "date-fns";

export function ExpenseTable() {
  const expenseData = JSON.parse(localStorage.getItem(EXPENSE_KEY));
  const INITIAL_VALUE = 0;
  const totalAmount = expenseData.reduce(
    (currentSum, currentExpense) => currentSum + currentExpense.amount,
    INITIAL_VALUE
  );

  return (
    <div className="border rounded-lg w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Date (mm/dd/yr) </TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right w-[200px]">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseData.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>
                {format(new Date(expense.date), "MM/dd/yyyy")}
              </TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="font-medium text-right">
                PHP {expense.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell colSpan={2} className="text-right">
              PHP {totalAmount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

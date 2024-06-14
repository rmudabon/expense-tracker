import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EXPENSE_KEY } from "@/constants/keys";
import { Input } from "@/components/ui/input";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { tableColumns } from "./columns";
import { NewExpenseForm } from "../new-expense-form";
import { WeekPicker } from "@/components/ui/weekpicker";

export function ExpenseTable() {
  const [expenseData, setData] = useState(
    JSON.parse(localStorage.getItem(EXPENSE_KEY))
  );
  const [columnFilters, setColumnFilters] = useState([]);
  const pagination = {
    pageSize: 7,
    pageIndex: 0,
  };
  const INITIAL_VALUE = 0;

  const table = useReactTable({
    data: expenseData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination,
    },
  });

  const amounts = table.getRowModel().rows.map((row) => row.getValue("amount"));

  const totalAmount = amounts.reduce(
    (currentSum, currentExpense) => currentSum + currentExpense,
    INITIAL_VALUE
  );

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(totalAmount);

  const updateData = useCallback(() => {
    setData(JSON.parse(localStorage.getItem(EXPENSE_KEY)));
  }, []);

  useEffect(() => {
    window.addEventListener("storageUpdate", updateData);

    return () => {
      window.removeEventListener("storageUpdate", updateData);
    };
  }, [updateData]);

  return (
    <>
      <div className="flex w-full flex-col items-start justify-between py-0 gap-3 md:flex-row md:items-center">
        <div className="flex flex-col items-start gap-3 w-full md:flex-row md:items-center">
          <Input
            placeholder="Filter by description..."
            value={table.getColumn("description").getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("description").setFilterValue(event.target.value)
            }
          />
          <WeekPicker />
        </div>
        <NewExpenseForm />
      </div>
      <div className="border rounded-lg w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  No expenses listed.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell colSpan={2} className="text-right">
                {formattedTotal}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="w-full flex items-center justify-end space-x-2 py-1">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Page{" "}
          <span className="font-medium">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of <span className="font-medium">{table.getPageCount()}</span>
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}

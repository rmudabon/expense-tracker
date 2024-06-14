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
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { tableColumns } from "./columns";

export function ExpenseTable() {
  const [expenseData, setData] = useState(
    JSON.parse(localStorage.getItem(EXPENSE_KEY))
  );
  const INITIAL_VALUE = 0;
  const totalAmount = expenseData.reduce(
    (currentSum, currentExpense) => currentSum + currentExpense.amount,
    INITIAL_VALUE
  );

  const table = useReactTable({
    data: expenseData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
                  colSpan={columns.length}
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
                PHP {totalAmount}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="w-full flex items-center justify-end space-x-2 py-4">
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

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ExpenseTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}

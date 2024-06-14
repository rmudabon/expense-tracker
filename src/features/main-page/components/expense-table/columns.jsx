import { format, isWithinInterval } from "date-fns";

export const tableColumns = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div>{format(new Date(row.getValue("date")), "MM/dd/yyyy")}</div>;
    },
    filterFn: (row, _, filterValue) => {
      if (!filterValue) {
        return true;
      }
      return isWithinInterval(row.getValue("date"), {
        start: filterValue.from,
        end: filterValue.to,
      });
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formattedCurrency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <div className="text-right font-medium">{formattedCurrency}</div>;
    },
  },
];

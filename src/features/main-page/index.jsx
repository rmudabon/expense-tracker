import { ThemeToggler } from "@/components/theme-toggler";
import { ExpenseTable } from "./components/expense-table";

export function MainPage() {
  return (
    <main className="flex flex-col items-center justify-center w-full max-w-5xl m-auto p-5 gap-6">
      <div className="flex flex-row items-center w-full justify-between">
        <h1 className="font-sans w-full scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          CentTrak
        </h1>
        <ThemeToggler />
      </div>
      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Your Expenses
        </h2>
      </div>
      <ExpenseTable />
    </main>
  );
}

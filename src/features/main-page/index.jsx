import { NewExpenseForm } from "./components/new-expense-form";

export function MainPage() {
    return (
            <main className='flex flex-col h-full items-center justify-center'>
                <h1 className="font-sans scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    CentTrak
                </h1>
                <NewExpenseForm />
            </main>
    )
}

import { z } from "zod";

export const formSchema = z.object({
    amount: z.string().transform((val) => Number(val.replace(',', ''))).pipe( z.number().min(0.01, 'Amount must be greater than 0.')),
    date: z.date({
        required_error: 'Date is required.'
    }),
    description: z.string().min(1, 'Description is required.')
})
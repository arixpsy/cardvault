import { z } from "zod"

export const Category = {
  SEALED_PRODUCTS: "SEALED_PRODUCTS",
  SINGLES: "SINGLES",
  SUPPLIES: "SUPPLIES",
  OTHERS: "OTHERS",
} as const

export type Category = (typeof Category)[keyof typeof Category]

const categoryValues = Object.values(Category) as [Category, ...Category[]]

export const createExpenseSchema = z.object({
  expenseName: z.string().max(255).optional(),
  amount: z.coerce.number().positive(),
  category: z.enum(categoryValues).default(Category.OTHERS),
  notes: z.string().max(255),
  expenseAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
})

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>

import { z } from "@hono/zod-openapi"
import { Category, createExpenseSchema } from "@repo/shared"

export const CreateExpenseBodySchema = createExpenseSchema.openapi("CreateExpenseBody")

export const UpdateExpenseBodySchema = createExpenseSchema.partial().openapi("UpdateExpenseBody")

const categoryValues = Object.values(Category) as [Category, ...Category[]]

export const ExpenseResponseSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    userId: z.string().openapi({ example: "user_abc123" }),
    expenseName: z.string().openapi({ example: "Booster Pack" }),
    amount: z.number().openapi({ example: 14.99 }),
    category: z.enum(categoryValues).openapi({ example: Category.SEALED_PRODUCTS }),
    notes: z.string().nullable().openapi({ example: "Scarlet & Violet" }),
    expenseAt: z.string().openapi({ example: "2026-04-04" }),
    createdAt: z.string().openapi({ example: "2026-04-04T00:00:00.000Z" }),
  })
  .openapi("Expense")

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

export const Condition = {
  NM: "NM", // Near Mint — no visible wear, print defects only
  LP: "LP", // Lightly Played — minor wear on edges/corners
  MP: "MP", // Moderately Played — noticeable wear, no creases
  HP: "HP", // Heavily Played — significant wear, possible creases
  DMG: "DMG", // Damaged — tears, heavy creases, water damage
} as const

export type Condition = (typeof Condition)[keyof typeof Condition]

export const Game = {
  POKEMON: "POKEMON",
  OTHERS: "",
} as const

export type Game = (typeof Game)[keyof typeof Game]

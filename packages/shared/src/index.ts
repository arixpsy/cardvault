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
  expenseName: z.string().max(255),
  amount: z.coerce.number().positive(),
  category: z.enum(categoryValues),
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
  OTHERS: "OTHERS",
} as const

export type Game = (typeof Game)[keyof typeof Game]

const conditionValues = Object.values(Condition) as [Condition, ...Condition[]]
const gameValues = Object.values(Game) as [Game, ...Game[]]

export const createCollectionEntrySchema = z.object({
  game: z.enum(gameValues),
  externalId: z.string().max(100),
  localId: z.string().max(20),
  name: z.string().max(255),
  setId: z.string().max(50),
  setName: z.string().max(255),
  rarity: z.string().max(100).optional(),
  imageUrl: z.string().optional(),
  condition: z.enum(conditionValues),
  variant: z.string().max(100).optional(),
  customValue: z.coerce.number().positive().optional(),
  notes: z.string().max(255).optional(),
})

export type CreateCollectionEntryInput = z.infer<typeof createCollectionEntrySchema>

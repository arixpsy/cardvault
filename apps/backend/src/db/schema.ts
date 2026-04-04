import {
  doublePrecision,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  date,
  varchar,
  text,
  unique,
} from "drizzle-orm/pg-core"
import { Category, Condition, Game } from "../utils/enum"

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
}

const objectToPgEnum = <T extends Record<string, any>>(myEnum: T): [T[keyof T], ...T[keyof T][]] =>
  Object.values(myEnum).map((value: any) => `${value}`) as any

export const categoryEnum = pgEnum("category", objectToPgEnum(Category))
export const conditionEnum = pgEnum("condition", objectToPgEnum(Condition))
export const gameEnum = pgEnum("game", objectToPgEnum(Game))

export const usersTable = pgTable("users", {
  clerkId: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
})

export const cardsTable = pgTable(
  "cards",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    game: gameEnum("game").notNull(),
    externalId: varchar({ length: 100 }).notNull(),
    localId: varchar({ length: 20 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    setId: varchar({ length: 50 }).notNull(),
    setName: varchar({ length: 255 }).notNull(),
    rarity: varchar({ length: 100 }),
    imageUrl: text(),
    // Game-specific fields (e.g. HP, mana cost, ink cost)
    metadata: jsonb(),
    marketPrice: doublePrecision(),
    priceUpdatedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp(),
  },
  (t) => [unique().on(t.game, t.externalId)],
)

export const collectionEntriesTable = pgTable("collection_entries", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 })
    .references(() => usersTable.clerkId)
    .notNull(),
  cardId: integer()
    .references(() => cardsTable.id)
    .notNull(),
  condition: conditionEnum("condition").notNull(),
  // Free-form: "Reverse Holo", "Foil", "Etched Foil", "Enchanted", etc.
  variant: varchar({ length: 100 }),
  customValue: doublePrecision(),
  acquiredAt: date({ mode: "string" }).defaultNow().notNull(),
  notes: varchar({ length: 255 }),
  ...timestamps,
})

export const expensesTable = pgTable("expenses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 })
    .references(() => usersTable.clerkId)
    .notNull(),
  expenseName: varchar({ length: 255 }),
  amount: doublePrecision().notNull(),
  category: categoryEnum("category").default(Category.OTHERS),
  notes: varchar({ length: 255 }).notNull(),
  expenseAt: date({ mode: "string" }).defaultNow().notNull(),
  ...timestamps,
})

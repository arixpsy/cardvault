import { InferInsertModel, and, desc, eq } from "drizzle-orm"
import { getDb } from "../db/client"
import { expensesTable } from "../db/schema"

type InsertExpenseParams = InferInsertModel<typeof expensesTable>
type UpdateExpenseParams = Partial<Omit<InsertExpenseParams, "id" | "userId" | "createdAt">>

export async function insertExpense(env: CloudflareBindings, params: InsertExpenseParams) {
  const db = getDb(env)
  const [inserted] = await db.insert(expensesTable).values(params).returning()
  return inserted
}

export async function getExpenses(
  env: CloudflareBindings,
  userId: string,
  opts: { limit?: number; offset?: number } = {},
) {
  const db = getDb(env)
  const { limit = 20, offset = 0 } = opts
  return db
    .select()
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId))
    .orderBy(desc(expensesTable.expenseAt))
    .limit(limit)
    .offset(offset)
}

export async function getExpense(env: CloudflareBindings, userId: string, id: number) {
  const db = getDb(env)
  const [row] = await db
    .select()
    .from(expensesTable)
    .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, userId)))
    .limit(1)
  return row ?? null
}

export async function updateExpense(
  env: CloudflareBindings,
  userId: string,
  id: number,
  params: UpdateExpenseParams,
) {
  const db = getDb(env)
  const [updated] = await db
    .update(expensesTable)
    .set(params)
    .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, userId)))
    .returning()
  return updated ?? null
}

export async function deleteExpense(env: CloudflareBindings, userId: string, id: number) {
  const db = getDb(env)
  const [deleted] = await db
    .delete(expensesTable)
    .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, userId)))
    .returning()
  return deleted ?? null
}

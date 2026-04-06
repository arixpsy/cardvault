import { InferInsertModel, and, desc, eq, ilike, isNull, sql } from "drizzle-orm"
import { getDb } from "../db/client"
import { expensesTable } from "../db/schema"
import { Category } from "@repo/shared"

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
  opts: { limit?: number; offset?: number; search?: string; category?: string } = {},
) {
  const db = getDb(env)
  const { limit = 20, offset = 0, search, category } = opts

  const conditions = [eq(expensesTable.userId, userId)]
  if (search) conditions.push(ilike(expensesTable.expenseName, `%${search}%`))
  if (category) conditions.push(eq(expensesTable.category, category as Category))

  return db
    .select()
    .from(expensesTable)
    .where(and(...conditions))
    .orderBy(desc(expensesTable.expenseAt))
    .limit(limit)
    .offset(offset)
}

export async function getExpenseStats(env: CloudflareBindings, userId: string) {
  const db = getDb(env)
  const [row] = await db
    .select({
      totalSpent: sql<number>`COALESCE(SUM(${expensesTable.amount}), 0)`,
      totalCount: sql<number>`COUNT(${expensesTable.id})`,
      cardPurchasesTotal: sql<number>`COALESCE(SUM(CASE WHEN ${expensesTable.category} IN ('SEALED_PRODUCTS', 'SINGLES') THEN ${expensesTable.amount} ELSE 0 END), 0)`,
      otherCostsTotal: sql<number>`COALESCE(SUM(CASE WHEN ${expensesTable.category} IN ('SUPPLIES', 'OTHERS') THEN ${expensesTable.amount} ELSE 0 END), 0)`,
    })
    .from(expensesTable)
    .where(and(eq(expensesTable.userId, userId), isNull(expensesTable.deletedAt)))
  return {
    totalSpent: Number(row?.totalSpent ?? 0),
    totalCount: Number(row?.totalCount ?? 0),
    cardPurchasesTotal: Number(row?.cardPurchasesTotal ?? 0),
    otherCostsTotal: Number(row?.otherCostsTotal ?? 0),
  }
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

import { and, count, eq, isNull, sql } from "drizzle-orm"
import { getDb } from "../db/client"
import { cardsTable, collectionEntriesTable, expensesTable } from "../db/schema"

export async function getDashboardStats(env: CloudflareBindings, userId: string) {
  const db = getDb(env)

  const [cardCountResult] = await db
    .select({ count: count() })
    .from(collectionEntriesTable)
    .where(and(eq(collectionEntriesTable.userId, userId), isNull(collectionEntriesTable.deletedAt)))

  const [collectionValueResult] = await db
    .select({
      value: sql<number>`COALESCE(SUM(COALESCE(${cardsTable.marketPrice}, 0)), 0)`,
    })
    .from(collectionEntriesTable)
    .leftJoin(cardsTable, eq(collectionEntriesTable.cardId, cardsTable.id))
    .where(and(eq(collectionEntriesTable.userId, userId), isNull(collectionEntriesTable.deletedAt)))

  const [totalSpendResult] = await db
    .select({
      total: sql<number>`COALESCE(SUM(${expensesTable.amount}), 0)`,
    })
    .from(expensesTable)
    .where(and(eq(expensesTable.userId, userId), isNull(expensesTable.deletedAt)))

  const totalCards = cardCountResult?.count ?? 0
  const collectionValue = Number(collectionValueResult?.value ?? 0)
  const totalSpend = Number(totalSpendResult?.total ?? 0)
  const netProfitLoss = collectionValue - totalSpend

  return { totalCards, collectionValue, totalSpend, netProfitLoss }
}

import { and, asc, desc, eq, ilike, isNull } from "drizzle-orm"
import { getDb } from "../db/client"
import { cardsTable, collectionEntriesTable } from "../db/schema"
import { type CreateCollectionEntryInput, type Condition } from "@repo/shared"

interface AddToCollectionParams extends CreateCollectionEntryInput {
  userId: string
}

export async function getCollectionEntries(
  env: CloudflareBindings,
  userId: string,
  opts: {
    limit?: number
    offset?: number
    search?: string
    condition?: string
    sort?: string
  } = {},
) {
  const db = getDb(env)
  const { limit = 50, offset = 0, search, condition, sort = "date-desc" } = opts

  const conditions = [
    eq(collectionEntriesTable.userId, userId),
    isNull(collectionEntriesTable.deletedAt),
  ]
  if (search) conditions.push(ilike(cardsTable.name, `%${search}%`))
  if (condition) conditions.push(eq(collectionEntriesTable.condition, condition as Condition))

  const sortMap: Record<string, any> = {
    "date-desc": desc(collectionEntriesTable.createdAt),
    "date-asc": asc(collectionEntriesTable.createdAt),
    "name-asc": asc(cardsTable.name),
    "value-desc": desc(cardsTable.marketPrice),
    "value-asc": asc(cardsTable.marketPrice),
  }

  const rows = await db
    .select({
      id: collectionEntriesTable.id,
      cardId: collectionEntriesTable.cardId,
      condition: collectionEntriesTable.condition,
      variant: collectionEntriesTable.variant,
      customValue: collectionEntriesTable.customValue,
      acquiredAt: collectionEntriesTable.acquiredAt,
      notes: collectionEntriesTable.notes,
      createdAt: collectionEntriesTable.createdAt,
      name: cardsTable.name,
      localId: cardsTable.localId,
      game: cardsTable.game,
      setName: cardsTable.setName,
      rarity: cardsTable.rarity,
      imageUrl: cardsTable.imageUrl,
      marketPrice: cardsTable.marketPrice,
    })
    .from(collectionEntriesTable)
    .innerJoin(cardsTable, eq(collectionEntriesTable.cardId, cardsTable.id))
    .where(and(...conditions))
    .orderBy(sortMap[sort] ?? desc(collectionEntriesTable.createdAt))
    .limit(limit)
    .offset(offset)

  return rows
}

export async function deleteCollectionEntry(env: CloudflareBindings, userId: string, id: number) {
  const db = getDb(env)
  const [deleted] = await db
    .delete(collectionEntriesTable)
    .where(and(eq(collectionEntriesTable.id, id), eq(collectionEntriesTable.userId, userId)))
    .returning()
  return deleted ?? null
}

export async function addToCollection(env: CloudflareBindings, params: AddToCollectionParams) {
  const db = getDb(env)
  const {
    userId,
    game,
    externalId,
    localId,
    name,
    setId,
    setName,
    rarity,
    imageUrl,
    condition,
    variant,
    customValue,
    notes,
  } = params

  const [card] = await db
    .insert(cardsTable)
    .values({
      game,
      externalId,
      localId,
      name,
      setId,
      setName,
      rarity: rarity ?? null,
      imageUrl: imageUrl ?? null,
    })
    .onConflictDoUpdate({
      target: [cardsTable.game, cardsTable.externalId],
      set: {
        name,
        setName,
        rarity: rarity ?? null,
        imageUrl: imageUrl ?? null,
        updatedAt: new Date(),
      },
    })
    .returning()

  const [entry] = await db
    .insert(collectionEntriesTable)
    .values({
      userId,
      cardId: card.id,
      condition,
      variant: variant ?? null,
      customValue: customValue ?? null,
      notes: notes ?? null,
    })
    .returning()

  return entry
}

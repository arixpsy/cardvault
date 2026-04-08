import { getDb } from "../db/client"
import { cardsTable, collectionEntriesTable } from "../db/schema"
import { type CreateCollectionEntryInput } from "@repo/shared"

interface AddToCollectionParams extends CreateCollectionEntryInput {
  userId: string
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

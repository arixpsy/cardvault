import { z } from "@hono/zod-openapi"
import { createCollectionEntrySchema, Condition } from "@repo/shared"

export const CreateCollectionEntryBodySchema = createCollectionEntrySchema.openapi(
  "CreateCollectionEntryBody",
)

export const CollectionEntryResponseSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    userId: z.string().openapi({ example: "user_abc123" }),
    cardId: z.number().openapi({ example: 42 }),
    condition: z.enum(Condition).openapi({ example: Condition.NM }),
    variant: z.string().nullable().openapi({ example: "Reverse Holo" }),
    customValue: z.number().nullable().openapi({ example: 12.5 }),
    acquiredAt: z.string().openapi({ example: "2026-04-07" }),
    notes: z.string().nullable().openapi({ example: "Pulled from booster" }),
    createdAt: z.string().openapi({ example: "2026-04-07T00:00:00.000Z" }),
  })
  .openapi("CollectionEntry")

export const CollectionEntryWithCardSchema = z
  .object({
    id: z.number(),
    cardId: z.number(),
    condition: z.enum(Condition),
    variant: z.string().nullable(),
    customValue: z.number().nullable(),
    acquiredAt: z.string(),
    notes: z.string().nullable(),
    createdAt: z.string(),
    name: z.string(),
    localId: z.string(),
    game: z.string(),
    setName: z.string(),
    rarity: z.string().nullable(),
    imageUrl: z.string().nullable(),
    marketPrice: z.number().nullable(),
  })
  .openapi("CollectionEntryWithCard")

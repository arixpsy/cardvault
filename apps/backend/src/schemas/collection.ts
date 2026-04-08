import { z } from "@hono/zod-openapi"
import { createCollectionEntrySchema, Condition } from "@repo/shared"

export const CreateCollectionEntryBodySchema =
  createCollectionEntrySchema.openapi("CreateCollectionEntryBody")

const conditionValues = Object.values(Condition) as [Condition, ...Condition[]]

export const CollectionEntryResponseSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    userId: z.string().openapi({ example: "user_abc123" }),
    cardId: z.number().openapi({ example: 42 }),
    condition: z.enum(conditionValues).openapi({ example: Condition.NM }),
    variant: z.string().nullable().openapi({ example: "Reverse Holo" }),
    customValue: z.number().nullable().openapi({ example: 12.5 }),
    acquiredAt: z.string().openapi({ example: "2026-04-07" }),
    notes: z.string().nullable().openapi({ example: "Pulled from booster" }),
    createdAt: z.string().openapi({ example: "2026-04-07T00:00:00.000Z" }),
  })
  .openapi("CollectionEntry")

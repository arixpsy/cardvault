import { createRoute, z } from "@hono/zod-openapi"
import {
  CreateCollectionEntryBodySchema,
  CollectionEntryResponseSchema,
  CollectionEntryWithCardSchema,
  conditionValues,
} from "../schemas/collection"
import { errorResponses } from "../lib/routes"

export const postCollectionEntryRoute = createRoute({
  method: "post",
  path: "/collection",
  request: {
    body: {
      content: { "application/json": { schema: CreateCollectionEntryBodySchema } },
      required: true,
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: CollectionEntryResponseSchema } },
      description: "Card added to collection",
    },
    ...errorResponses,
  },
})

const collectionIdParam = z.object({ id: z.coerce.number().int().positive() })

export const deleteCollectionEntryRoute = createRoute({
  method: "delete",
  path: "/collection/{id}",
  request: { params: collectionIdParam },
  responses: {
    200: {
      content: { "application/json": { schema: CollectionEntryResponseSchema } },
      description: "Collection entry deleted",
    },
    ...errorResponses,
  },
})

export const getCollectionEntriesRoute = createRoute({
  method: "get",
  path: "/collection",
  request: {
    query: z.object({
      limit: z.coerce.number().int().min(1).max(100).default(50).optional(),
      offset: z.coerce.number().int().min(0).default(0).optional(),
      search: z.string().optional(),
      condition: z.enum(conditionValues).optional(),
      sort: z
        .enum(["date-desc", "date-asc", "name-asc", "value-desc", "value-asc"]) // TODO: convert to enum object in @shared repo
        .default("date-desc")
        .optional(),
    }),
  },
  responses: {
    200: {
      content: { "application/json": { schema: z.array(CollectionEntryWithCardSchema) } },
      description: "List of collection entries with card data",
    },
    ...errorResponses,
  },
})

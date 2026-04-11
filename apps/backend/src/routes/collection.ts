import { createRoute, z } from "@hono/zod-openapi"
import {
  CreateCollectionEntryBodySchema,
  CollectionEntryResponseSchema,
  CollectionEntryWithCardSchema,
} from "../schemas/collection"
import { errorResponses } from "../lib/routes"
import { CollectionSortOption, Condition } from "@repo/shared"

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
      condition: z.enum(Condition).optional(),
      sort: z.enum(CollectionSortOption).default(CollectionSortOption.DATE_DESC).optional(),
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

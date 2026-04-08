import { createRoute } from "@hono/zod-openapi"
import {
  CreateCollectionEntryBodySchema,
  CollectionEntryResponseSchema,
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

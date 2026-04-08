import { RouteHandler } from "@hono/zod-openapi"
import { addToCollection } from "../dao/collection"
import { requireAuth } from "../lib/auth"
import { postCollectionEntryRoute } from "../routes/collection"

type Env = { Bindings: CloudflareBindings }

export const postCollectionEntryHandler: RouteHandler<typeof postCollectionEntryRoute, Env> =
  async (c) => {
    const userId = requireAuth(c)
    const body = c.req.valid("json")
    const entry = await addToCollection(c.env, { userId, ...body })
    return c.json(entry, 201)
  }

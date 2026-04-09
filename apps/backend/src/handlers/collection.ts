import { RouteHandler } from "@hono/zod-openapi"
import { addToCollection, getCollectionEntries, deleteCollectionEntry } from "../dao/collection"
import { requireAuth } from "../lib/auth"
import { postCollectionEntryRoute, getCollectionEntriesRoute, deleteCollectionEntryRoute } from "../routes/collection"

type Env = { Bindings: CloudflareBindings }

export const postCollectionEntryHandler: RouteHandler<typeof postCollectionEntryRoute, Env> =
  async (c) => {
    const userId = requireAuth(c)
    const body = c.req.valid("json")
    const entry = await addToCollection(c.env, { userId, ...body })
    return c.json(entry, 201)
  }

export const getCollectionEntriesHandler: RouteHandler<typeof getCollectionEntriesRoute, Env> =
  async (c) => {
    const userId = requireAuth(c)
    const { limit, offset, search, condition, sort } = c.req.valid("query")
    const rows = await getCollectionEntries(c.env, userId, { limit, offset, search, condition, sort })
    return c.json(rows, 200)
  }

export const deleteCollectionEntryHandler: RouteHandler<typeof deleteCollectionEntryRoute, Env> =
  async (c) => {
    const userId = requireAuth(c)
    const { id } = c.req.valid("param")
    const deleted = await deleteCollectionEntry(c.env, userId, id)
    if (!deleted) return c.json({ ok: false, message: "Not found" }, 404)
    return c.json(deleted, 200)
  }

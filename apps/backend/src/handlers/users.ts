import { RouteHandler } from "@hono/zod-openapi"
import { upsertUser } from "../dao/users"
import { requireAuth } from "../lib/auth"
import { postUsersMeRoute } from "../routes/users"

type Env = { Bindings: CloudflareBindings }

export const postUsersMeHandler: RouteHandler<typeof postUsersMeRoute, Env> = async (c) => {
  const userId = requireAuth(c)
  const body = c.req.valid("json")
  const user = await upsertUser(c.env, { clerkId: userId, ...body })
  return c.json(user, 200)
}

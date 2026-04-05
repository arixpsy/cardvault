import { RouteHandler } from "@hono/zod-openapi"
import { getDashboardStats } from "../dao/dashboard"
import { requireAuth } from "../lib/auth"
import { getDashboardStatsRoute } from "../routes/dashboard"

type Env = { Bindings: CloudflareBindings }

export const getDashboardStatsHandler: RouteHandler<typeof getDashboardStatsRoute, Env> = async (
  c,
) => {
  const userId = requireAuth(c)
  const stats = await getDashboardStats(c.env, userId)
  return c.json(stats, 200)
}

import { createRoute } from "@hono/zod-openapi"
import { errorResponses } from "../lib/routes"
import { DashboardStatsResponseSchema } from "../schemas/dashboard"

export const getDashboardStatsRoute = createRoute({
  method: "get",
  path: "/dashboard/stats",
  responses: {
    200: {
      content: { "application/json": { schema: DashboardStatsResponseSchema } },
      description: "Dashboard statistics",
    },
    ...errorResponses,
  },
})

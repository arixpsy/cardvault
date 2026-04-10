import { createRoute } from "@hono/zod-openapi"
import { errorResponses } from "../lib/routes"
import { DashboardStatsResponseSchema, DashboardCardsResponseSchema } from "../schemas/dashboard"

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

export const getDashboardCardsRoute = createRoute({
  method: "get",
  path: "/dashboard/cards",
  responses: {
    200: {
      content: { "application/json": { schema: DashboardCardsResponseSchema } },
      description: "Dashboard card collection showcase",
    },
    ...errorResponses,
  },
})

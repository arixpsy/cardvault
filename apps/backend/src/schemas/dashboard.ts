import { z } from "@hono/zod-openapi"

export const DashboardStatsResponseSchema = z
  .object({
    totalCards: z.number().openapi({ example: 42 }),
    collectionValue: z.number().openapi({ example: 1250.5 }),
    totalSpend: z.number().openapi({ example: 800.0 }),
    netProfitLoss: z.number().openapi({ example: 450.5 }),
  })
  .openapi("DashboardStats")

export const DashboardCardsResponseSchema = z.object({
  // TODO:
})

import { z } from "@hono/zod-openapi"

export const ErrorSchema = z
  .object({
    ok: z.literal(false),
    message: z.string().openapi({ example: "Unauthorized" }),
  })
  .openapi("Error")

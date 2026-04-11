import { z } from "@hono/zod-openapi"

export const UpsertUserBodySchema = z
  .object({
    name: z.string().max(255).openapi({ example: "John Doe" }),
    email: z.email().max(255).openapi({ example: "john@example.com" }),
  })
  .openapi("UpsertUserBody")

export const UserResponseSchema = z
  .object({
    clerkId: z.string().openapi({ example: "user_abc123" }),
    name: z.string().openapi({ example: "John Doe" }),
    email: z.string().openapi({ example: "john@example.com" }),
  })
  .openapi("User")

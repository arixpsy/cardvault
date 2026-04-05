import { createRoute } from "@hono/zod-openapi"
import { errorResponses } from "../lib/routes"
import { UpsertUserBodySchema, UserResponseSchema } from "../schemas/users"

export const postUsersMeRoute = createRoute({
  method: "post",
  path: "/users/me",
  request: {
    body: {
      content: { "application/json": { schema: UpsertUserBodySchema } },
      required: true,
    },
  },
  responses: {
    200: {
      content: { "application/json": { schema: UserResponseSchema } },
      description: "User upserted",
    },
    ...errorResponses,
  },
})

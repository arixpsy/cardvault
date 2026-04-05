import { ErrorSchema } from "../schemas/common"

export const errorResponses = {
  401: {
    content: { "application/json": { schema: ErrorSchema } },
    description: "Unauthorized",
  },
  404: {
    content: { "application/json": { schema: ErrorSchema } },
    description: "Not found",
  },
  422: { description: "Validation error" },
} as const

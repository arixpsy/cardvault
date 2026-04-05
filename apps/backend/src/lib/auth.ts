import { getAuth } from "@hono/clerk-auth"
import { Context } from "hono"
import { HTTPException } from "hono/http-exception"

export function requireAuth(c: Context): string {
  const { userId } = getAuth(c)
  if (!userId) throw new HTTPException(401, { message: "Unauthorized" })
  return userId
}

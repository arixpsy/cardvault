import { InferInsertModel } from "drizzle-orm"
import { getDb } from "../db/client"
import { usersTable } from "../db/schema"

type UpsertUserParams = InferInsertModel<typeof usersTable>

export async function upsertUser(env: CloudflareBindings, params: UpsertUserParams) {
  const db = getDb(env)
  const [user] = await db
    .insert(usersTable)
    .values(params)
    .onConflictDoUpdate({
      target: usersTable.clerkId,
      set: { name: params.name, email: params.email },
    })
    .returning()
  return user
}

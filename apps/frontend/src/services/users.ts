import type { Client } from "@repo/backend/hc"

export async function upsertCurrentUser(client: Client, data: { name: string; email: string }) {
  const res = await client.users.me.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

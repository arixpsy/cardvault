import { hcWithType } from "@repo/backend/hc"

const client = hcWithType(import.meta.env.VITE_API_URL || "/api")

export async function upsertCurrentUser(data: { name: string; email: string }) {
  const res = await client.users.me.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

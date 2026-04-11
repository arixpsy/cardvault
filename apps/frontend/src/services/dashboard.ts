import type { Client } from "@repo/backend/hc"

export async function getDashboardStats(client: Client) {
  const res = await client.dashboard.stats.$get()
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

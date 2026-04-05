import { hcWithType } from "@repo/backend/hc"

const client = hcWithType(import.meta.env.VITE_API_URL || "/api")

export async function getDashboardStats() {
  const res = await client.dashboard.stats.$get()
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

import { useApiClient } from "../utils/honoClient"

export async function getDashboardStats() {
  const client = useApiClient()
  const res = await client.dashboard.stats.$get()
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

import { useApiClient } from "../utils/honoClient"

export async function upsertCurrentUser(data: { name: string; email: string }) {
  const client = useApiClient()
  const res = await client.users.me.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

import { hcWithType } from "@repo/backend/hc"
import type { CreateCollectionEntryInput } from "@repo/shared"

const client = hcWithType(import.meta.env.VITE_API_URL || "/api")

export async function addCardToCollection(data: CreateCollectionEntryInput) {
  const res = await client.collection.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

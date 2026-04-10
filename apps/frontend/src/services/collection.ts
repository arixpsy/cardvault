import { hcWithType } from "@repo/backend/hc"
import type { Condition, CreateCollectionEntryInput } from "@repo/shared"

const client = hcWithType(import.meta.env.VITE_API_URL || "/api")

export async function addCardToCollection(data: CreateCollectionEntryInput) {
  const res = await client.collection.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getCollectionEntries(
  params: { limit?: number; offset?: number; search?: string; condition?: Condition; sort?: string } = {},
) {
  const res = await client.collection.$get({ query: params })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteCollectionEntry(id: number) {
  const res = await client.collection[":id"].$delete({ param: { id: String(id) } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

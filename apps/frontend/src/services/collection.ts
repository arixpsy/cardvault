import type { CollectionSortOption, Condition, CreateCollectionEntryInput } from "@repo/shared"
import type { Client } from "@repo/backend/hc"

export async function addCardToCollection(client: Client, data: CreateCollectionEntryInput) {
  const res = await client.collection.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getCollectionEntries(
  client: Client,
  params: {
    limit?: number
    offset?: number
    search?: string
    condition?: Condition
    sort?: CollectionSortOption
  } = {},
) {
  const res = await client.collection.$get({ query: params })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteCollectionEntry(client: Client, id: number) {
  const res = await client.collection[":id"].$delete({ param: { id: String(id) } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

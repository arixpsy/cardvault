import type { CollectionSortOption, Condition, CreateCollectionEntryInput } from "@repo/shared"
import { useApiClient } from "../utils/honoClient"

export async function addCardToCollection(data: CreateCollectionEntryInput) {
  const client = useApiClient()
  const res = await client.collection.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getCollectionEntries(
  params: {
    limit?: number
    offset?: number
    search?: string
    condition?: Condition
    sort?: CollectionSortOption
  } = {},
) {
  const client = useApiClient()
  const res = await client.collection.$get({ query: params })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteCollectionEntry(id: number) {
  const client = useApiClient()
  const res = await client.collection[":id"].$delete({ param: { id: String(id) } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

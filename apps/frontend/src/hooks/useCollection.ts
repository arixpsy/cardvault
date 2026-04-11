import type { CollectionSortOption, Condition, CreateCollectionEntryInput } from "@repo/shared"
import { useAuth } from "@clerk/vue"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/vue-query"
import { computed, type Ref } from "vue"
import {
  addCardToCollection,
  deleteCollectionEntry,
  getCollectionEntries,
} from "../services/collection"
import { useApiClient } from "../utils/honoClient"
import { queryKeys } from "../utils/queryKeys"

const PAGE_SIZE = 50

export function useCollection(
  filters: Ref<{ search?: string; condition?: Condition; sort?: CollectionSortOption }> = computed(
    () => ({}),
  ),
) {
  const { getToken } = useAuth()
  const client = useApiClient(getToken.value)

  return useInfiniteQuery({
    queryKey: computed(() => queryKeys.collection.list(filters.value)),
    queryFn: ({ pageParam }) =>
      getCollectionEntries(client, {
        limit: PAGE_SIZE,
        offset: pageParam as number,
        ...filters.value,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.flat().length : undefined,
  })
}

export function useAddToCollection() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const client = useApiClient(getToken.value)

  return useMutation({
    mutationFn: (data: CreateCollectionEntryInput) => addCardToCollection(client, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collection.all() })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats() })
    },
  })
}

export function useDeleteCollectionEntry() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  const client = useApiClient(getToken.value)

  return useMutation({
    mutationFn: (id: number) => deleteCollectionEntry(client, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collection.all() })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats() })
    },
  })
}

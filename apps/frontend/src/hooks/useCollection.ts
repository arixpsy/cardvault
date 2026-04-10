import { computed, type Ref } from "vue"
import { useInfiniteQuery } from "@tanstack/vue-query"
import { getCollectionEntries } from "../services/collection"
import { queryKeys } from "../utils/queryKeys"

const PAGE_SIZE = 50

export function useCollection(
  filters: Ref<{ search?: string; condition?: string; sort?: string }> = computed(() => ({})),
) {
  return useInfiniteQuery({
    queryKey: computed(() => queryKeys.collection.list(filters.value)),
    queryFn: ({ pageParam }) =>
      getCollectionEntries({ limit: PAGE_SIZE, offset: pageParam as number, ...filters.value }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.flat().length : undefined,
  })
}

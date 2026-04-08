import { ref, computed, watch, onUnmounted } from "vue"
import { useInfiniteQuery } from "@tanstack/vue-query"
import { searchCards, PAGE_SIZE } from "../services/cards"
import { queryKeys } from "../utils/queryKeys"

export function useCardSearch() {
  const searchTerm = ref("")
  const debouncedTerm = ref("")

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  watch(searchTerm, (value) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    if (!value.trim()) {
      debouncedTerm.value = ""
      return
    }
    debounceTimer = setTimeout(() => {
      debouncedTerm.value = value.trim()
    }, 800)
  })

  onUnmounted(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
  })

  const query = useInfiniteQuery({
    queryKey: computed(() => queryKeys.cardSearch.results(debouncedTerm.value)),
    queryFn: ({ pageParam }) => searchCards(debouncedTerm.value, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
    enabled: () => debouncedTerm.value.length >= 2,
    staleTime: 1000 * 60 * 5,
  })

  return { searchTerm, ...query }
}

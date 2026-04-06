import { computed, type Ref } from "vue"
import { useInfiniteQuery } from "@tanstack/vue-query"
import { getExpenses } from "../services/expenses"
import { queryKeys } from "../utils/queryKeys"

export function useExpenses(filters: Ref<{ search?: string; category?: string }> = computed(() => ({}))) {
  return useInfiniteQuery({
    queryKey: computed(() => queryKeys.expenses.list(filters.value)),
    queryFn: ({ pageParam }) =>
      getExpenses({ limit: 50, offset: pageParam as number, ...filters.value }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 50 ? allPages.flat().length : undefined,
  })
}

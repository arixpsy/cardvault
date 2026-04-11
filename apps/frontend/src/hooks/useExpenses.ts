import type { CreateExpenseInput } from "@repo/shared"
import { useAuth } from "@clerk/vue"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { computed, type Ref } from "vue"
import { createExpense, deleteExpense, getExpenses, getExpenseStats } from "../services/expenses"
import { useApiClient } from "../utils/honoClient"
import { queryKeys } from "../utils/queryKeys"

export function useExpenses(
  filters: Ref<{ search?: string; category?: string }> = computed(() => ({})),
) {
  const { getToken } = useAuth()
  const client = useApiClient(getToken.value)

  return useInfiniteQuery({
    queryKey: computed(() => queryKeys.expenses.list(filters.value)),
    queryFn: ({ pageParam }) =>
      getExpenses(client, { limit: 50, offset: pageParam as number, ...filters.value }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 50 ? allPages.flat().length : undefined,
  })
}

export function useExpenseStats() {
  const { getToken } = useAuth()
  const client = useApiClient(getToken.value)

  return useQuery({
    queryKey: queryKeys.expenses.stats(),
    queryFn: () => getExpenseStats(client),
  })
}

export function useCreateExpense() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  const client = useApiClient(getToken.value)

  return useMutation({
    mutationFn: (data: CreateExpenseInput) => createExpense(client, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() }),
  })
}

export function useDeleteExpense() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  const client = useApiClient(getToken.value)

  return useMutation({
    mutationFn: (id: number) => deleteExpense(client, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() }),
  })
}

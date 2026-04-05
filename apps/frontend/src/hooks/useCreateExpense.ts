import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { createExpense } from "../services/expenses"
import { queryKeys } from "../utils/queryKeys"

export function useCreateExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() }),
  })
}

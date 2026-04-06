import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { deleteExpense } from "../services/expenses"
import { queryKeys } from "../utils/queryKeys"

export function useDeleteExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() }),
  })
}

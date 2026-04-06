import { useQuery } from "@tanstack/vue-query"
import { getExpenseStats } from "../services/expenses"
import { queryKeys } from "../utils/queryKeys"

export function useExpenseStats() {
  return useQuery({
    queryKey: queryKeys.expenses.stats(),
    queryFn: getExpenseStats,
  })
}

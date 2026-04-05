import { useQuery } from "@tanstack/vue-query"
import { getDashboardStats } from "../services/dashboard"
import { queryKeys } from "../utils/queryKeys"

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: getDashboardStats,
  })
}

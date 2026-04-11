import { useAuth } from "@clerk/vue"
import { useQuery } from "@tanstack/vue-query"
import { getDashboardStats } from "../services/dashboard"
import { useApiClient } from "../utils/honoClient"
import { queryKeys } from "../utils/queryKeys"

export function useDashboardStats() {
  const { getToken } = useAuth()
  const client = useApiClient(getToken.value)

  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: () => getDashboardStats(client),
  })
}

import { hcWithType } from "@repo/backend/hc"
import { useAuth } from "@clerk/vue"

type Fetch = typeof fetch

export function useApiClient() {
  const { getToken } = useAuth()

  return hcWithType(import.meta.env.VITE_API_URL || "/api", {
    fetch: async (input: Parameters<Fetch>[0], init: Parameters<Fetch>[1]) => {
      const token = await getToken.value()

      return fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      })
    },
  })
}

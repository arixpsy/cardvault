import { hcWithType } from "@repo/backend/hc"

type Fetch = typeof fetch

export function useApiClient(getToken: () => Promise<string | null>) {
  return hcWithType(import.meta.env.VITE_API_URL || "/api", {
    fetch: async (input: Parameters<Fetch>[0], init: Parameters<Fetch>[1]) => {
      const token = await getToken()

      const headers = new Headers(init?.headers)
      if (token) headers.set("Authorization", `Bearer ${token}`)

      return fetch(input, {
        ...init,
        headers,
      })
    },
  })
}

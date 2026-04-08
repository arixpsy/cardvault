import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { addCardToCollection } from "../services/collection"
import { queryKeys } from "../utils/queryKeys"

export function useAddToCollection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addCardToCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collection.all() })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats() })
    },
  })
}

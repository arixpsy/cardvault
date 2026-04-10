import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { deleteCollectionEntry } from "../services/collection"
import { queryKeys } from "../utils/queryKeys"

export function useDeleteCollectionEntry() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCollectionEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collection.all() })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats() })
    },
  })
}

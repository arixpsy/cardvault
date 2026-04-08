import { useQuery } from "@tanstack/vue-query"
import { computed, type Ref } from "vue"
import { getCardDetail } from "../services/cards"
import { queryKeys } from "../utils/queryKeys"

export function useCardDetail(cardId: Ref<string | null>) {
  return useQuery({
    queryKey: computed(() => queryKeys.cards.detail(cardId.value!)),
    queryFn: () => getCardDetail(cardId.value!),
    enabled: () => cardId.value !== null,
    staleTime: 1000 * 60 * 10,
  })
}

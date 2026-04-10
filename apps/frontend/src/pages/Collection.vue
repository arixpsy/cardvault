<script setup lang="ts">
import { computed, ref, watch } from "vue"
import PageContent from "../components/Common/PageContent.vue"
import PageHeader from "../components/Common/PageHeader.vue"
import AddCardButton from "../components/Collection/AddCardButton.vue"
import CollectionContent from "../components/Collection/CollectionContent.vue"
import { useCollection } from "../hooks/useCollection"
import { useDeleteCollectionEntry } from "../hooks/useDeleteCollectionEntry"

const search = ref("")
const debouncedSearch = ref("")
const condition = ref("")
const sort = ref("date-desc")

let debounceTimer: ReturnType<typeof setTimeout>
watch(search, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { debouncedSearch.value = val }, 300)
})

const filters = computed(() => ({
  search: debouncedSearch.value || undefined,
  condition: condition.value || undefined,
  sort: sort.value || undefined,
}))

const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useCollection(filters)

const isFiltering = computed(() => isFetching.value && !isFetchingNextPage.value)
const { mutate: deleteEntry, isPending: isDeleting } = useDeleteCollectionEntry()
const entries = computed(() => data.value?.pages.flat() ?? [])

const cardCount = computed(() => {
  const count = entries.value.length
  if (hasNextPage?.value) return `${count}+ Cards`
  return `${count} Card${count !== 1 ? "s" : ""}`
})
</script>

<template>
  <PageContent>
    <PageHeader title="Collection" :description="cardCount">
      <AddCardButton />
    </PageHeader>

    <CollectionContent
      :entries="entries"
      :has-next-page="!!hasNextPage"
      :is-fetching-next-page="isFetchingNextPage"
      :is-filtering="isFiltering"
      :is-deleting="isDeleting"
      v-model:search="search"
      v-model:condition="condition"
      v-model:sort="sort"
      @load-more="fetchNextPage"
      @delete="deleteEntry"
    />
  </PageContent>
</template>

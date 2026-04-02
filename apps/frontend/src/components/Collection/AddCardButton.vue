<script lang="ts" setup>
import { Plus, Search } from "@lucide/vue"
import { ref, computed, watch, onUnmounted } from "vue"
import Button from "../Common/Button.vue"
import SlidePanel from "../Common/SlidePanel.vue"
import FormGroup from "../Form/FormGroup.vue"
import FormLabel from "../Form/FormLabel.vue"
import FormInput from "../Form/FormInput.vue"
import { useCardSearch } from "../../hooks/useCardSearch"
import CardTile from "./CardTile.vue"
import CardTileSkeleton from "./CardTileSkeleton.vue"
import SearchError from "./SearchError.vue"
import NoResults from "./NoResults.vue"

const open = ref(false)
const openPanel = () => (open.value = true)
const closePanel = () => (open.value = false)

const { searchTerm, data, isFetching, isFetchingNextPage, isError, hasNextPage, fetchNextPage } =
  useCardSearch()

const results = computed(() => data.value?.pages.flat() ?? [])

// Intersection observer sentinel
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

watch(sentinel, (el) => {
  if (observer) observer.disconnect()
  if (!el) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
        fetchNextPage()
      }
    },
    { threshold: 0.1 },
  )
  observer.observe(el)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <Button @click="openPanel"> <Plus />Add Card </Button>

  <SlidePanel title="Add Card" :open="open" @close="closePanel">
    <FormGroup>
      <FormLabel>Search</FormLabel>
      <FormInput v-model="searchTerm" placeholder="Search for a card e.g. Pikachu ex">
        <template #icon>
          <Search />
        </template>
      </FormInput>
    </FormGroup>

    <CardTileSkeleton v-if="isFetching && results.length === 0" />
    <SearchError v-else-if="isError" />
    <div v-else-if="results.length > 0" class="results-scroll">
      <ul class="results-grid">
        <li v-for="card in results" :key="card.id" class="result-tile">
          <CardTile :card="card" />
        </li>
      </ul>
      <div ref="sentinel" class="sentinel" />
      <CardTileSkeleton v-if="isFetchingNextPage" :count="2" />
    </div>
    <NoResults v-else-if="searchTerm.length >= 2 && !isFetching" />
  </SlidePanel>
</template>

<style scoped>
.results-scroll {
  overflow-y: auto;
  flex: 1;
  margin-top: 8px;
}

.results-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.result-tile {
  cursor: pointer;
}

.result-tile:hover :deep(.tile-card) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.sentinel {
  height: 1px;
}
</style>

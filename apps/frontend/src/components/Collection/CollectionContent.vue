<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue"
import { Search, LayoutGrid, List, Loader2 } from "@lucide/vue"
import * as Form from "../Form"
import CollectionGrid from "./CollectionGrid.vue"
import CollectionList from "./CollectionList.vue"
import ConfirmModal from "../Common/ConfirmModal.vue"

interface CollectionEntry {
  id: number
  cardId: number
  condition: string
  variant: string | null
  customValue: number | null
  acquiredAt: string
  notes: string | null
  createdAt: string
  name: string
  localId: string
  game: string
  setName: string
  rarity: string | null
  imageUrl: string | null
  marketPrice: number | null
}

const props = defineProps<{
  entries: CollectionEntry[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isFiltering: boolean
  isDeleting: boolean
}>()

const emit = defineEmits<{
  (e: "load-more"): void
  (e: "delete", id: number): void
}>()

const search = defineModel<string>("search", { default: "" })
const condition = defineModel<string>("condition", { default: "" })
const sort = defineModel<string>("sort", { default: "date-desc" })

const view = ref<"grid" | "list">("grid")
const sentinel = ref<HTMLElement | null>(null)
const pendingDeleteId = ref<number | null>(null)

function requestDelete(id: number) {
  pendingDeleteId.value = id
}

function confirmDelete() {
  if (pendingDeleteId.value !== null) {
    emit("delete", pendingDeleteId.value)
  }
}

function cancelDelete() {
  pendingDeleteId.value = null
}

watch(
  () => props.isDeleting,
  (val, prev) => {
    if (prev === true && val === false) {
      pendingDeleteId.value = null
    }
  },
)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && props.hasNextPage && !props.isFetchingNextPage) {
        emit("load-more")
      }
    },
    { threshold: 0.1 },
  )
  if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="collection-content">
    <!-- Filters -->
    <div class="collection-filters">
      <Form.Input v-model="search" placeholder="Search cards...">
        <template #icon>
          <Search />
        </template>
      </Form.Input>

      <Form.Select v-model="condition" :block="false">
        <option value="">All Conditions</option>
        <option value="NM">Near Mint</option>
        <option value="LP">Lightly Played</option>
        <option value="MP">Moderately Played</option>
        <option value="HP">Heavily Played</option>
        <option value="DMG">Damaged</option>
      </Form.Select>

      <Form.Select v-model="sort" :block="false">
        <option value="date-desc">Recently Added</option>
        <option value="date-asc">Oldest First</option>
        <option value="name-asc">Name A-Z</option>
        <option value="value-desc">Highest Value</option>
        <option value="value-asc">Lowest Value</option>
      </Form.Select>

      <div class="view-toggle">
        <button
          class="view-btn"
          :class="{ active: view === 'grid' }"
          @click="view = 'grid'"
          title="Grid view"
        >
          <LayoutGrid :size="16" />
        </button>
        <button
          class="view-btn"
          :class="{ active: view === 'list' }"
          @click="view = 'list'"
          title="List view"
        >
          <List :size="16" />
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-if="isFiltering" class="collection-state">
      <Loader2 class="spinner" />
    </div>
    <template v-else>
      <div v-if="entries.length === 0 && !isFetchingNextPage" class="collection-state collection-empty">
        No cards in collection
      </div>

      <CollectionGrid v-if="view === 'grid' && entries.length > 0" :entries="entries" @delete="requestDelete" />
      <CollectionList v-else-if="view === 'list' && entries.length > 0" :entries="entries" @delete="requestDelete" />

      <div v-if="isFetchingNextPage" class="collection-state">
        <Loader2 class="spinner" />
      </div>
    </template>

    <div ref="sentinel" class="sentinel" />
  </div>

  <ConfirmModal
    :open="pendingDeleteId !== null"
    title="Remove Card"
    message="This card will be removed from your collection. This action cannot be undone."
    confirm-label="Remove"
    cancel-label="Cancel"
    variant="danger"
    :loading="isDeleting"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>

<style scoped>
.collection-content {
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.collection-filters {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  flex-wrap: wrap;
}

.view-toggle {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: transparent;
  border: none;
  color: var(--ink3);
  cursor: pointer;
  transition: all 0.15s;
}

.view-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}

.view-btn.active {
  background: var(--dark);
  color: #fff;
}

.collection-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  color: var(--ink3);
  font-size: 13px;
  font-family: var(--body);
}

.spinner {
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
  color: var(--ink3);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.sentinel {
  height: 1px;
}

@media (max-width: 640px) {
  .collection-filters {
    padding: 12px 16px;
    gap: 8px;
  }
}
</style>

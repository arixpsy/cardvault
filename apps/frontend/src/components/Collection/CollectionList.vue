<script lang="ts" setup>
import { Trash2 } from "@lucide/vue"
import CardImage from "../Common/CardImage.vue"

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

defineProps<{
  entries: CollectionEntry[]
}>()

const emit = defineEmits<{
  (e: "delete", id: number): void
}>()

function formatPrice(n: number | null) {
  if (n == null) return "--"
  return `$${n.toFixed(2)}`
}

function rarityClass(rarity: string): string {
  const r = rarity.toLowerCase()
  if (r.includes("secret") || r.includes("hyper") || r.includes("special illustration"))
    return "rarity-secret"
  if (r.includes("ultra") || r.includes("illustration")) return "rarity-ultra"
  if (r.includes("rare") || r.includes("double")) return "rarity-rare"
  if (r.includes("uncommon")) return "rarity-uncommon"
  return "rarity-common"
}
</script>

<template>
  <div class="collection-list">
    <div v-for="entry in entries" :key="entry.id" class="list-row">
      <div class="list-card-mini">
        <CardImage
          :src="entry.imageUrl ? `${entry.imageUrl}/low.webp` : undefined"
          :alt="entry.name"
        />
      </div>
      <div class="list-info">
        <div class="list-name">
          {{ entry.name }}
          <span v-if="entry.rarity" class="rarity-badge-inline" :class="rarityClass(entry.rarity)">
            {{ entry.rarity }}
          </span>
        </div>
        <div class="list-meta">{{ entry.setName }} · {{ entry.condition }}</div>
      </div>
      <div class="list-right">
        <div class="list-price">{{ formatPrice(entry.marketPrice) }}</div>
        <button class="del-btn" @click="emit('delete', entry.id)" title="Remove">
          <Trash2 />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collection-list {
  display: flex;
  flex-direction: column;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.15s;
}

.list-row:last-child {
  border-bottom: none;
}

.list-row:hover {
  background: rgba(0, 0, 0, 0.02);
}

.list-card-mini {
  flex-shrink: 0;
  width: 36px;
}

.list-card-mini :deep(.card-img-root) {
  border-radius: 4px;
}

.list-info {
  flex: 1;
  min-width: 0;
}

.list-name {
  font-family: var(--body);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.3;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rarity-badge-inline {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

.rarity-common {
  background: rgba(0, 0, 0, 0.08);
  color: var(--ink3);
}

.rarity-uncommon {
  background: rgba(26, 184, 160, 0.15);
  color: #1ab8a0;
}

.rarity-rare {
  background: rgba(45, 45, 224, 0.12);
  color: var(--accent);
}

.rarity-ultra {
  background: rgba(136, 68, 238, 0.12);
  color: #8844ee;
}

.rarity-secret {
  background: rgba(201, 147, 58, 0.15);
  color: var(--gold);
}

.list-meta {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink3);
  letter-spacing: 0.02em;
  margin-top: 2px;
}

.list-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.del-btn {
  background: none;
  border: none;
  color: var(--ink3);
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  opacity: 0;
}

.list-row:hover .del-btn {
  opacity: 1;
}

.del-btn:hover {
  background: rgba(204, 34, 68, 0.1);
  color: var(--red);
}

.del-btn :deep(svg) {
  width: 14px;
  height: 14px;
}

.list-price {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}
</style>

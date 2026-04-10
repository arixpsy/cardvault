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

function rarityShort(rarity: string): string {
  const map: Record<string, string> = {
    Common: "C",
    Uncommon: "U",
    Rare: "R",
    "Rare Holo": "R",
    "Ultra Rare": "UR",
    "Secret Rare": "SR",
    "Illustration Rare": "IR",
    "Special Illustration Rare": "SIR",
    "Hyper Rare": "HR",
    "Double Rare": "RR",
    "ACE SPEC Rare": "ACE",
    "Shiny Rare": "SH",
    "Shiny Ultra Rare": "SUR",
  }
  return map[rarity] ?? rarity.substring(0, 2).toUpperCase()
}

function rarityClass(rarity: string): string {
  const r = rarity.toLowerCase()
  if (r.includes("secret") || r.includes("hyper") || r.includes("special illustration")) return "rarity-secret"
  if (r.includes("ultra") || r.includes("illustration")) return "rarity-ultra"
  if (r.includes("rare") || r.includes("double")) return "rarity-rare"
  if (r.includes("uncommon")) return "rarity-uncommon"
  return "rarity-common"
}
</script>

<template>
  <div class="collection-grid">
    <div v-for="entry in entries" :key="entry.id" class="coll-card">
      <div class="coll-card-art">
        <CardImage
          :src="entry.imageUrl ? `${entry.imageUrl}/high.webp` : undefined"
          :alt="entry.name"
        />
        <span
          v-if="entry.rarity"
          class="rarity-badge"
          :class="rarityClass(entry.rarity)"
        >
          {{ rarityShort(entry.rarity) }}
        </span>
      </div>
      <div class="coll-card-body">
        <div class="coll-card-name">{{ entry.name }}</div>
        <div class="coll-card-set">{{ entry.setName }}</div>
        <div class="coll-card-footer">
          <span class="coll-card-price">{{ formatPrice(entry.marketPrice) }}</span>
          <button class="del-btn" @click="emit('delete', entry.id)" title="Remove">
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  padding: 16px 0;
}

.coll-card {
  background: var(--surface);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.coll-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.coll-card-art {
  position: relative;
  padding: 10px 10px 6px;
}

.rarity-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 2px 6px;
  border-radius: 4px;
  line-height: 1.3;
  z-index: 1;
}

.rarity-common {
  background: rgba(0, 0, 0, 0.5);
  color: #ccc;
}

.rarity-uncommon {
  background: rgba(26, 184, 160, 0.85);
  color: #fff;
}

.rarity-rare {
  background: rgba(45, 45, 224, 0.85);
  color: #fff;
}

.rarity-ultra {
  background: rgba(136, 68, 238, 0.85);
  color: #fff;
}

.rarity-secret {
  background: linear-gradient(135deg, #c9933a, #f0d060);
  color: #1a1a2e;
}

.coll-card-body {
  padding: 0 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.coll-card-name {
  font-family: var(--body);
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.coll-card-set {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink3);
  letter-spacing: 0.02em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.coll-card-footer {
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.del-btn {
  background: none;
  border: none;
  color: var(--ink3);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  opacity: 0;
}

.coll-card:hover .del-btn {
  opacity: 1;
}

.del-btn:hover {
  background: rgba(204, 34, 68, 0.1);
  color: var(--red);
}

.del-btn :deep(svg) {
  width: 13px;
  height: 13px;
}

.coll-card-price {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}
</style>

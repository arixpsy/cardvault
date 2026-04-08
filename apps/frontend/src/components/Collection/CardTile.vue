<script lang="ts" setup>
import type { CardResume } from "@tcgdex/sdk"
import CardImage from "../Common/CardImage.vue"

defineProps<{
  card: CardResume
}>()
</script>

<template>
  <div class="tile-card">
    <div class="tile-img-wrap">
      <CardImage :src="card.image ? `${card.image}/low.webp` : undefined" :alt="card.name" />
    </div>
    <div class="tile-info">
      <span class="tile-name">{{ card.name }}</span>
      <span class="tile-id">{{ card.localId }}</span>
    </div>
  </div>
</template>

<style scoped>
.tile-card {
  background: var(--surface);
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.tile-img-wrap {
  padding: 10px 10px 6px;
}

.tile-info {
  padding: 0 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tile-name {
  font-family: var(--body);
  font-size: 11px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tile-id {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--ink3);
  letter-spacing: 0.04em;
}
</style>

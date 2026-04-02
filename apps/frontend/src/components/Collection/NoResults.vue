<script lang="ts" setup>
import { SearchX } from "@lucide/vue"
</script>

<template>
  <div class="no-results">
    <SearchX :size="14" />
    No cards found.
  </div>
</template>

<style scoped>
.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink3);
  padding: 8px 0;
}
</style>

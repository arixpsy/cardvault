<script lang="ts" setup>
import { AlertCircle } from "@lucide/vue"
</script>

<template>
  <div class="search-error">
    <AlertCircle :size="14" />
    Failed to fetch results.
  </div>
</template>

<style scoped>
.search-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: var(--red);
  padding: 8px 0;
}
</style>

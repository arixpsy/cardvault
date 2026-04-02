<script lang="ts" setup>
withDefaults(defineProps<{ count?: number }>(), { count: 6 })
</script>

<template>
  <div class="skeleton-grid">
    <div v-for="i in count" :key="i" class="skeleton-tile" :style="`--i: ${i - 1}`">
      <div class="skeleton-img" />
      <div class="skeleton-info">
        <div class="skeleton-line skeleton-name" />
        <div class="skeleton-line skeleton-id" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.skeleton-tile {
  background: var(--surface);
  border-radius: 12px;
  overflow: hidden;
}

.skeleton-img {
  margin: 10px 10px 6px;
  width: calc(100% - 20px);
  aspect-ratio: 245 / 337;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    var(--surface2) 25%,
    color-mix(in srgb, var(--surface2) 60%, white) 50%,
    var(--surface2) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 80ms);
}

.skeleton-info {
  padding: 0 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skeleton-line {
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--surface2) 25%,
    color-mix(in srgb, var(--surface2) 60%, white) 50%,
    var(--surface2) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 80ms);
}

.skeleton-name {
  height: 10px;
  width: 75%;
}

.skeleton-id {
  height: 8px;
  width: 40%;
}
</style>

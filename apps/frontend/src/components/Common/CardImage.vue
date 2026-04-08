<script setup lang="ts">
import { ref } from "vue"
import { Loader2 } from "@lucide/vue"

defineProps<{
  src?: string
  alt?: string
}>()

const loaded = ref(false)
</script>

<template>
  <div class="card-img-root">
    <div v-show="!loaded" class="card-placeholder">
      <Loader2 v-if="src" class="card-spinner" />
    </div>
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="card-img"
      :class="{ loaded }"
      @load="loaded = true"
    />
  </div>
</template>

<style scoped>
.card-img-root {
  position: relative;
  width: 100%;
  aspect-ratio: 245 / 337;
  border-radius: 6px;
  overflow: hidden;
}

.card-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(45, 45, 224, 0.5) 0%, rgba(85, 85, 255, 0.45) 50%, rgba(136, 68, 238, 0.4) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-placeholder::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
  pointer-events: none;
}

.card-spinner {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.5);
  animation: spin 0.9s linear infinite;
  position: relative;
  z-index: 1;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.2s ease;
  display: block;
}

.card-img.loaded {
  opacity: 1;
}
</style>

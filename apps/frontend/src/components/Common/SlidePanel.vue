<script setup lang="ts">
import { X } from "@lucide/vue"
import Button from "./Button.vue"

defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="open" class="backdrop" @click="emit('close')" />
    </Transition>

    <Transition name="panel">
      <div v-if="open" class="slide-panel" role="dialog" :aria-label="title">
        <div class="panel-header">
          <span class="panel-title">{{ title }}</span>
          <Button variant="icon" @click="emit('close')" aria-label="Close panel">
            <X />
          </Button>
        </div>

        <div class="panel-content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 500;
}

.slide-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  z-index: 500;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.08);
  padding: 24px 20px;
  overflow: hidden;
}

.panel-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.panel-title {
  font-family: var(--display);
  font-size: 28px;
  letter-spacing: 2px;
}

/* Backdrop transition */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Panel slide transition */
.panel-enter-active,
.panel-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}

.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
}

.panel-enter-to,
.panel-leave-from {
  transform: translateX(0);
}

@media (max-width: 640px) {
  .slide-panel {
    width: 100%;
    border-left: none;
    box-shadow: none;
  }
}
</style>

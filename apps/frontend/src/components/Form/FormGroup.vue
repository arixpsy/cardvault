<template>
  <div :class="['form-group', { full }]">
    <slot />
    <Transition name="error">
      <span v-if="error" class="field-error">{{ error }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
})
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group.full {
  grid-column: span 2;
}

.field-error {
  font-size: 11px;
  color: var(--error, #e53e3e);
}

.error-enter-active,
.error-leave-active {
  overflow: hidden;
  transition: max-height 0.25s ease, opacity 0.2s ease;
}
.error-enter-from,
.error-leave-to {
  max-height: 0;
  opacity: 0;
}
.error-enter-to,
.error-leave-from {
  max-height: 40px;
  opacity: 1;
}
</style>

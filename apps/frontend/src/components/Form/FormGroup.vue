<template>
  <div :class="['form-group', { full }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  full: {
    type: Boolean,
    default: false,
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
</style>

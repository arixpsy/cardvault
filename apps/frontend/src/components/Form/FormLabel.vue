<template>
  <label class="form-label" :for="htmlFor">
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps({
  htmlFor: {
    type: String,
    default: undefined,
  },
})
</script>

<style scoped>
.form-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink3);
  font-family: var(--mono);
}
</style>

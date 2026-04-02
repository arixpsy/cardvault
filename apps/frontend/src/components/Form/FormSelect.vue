<template>
  <select
    :class="['form-select', variant === 'gray' ? 'variant-gray' : 'variant-light']"
    v-bind="$attrs"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'light',
    validator: (v: string) => ['light', 'gray'].includes(v),
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-select {
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-family: var(--body);
  font-size: 13px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}

.form-select.variant-light { background: var(--bg); }
.form-select.variant-gray { background: var(--surface); }
.form-select:focus {
  border-color: var(--accent);
}
</style>

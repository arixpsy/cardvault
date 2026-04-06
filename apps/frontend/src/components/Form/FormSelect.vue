<template>
  <div :class="['select-wrap', { 'select-block': block }]">
    <select
      :class="['form-select', variant === 'gray' ? 'variant-gray' : 'variant-light']"
      v-bind="$attrs"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <slot />
    </select>
    <span class="select-caret">
      <ChevronDown />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from "@lucide/vue"

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "light",
    validator: (v: string) => ["light", "gray"].includes(v),
  },
  block: {
    type: Boolean,
    default: true,
  },
})

defineEmits(["update:modelValue"])
</script>

<style scoped>
.select-wrap {
  position: relative;
}

.select-block {
  width: 100%;
}

.select-block .form-select {
  width: 100%;
}

.form-select {
  padding: 10px 32px 10px 12px;
  border: 1.5px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-family: var(--body);
  font-size: 13px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s;
  appearance: none;
  -webkit-appearance: none;
}

.form-select.variant-light {
  background: var(--bg);
}
.form-select.variant-gray {
  background: var(--surface);
}
.form-select:focus {
  border-color: var(--accent);
}

.select-caret {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: var(--ink3);
  pointer-events: none;
}

.select-caret :deep(svg) {
  width: 14px;
  height: 14px;
}
</style>

<template>
  <div v-if="hasIcon" class="input-wrap">
    <span class="input-icon">
      <slot name="icon" />
    </span>
    <input
      :class="['form-input has-icon', variant === 'gray' ? 'variant-gray' : 'variant-light']"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
  <input
    v-else
    :class="['form-input', variant === 'gray' ? 'variant-gray' : 'variant-light']"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  variant: {
    type: String,
    default: 'light',
    validator: (v: string) => ['light', 'gray'].includes(v),
  },
})

defineEmits(['update:modelValue'])

const slots = useSlots()
const hasIcon = computed(() => !!slots.icon)
</script>

<style scoped>
.input-wrap {
  position: relative;
  flex: 1;
  min-width: 220px;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: var(--ink3);
  pointer-events: none;
}

.input-icon :deep(svg) {
  width: 15px;
  height: 15px;
}

.form-input {
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

.form-input.variant-light { background: var(--bg); }
.form-input.variant-gray { background: var(--surface); }

.form-input.has-icon {
  padding-left: 36px;
  border-radius: 10px;
}

.form-input:focus {
  border-color: var(--accent);
}
</style>

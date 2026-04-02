<template>
  <textarea
    :class="['form-textarea', variant === 'gray' ? 'variant-gray' : 'variant-light']"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
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
})

defineEmits(["update:modelValue"])
</script>

<style scoped>
.form-textarea {
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-family: var(--body);
  font-size: 13px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  resize: vertical;
  min-height: 80px;
}

.form-textarea.variant-light {
  background: var(--bg);
}
.form-textarea.variant-gray {
  background: var(--surface);
}
.form-textarea:focus {
  border-color: var(--accent);
}
</style>

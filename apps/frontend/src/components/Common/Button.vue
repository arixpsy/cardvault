<template>
  <button :class="variant === 'primary' ? 'btn-primary' : 'btn-secondary'" v-bind="$attrs">
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (v: string) => ["primary", "secondary"].includes(v),
  },
})
</script>

<style scoped>
.btn-primary {
  background: var(--dark);
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-family: var(--body);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  letter-spacing: 0.02em;
}

.btn-primary:hover {
  background: var(--accent);
  transform: translateY(-1px);
}

.btn-primary :deep(svg) {
  width: 16px;
  height: 16px;
}

.btn-secondary {
  background: var(--surface);
  color: var(--ink);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 16px;
  border-radius: 8px;
  font-family: var(--body);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: var(--surface2);
}
</style>

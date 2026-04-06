<template>
  <button
    :class="{
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-danger': variant === 'danger',
      'btn-icon': variant === 'icon',
    }"
    :disabled="loading"
    v-bind="$attrs"
  >
    <Loader2 v-if="loading" class="spinner" />
    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
import { Loader2 } from "@lucide/vue"

defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (v: string) => ["primary", "secondary", "danger", "icon"].includes(v),
  },
  loading: {
    type: Boolean,
    default: false,
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
  text-align: center;
  justify-content: center;
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
  justify-content: center;
}

.btn-secondary:hover {
  background: var(--surface2);
}

.btn-icon {
  background: transparent;
  color: var(--ink);
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: var(--surface2);
}

.btn-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.btn-danger {
  background: var(--red);
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
  text-align: center;
  justify-content: center;
}

.btn-danger:hover {
  background: #a8192e;
  transform: translateY(-1px);
}

.btn-danger :deep(svg) {
  width: 16px;
  height: 16px;
}

.spinner {
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<script setup lang="ts">
import { watch, onUnmounted } from "vue"
import { AlertTriangle } from "@lucide/vue"
import Button from "./Button.vue"

const props = defineProps<{
  open: boolean
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "danger" | "default"
  loading?: boolean
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && !props.loading) emit("cancel")
}

watch(
  () => props.open,
  (val) => {
    if (val) {
      document.addEventListener("keydown", onKeydown)
    } else {
      document.removeEventListener("keydown", onKeydown)
    }
  },
)

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="open" class="backdrop" @click="!loading && emit('cancel')" />
    </Transition>

    <Transition name="modal">
      <div
        v-if="open"
        class="modal-wrap"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @click.self="emit('cancel')"
      >
        <div class="modal">
          <div :class="['modal-icon', variant === 'danger' ? 'icon-danger' : 'icon-default']">
            <AlertTriangle />
          </div>

          <div class="modal-title">{{ title }}</div>

          <p v-if="message" class="modal-message">{{ message }}</p>

          <div class="modal-actions">
            <Button variant="secondary" :disabled="loading" @click="emit('cancel')">
              {{ cancelLabel ?? "Cancel" }}
            </Button>
            <Button
              :variant="variant === 'danger' ? 'danger' : 'primary'"
              :loading="loading"
              @click="emit('confirm')"
            >
              {{ confirmLabel ?? "Confirm" }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Backdrop ── */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(12, 12, 18, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 600;
}

/* ── Centering wrapper ── */
.modal-wrap {
  position: fixed;
  inset: 0;
  z-index: 601;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* ── Modal box ── */
.modal {
  background: var(--surface);
  border-radius: 18px;
  padding: 32px 28px 24px;
  width: 100%;
  max-width: 380px;
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.16),
    0 0 0 1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

/* ── Icon ── */
.modal-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.modal-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.icon-danger {
  background: rgba(204, 34, 68, 0.1);
  color: var(--red);
}

.icon-default {
  background: rgba(45, 45, 224, 0.1);
  color: var(--accent);
}

/* ── Text ── */
.modal-title {
  font-family: var(--display);
  font-size: 26px;
  letter-spacing: 2px;
  color: var(--ink);
  line-height: 1;
}

.modal-message {
  font-family: var(--body);
  font-size: 13px;
  color: var(--ink3);
  line-height: 1.6;
  margin: 0;
  max-width: 280px;
}

/* ── Actions ── */
.modal-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  margin-top: 8px;
}

/* ── Backdrop transition ── */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* ── Modal scale + fade transition ── */
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.93);
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .modal {
    padding: 28px 20px 20px;
    border-radius: 16px;
  }

  .modal-actions {
    grid-template-columns: 1fr;
  }
}
</style>

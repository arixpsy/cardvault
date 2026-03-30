<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <div class="page-header">
    <div>
      <div class="page-title">{{ title }}</div>
      <div class="page-subtitle">{{ description }}</div>
    </div>
    <div style="display: flex; gap: 10px">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
}

.page-title {
  font-family: var(--display);
  font-size: 56px;
  letter-spacing: 3px;
  line-height: 1;
}

.page-subtitle {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink3);
  letter-spacing: 0.1em;
  margin-top: 6px;
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .page-title {
    font-size: 36px;
  }

  .page-subtitle {
    font-size: 10px;
  }
}
</style>

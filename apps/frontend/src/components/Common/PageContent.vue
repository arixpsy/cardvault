<template>
  <div class="page-content">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.page-content {
  padding: 40px;
  min-height: 100svh;
}

@media (max-width: 640px) {
  .page-content {
    padding: 20px;
    min-height: calc(100svh - 60px);
  }
}
</style>

<template>
  <div class="page-content">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.page-content {
  padding: 40px;
  height: 100dvh;
}

@media (max-width: 640px) {
  .page-content {
    padding: 20px;
    height: calc(100dvh - 60px);
  }
}
</style>

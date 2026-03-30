<script lang="ts" setup>
import NavigationBar from "./NavigationBar.vue"
import ProfileImage from "./ProfileImage.vue"
</script>

<template>
  <ProfileImage />
  <NavigationBar />
  <div class="content-wrapper">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.content-wrapper {
  margin-left: 72px;
  height: 100vh;
  overflow-y: auto;
}

@media (max-width: 640px) {
  .content-wrapper {
    margin-left: 0;
    padding-bottom: 60px;
  }
}
</style>

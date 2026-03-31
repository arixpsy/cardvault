<script setup lang="ts">
import { useUser } from "@clerk/vue"
import { Routes } from "../../utils/routes"

const { isLoaded, user } = useUser()
</script>

<template>
  <div v-if="!isLoaded" class="skeleton" />
  <RouterLink v-else :to="Routes.SETTINGS">
    <img :src="user?.imageUrl" />
  </RouterLink>
</template>

<style scoped>
a {
  line-height: 0;
}

img,
.skeleton {
  position: fixed;
  top: 20px;
  left: 21px;
  z-index: 300;
  width: 30px;
  height: 30px;
  border-radius: 100vh;
}

.skeleton {
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 640px) {
  img,
  .skeleton {
    top: 28px;
    left: initial;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}
</style>

<script lang="ts" setup>
import { watch } from "vue"
import { useAuth } from "@clerk/vue"
import MainLayout from "../Layout/MainLayout.vue"
import { router } from "../../utils/router"

const { isSignedIn, isLoaded } = useAuth()

watch(isSignedIn, (newState) => {
  if (!newState) {
    router.push("/")
  }
})
</script>

<template>
  <div v-if="!isLoaded">Loading</div>

  <MainLayout v-else>
    <router-view />
  </MainLayout>
</template>

<script lang="ts" setup>
import { watch } from "vue"
import { useAuth } from "@clerk/vue"
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

  <router-view v-else />
</template>

<script lang="ts" setup>
import { Plus } from "@lucide/vue"
import { ref } from "vue"
import Button from "../Common/Button.vue"
import SlidePanel from "../Common/SlidePanel.vue"

const open = ref(false)
const openPanel = () => (open.value = true)
const closePanel = () => (open.value = false)
</script>

<template>
  <Button @click="openPanel"> <Plus />Add Card </Button>
  <SlidePanel title="Add Card" :open="open" @close="closePanel"> Card Search </SlidePanel>
</template>

<style scoped></style>

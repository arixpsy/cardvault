<script setup lang="ts">
import { Plus } from "@lucide/vue"
import Button from "../components/Common/Button.vue"
import PageContent from "../components/Common/PageContent.vue"
import PageHeader from "../components/Common/PageHeader.vue"
</script>

<template>
  <PageContent>
    <PageHeader title="Expenses" description="Track your spending">
      <Button><Plus />Add Expense</Button>
    </PageHeader>
  </PageContent>
</template>

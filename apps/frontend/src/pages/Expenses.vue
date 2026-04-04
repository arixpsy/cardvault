<script setup lang="ts">
import PageContent from "../components/Common/PageContent.vue"
import PageHeader from "../components/Common/PageHeader.vue"
import AddExpenseButton from "../components/Expenses/AddExpenseButton.vue"
</script>

<template>
  <PageContent>
    <PageHeader title="Expenses" description="Track your spending">
      <AddExpenseButton />
    </PageHeader>
  </PageContent>
</template>

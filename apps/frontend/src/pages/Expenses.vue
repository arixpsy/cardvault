<script setup lang="ts">
import { computed, ref, watch } from "vue"
import PageContent from "../components/Common/PageContent.vue"
import PageHeader from "../components/Common/PageHeader.vue"
import AddExpenseButton from "../components/Expenses/AddExpenseButton.vue"
import ExpenseStatsCards from "../components/Expenses/ExpenseStatsCards.vue"
import ExpenseTable from "../components/Expenses/ExpenseTable.vue"
import { useExpenses } from "../hooks/useExpenses"
import { useDeleteExpense } from "../hooks/useDeleteExpense"
import { useExpenseStats } from "../hooks/useExpenseStats"

const search = ref("")
const debouncedSearch = ref("")
const category = ref("")

let debounceTimer: ReturnType<typeof setTimeout>
watch(search, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { debouncedSearch.value = val }, 300)
})

const filters = computed(() => ({
  search: debouncedSearch.value || undefined,
  category: category.value || undefined,
}))

const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useExpenses(filters)

const isFiltering = computed(() => isFetching.value && !isFetchingNextPage.value)
const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense()
const { data: stats } = useExpenseStats()

const expenses = computed(() => data.value?.pages.flat() ?? [])
</script>

<template>
  <PageContent>
    <PageHeader title="Expenses" description="Track your spending">
      <AddExpenseButton />
    </PageHeader>

    <ExpenseStatsCards :stats="stats" />

    <ExpenseTable
      :expenses="expenses"
      :has-next-page="!!hasNextPage"
      :is-fetching-next-page="isFetchingNextPage"
      :is-filtering="isFiltering"
      :is-deleting="isDeleting"
      v-model:search="search"
      v-model:category="category"
      @delete="deleteExpense"
      @load-more="fetchNextPage"
    />
  </PageContent>
</template>

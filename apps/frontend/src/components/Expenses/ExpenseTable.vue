<script lang="ts" setup>
import { computed, ref, watch, onMounted, onUnmounted } from "vue"
import { Trash2, Loader2, Search } from "@lucide/vue"
import * as Form from "../Form"
import ConfirmModal from "../Common/ConfirmModal.vue"

interface Expense {
  id: number
  expenseName: string
  category: string
  amount: number
  expenseAt: string
  notes: string | null
}

const props = defineProps<{
  expenses: Expense[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isFiltering: boolean
  isDeleting: boolean
}>()

const emit = defineEmits<{
  (e: "delete", id: number): void
  (e: "load-more"): void
}>()

const search = defineModel<string>("search", { default: "" })
const category = defineModel<string>("category", { default: "" })
const sortBy = ref("date-desc")
const sentinel = ref<HTMLElement | null>(null)
const pendingDeleteId = ref<number | null>(null)

function requestDelete(id: number) {
  pendingDeleteId.value = id
}

function confirmDelete() {
  if (pendingDeleteId.value !== null) {
    emit("delete", pendingDeleteId.value)
  }
}

function cancelDelete() {
  pendingDeleteId.value = null
}

// Close modal once the delete mutation settles
watch(
  () => props.isDeleting,
  (val, prev) => {
    if (prev === true && val === false) {
      pendingDeleteId.value = null
    }
  },
)

const CATEGORY_LABELS: Record<string, string> = {
  SEALED_PRODUCTS: "Sealed",
  SINGLES: "Singles",
  SUPPLIES: "Supplies",
  OTHERS: "Others",
}

const CATEGORY_ICONS: Record<string, string> = {
  SEALED_PRODUCTS: "🃏",
  SINGLES: "✨",
  SUPPLIES: "📦",
  OTHERS: "📌",
}

const filteredExpenses = computed(() => {
  const result = [...props.expenses]
  switch (sortBy.value) {
    case "date-asc":
      result.sort((a, b) => a.expenseAt.localeCompare(b.expenseAt))
      break
    case "amount-desc":
      result.sort((a, b) => b.amount - a.amount)
      break
    case "amount-asc":
      result.sort((a, b) => a.amount - b.amount)
      break
    default:
      result.sort((a, b) => b.expenseAt.localeCompare(a.expenseAt))
  }
  return result
})

function formatDate(dateStr: string) {
  if (!dateStr) return "—"
  const d = new Date(dateStr + "T12:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function formatAmount(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && props.hasNextPage && !props.isFetchingNextPage) {
        emit("load-more")
      }
    },
    { threshold: 0.1 },
  )
  if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="expense-table-wrap">
    <!-- Filters -->
    <div class="expense-filters">
      <Form.Input v-model="search" placeholder="Search expenses...">
        <template #icon>
          <Search />
        </template>
      </Form.Input>

      <Form.Select v-model="category" :block="false">
        <option value="">All Categories</option>
        <option value="SEALED_PRODUCTS">Sealed Products</option>
        <option value="SINGLES">Singles</option>
        <option value="SUPPLIES">Supplies</option>
        <option value="OTHERS">Others</option>
      </Form.Select>

      <Form.Select v-model="sortBy" :block="false">
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
      </Form.Select>
    </div>

    <!-- ── Desktop table ── -->
    <table class="expense-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Date</th>
          <th class="amount-col">Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isFiltering">
          <td colspan="5" class="loading-row">
            <Loader2 class="spinner" />
          </td>
        </tr>
        <template v-else>
          <tr v-if="filteredExpenses.length === 0 && !isFetchingNextPage">
            <td colspan="5" class="empty-row">No expenses found</td>
          </tr>
          <tr v-for="expense in filteredExpenses" :key="expense.id">
            <td class="desc-cell">
              <span class="desc-text">{{ expense.expenseName }}</span>
              <span v-if="expense.notes" class="notes-text">{{ expense.notes }}</span>
            </td>
            <td>
              <span class="cat-badge" :class="expense.category.toLowerCase().replace('_', '-')">
                {{ CATEGORY_ICONS[expense.category] }}
                {{ CATEGORY_LABELS[expense.category] ?? expense.category }}
              </span>
            </td>
            <td class="date-cell">{{ formatDate(expense.expenseAt) }}</td>
            <td class="amount-cell">{{ formatAmount(expense.amount) }}</td>
            <td class="action-cell">
              <button class="del-btn" @click="requestDelete(expense.id)" title="Delete">
                <Trash2 />
              </button>
            </td>
          </tr>
          <tr v-if="isFetchingNextPage">
            <td colspan="5" class="loading-row">
              <Loader2 class="spinner" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- ── Mobile card list ── -->
    <div class="expense-list">
      <!-- Filtering spinner -->
      <div v-if="isFiltering" class="list-state">
        <Loader2 class="spinner" />
      </div>
      <template v-else>
        <div v-if="filteredExpenses.length === 0 && !isFetchingNextPage" class="list-state list-empty">
          No expenses found
        </div>
        <div
          v-for="expense in filteredExpenses"
          :key="expense.id"
          class="expense-card"
        >
          <!-- Row 1: name + badge -->
          <div class="card-top">
            <span class="card-name">{{ expense.expenseName }}</span>
            <span class="cat-badge" :class="expense.category.toLowerCase().replace('_', '-')">
              {{ CATEGORY_ICONS[expense.category] }}
              {{ CATEGORY_LABELS[expense.category] ?? expense.category }}
            </span>
          </div>
          <!-- Row 2: notes (optional) -->
          <div v-if="expense.notes" class="card-notes">{{ expense.notes }}</div>
          <!-- Row 3: date + amount + delete -->
          <div class="card-bottom">
            <span class="card-date">{{ formatDate(expense.expenseAt) }}</span>
            <div class="card-actions">
              <span class="card-amount">{{ formatAmount(expense.amount) }}</span>
              <button class="del-btn" @click="requestDelete(expense.id)" title="Delete">
                <Trash2 />
              </button>
            </div>
          </div>
        </div>
        <!-- Next-page spinner -->
        <div v-if="isFetchingNextPage" class="list-state">
          <Loader2 class="spinner" />
        </div>
      </template>
    </div>

    <div ref="sentinel" class="sentinel" />
  </div>

  <ConfirmModal
    :open="pendingDeleteId !== null"
    title="Delete Expense"
    message="This transaction will be permanently removed. This action cannot be undone."
    confirm-label="Delete"
    cancel-label="Cancel"
    variant="danger"
    :loading="isDeleting"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>

<style lang="css" scoped>
.expense-table-wrap {
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* ── Filters ── */
.expense-filters {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  flex-wrap: wrap;
}

/* ── Desktop table ── */
.expense-table {
  width: 100%;
  border-collapse: collapse;
}

.expense-table th {
  text-align: left;
  padding: 12px 20px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink3);
  font-family: var(--mono);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.02);
}

.amount-col {
  text-align: right !important;
}

.expense-table td {
  padding: 14px 20px;
  font-size: 13px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  vertical-align: middle;
}

.expense-table tr:last-child td {
  border-bottom: none;
}

.expense-table tbody tr:hover td {
  background: rgba(0, 0, 0, 0.02);
}

.desc-cell {
  display: table-cell;
}

.desc-text {
  display: block;
  font-weight: 600;
  color: var(--ink);
}

.notes-text {
  display: block;
  font-size: 11px;
  color: var(--ink3);
  margin-top: 2px;
  font-family: var(--mono);
}

.date-cell {
  color: var(--ink3);
  font-family: var(--mono);
  font-size: 12px;
  white-space: nowrap;
}

.amount-cell {
  font-family: var(--mono);
  font-weight: 700;
  text-align: right;
  color: var(--red);
}

.action-cell {
  width: 40px;
  padding-right: 12px;
}

/* ── Shared badge + button ── */
.del-btn {
  background: none;
  border: none;
  color: var(--ink3);
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.15s;
  display: flex;
  align-items: center;
}

.del-btn:hover {
  background: rgba(204, 34, 68, 0.1);
  color: var(--red);
}

.del-btn :deep(svg) {
  width: 14px;
  height: 14px;
}

.cat-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-family: var(--mono);
  white-space: nowrap;
  flex-shrink: 0;
}

.cat-badge.sealed-products {
  background: rgba(45, 45, 224, 0.1);
  color: var(--accent);
}

.cat-badge.singles {
  background: rgba(26, 184, 160, 0.12);
  color: #1ab8a0;
}

.cat-badge.supplies {
  background: rgba(201, 147, 58, 0.15);
  color: var(--gold);
}

.cat-badge.others {
  background: rgba(0, 0, 0, 0.07);
  color: var(--ink3);
}

/* ── Shared spinner / empty ── */
.empty-row,
.loading-row {
  text-align: center;
  padding: 32px 20px !important;
  color: var(--ink3);
  font-size: 13px;
}

.loading-row {
  padding: 16px 20px !important;
}

.spinner {
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
  display: block;
  color: var(--ink3);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.sentinel {
  height: 1px;
}

/* ── Mobile card list — hidden on desktop ── */
.expense-list {
  display: none;
}

/* ── Breakpoint ── */
@media (max-width: 640px) {
  /* Hide table, show card list */
  .expense-table {
    display: none;
  }

  .expense-list {
    display: block;
  }

  /* Card list states */
  .list-state {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    color: var(--ink3);
    font-size: 13px;
    font-family: var(--body);
  }

  .list-state .spinner {
    margin: 0;
  }

  /* Individual expense card */
  .expense-card {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .expense-card:last-child {
    border-bottom: none;
  }

  .expense-card:active {
    background: rgba(0, 0, 0, 0.02);
  }

  /* Row 1: name + badge */
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .card-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.3;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Row 2: notes */
  .card-notes {
    font-size: 11px;
    color: var(--ink3);
    font-family: var(--mono);
    margin-top: 4px;
    line-height: 1.4;
  }

  /* Row 3: date + amount + delete */
  .card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }

  .card-date {
    font-size: 11px;
    color: var(--ink3);
    font-family: var(--mono);
  }

  .card-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .card-amount {
    font-family: var(--mono);
    font-weight: 700;
    font-size: 14px;
    color: var(--red);
  }

  /* Tighten filter bar on mobile */
  .expense-filters {
    padding: 12px 16px;
    gap: 8px;
  }
}
</style>

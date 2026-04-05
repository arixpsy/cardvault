<script setup lang="ts">
const props = defineProps<{
  totalCards: number
  collectionValue: number
  totalSpend: number
  netProfitLoss: number
  isLoading?: boolean
}>()

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

function formatCurrencyLocal(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "SGD" }).format(value)
}
</script>

<template>
  <div class="stats">
    <div class="stat-cell">
      <div class="stat-label">Total Cards</div>
      <div class="stat-value" :class="{ loading: isLoading }">
        {{ isLoading ? "—" : totalCards }}
      </div>
    </div>
    <div class="stat-cell">
      <div class="stat-label">Collection Value</div>
      <div class="stat-value gold" :class="{ loading: isLoading }">
        {{ isLoading ? "—" : formatCurrency(collectionValue) }}
      </div>
    </div>
    <div class="stat-cell">
      <div class="stat-label">Total Spent</div>
      <div class="stat-value" :class="{ loading: isLoading }">
        {{ isLoading ? "—" : formatCurrencyLocal(totalSpend) }}
      </div>
    </div>
    <div class="stat-cell">
      <div class="stat-label">Net Profit/Loss</div>
      <div
        class="stat-value"
        :class="{
          positive: !isLoading && netProfitLoss > 0,
          negative: !isLoading && netProfitLoss < 0,
          loading: isLoading,
        }"
      >
        {{ isLoading ? "—" : formatCurrency(netProfitLoss) }}
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.stats {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--dark);
  display: flex;
  align-items: stretch;
  height: 80px;
}

.stat-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.stat-cell:last-child {
  border-right: none;
}

.stat-cell:hover {
  background: rgba(255, 255, 255, 0.04);
}

.stat-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  font-family: var(--mono);
}

.stat-value {
  font-family: var(--mono);
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.stat-value.loading {
  color: rgba(255, 255, 255, 0.2);
}

.stat-value.positive {
  color: #4ade80;
}

.stat-value.negative {
  color: #f87171;
}

.stat-value.gold {
  color: var(--gold2);
}

@media (max-width: 640px) {
  .stats {
    position: relative;
    height: auto;
    flex-wrap: wrap;
    border-radius: 10px;
  }

  .stat-cell {
    flex: 1 1 33.33%;
    min-width: 0;
    padding: 12px 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .stat-cell:nth-child(4) {
    flex: 1 1 50%;
  }

  .stat-label {
    font-size: 8px;
    letter-spacing: 0.06em;
  }
  .stat-value {
    font-size: 16px;
  }
}
</style>

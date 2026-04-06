<script lang="ts" setup>
import { computed } from "vue"

interface ExpenseStats {
  totalSpent: number
  totalCount: number
  cardPurchasesTotal: number
  otherCostsTotal: number
}

const props = defineProps<{ stats: ExpenseStats | null | undefined }>()

const cardPurchasesPct = computed(() => {
  if (!props.stats || props.stats.totalSpent === 0) return "0"
  return ((props.stats.cardPurchasesTotal / props.stats.totalSpent) * 100).toFixed(0)
})

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}
</script>

<template>
  <div class="budget-overview">
    <!-- Dark hero card — horizontal banner on mobile -->
    <div class="budget-card dark hero">
      <div class="hero-left">
        <div class="bc-label light">Total Spent</div>
        <div class="bc-value light">{{ fmt(stats?.totalSpent ?? 0) }}</div>
      </div>
      <div class="hero-right">
        <div class="bc-txn light">
          {{ stats?.totalCount ?? 0 }}<br />
          <span class="bc-txn-label">txn{{ (stats?.totalCount ?? 0) !== 1 ? "s" : "" }}</span>
        </div>
      </div>
    </div>

    <!-- Secondary cards — always side-by-side on mobile -->
    <div class="secondary-grid">
      <div class="budget-card">
        <div class="bc-label">Card Purchases</div>
        <div class="bc-value">{{ fmt(stats?.cardPurchasesTotal ?? 0) }}</div>
        <div class="bc-sub">{{ cardPurchasesPct }}% of total</div>
      </div>

      <div class="budget-card">
        <div class="bc-label">Other Costs</div>
        <div class="bc-value">{{ fmt(stats?.otherCostsTotal ?? 0) }}</div>
        <div class="bc-sub">Supplies &amp; others</div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* ── Desktop: 3-col flat grid ── */
.budget-overview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

/* Secondary grid is invisible on desktop — items flow directly in the 3-col grid */
.secondary-grid {
  display: contents;
}

.budget-card {
  background: var(--surface);
  border-radius: 14px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.budget-card.dark {
  background: var(--dark);
}

/* Hero layout: stacked on desktop (same as other cards) */
.hero-left {
  display: contents;
}
.hero-right {
  display: none;
}

.bc-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink3);
  font-family: var(--mono);
  margin-bottom: 8px;
}
.bc-label.light {
  color: rgba(255, 255, 255, 0.4);
}

.bc-value {
  font-family: var(--mono);
  font-size: 28px;
  font-weight: 700;
  color: var(--ink);
}
.bc-value.light {
  color: #fff;
}

.bc-sub {
  font-size: 12px;
  color: var(--ink3);
  margin-top: 4px;
  font-family: var(--mono);
}

/* ── Tablet: 2-col ── */
@media (max-width: 900px) {
  .budget-overview {
    grid-template-columns: 1fr 1fr;
  }
  /* Hero spans full width on tablet too */
  .budget-card.hero {
    grid-column: span 2;
  }
}

/* ── Mobile: hero banner + 2-col secondary ── */
@media (max-width: 640px) {
  .budget-overview {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Hero becomes a compact horizontal banner */
  .budget-card.hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
  }

  .hero-left {
    display: block;
  }
  .hero-right {
    display: block;
    text-align: right;
  }

  .bc-txn {
    font-family: var(--mono);
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
  }
  .bc-txn-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.35);
  }

  /* Secondary cards sit in a 2-col row */
  .secondary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .budget-card {
    padding: 14px;
  }

  .bc-value {
    font-size: 20px;
  }

  .bc-label {
    margin-bottom: 6px;
  }
}
</style>

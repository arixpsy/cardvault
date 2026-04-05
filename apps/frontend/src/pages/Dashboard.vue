<script setup lang="ts">
import { useUser } from "@clerk/vue"
import { watch } from "vue"
import CardCarousel from "../components/Dashboard/CardCarousel.vue"
import StatsView from "../components/Dashboard/StatsView.vue"
import DashboardSparkles from "../components/Dashboard/DashboardSparkles.vue"
// import RecentActivity from "../components/Dashboard/RecentActivity.vue"
// import TopByValue from "../components/Dashboard/TopByValue.vue"
import PageContent from "../components/Common/PageContent.vue"
import PageHeader from "../components/Common/PageHeader.vue"
import { useDashboardStats } from "../hooks/useDashboardStats"
import { upsertCurrentUser } from "../services/users"

const { user, isLoaded } = useUser()
const { data: stats, isLoading: statsLoading } = useDashboardStats()

watch(
  [isLoaded, user],
  ([loaded, u]) => {
    if (!loaded || !u) return
    upsertCurrentUser({
      name: u.fullName ?? u.firstName ?? "",
      email: u.primaryEmailAddress?.emailAddress ?? "",
    })
  },
  { immediate: true },
)
</script>

<template>
  <div class="hero">
    <p class="hero-bg-text">CARDVAULT</p>

    <DashboardSparkles />

    <p class="hero-label">— YOUR COLLECTION —</p>
    <p class="hero-title">CARD<span>VAULT</span></p>

    <CardCarousel />

    <StatsView
      :total-cards="stats?.totalCards ?? 0"
      :collection-value="stats?.collectionValue ?? 0"
      :total-spend="stats?.totalSpend ?? 0"
      :net-profit-loss="stats?.netProfitLoss ?? 0"
      :is-loading="statsLoading"
    />
  </div>

  <PageContent>
    <PageHeader title="Overview" description="Recent Activity & Stats" />

    <div class="overview-grid">
      <RecentActivity />

      <TopByValue />
    </div>
  </PageContent>
</template>

<style lang="css" scoped>
.hero {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-bg-text {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--display);
  font-size: clamp(80px, 18vw, 220px);
  color: rgba(0, 0, 0, 0.06);
  white-space: nowrap;
  pointer-events: none;
  letter-spacing: -2px;
  line-height: 1;
}

.hero-label {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink3);
  margin-bottom: 20px;
}

.hero-title {
  font-family: var(--display);
  font-size: clamp(40px, 8vw, 90px);
  letter-spacing: 4px;
  text-align: center;
  line-height: 1;
  margin-bottom: 24px;
  position: relative;
}
.hero-title span {
  color: var(--accent);
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

@media (max-width: 640px) {
  .hero {
    height: calc(100dvh - 60px);
  }

  .hero-bg-text {
    bottom: 0px;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>

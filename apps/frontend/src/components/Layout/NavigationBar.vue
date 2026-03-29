<script lang="ts" setup>
import { Activity, CircleDollarSign, LayoutDashboard, Notebook } from "@lucide/vue"
import { Routes } from "../../utils/routes"
import { RouterLink } from "vue-router"

const NavigationBarOptions = [
  {
    path: Routes.DASHBOARD,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: Routes.EXPENSES,
    label: "Expenses",
    icon: CircleDollarSign,
  },
  {
    path: Routes.COLLECTION,
    label: "Collection",
    icon: Notebook,
  },
  {
    path: Routes.ANALYTICS,
    label: "Analytics",
    icon: Activity,
  },
]
</script>

<template>
  <nav id="sidebar">
    <RouterLink v-for="item in NavigationBarOptions" :to="item.path">
      <button class="nav-item" :class="{ active: $route.path === item.path }">
        <component :is="item.icon"></component>
        <span class="nav-tooltip">{{ item.label }}</span>
      </button>
    </RouterLink>
  </nav>
</template>

<style lang="css" scoped>
#sidebar {
  position: fixed;
  z-index: 200;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 72px;
  padding: 70px 0 20px 0;
  gap: 8px;
  background: var(--dark);
}

.nav-item {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--ink3);
  position: relative;
  background: transparent;
  border: none;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.nav-item.active {
  background: var(--accent);
  color: #fff;
}

.nav-item svg {
  width: 20px;
  height: 20px;
}

.nav-tooltip {
  position: absolute;
  left: 65px;
  background: var(--dark2);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}

.nav-item:hover .nav-tooltip {
  opacity: 1;
}

@media (max-width: 640px) {
  #sidebar {
    z-index: 200;
    top: initial;
    right: 0;
    flex-direction: row;
    justify-content: space-around;
    height: 60px;
    width: 100%;
    padding: 0 8px;
    gap: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-item {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }

  .nav-tooltip {
    display: none;
  }
}
</style>

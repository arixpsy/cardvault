import { createWebHistory, createRouter } from "vue-router"
import Authenticated from "../components/Auth/Authenticated.vue"
import LoginView from "../pages/Login.vue"
import DashboardView from "../pages/Dashboard.vue"
import ExpensesView from "../pages/Expenses.vue"
import CollectionView from "../pages/Collection.vue"
import AnalyticsView from "../pages/Analytics.vue"

const routes = [
  { path: "/", component: LoginView },

  {
    path: "/",
    component: Authenticated,
    children: [
      { path: "/dashboard", component: DashboardView },
      { path: "/expenses", component: ExpensesView },
      { path: "/collection", component: CollectionView },
      { path: "/analytics", component: AnalyticsView },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

import { createWebHistory, createRouter } from "vue-router"
import Authenticated from "../components/Auth/Authenticated.vue"
import LoginView from "../pages/Login.vue"
import DashboardView from "../pages/Dashboard.vue"
import ExpensesView from "../pages/Expenses.vue"
import CollectionView from "../pages/Collection.vue"
import AnalyticsView from "../pages/Analytics.vue"
import { Routes } from "./routes"

const routes = [
  { path: "/", component: LoginView },

  {
    path: "/",
    component: Authenticated,
    children: [
      { path: Routes.DASHBOARD, component: DashboardView },
      { path: Routes.EXPENSES, component: ExpensesView },
      { path: Routes.COLLECTION, component: CollectionView },
      { path: Routes.ANALYTICS, component: AnalyticsView },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

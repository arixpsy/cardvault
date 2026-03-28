export const Routes = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  EXPENSES: "/expenses",
  COLLECTION: "/collection",
  ANALYTICS: "/analytics",
} as const

export type Routes = (typeof Routes)[keyof typeof Routes]

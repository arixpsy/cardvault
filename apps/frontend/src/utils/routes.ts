export const Routes = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  EXPENSES: "/expenses",
  COLLECTION: "/collection",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
} as const

export type Routes = (typeof Routes)[keyof typeof Routes]

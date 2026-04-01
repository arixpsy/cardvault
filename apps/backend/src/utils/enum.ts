export const Category = {
  SEALED_PRODUCTS: "SEALED_PRODUCTS",
  SINGLES: "SINGLES",
  SUPPLIES: "SUPPLIES",
  OTHERS: "OTHERS",
} as const

export type Category = (typeof Category)[keyof typeof Category]

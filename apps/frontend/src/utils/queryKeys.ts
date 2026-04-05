export const queryKeys = {
  dashboard: {
    stats: () => ["dashboard", "stats"] as const,
  },
  expenses: {
    all: () => ["expenses"] as const,
    list: () => ["expenses", "list"] as const,
  },
  cardSearch: {
    results: (term: string) => ["card-search", term] as const,
  },
}

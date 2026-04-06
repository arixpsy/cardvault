export const queryKeys = {
  dashboard: {
    stats: () => ["dashboard", "stats"] as const,
  },
  expenses: {
    all: () => ["expenses"] as const,
    list: (filters?: { search?: string; category?: string }) =>
      ["expenses", "list", filters] as const,
    stats: () => ["expenses", "stats"] as const,
  },
  cardSearch: {
    results: (term: string) => ["card-search", term] as const,
  },
}

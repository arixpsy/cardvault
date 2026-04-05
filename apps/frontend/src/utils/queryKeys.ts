export const queryKeys = {
  expenses: {
    all: () => ["expenses"] as const,
  },
  cardSearch: {
    results: (term: string) => ["card-search", term] as const,
  },
}

import type { CreateExpenseInput } from "@repo/shared"
import { useApiClient } from "../utils/honoClient"

export async function createExpense(data: CreateExpenseInput) {
  const client = useApiClient()
  const res = await client.expenses.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getExpenses(
  params: { limit?: number; offset?: number; search?: string; category?: string } = {},
) {
  const client = useApiClient()
  const res = await client.expenses.$get({ query: params })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getExpenseStats() {
  const client = useApiClient()
  const res = await client.expenses.stats.$get()
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteExpense(id: number) {
  const client = useApiClient()
  const res = await client.expenses[":id"].$delete({ param: { id: String(id) } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

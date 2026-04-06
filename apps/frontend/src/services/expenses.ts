import { hcWithType } from "@repo/backend/hc"
import type { CreateExpenseInput } from "@repo/shared"

const client = hcWithType(import.meta.env.VITE_API_URL || "/api")

export async function createExpense(data: CreateExpenseInput) {
  const res = await client.expenses.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getExpenses(
  params: { limit?: number; offset?: number; search?: string; category?: string } = {},
) {
  const res = await client.expenses.$get({ query: params })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getExpenseStats() {
  const res = await client.expenses.stats.$get()
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteExpense(id: number) {
  const res = await client.expenses[":id"].$delete({ param: { id: String(id) } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

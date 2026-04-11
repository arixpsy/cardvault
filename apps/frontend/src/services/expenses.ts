import type { Client } from "@repo/backend/hc"
import type { CreateExpenseInput } from "@repo/shared"

export async function createExpense(client: Client, data: CreateExpenseInput) {
  const res = await client.expenses.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getExpenses(
  client: Client,
  params: { limit?: number; offset?: number; search?: string; category?: string } = {},
) {
  const res = await client.expenses.$get({ query: params })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getExpenseStats(client: Client) {
  const res = await client.expenses.stats.$get()
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteExpense(client: Client, id: number) {
  const res = await client.expenses[":id"].$delete({ param: { id: String(id) } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

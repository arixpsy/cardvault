import { hcWithType } from "@repo/backend/hc"
import type { CreateExpenseInput } from "@repo/shared"

const client = hcWithType(import.meta.env.VITE_API_URL || "/api")

export async function createExpense(data: CreateExpenseInput) {
  const res = await client.expenses.$post({ json: data })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

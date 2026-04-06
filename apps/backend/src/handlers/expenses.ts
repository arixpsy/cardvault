import { RouteHandler } from "@hono/zod-openapi"
import {
  deleteExpense,
  getExpense,
  getExpenses,
  getExpenseStats,
  insertExpense,
  updateExpense,
} from "../dao/expenses"
import { requireAuth } from "../lib/auth"
import {
  deleteExpenseRoute,
  getExpenseRoute,
  getExpenseStatsRoute,
  getExpensesRoute,
  patchExpenseRoute,
  postExpensesRoute,
} from "../routes/expenses"

type Env = { Bindings: CloudflareBindings }

export const postExpensesHandler: RouteHandler<typeof postExpensesRoute, Env> = async (c) => {
  const userId = requireAuth(c)
  const body = c.req.valid("json")
  const inserted = await insertExpense(c.env, { userId, ...body })
  return c.json(inserted, 201)
}

export const getExpensesHandler: RouteHandler<typeof getExpensesRoute, Env> = async (c) => {
  const userId = requireAuth(c)
  const { limit, offset, search, category } = c.req.valid("query")
  const rows = await getExpenses(c.env, userId, { limit, offset, search, category })
  return c.json(rows, 200)
}

export const getExpenseStatsHandler: RouteHandler<typeof getExpenseStatsRoute, Env> = async (c) => {
  const userId = requireAuth(c)
  const stats = await getExpenseStats(c.env, userId)
  return c.json(stats, 200)
}

export const getExpenseHandler: RouteHandler<typeof getExpenseRoute, Env> = async (c) => {
  const userId = requireAuth(c)
  const { id } = c.req.valid("param")
  const row = await getExpense(c.env, userId, id)
  if (!row) return c.json({ ok: false as const, message: "Not found" }, 404)
  return c.json(row, 200)
}

export const patchExpenseHandler: RouteHandler<typeof patchExpenseRoute, Env> = async (c) => {
  const userId = requireAuth(c)
  const { id } = c.req.valid("param")
  const body = c.req.valid("json")
  const updated = await updateExpense(c.env, userId, id, body)
  if (!updated) return c.json({ ok: false as const, message: "Not found" }, 404)
  return c.json(updated, 200)
}

export const deleteExpenseHandler: RouteHandler<typeof deleteExpenseRoute, Env> = async (c) => {
  const userId = requireAuth(c)
  const { id } = c.req.valid("param")
  const deleted = await deleteExpense(c.env, userId, id)
  if (!deleted) return c.json({ ok: false as const, message: "Not found" }, 404)
  return c.json(deleted, 200)
}

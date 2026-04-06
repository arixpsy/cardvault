import { createRoute, z } from "@hono/zod-openapi"
import {
  CreateExpenseBodySchema,
  ExpenseResponseSchema,
  ExpenseStatsResponseSchema,
  UpdateExpenseBodySchema,
} from "../schemas/expenses"
import { errorResponses } from "../lib/routes"
import { Category } from "@repo/shared"

const expenseIdParam = z.object({ id: z.coerce.number().int().positive() })

export const postExpensesRoute = createRoute({
  method: "post",
  path: "/expenses",
  request: {
    body: {
      content: { "application/json": { schema: CreateExpenseBodySchema } },
      required: true,
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: ExpenseResponseSchema } },
      description: "Expense created",
    },
    ...errorResponses,
  },
})

export const getExpensesRoute = createRoute({
  method: "get",
  path: "/expenses",
  request: {
    query: z.object({
      limit: z.coerce.number().int().min(1).max(100).default(20).optional(),
      offset: z.coerce.number().int().min(0).default(0).optional(),
      search: z.string().optional(),
      category: z.enum(Object.values(Category) as [string, ...string[]]).optional(),
    }),
  },
  responses: {
    200: {
      content: { "application/json": { schema: z.array(ExpenseResponseSchema) } },
      description: "List of expenses",
    },
    ...errorResponses,
  },
})

export const getExpenseStatsRoute = createRoute({
  method: "get",
  path: "/expenses/stats",
  responses: {
    200: {
      content: { "application/json": { schema: ExpenseStatsResponseSchema } },
      description: "Expense stats",
    },
    ...errorResponses,
  },
})

export const getExpenseRoute = createRoute({
  method: "get",
  path: "/expenses/{id}",
  request: { params: expenseIdParam },
  responses: {
    200: {
      content: { "application/json": { schema: ExpenseResponseSchema } },
      description: "Expense",
    },
    ...errorResponses,
  },
})

export const patchExpenseRoute = createRoute({
  method: "patch",
  path: "/expenses/{id}",
  request: {
    params: expenseIdParam,
    body: {
      content: { "application/json": { schema: UpdateExpenseBodySchema } },
      required: true,
    },
  },
  responses: {
    200: {
      content: { "application/json": { schema: ExpenseResponseSchema } },
      description: "Expense updated",
    },
    ...errorResponses,
  },
})

export const deleteExpenseRoute = createRoute({
  method: "delete",
  path: "/expenses/{id}",
  request: { params: expenseIdParam },
  responses: {
    200: {
      content: { "application/json": { schema: ExpenseResponseSchema } },
      description: "Expense deleted",
    },
    ...errorResponses,
  },
})

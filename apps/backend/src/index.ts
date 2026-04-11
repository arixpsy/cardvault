import { OpenAPIHono } from "@hono/zod-openapi"
import { swaggerUI } from "@hono/swagger-ui"
import { clerkMiddleware } from "@hono/clerk-auth"
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"
import {
  deleteExpenseRoute,
  getExpenseRoute,
  getExpenseStatsRoute,
  getExpensesRoute,
  patchExpenseRoute,
  postExpensesRoute,
} from "./routes/expenses"
import {
  deleteExpenseHandler,
  getExpenseHandler,
  getExpenseStatsHandler,
  getExpensesHandler,
  patchExpenseHandler,
  postExpensesHandler,
} from "./handlers/expenses"
import { getDashboardStatsRoute } from "./routes/dashboard"
import { getDashboardStatsHandler } from "./handlers/dashboard"
import { postUsersMeRoute } from "./routes/users"
import { postUsersMeHandler } from "./handlers/users"
import {
  postCollectionEntryRoute,
  getCollectionEntriesRoute,
  deleteCollectionEntryRoute,
} from "./routes/collection"
import {
  postCollectionEntryHandler,
  getCollectionEntriesHandler,
  deleteCollectionEntryHandler,
} from "./handlers/collection"

const app = new OpenAPIHono<{ Bindings: CloudflareBindings }>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(
        {
          ok: false,
          errors: result.error.flatten(),
        },
        422,
      )
    }
  },
})

// Middlewares
app.use("*", (c, next) => cors({ origin: c.env.FRONTEND_DOMAIN })(c, next))
app.use("*", clerkMiddleware())

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ ok: false, message: err.message }, err.status)
  }
  console.error(err)
  return c.json({ ok: false, message: "Internal server error" }, 500)
})

// Routes
const routes = app
  .openapi(postUsersMeRoute, postUsersMeHandler)
  .openapi(getDashboardStatsRoute, getDashboardStatsHandler)
  .openapi(postExpensesRoute, postExpensesHandler)
  .openapi(getExpensesRoute, getExpensesHandler)
  .openapi(getExpenseStatsRoute, getExpenseStatsHandler)
  .openapi(getExpenseRoute, getExpenseHandler)
  .openapi(patchExpenseRoute, patchExpenseHandler)
  .openapi(deleteExpenseRoute, deleteExpenseHandler)
  .openapi(postCollectionEntryRoute, postCollectionEntryHandler)
  .openapi(getCollectionEntriesRoute, getCollectionEntriesHandler)
  .openapi(deleteCollectionEntryRoute, deleteCollectionEntryHandler)

// OpenAPI docs
app.doc("/doc", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "CardVault API",
  },
})

// Swagger UI
app.get("/ui", swaggerUI({ url: "/doc" }))

export type AppType = typeof routes

export default {
  fetch: app.fetch,
  async scheduled(_event: ScheduledEvent, env: CloudflareBindings, _ctx: ExecutionContext) {
    // Refresh market prices for cards that are in at least one user's collection
    // and whose price is older than 24 hours.
    // TODO: implement price refresh logic using TCGDex single-card endpoint
    console.log("Scheduled price refresh triggered", env)
  },
}

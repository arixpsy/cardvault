import app from "./index.js"
import { hc } from "hono/client"

export type Client = ReturnType<typeof hc<typeof app>>

export const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof app>(...args)

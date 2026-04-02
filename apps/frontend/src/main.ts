import { createApp } from "vue"
import { clerkPlugin } from "@clerk/vue"
import { VueQueryPlugin } from "@tanstack/vue-query"
import { router } from "./utils/router"
import App from "./App.vue"
import "./style.css"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const SignInRedirectUrl = import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL
const SignUpRedirectUrl = import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file")
}

const app = createApp(App)
app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY,
  signInForceRedirectUrl: SignInRedirectUrl,
  signUpForceRedirectUrl: SignUpRedirectUrl,
})
app.use(VueQueryPlugin)
app.use(router)
app.mount("#app")

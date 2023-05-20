import { serve } from "https://deno.land/std@0.188.0/http/server.ts"
import { router } from "https://crux.land/router@0.0.12"
import resume from "../mod.ts"
import data from "./thomas-anderson.json" assert { type: "json" }
import theme from "../theme.json" assert { type: "json" }

await serve(router({
  "/": resume({
    theme,
    ...data,
  }),
}))

import { serve } from "https://deno.land/std@0.182.0/http/server.ts"
import { router } from "https://crux.land/router@0.0.12"
import resume, { Options } from "./mod.tsx"
import theme from "./theme.json" assert { type: "json" }

export const serveResume = async (props: Options) => {
  return await serve(router({
    "/": resume({
      theme,
      ...props,
    }),
  }))
}

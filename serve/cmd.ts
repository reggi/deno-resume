import { serve } from "./mod.ts"
import { commandInput } from "../src/util.ts"

const { props } = await commandInput()

await serve(props)

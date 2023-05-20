import { serve } from "./mod.ts";
import { commandInput } from "../src/util.ts";
import theme from '../theme.json' assert { type: 'json' }

const { props } = await commandInput()

await serve({theme, ...props})
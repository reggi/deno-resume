import { render } from "./mod.ts";
import { commandInput } from "../src/util.ts";
import theme from '../theme.json' assert { type: 'json' }

const { props, flags } = await commandInput()

if (typeof flags.html === 'string') {
  await render.writeHtmlFile({theme, ...props}, flags.html)
} else {
  console.log(render.renderToString({theme, ...props}))
}
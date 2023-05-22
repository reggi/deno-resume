import { render } from "./mod.ts"
import { commandInput } from "../src/util.ts"

const { props, flags } = await commandInput()

if (typeof flags.html === "string") {
  await render.writeHtmlFile(props, flags.html)
} else {
  console.log(render.renderToString(props))
}

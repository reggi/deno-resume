import { commandInput } from "./src/util.ts";

const { flags } = await commandInput()

if (flags.pdf) {
  await import('./pdf/cmd.ts')
} else if (flags.html) {
  await import('./render/cmd.ts')
} else if (flags.serve) {
  await import('./serve/cmd.ts')
} else {
  throw new Error('no command specified')
}
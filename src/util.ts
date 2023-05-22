import { parse } from "https://deno.land/std@0.188.0/flags/mod.ts";
import theme from '../theme.json' assert { type: 'json' }
import { transform } from "../src/base64.ts";

export const commandInput = async () => {
  const flags = parse(Deno.args)
  const propsFile = flags.props || flags.json || flags.data
  if (!propsFile) throw new Error('a json file of props is required')
  let props = JSON.parse(await Deno.readTextFile(propsFile))
  const domain = flags.domain
  if (flags.base64) props = await transform(props)
  return {
    flags,
    props: {
      theme,
      domain,
      ...props
    }
  }
}
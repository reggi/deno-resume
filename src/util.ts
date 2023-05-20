import { parse } from "https://deno.land/std@0.188.0/flags/mod.ts";

export const commandInput = async () => {
  const flags = parse(Deno.args)
  const propsFile = flags.props || flags.json || flags.data
  if (!propsFile) throw new Error('a json file of props is required')
  const props = JSON.parse(await Deno.readTextFile(propsFile))
  return {
    flags,
    props
  }
}
// deno-lint-ignore-file no-explicit-any

type Plugin<T> = (input: string) => { classes: string } & T

type PluginReturnType<T extends Plugin<any>[]> = T extends []
  ? { classes: string }
  : T extends [(...args: any) => any, ...infer Rest] ?
      & ReturnType<T[0]>
      & (Rest extends Plugin<any>[] ? PluginReturnType<Rest> : never)
  : never

export const parse = <T extends Plugin<any>[]>(
  classes: string,
  ...plugins: T
): PluginReturnType<T> => {
  return plugins.reduce((accu, plugin) => {
    const results = plugin(accu.classes)
    return { ...accu, ...results }
  }, { classes } as PluginReturnType<T>)
}

type CurriedParseFunction<T extends Plugin<any>[]> = {
  (classes: string): PluginReturnType<T>
}

export const applyParsers = <T extends Plugin<any>[]>(
  ...plugins: T
): CurriedParseFunction<T> => {
  return (classes: string) => parse(classes, ...plugins)
}

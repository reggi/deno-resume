export function parsePrint(
  input: string,
): { classes: string; print: string | undefined } {
  const regex = /print\((.*?)\)/g
  const matches = input.match(regex)

  let print: string | undefined
  let classes: string

  if (matches && matches.length > 0) {
    print = matches.map((match) => match.substring(6, match.length - 1)).join(
      " ",
    )
    classes = input.replace(regex, "").trim()
  } else {
    print = undefined
    classes = input
  }

  return { print, classes }
}

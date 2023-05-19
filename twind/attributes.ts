export function parseAttributes(
  input: string,
): { classes: string; attributes: Record<string, string> } {
  const attributeRegex = /\[([^\]]+)\]/g
  const matches = input.match(attributeRegex)

  if (!matches) {
    return { classes: input, attributes: {} }
  }

  const attributes: Record<string, string> = {}
  let classes = input

  for (const match of matches) {
    const [key, value] = match
      .slice(1, -1)
      .split("=")
      .map((part) => part.trim().replace(/"/g, ""))

    classes = classes.replace(match, "")

    if (key && value) {
      attributes[key] = value
    }
  }

  return { classes: classes.trim(), attributes }
}

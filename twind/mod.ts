/**
This is a suite of utility types that aid in styling and customizing HTML from
within a single object source.

This utility simply consumes plain object where the keys are css selectors and
the value is tailwind class names.

This global approach allows for simple themeing of markdown using nested
selectors.
*/

import {
  getStyleTagProperties,
  virtualSheet,
} from "https://esm.sh/twind@0.16.19/shim/server"
import {
  apply,
  create,
  CSSRules,
  Directive,
} from "https://esm.sh/twind@0.16.19"
import { css } from "https://esm.sh/twind@0.16.19/css"
import * as colors from "https://esm.sh/twind@0.16.19/colors"
import { parseAttributes } from "./attributes.ts"
import { parsePrint } from "./print.ts"
import { applyParsers } from "./parse.ts"

const parse = applyParsers(parsePrint, parseAttributes)

export const tailwindObjectToCSSRules = (v: { [key: string]: string }) => {
  return Object.entries(v).map(([key, value]) => {
    const parsed = parse(value)
    const { print, classes } = parsed
    const additions: Directive<CSSRules>[] = []

    if (print) {
      additions.push(css`
  @media print {
    ${key} {
      ${apply(print)}
    }
  }
`)
    }

    if (classes) {
      additions.push(css`
  ${key} {
    ${apply(classes)}
  }
`)
    }

    return { css: additions, parsed, key }
  })
}

export const tailwindObjectToGloablStyles = (
  globalStyles: { [k: string]: string },
) => {
  const sheet = virtualSheet()
  const { tw } = create({
    preflight: false,
    sheet,
    theme: {
      extend: {
        colors,
      },
    },
  })

  const data = Object.fromEntries(
    tailwindObjectToCSSRules(globalStyles).map((value) => {
      value.css.map((v) => tw(css({ ":global": v })))
      return [value.key, value.parsed]
    }),
  )

  const styleTag = getStyleTagProperties(sheet)
  const resetOnly = virtualSheet()
  create({ sheet: resetOnly })
  const resetTag = getStyleTagProperties(resetOnly)
  const style = `${resetTag.textContent} ${styleTag.textContent}`
  return { style, data }
}

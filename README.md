# Deno Resume

> 🦕📄 A Deno resume website builder using tailwind

- Module Deno https://deno.land/x/resume
- Hosted Deno Deploy https://deno-resume.deno.dev/
- Deno Deploy Playground https://dash.deno.com/playground/deno-resume
- On Github https://github.com/reggi/deno-resume

I sought out to create a resume website with Deno. My requirements were as
follows:

- ✅ To serve a Resume webpage as a route using Deno
- ✅ To generate a static HTML document with no external CSS OR JS dependencies
- ✅ To customize `print` css classes for people to easily print the page
- ✅ To export create a PDF of the site programatically

This project achieves all of those goals 🎉.

## How it works

The resume data is a JSON object. Here's the [type definition](./src/types.ts).
Here's an [example of the data](./example/thomas-anderson.json). This is used as
the main props passed into the `Resume` page component.

![screenshot](./example/output/screenshot.png)

- [Example HTML Export](./example/output/index.html)
- [Example PDF Export](./example/output/resume.pdf)

I've put some detail into the several ways this project can be used and I'll try
and document some usages here.

## Programmatic Usage

If you want to run your own resume page, say on Deno Deploy this is a
single-file that would get you started.

```ts
import { serve } from "https://deno.land/std@0.188.0/http/server.ts"
import { router } from "https://crux.land/router@0.0.12"
import resume from "https://deno.land/x/resume/mod.ts"
import data from "https://deno.land/x/resume/example/thomas-anderson.json" assert {
  type: "json",
}
import theme from "https://deno.land/x/resume/theme.json" assert {
  type: "json",
}

await serve(router({
  "/": resume({
    theme,
    ...data,
  }),
}))
```

## Theming

The theme is a JSON object where the key is a CSS selector and the value are
tailwind classes. `twind` does not have support for `print()`, I added the
ability to expand that keyword. Anything within the `print()` parenthesis will
be given the `print:` prefix. I also added in feature for setting tag attributes
using the syntax `[width=20]` this could be used for setting image sizes and
`alt` text or really any attribute.

```json
{
  "body": "print(text-xs) mx-auto max-w-screen-lg py-10 px-10",
  "a": "font-medium text-blue-600 dark:text-blue-500 hover:underline",
  ".topSection": "mb-3 relative",
  ".name": "print(text-2xl) text-4xl",
  ".downloadLink": "print(hidden) absolute pt-5 top-0 right-0",
  ".job": "flex mb-3",
  ".jobImage": "flex-none pr-3 pt-1",
  ".jobImage img": "rounded-full",
  ".job h2": "print(text-lg) text-xl",
  ".job h3": "print(text-base) inline mr-3 text-lg",
  ".jobSummary": "mb-2",
  ".label": "print(font-normal) text-xs font-semibold inline-block px-1 lowercase rounded text-sky-600 bg-sky-200 last:mr-0 mr-1"
}
```

## CLI Usage

The CLI is broken down into 3 different scripts.

- `./pdf/cmd.ts`
- `./serve/cmd.ts`
- `./render/cmd.ts`

This isolates dependencies for each, meaning if you just wanted to say `render`
you don't need to install the `pdf` dependencies (puppeteer). All of these files
are dynamically imported into the single `./cmd.ts` file which will be used for
this documentation, but you could call any of these files directly for
individual usage.

### Serve a JSON file

```bash
deno run ./cmd.ts --serve --json ./example/thomas-anderson.json
# or with permissions
deno run --allow-read --allow-net ./cmd.ts --serve --json ./example/thomas-anderson.json
```

### Generate a PDF

```bash
deno run ./cmd.ts --pdf ./example/output/resume.pdf --json ./example/thomas-anderson.json
# or with permissions
deno run --allow-read --allow-env --allow-write --allow-run --allow-net ./cmd.ts --pdf ./example/output/resume.pdf --json ./example/thomas-anderson.json
```

### Generate a static HTML File

```bash
deno run ./cmd.ts --html ./example/output/index.html --json ./example/thomas-anderson.json
# or with permissions
deno run --allow-read --allow-write ./cmd.ts --html ./example/output/index.html --json ./example/thomas-anderson.json
```

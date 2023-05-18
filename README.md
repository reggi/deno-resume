# AnchorArbor

> ⚓️🌲 Create a static link-list page using tailwind

This project is inspired by Deno's series of articles "[A Whole Website in a Single JavaScript File](https://deno.com/blog/a-whole-website-in-a-single-js-file-continued)" and the Deno "[blog](https://deno.land/x/blog@0.6.0)" module. These projects build HTML site and serve it in real-time with no build step. ArborAnchor is a single page route that offers a function with the signature `(req: Request) => Response`. The page renders a list of links, along with optional profile image, meta tags, a summary, and footer. I named it AnchorArbor™ get it 😉? In reference to the popular service [https://linktr.ee/](https://linktr.ee/). It uses tailwind 🐕💨 classes for theming 😎 so you can customize the design however you want, and share themes.

Source code running on Deno Deploy 👉 https://dash.deno.com/playground/anchor-arbor

Live code running 💗 https://anchor-arbor.deno.dev/

You can run the example with:

```bash
deno run --allow-net ./examples/alpha.ts
```

Here's an example running the page within the [Deno deploy playground](https://dash.deno.com/playground/alpha-example-anchorarbor).

```ts
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { router } from 'https://crux.land/router@0.0.12'
import { anchorArbor } from "https://deno.land/x/anchorarbor@0.0.2/mod.tsx";
import images from 'https://deno.land/x/anchorarbor@0.0.2/examples/image.json' assert { type: "json" } 
import dark_blue_bubble from 'https://deno.land/x/anchorarbor@0.0.2/themes/dark_blue_bubble.json' assert { type: "json" }

await serve(router({
  '/': anchorArbor({
    topImage: images['profile.jpg'],
    description: "This is the meta description.",
    title: "This is the page title.",
    keywords: "Personal Website, JavaScript Coder, TypeScript Coder",
    author: "John Doe",
    tailwindTheme: dark_blue_bubble,
    summary: [
      `This is the summary`
    ].join('\n\n'),
    links: {
      "Github Trending": "https://github.com/trending",
      "Hacker News": "https://news.ycombinator.com/",
    },
    footer: [
      'Created using [Deno](https://deno.land/) & Hosted on Deno Deploy [Playground](https://dash.deno.com/playground/anchor-arbor).',
      "[Deno module](https://deno.land/x/reggi@0.0.5/static_sites/anchor_arbor.tsx) | [Source Code](https://github.com/reggi/mydeno/blob/main/static_sites/anchor_arbor.tsx)",
    ].join('\n\n')
  })
}));
```

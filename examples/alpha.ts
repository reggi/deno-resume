import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { router } from 'https://crux.land/router@0.0.12'
import { anchorArbor } from "../mod.tsx";
import images from './image.json' assert { type: "json" } 
import dark_blue_bubble from '../themes/dark_blue_bubble.json' assert { type: "json" }

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

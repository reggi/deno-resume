import { JSX } from "https://esm.sh/preact@10.13.2";
import { renderToString } from "https://esm.sh/preact-render-to-string@6.0.3?deps=preact@10.13.2";

export const tailwindObjectToCSS = (v: {[key: string]: string}) => {
  return Object.entries(v).map(([key, value]) => {
    return `${key} {\n    @apply ${value}\n}`
  }).join('\n')
}

export const preactResponse = (component: () => JSX.Element): Response => {
  const html = renderToString(component());
  return new Response(`<!doctype html>\n${html}`, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

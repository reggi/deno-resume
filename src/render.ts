/** @jsx h */
/** @jsxFrag Fragment */
import { h, JSX } from "https://esm.sh/preact@10.13.2";
import { renderToString as preactRenderToString } from "https://esm.sh/preact-render-to-string@6.0.3?deps=preact@10.13.2";
import * as path from "https://deno.land/std/path/mod.ts";

export type Component<Props> = (props: Props) => JSX.Element;

export function _renderToString <Props>(component: Component<Props>, props: Props): string {
  return preactRenderToString(h(component, props as any));
}

export function renderToString <Props>(component: Component<Props>) {
  return (props: Props) => _renderToString(component, props);
}

export function _route<Props>(component: Component<Props>, props: Props) {
  const html = _renderToString(component, props);
  return () => new Response(`<!doctype html>\n${html}`, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export function route<Props>(component: Component<Props>) {
  return (props: Props) => _route(component, props);
}

export async function _writeHtmlFile<Props>(component: Component<Props>, props: Props, saveLocation: string): Promise<void> {
  const html = _renderToString(component, props);
  const entrypoint = path.isAbsolute(saveLocation)
    ? saveLocation
    : path.join(Deno.cwd(), saveLocation);
  await Deno.writeTextFile(entrypoint, html);
}

export function writeHtmlFile<Props>(component: Component<Props>) {
  return (props: Props, saveLocation: string) => _writeHtmlFile(component, props, saveLocation);
}

export function render <Props>(component: Component<Props>) {
  const toFile = writeHtmlFile(component)
  const toHtml = renderToString(component)
  const toResponse = route(component)
  return {
    toHtml,
    toResponse,
    toFile,
    renderToString: toHtml,
    route: toResponse,
    writeHtmlFile: toFile
  };
}
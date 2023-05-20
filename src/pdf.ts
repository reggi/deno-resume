import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts"
import { _renderToString, _route, Component } from "./render.ts";

export async function _pdf <Props>(component: Component<Props>, props: Props, saveLocation: string) {
  const html = _renderToString(component, props)
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  await page.pdf({ path: saveLocation, format: "letter" })
  await browser.close()
}

export function pdf <Props>(component: Component<Props>) {
  return (props: Props, saveLocation: string) => _pdf(component, props, saveLocation);
}

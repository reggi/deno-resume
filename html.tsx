/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment, VNode } from "https://esm.sh/preact@10.13.2";
import { tailwindObjectToCSS } from "./utilities.ts";

export type HTMLProps = {
  title?: string,
  children?: VNode<any> | ChildNode | undefined | string | (VNode<any> | ChildNode | undefined | string)[],
  script?: string,
  tailwindTheme?: string | {[key: string]: string},
  description?: string,
  keywords?: string,
  author?: string
}

export const HTML = (props: HTMLProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        {props.description && <meta name="description" content={props.description}/>}
        {props.keywords && <meta name="keywords" content={props.keywords}/>}
        {props.author && <meta name="author" content={props.author}/>}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {props.title && <title>{props.title}</title>}
        {props.script && <script src={props.script}></script>}
        {props.tailwindTheme && (<>
          <script src="https://cdn.tailwindcss.com"></script>
          <style type="text/tailwindcss">
            {typeof props.tailwindTheme === "string" ? props.tailwindTheme : tailwindObjectToCSS(props.tailwindTheme)}
          </style></>
        )}
      </head>
      <body>
          {props.children}
      </body>
    </html>
  )
}
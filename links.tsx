/** @jsx h */
import { h } from "https://esm.sh/preact@10.13.2";
import { Image, ImageOptions, spreadImageProps } from "./image.tsx";

type LinkShape = {
  href: string,
  text: string,
  image?: ImageOptions,
}

type LinksShape = LinkShape[]

type LinkSet = {
  [key: string]: string | Omit<LinkShape, 'text'>,
}

export type OptionLinks = LinksShape | LinkSet

export const cleanLinks = (links: OptionLinks): LinksShape => {
  if (Array.isArray(links)) return links
  return Object.entries(links).map(([text, hrefOrLink]) => {
    if (typeof hrefOrLink === 'string') return {text, href: hrefOrLink}
    return {text, ...hrefOrLink}
  })
}

export const Link = (props: LinkShape) => (
  <a target="_blank" href={props.href} className="link">
    {props.image && (
      <Image className="linkImage" width='100' height="100" alt={`Image for link ${props.href}`} {...spreadImageProps(props.image)} />
    )}
    <p className="linkParagraph">{props.text}</p>
  </a>
)

export const Links = (props: { links: LinkShape[] }) => (
  <div className="links">
    {props.links.map((link, i) => <Link {...link}></Link>)}
  </div>
)

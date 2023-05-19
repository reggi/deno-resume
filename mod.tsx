/** @jsx h */
/** @jsxFrag Fragment */
import { h, VNode } from "https://esm.sh/preact@10.13.2"
import { marky } from "https://deno.land/x/marky@v1.1.6/mod.ts"
import { HTML, HTMLProps } from "./html.tsx"
import { tailwindObjectToGloablStyles } from "./twind/mod.ts"
import { renderToString as preactRenderToString } from "https://esm.sh/preact-render-to-string@6.0.3?deps=preact@10.13.2"
import { Root as Data } from "./types.ts"
import path from "https://deno.land/std@0.152.0/node/path.ts"

const Url = (props: { children: string }) => {
  return <a href={props.children}>{props.children}</a>
}

const Markdown = (props: { children: string; class?: string }) => {
  return (
    <div
      class={`markdown ${props.class}`}
      dangerouslySetInnerHTML={{ __html: marky(props.children) }}
    />
  )
}

const urlPattern =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

const applyDomainIfNotAbsolute = (domain: string | undefined, url: string) => {
  if (url.startsWith("data:image")) return url
  if (url.match(urlPattern)) return url
  return `${domain}${url}`
}

export const PageComponent = (props: Options) => {
  return (
    <div class="wrapper">
      <div class="topSection">
        <h1 class="name">{props.name}</h1>
        <p>{props.location} | {props.email} | {props.phone}</p>
        <p>
          {props.links.map((link) => <Url>{link}</Url>).reduce(
            (accu: any, elem: any) => {
              return accu === null ? [elem] : [...accu, " | ", elem]
            },
            null,
          )}
        </p>
        {props.downloadable && props.downloadIcon && (
          <a
            href={applyDomainIfNotAbsolute(
              props.domain,
              props.downloadable,
            )}
            class="downloadLink"
          >
            <img
              src={applyDomainIfNotAbsolute(
                props.domain,
                props.downloadIcon,
              )}
              alt="download resume"
              {...{
                width: 40,
                height: 40,
                ...props.classData?.[".downloadLink img"]?.attributes,
              }}
            />
          </a>
        )}
      </div>
      {props.jobs.map((job) => {
        return (
          <div class="job">
            <div class="jobImage">
              <img
                {...{
                  width: 25,
                  height: 25,
                  ...props.classData?.[".jobImage img"]?.attributes,
                }}
                src={applyDomainIfNotAbsolute(
                  props.domain,
                  job.company.logo,
                )}
              />
            </div>
            <div>
              <h2>{job.title}</h2>
              <p>
                <h3>{job.company.name}</h3>
                (<span>{job.start}</span> →{" "}
                <span>{job.end ? job.end : "Present"}</span>)
              </p>
              <Markdown class="jobSummary">{job.summary}</Markdown>
              <div>
                {job.tags.map((tag) => {
                  return (
                    <span class="label">
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface Meta {
  theme?: { [key: string]: string }
  domain?: string
  classData?: {
    [key: string]: {
      attributes: {
        [key: string]: string
      }
    }
  }
}

export type Options = Data & HTMLProps & Meta

export const preactResponse = (component: VNode): Response => {
  const html = preactRenderToString(component)
  return new Response(`<!doctype html>\n${html}`, {
    headers: { "content-type": "text/html; charset=utf-8" },
  })
}

export const ResumeComponent = (props: Options) => {
  const { style: inlineStyles, data: classData } = tailwindObjectToGloablStyles(
    props.theme || {},
  )
  return (
    <HTML {...{ ...props, inlineStyles }}>
      <PageComponent {...{ ...props, classData }} />
    </HTML>
  )
}

export const route = (props: Options) => {
  return () => preactResponse(<ResumeComponent {...props} />)
}

export const renderToString = (props: Options) => {
  return preactRenderToString(<ResumeComponent {...props} />)
}

export const saveHTML = async (props: Options, saveLocation: string) => {
  const html = renderToString(props)
  const entrypoint = path.isAbsolute(saveLocation)
    ? saveLocation
    : path.join(Deno.cwd(), saveLocation)
  return await Deno.writeTextFile(entrypoint, html)
}

export default route

/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "https://esm.sh/preact@10.13.2"
import { marky } from "https://deno.land/x/marky@v1.1.6/mod.ts"
import { HTML, HTMLProps } from "./html.tsx"
import { tailwindObjectToGloablStyles } from "./twind/mod.ts"
import { Root as Data } from "./types.ts"
import theme from '../theme.json' assert { type: 'json' }

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

export const applyDomainIfNotAbsolute = (domain: string | undefined, url: string) => {
  if (url.startsWith("data:image")) return url
  if (url.match(urlPattern)) return url
  if (domain) return `${domain}${url}`
  return url
}

export const PageComponent = (props: Props) => {
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

export type Props = Data & HTMLProps & Meta

export const Resume = (props: Props) => {
  props.theme = props.theme || theme
  const { style: inlineStyles, data: classData } = tailwindObjectToGloablStyles(
    props.theme || {},
  )
  return (
    <HTML {...{ ...props, inlineStyles }}>
      <PageComponent {...{ ...props, classData }} />
    </HTML>
  )
}
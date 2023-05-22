import path from "node:path"
import { encode } from "https://deno.land/std@0.185.0/encoding/base64.ts"
import { contentType as getContentType } from "https://deno.land/std@0.185.0/media_types/content_type.ts"
import { applyDomainIfNotAbsolute, Props } from "./component.tsx"

const template = (props: { contentType: string; base64: string }) =>
  `data:${props.contentType};base64,${props.base64}`

export async function dataUrl(urlOrPathname: string) {
  const ext = path.extname(urlOrPathname)
  const contentType = getContentType(ext)
  if (!contentType) {
    throw new Error(`Could not determine content type for ${urlOrPathname}`)
  }
  const file = await fetch(urlOrPathname)
  const buffer = await file.arrayBuffer()
  const base64 = encode(buffer)
  return template({ contentType, base64 })
}

export async function transformImages(
  data: Props,
  handleImage: (img: string) => string | Promise<string>,
): Promise<Props> {
  const jobs = data.jobs
  if (data.downloadIcon) {
    data.downloadIcon = await handleImage(data.downloadIcon)
  }
  if (!jobs) return data
  const newJobs = await Promise.all(data.jobs.map(async (job) => {
    job.company.logo = await handleImage(job.company.logo)
    return job
  }))
  return { ...data, jobs: newJobs }
}

export function transform(data: Props): Promise<Props> {
  return transformImages(
    data,
    (img) => dataUrl(applyDomainIfNotAbsolute(data.domain, img)),
  )
}

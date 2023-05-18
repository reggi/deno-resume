/** @jsx h */
import { h } from "https://esm.sh/preact@10.13.2";

export type Base64 = { mime: string, data: string}
export type ImageOptions = string | Base64 | ImageProps

export type ImageProps = {
  src: string | Base64
  width?: string
  height?: string
  alt?: string
  className?: string
}

const isBase64 = (src: string | { mime: string, data: string} | ImageProps): src is { mime: string, data: string} => {
  return (typeof src === 'object' && 'mime' in src && 'data' in src)
}

const joinBase64 = (value: Base64) => {
  if (value.mime.startsWith('data:')) return `${value.mime}, ${value.data}`
  return `data:${value.mime};base64, ${value.data}`
}

const getSource = (props: ImageProps): string => {
  return isBase64(props.src) ? joinBase64(props.src) : props.src
}

export const spreadImageProps = (value: ImageOptions): ImageProps => {
  if (typeof value === 'string') {
    return {src: value}
  } else if (isBase64(value)) {
    return {src: joinBase64(value)}
  } 
  return value
}

export const Image = (props: ImageProps) => {
  return <img width={props.width} height={props.height} src={getSource(props)} alt={props.alt} className={props.className}/>
}

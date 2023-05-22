import { serve as denoServe } from "https://deno.land/std@0.188.0/http/server.ts"
import { router } from "https://crux.land/router@0.0.12"
import { _route, Component } from "./render.ts"

export function _serve<Props>(component: Component<Props>, props: Props) {
  return denoServe(router({
    "/": _route(component, props),
  }))
}

export function serve<Props>(component: Component<Props>) {
  return (props: Props) => _serve(component, props)
}

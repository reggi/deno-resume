import render from './render/mod.ts'
export type * from './src/component.tsx'

/** this doesn't export the pdf or serve all.ts does */

export const resume = render.toResponse
export default render.toResponse

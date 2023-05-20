
import pdf from './pdf/mod.ts'
import render from './render/mod.ts'
import serve from './serve/mod.ts'

export type * from './src/component.tsx'
export * from './render/mod.ts'

export { serve }
export { pdf }
export { pdf as toPdf }

export const resume = render.toResponse
export default render.toResponse
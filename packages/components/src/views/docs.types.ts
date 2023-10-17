import type { RendererElement, RendererNode, VNode } from 'vue'

interface RenderFunction {
  render: () => VNode<RendererNode, RendererElement, {
    [key: string]: any
  }>
}

export interface IExample {
  title?: string
  code?: () => Promise<typeof import('*?raw')>
  // @ts-ignore
  view: (() => Promise<typeof import('*vue')>) | RenderFunction
}

export interface IExamplePage {
  title: string
  componentName: string
  componentUrl?: string
  examples: IExample[]
  dos?: () => Promise<typeof import('*.md')>
  donts?: () => Promise<typeof import('*.md')>
  overview: () => Promise<typeof import('*.md')>
  bestPractices: () => Promise<typeof import('*.md')>
}

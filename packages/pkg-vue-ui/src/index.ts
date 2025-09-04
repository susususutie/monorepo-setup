// Vue插件默认导出 - 支持 app.use(PkgVueUi) 方式
export { default, version } from './plugin'

// 导出组件（用于按需导入）
// 注意：这里显式导入Vue组件，但只在运行时使用
export { default as Button } from './components/Button.vue'
export { default as Card } from './components/Card.vue'

// 导出组件类型
export type { ButtonProps, ButtonType, CardProps } from './types'

// 导出组件路径常量（用于动态导入）
export { ComponentNames, ComponentPaths } from './types'

// 工具函数
export function createVueMessage(message: string): string {
  return `[Vue UI]: ${message}`
}

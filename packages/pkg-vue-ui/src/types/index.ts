// Button 组件类型定义
export type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export interface ButtonProps {
  text?: string
  type?: ButtonType
  disabled?: boolean
}

// Card 组件类型定义
export interface CardProps {
  title?: string
  content?: string
  hoverable?: boolean
}

// 组件名称映射
export const ComponentNames = {
  Button: 'PkgButton',
  Card: 'PkgCard'
} as const

// 组件路径常量
export const ComponentPaths = {
  Button: './components/Button.vue',
  Card: './components/Card.vue'
} as const
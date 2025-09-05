/**
 * TypeScript 类型定义
 */

import { Status } from './constants'

// 用户相关类型
export interface User {
  id: string
  name: string
  email: string
  age?: number
  roles: Role[]
  metadata?: Record<string, unknown>
}

export interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export interface Permission {
  action: string
  resource: string
}

// API 响应类型
export type ApiResponse<T = unknown> = {
  data: T
  status: Status
  message?: string
  timestamp: number
}

// 事件处理器类型
export type EventHandler<T = unknown> = (data: T) => void | Promise<void>

// 验证规则类型
export type ValidatorRule<T> = {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: T) => boolean | string
}

// 异步结果类型
export type AsyncResult<T, E = Error> = {
  success: boolean
  data?: T
  error?: E
}
/**
 * pkg-other - TypeScript 工具函数库
 * 
 * 一个模块化的工具函数库，提供常用的工具函数和类型定义
 */

// 基础常量和配置
export * from './constants'

// TypeScript 类型定义
export * from './types'

// 工具函数模块
export * from './math'
export * from './string'
export * from './array'
export * from './object'
export * from './async'
export * from './date'

// 功能类模块
export * from './validator'
export * from './event'
export * from './cache'
export * from './error'

// 兼容性导出
export function test(a: number, b: number): number {
  return a + b + 1
}

/**
 * 异步操作工具函数
 */

import type { AsyncResult } from './types'

/**
 * 延迟执行
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 为 Promise 添加超时控制
 */
export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error(`超时 ${ms}ms`)), ms)
    )
  ])
}

/**
 * 重试执行异步函数
 */
export async function retry<T>(
  fn: () => Promise<T>, 
  attempts: number = 3, 
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === attempts - 1) throw error
      await sleep(delay * Math.pow(2, i)) // 指数退避
    }
  }
  throw new Error('所有重试尝试都失败了')
}

/**
 * 创建安全的异步函数包装器
 */
export function createSafeAsync<T extends any[], R>(
  fn: (...args: T) => R | Promise<R>
): (...args: T) => Promise<AsyncResult<R>> {
  return async (...args: T): Promise<AsyncResult<R>> => {
    try {
      const result = await fn(...args)
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error))
      }
    }
  }
}
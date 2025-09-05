import { describe, expect, it } from 'vitest'
import { sleep, timeout, retry, createSafeAsync } from '../src/async'

describe('异步工具模块', () => {
  describe('sleep 函数', () => {
    it('应该正确延迟指定时间', async () => {
      const start = Date.now()
      await sleep(100)
      const elapsed = Date.now() - start
      
      // 允许一些时间误差
      expect(elapsed).toBeGreaterThanOrEqual(90)
      expect(elapsed).toBeLessThan(150)
    })

    it('应该处理零延迟', async () => {
      const start = Date.now()
      await sleep(0)
      const elapsed = Date.now() - start
      
      expect(elapsed).toBeLessThan(50)
    })

    it('应该返回 Promise', () => {
      const result = sleep(10)
      expect(result).toBeInstanceOf(Promise)
    })

    it('应该可以被 await', async () => {
      let completed = false
      sleep(50).then(() => { completed = true })
      
      expect(completed).toBe(false)
      await sleep(60)
      expect(completed).toBe(true)
    })
  })

  describe('timeout 函数', () => {
    it('应该在超时后抛出错误', async () => {
      const slowPromise = new Promise(resolve => setTimeout(resolve, 200))
      
      await expect(timeout(slowPromise, 100)).rejects.toThrow('超时 100ms')
    })

    it('应该在超时前正常解决', async () => {
      const fastPromise = new Promise(resolve => setTimeout(() => resolve('success'), 50))
      
      const result = await timeout(fastPromise, 100)
      expect(result).toBe('success')
    })

    it('应该正确传递 Promise 的结果', async () => {
      const promise = Promise.resolve('test result')
      
      const result = await timeout(promise, 100)
      expect(result).toBe('test result')
    })

    it('应该正确传递 Promise 的错误', async () => {
      const promise = Promise.reject(new Error('original error'))
      
      await expect(timeout(promise, 100)).rejects.toThrow('original error')
    })

    it('应该处理立即解决的 Promise', async () => {
      const immediatePromise = Promise.resolve('immediate')
      
      const result = await timeout(immediatePromise, 100)
      expect(result).toBe('immediate')
    })

    it('应该处理不同的超时时间', async () => {
      const promise = new Promise(resolve => setTimeout(resolve, 150))
      
      // 短超时应该失败
      await expect(timeout(promise, 100)).rejects.toThrow('超时 100ms')
      
      // 长超时应该成功（创建新的 Promise）
      const promise2 = new Promise(resolve => setTimeout(() => resolve('success'), 50))
      const result = await timeout(promise2, 200)
      expect(result).toBe('success')
    })
  })

  describe('retry 函数', () => {
    it('应该重试失败的操作', async () => {
      let attempts = 0
      const failingFn = async () => {
        attempts++
        if (attempts < 3) {
          throw new Error('临时失败')
        }
        return 'success'
      }

      const result = await retry(failingFn, 3, 10)
      expect(result).toBe('success')
      expect(attempts).toBe(3)
    })

    it('应该在最大尝试次数后抛出错误', async () => {
      let attempts = 0
      const alwaysFailingFn = async () => {
        attempts++
        throw new Error(`失败 ${attempts}`)
      }

      await expect(retry(alwaysFailingFn, 3, 10)).rejects.toThrow('失败 3')
      expect(attempts).toBe(3)
    })

    it('应该使用指数退避延迟', async () => {
      let attempts = 0
      const startTime = Date.now()
      const failingFn = async () => {
        attempts++
        throw new Error('失败')
      }

      await expect(retry(failingFn, 3, 50)).rejects.toThrow()
      const elapsed = Date.now() - startTime
      
      // 预期延迟: 50ms + 100ms = 150ms (指数退避)
      expect(elapsed).toBeGreaterThanOrEqual(140)
      expect(attempts).toBe(3)
    })

    it('应该在第一次成功时立即返回', async () => {
      let attempts = 0
      const successFn = async () => {
        attempts++
        return `成功 ${attempts}`
      }

      const result = await retry(successFn, 5, 10)
      expect(result).toBe('成功 1')
      expect(attempts).toBe(1)
    })

    it('应该使用默认参数', async () => {
      let attempts = 0
      const failingFn = async () => {
        attempts++
        if (attempts < 2) {
          throw new Error('失败')
        }
        return 'success'
      }

      const result = await retry(failingFn)
      expect(result).toBe('success')
      expect(attempts).toBe(2)
    })

    it('应该处理同步函数', async () => {
      let attempts = 0
      const syncFailingFn = () => {
        attempts++
        if (attempts < 3) {
          throw new Error('同步失败')
        }
        return '同步成功'
      }

      const result = await retry(syncFailingFn, 3, 10)
      expect(result).toBe('同步成功')
      expect(attempts).toBe(3)
    })
  })

  describe('createSafeAsync 函数', () => {
    it('应该创建安全的异步函数包装器', async () => {
      const throwingFn = () => {
        throw new Error('测试错误')
      }
      
      const safeFn = createSafeAsync(throwingFn)
      const result = await safeFn()
      
      expect(result.success).toBe(false)
      expect(result.error?.message).toBe('测试错误')
      expect(result.data).toBeUndefined()
    })

    it('应该在成功时返回数据', async () => {
      const successFn = (input: string) => `处理: ${input}`
      
      const safeFn = createSafeAsync(successFn)
      const result = await safeFn('测试')
      
      expect(result.success).toBe(true)
      expect(result.data).toBe('处理: 测试')
      expect(result.error).toBeUndefined()
    })

    it('应该处理异步函数', async () => {
      const asyncFn = async (delay: number) => {
        await sleep(delay)
        return `延迟 ${delay}ms`
      }
      
      const safeFn = createSafeAsync(asyncFn)
      const result = await safeFn(50)
      
      expect(result.success).toBe(true)
      expect(result.data).toBe('延迟 50ms')
    })

    it('应该处理异步函数的错误', async () => {
      const asyncThrowingFn = async () => {
        await sleep(10)
        throw new Error('异步错误')
      }
      
      const safeFn = createSafeAsync(asyncThrowingFn)
      const result = await safeFn()
      
      expect(result.success).toBe(false)
      expect(result.error?.message).toBe('异步错误')
    })

    it('应该保持函数参数', async () => {
      const multiParamFn = (a: number, b: string, c: boolean) => {
        if (!c) throw new Error('参数错误')
        return `${a}-${b}-${c}`
      }
      
      const safeFn = createSafeAsync(multiParamFn)
      
      const successResult = await safeFn(42, 'test', true)
      expect(successResult.success).toBe(true)
      expect(successResult.data).toBe('42-test-true')
      
      const errorResult = await safeFn(1, 'test', false)
      expect(errorResult.success).toBe(false)
      expect(errorResult.error?.message).toBe('参数错误')
    })

    it('应该处理非 Error 类型的异常', async () => {
      const throwingStringFn = () => {
        throw '字符串错误'
      }
      
      const safeFn = createSafeAsync(throwingStringFn)
      const result = await safeFn()
      
      expect(result.success).toBe(false)
      expect(result.error?.message).toBe('字符串错误')
      expect(result.error).toBeInstanceOf(Error)
    })

    it('应该处理返回 Promise 的函数', async () => {
      const promiseReturningFn = () => Promise.resolve('promise result')
      
      const safeFn = createSafeAsync(promiseReturningFn)
      const result = await safeFn()
      
      expect(result.success).toBe(true)
      expect(result.data).toBe('promise result')
    })
  })
})
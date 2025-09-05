import { describe, expect, it, beforeEach, vi } from 'vitest'
import { test } from '../src/index'

describe('主入口模块', () => {
  describe('兼容性函数', () => {
    it('应该导出 test 兼容性函数', () => {
      expect(typeof test).toBe('function')
      expect(test(1, 2)).toBe(4)
      expect(test(0, 0)).toBe(1)
      expect(test(-1, 1)).toBe(1)
    })
  })

  describe('模块导出验证', () => {
    it('应该正确重新导出所有模块', async () => {
      const index = await import('../src/index')
      
      // 验证关键导出
      expect(index.one).toBe(12)
      expect(index.Status).toBeDefined()
      expect(typeof index.clamp).toBe('function')
      expect(typeof index.capitalize).toBe('function')
      expect(typeof index.unique).toBe('function')
      expect(typeof index.deepClone).toBe('function')
      expect(typeof index.sleep).toBe('function')
      expect(typeof index.formatDate).toBe('function')
      expect(index.Validator).toBeDefined()
      expect(index.EventEmitter).toBeDefined()
      expect(index.LRUCache).toBeDefined()
      expect(index.AppError).toBeDefined()
    })
  })
})

import {
  // 基础常量
  one,
  two,
  CONFIG,
  Status,
  Priority,
  
  // 基础工具函数
  test,
  clamp,
  randomBetween,
  round,
  percentage,
  average,
  capitalize,
  slugify,
  truncate,
  camelCase,
  snakeCase,
  unique,
  groupBy,
  chunk,
  shuffle,
  intersection,
  deepClone,
  pick,
  omit,
  merge,
  isEmpty,
  
  // 异步工具
  sleep,
  timeout,
  retry,
  createSafeAsync,
  
  // 类
  Validator,
  EventEmitter,
  LRUCache,
  AppError,
  
  // 日期工具
  formatDate,
  isWeekend,
  addDays,
  diffInDays,
  getDaysInMonth,
  
  // 工具函数
  createValidator,
  createEventEmitter,
  createCache,
  createError,
  isOperationalError,
  ErrorCodes,
  
  // 类型
  type User,
  type ApiResponse,
  type AsyncResult,
  type EventHandler,
  type ValidatorRule,
} from '../src/index'

describe('pkg-utils', () => {
  describe('基础常量', () => {
    it('应该正确导出常量', () => {
      expect(one).toBe(12)
      expect(two).toBe(234)
    })

    it('应该正确导出配置', () => {
      expect(CONFIG.API_BASE_URL).toBe('https://api.example.com')
      expect(CONFIG.TIMEOUT).toBe(5000)
      expect(CONFIG.VERSION).toBe('1.0.0')
      expect(CONFIG.FEATURES.ENABLE_CACHE).toBe(true)
    })

    it('应该正确导出枚举', () => {
      expect(Status.PENDING).toBe('pending')
      expect(Status.SUCCESS).toBe('success')
      expect(Priority.LOW).toBe(1)
      expect(Priority.HIGH).toBe(3)
    })
  })

  describe('基础工具函数', () => {
    it('test 函数应该正确计算', () => {
      expect(test(1, 2)).toBe(4)
      expect(test(0, 0)).toBe(1)
      expect(test(-1, 1)).toBe(1)
    })

    it('clamp 应该限制数值范围', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('randomBetween 应该生成指定范围内的随机数', () => {
      const result = randomBetween(1, 10)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(10)
      expect(Number.isInteger(result)).toBe(true)
    })

    it('round 应该正确四舍五入', () => {
      expect(round(3.14159, 2)).toBe(3.14)
      expect(round(3.14159, 3)).toBe(3.142)
      expect(round(3.14159)).toBe(3.14)
    })

    it('percentage 应该正确计算百分比', () => {
      expect(percentage(25, 100)).toBe(25)
      expect(percentage(1, 3)).toBe(33.33)
      expect(percentage(0, 100)).toBe(0)
      expect(percentage(50, 0)).toBe(0)
    })

    it('average 应该正确计算平均值', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3)
      expect(average([10, 20, 30])).toBe(20)
      expect(average([])).toBe(0)
    })
  })

  describe('字符串工具', () => {
    it('capitalize 应该正确大写首字母', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('WORLD')).toBe('World')
      expect(capitalize('hELLo')).toBe('Hello')
    })

    it('slugify 应该生成正确的 URL 友好字符串', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces')
      expect(slugify('Special @#$ Characters')).toBe('special-characters')
    })

    it('truncate 应该正确截断字符串', () => {
      expect(truncate('Hello World', 5)).toBe('He...')
      expect(truncate('Hello', 10)).toBe('Hello')
      expect(truncate('Hello World', 8, '***')).toBe('Hello***')
    })

    it('camelCase 应该正确转换为驼峰命名', () => {
      expect(camelCase('hello-world')).toBe('helloWorld')
      expect(camelCase('user_name')).toBe('userName')
      expect(camelCase('my test string')).toBe('myTestString')
    })

    it('snakeCase 应该正确转换为蛇形命名', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world')
      expect(snakeCase('UserName')).toBe('user_name')
    })
  })

  describe('数组工具', () => {
    it('unique 应该移除重复项', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b'])
    })

    it('groupBy 应该正确分组', () => {
      const data = [
        { type: 'A', value: 1 },
        { type: 'B', value: 2 },
        { type: 'A', value: 3 }
      ]
      const grouped = groupBy(data, 'type')
      expect(grouped.A).toHaveLength(2)
      expect(grouped.B).toHaveLength(1)
    })

    it('chunk 应该正确分块', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
    })

    it('shuffle 应该正确乱序数组', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffle(original)
      
      expect(shuffled).toHaveLength(original.length)
      expect(shuffled).toEqual(expect.arrayContaining(original))
      expect(shuffled).not.toBe(original) // 应该返回新数组
    })

    it('intersection 应该正确求交集', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
      expect(intersection(['a', 'b'], ['b', 'c'])).toEqual(['b'])
      expect(intersection([1, 2], [3, 4])).toEqual([])
    })
  })

  describe('对象工具', () => {
    it('deepClone 应该深度克隆对象', () => {
      const original = { a: 1, b: { c: 2, d: [3, 4] } }
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.b).not.toBe(original.b)
      expect(cloned.b.d).not.toBe(original.b.d)
    })

    it('pick 应该选择指定属性', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })

    it('omit 应该排除指定属性', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
    })

    it('merge 应该正确合并对象', () => {
      const target = { a: 1, b: 2 }
      const source = { b: 3, c: 4 }
      expect(merge(target, source)).toEqual({ a: 1, b: 3, c: 4 })
    })

    it('isEmpty 应该正确判断对象是否为空', () => {
      expect(isEmpty({})).toBe(true)
      expect(isEmpty({ a: 1 })).toBe(false)
    })
  })

  describe('异步工具', () => {
    it('sleep 应该正确延迟', async () => {
      const start = Date.now()
      await sleep(100)
      const elapsed = Date.now() - start
      expect(elapsed).toBeGreaterThanOrEqual(90) // 容忍一些误差
    })

    it('timeout 应该在超时后抛出错误', async () => {
      const slowPromise = new Promise(resolve => setTimeout(resolve, 200))
      await expect(timeout(slowPromise, 100)).rejects.toThrow('超时 100ms')
    })

    it('retry 应该重试失败的操作', async () => {
      let attempts = 0
      const failingFn = async () => {
        attempts++
        if (attempts < 3) {
          throw new Error('Temporary failure')
        }
        return 'success'
      }

      const result = await retry(failingFn, 3, 10)
      expect(result).toBe('success')
      expect(attempts).toBe(3)
    })

    it('createSafeAsync 应该创建安全的异步函数包装器', async () => {
      const throwingFn = () => {
        throw new Error('测试错误')
      }
      
      const safeFn = createSafeAsync(throwingFn)
      const result = await safeFn()
      
      expect(result.success).toBe(false)
      expect(result.error?.message).toBe('测试错误')
    })

    it('createSafeAsync 应该在成功时返回数据', async () => {
      const successFn = () => 'success'
      
      const safeFn = createSafeAsync(successFn)
      const result = await safeFn()
      
      expect(result.success).toBe(true)
      expect(result.data).toBe('success')
    })
  })

  describe('Validator 类', () => {
    it('应该验证必填字段', () => {
      const validator = createValidator<{ name: string; age: number }>()
        .addRule('name', { required: true })
        .addRule('age', { required: true, min: 0 })

      const result1 = validator.validate({ name: 'John', age: 25 })
      expect(result1.valid).toBe(true)

      const result2 = validator.validate({ name: '', age: 25 })
      expect(result2.valid).toBe(false)
      expect(result2.errors.name).toContain('name是必填项')
    })

    it('应该验证字符串长度', () => {
      const validator = createValidator<{ username: string }>()
        .addRule('username', { min: 3, max: 10 })

      const result1 = validator.validate({ username: 'ab' })
      expect(result1.valid).toBe(false)
      expect(result1.errors.username).toContain('username至少需要3个字符')

      const result2 = validator.validate({ username: 'verylongusername' })
      expect(result2.valid).toBe(false)
      expect(result2.errors.username).toContain('username最多10个字符')
    })
  })

  describe('EventEmitter 类', () => {
    let emitter: EventEmitter<{ test: string; number: number }>

    beforeEach(() => {
      emitter = createEventEmitter<{ test: string; number: number }>()
    })

    it('应该正确发送和接收事件', () => {
      const handler = vi.fn()
      emitter.on('test', handler)
      emitter.emit('test', 'hello')
      
      expect(handler).toHaveBeenCalledWith('hello')
    })

    it('应该正确取消监听', () => {
      const handler = vi.fn()
      const unsubscribe = emitter.on('test', handler)
      
      unsubscribe()
      emitter.emit('test', 'hello')
      
      expect(handler).not.toHaveBeenCalled()
    })

    it('once 应该只触发一次', () => {
      const handler = vi.fn()
      emitter.once('test', handler)
      
      emitter.emit('test', 'first')
      emitter.emit('test', 'second')
      
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith('first')
    })
  })

  describe('LRUCache 类', () => {
    let cache: LRUCache<string, number>

    beforeEach(() => {
      cache = createCache<string, number>(3)
    })

    it('应该正确存储和获取值', () => {
      cache.set('a', 1)
      expect(cache.get('a')).toBe(1)
      expect(cache.has('a')).toBe(true)
    })

    it('应该在超过容量时移除最旧的项', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      cache.set('d', 4) // 应该移除 'a'
      
      expect(cache.has('a')).toBe(false)
      expect(cache.has('d')).toBe(true)
      expect(cache.size()).toBe(3)
    })

    it('应该在访问时更新顺序', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      
      cache.get('a') // 访问 'a'，使其成为最近使用
      cache.set('d', 4) // 应该移除 'b'（而不是 'a'）
      
      expect(cache.has('a')).toBe(true)
      expect(cache.has('b')).toBe(false)
    })
  })

  describe('AppError 类', () => {
    it('应该创建自定义错误', () => {
      const error = new AppError('测试错误', 'TEST_ERROR', 400)
      
      expect(error.message).toBe('测试错误')
      expect(error.code).toBe('TEST_ERROR')
      expect(error.statusCode).toBe(400)
      expect(error.isOperational).toBe(true)
      expect(error.name).toBe('AppError')
    })
  })

  describe('错误处理工具', () => {
    it('createError 应该创建标准化错误', () => {
      const error = createError('测试错误', ErrorCodes.VALIDATION_ERROR, 400)
      
      expect(error.message).toBe('测试错误')
      expect(error.code).toBe(ErrorCodes.VALIDATION_ERROR)
      expect(error.statusCode).toBe(400)
    })

    it('isOperationalError 应该正确判断操作性错误', () => {
      const operationalError = new AppError('操作性错误')
      const systemError = new Error('系统错误')
      
      expect(isOperationalError(operationalError)).toBe(true)
      expect(isOperationalError(systemError)).toBe(false)
    })
  })

  describe('日期工具', () => {
    it('formatDate 应该正确格式化日期', () => {
      const date = new Date('2024-03-15T10:30:45')
      
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-03-15')
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 10:30:45')
    })

    it('isWeekend 应该正确判断周末', () => {
      const saturday = new Date('2024-03-16') // 周六
      const sunday = new Date('2024-03-17')   // 周日
      const monday = new Date('2024-03-18')   // 周一
      
      expect(isWeekend(saturday)).toBe(true)
      expect(isWeekend(sunday)).toBe(true)
      expect(isWeekend(monday)).toBe(false)
    })

    it('addDays 应该正确添加日期', () => {
      const date = new Date('2024-03-15')
      const result = addDays(date, 5)
      
      expect(result.getDate()).toBe(20)
      expect(result.getMonth()).toBe(2) // 3月是索引 2
    })

    it('diffInDays 应该正确计算日期差', () => {
      const date1 = new Date('2024-03-15')
      const date2 = new Date('2024-03-20')
      
      expect(diffInDays(date1, date2)).toBe(5)
      expect(diffInDays(date2, date1)).toBe(5)
    })

    it('getDaysInMonth 应该正确计算月份天数', () => {
      expect(getDaysInMonth(2024, 2)).toBe(29) // 闰年二月
      expect(getDaysInMonth(2023, 2)).toBe(28) // 平年二月
      expect(getDaysInMonth(2024, 4)).toBe(30) // 四月
      expect(getDaysInMonth(2024, 1)).toBe(31) // 一月
    })
  })



  describe('类型定义', () => {
    it('应该正确定义 User 类型', () => {
      const user: User = {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        roles: [{
          id: 'admin',
          name: 'Administrator',
          permissions: [{ action: 'read', resource: 'users' }]
        }]
      }
      
      expect(user.id).toBe('1')
      expect(user.roles).toHaveLength(1)
    })

    it('应该正确定义 ApiResponse 类型', () => {
      const response: ApiResponse<string> = {
        data: 'success',
        status: Status.SUCCESS,
        timestamp: Date.now()
      }
      
      expect(response.data).toBe('success')
      expect(response.status).toBe(Status.SUCCESS)
    })

    it('应该正确定义 AsyncResult 类型', () => {
      const successResult: AsyncResult<string> = {
        success: true,
        data: 'result'
      }
      
      const errorResult: AsyncResult<string> = {
        success: false,
        error: new Error('Failed')
      }
      
      expect(successResult.success).toBe(true)
      expect(errorResult.success).toBe(false)
    })
  })
})

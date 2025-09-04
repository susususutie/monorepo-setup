import { describe, expect, it } from 'vitest'

describe('Tree-shaking 和导入方式测试', () => {
  describe('默认导入方式 (从主入口)', () => {
    it('应该支持从主入口导入所有功能', async () => {
      const { clamp, capitalize, unique, LRUCache } = await import('../src/index')
      
      expect(typeof clamp).toBe('function')
      expect(typeof capitalize).toBe('function')
      expect(typeof unique).toBe('function')
      expect(typeof LRUCache).toBe('function')
    })

    it('应该支持按需导入（tree-shaking）', async () => {
      // 只导入需要的函数，其他函数不应该被包含在最终包中
      const { clamp } = await import('../src/index')
      
      expect(clamp(5, 0, 10)).toBe(5)
    })
  })

  describe('模块化导入方式', () => {
    it('应该支持从具体模块导入', async () => {
      const { clamp, randomBetween } = await import('../src/math')
      const { capitalize, slugify } = await import('../src/string')
      const { unique, chunk } = await import('../src/array')
      
      expect(clamp(15, 0, 10)).toBe(10)
      expect(capitalize('hello')).toBe('Hello')
      expect(unique([1, 1, 2, 3])).toEqual([1, 2, 3])
    })

    it('应该支持从常量模块导入', async () => {
      const { one, two, CONFIG, Status } = await import('../src/constants')
      
      expect(one).toBe(12)
      expect(two).toBe(234)
      expect(CONFIG.VERSION).toBe('1.0.0')
      expect(Status.SUCCESS).toBe('success')
    })

    it('应该支持从类模块导入', async () => {
      const { LRUCache, createCache } = await import('../src/cache')
      const { EventEmitter, createEventEmitter } = await import('../src/event')
      const { AppError, createError } = await import('../src/error')
      
      expect(typeof LRUCache).toBe('function')
      expect(typeof createCache).toBe('function')
      expect(typeof EventEmitter).toBe('function')
      expect(typeof createEventEmitter).toBe('function')
      expect(typeof AppError).toBe('function')
      expect(typeof createError).toBe('function')
    })
  })

  describe('类型导入', () => {
    it('应该能正确导入类型定义', async () => {
      // TypeScript 类型在运行时不存在，但编译时应该可用
      const typesModule = await import('../src/types')
      expect(typesModule).toBeDefined()
    })
  })

  describe('混合导入方式', () => {
    it('应该支持同时使用不同的导入方式', async () => {
      // 从主入口导入部分功能
      const { test } = await import('../src/index')
      
      // 从具体模块导入其他功能
      const { clamp } = await import('../src/math')
      const { capitalize } = await import('../src/string')
      
      expect(test(1, 2)).toBe(4)
      expect(clamp(5, 0, 10)).toBe(5)
      expect(capitalize('world')).toBe('World')
    })
  })

  describe('实际使用场景模拟', () => {
    it('数学工具使用场景', async () => {
      const { clamp, round, percentage } = await import('../src/math')
      
      // 模拟实际使用场景
      const score = clamp(105, 0, 100)  // 限制分数范围
      const roundedScore = round(score, 1)  // 保留一位小数
      const percent = percentage(roundedScore, 100)  // 转换为百分比
      
      expect(score).toBe(100)
      expect(roundedScore).toBe(100)
      expect(percent).toBe(100)
    })

    it('字符串处理使用场景', async () => {
      const { capitalize, slugify, truncate } = await import('../src/string')
      
      // 模拟博客标题处理
      const title = '  Hello World! This is a very long title  '
      const processedTitle = capitalize(title.trim())
      const slug = slugify(title)
      const shortTitle = truncate(processedTitle, 20)
      
      expect(processedTitle).toBe('Hello world! this is a very long title')
      expect(slug).toBe('hello-world-this-is-a-very-long-title')
      expect(shortTitle).toBe('Hello world! this...')
    })

    it('缓存和事件系统使用场景', async () => {
      const { createCache } = await import('../src/cache')
      const { createEventEmitter } = await import('../src/event')
      
      // 模拟带缓存的数据获取
      const cache = createCache<string, any>(10)
      const emitter = createEventEmitter<{ dataFetched: any }>()
      
      const fetchData = async (key: string) => {
        if (cache.has(key)) {
          return cache.get(key)
        }
        
        const data = { key, value: `data for ${key}` }
        cache.set(key, data)
        emitter.emit('dataFetched', data)
        return data
      }
      
      let eventFired = false
      emitter.on('dataFetched', () => { eventFired = true })
      
      const result1 = await fetchData('test')
      const result2 = await fetchData('test') // 从缓存获取
      
      expect(result1).toEqual(result2)
      expect(cache.size()).toBe(1)
      expect(eventFired).toBe(true)
    })
  })
})
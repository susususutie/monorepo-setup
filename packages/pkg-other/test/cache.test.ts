import { describe, expect, it, beforeEach } from 'vitest'
import { LRUCache, createCache } from '../src/cache'

describe('缓存模块', () => {
  describe('LRUCache 类', () => {
    let cache: LRUCache<string, number>

    beforeEach(() => {
      cache = new LRUCache<string, number>(3)
    })

    it('应该创建 LRU 缓存实例', () => {
      expect(cache).toBeInstanceOf(LRUCache)
      expect(cache.size()).toBe(0)
    })

    it('应该正确存储和获取值', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      
      expect(cache.get('a')).toBe(1)
      expect(cache.get('b')).toBe(2)
      expect(cache.has('a')).toBe(true)
      expect(cache.has('b')).toBe(true)
      expect(cache.size()).toBe(2)
    })

    it('应该在超过容量时移除最旧的项', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      expect(cache.size()).toBe(3)
      
      cache.set('d', 4) // 应该移除 'a'
      
      expect(cache.has('a')).toBe(false)
      expect(cache.has('b')).toBe(true)
      expect(cache.has('c')).toBe(true)
      expect(cache.has('d')).toBe(true)
      expect(cache.size()).toBe(3)
    })

    it('应该在访问时更新顺序（LRU）', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      
      cache.get('a') // 访问 'a'，使其成为最近使用
      cache.set('d', 4) // 应该移除 'b'（而不是 'a'）
      
      expect(cache.has('a')).toBe(true)
      expect(cache.has('b')).toBe(false)
      expect(cache.has('c')).toBe(true)
      expect(cache.has('d')).toBe(true)
    })

    it('应该正确处理更新现有键', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      
      cache.set('b', 20) // 更新现有键
      
      expect(cache.get('b')).toBe(20)
      expect(cache.size()).toBe(3)
      
      cache.set('d', 4) // 应该移除 'a'（最旧的）
      
      expect(cache.has('a')).toBe(false)
      expect(cache.has('b')).toBe(true)
      expect(cache.get('b')).toBe(20)
    })

    it('应该正确删除缓存项', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      
      expect(cache.delete('b')).toBe(true)
      expect(cache.has('b')).toBe(false)
      expect(cache.size()).toBe(2)
      
      expect(cache.delete('nonexistent')).toBe(false)
      expect(cache.size()).toBe(2)
    })

    it('应该正确清空缓存', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      
      cache.clear()
      
      expect(cache.size()).toBe(0)
      expect(cache.has('a')).toBe(false)
      expect(cache.has('b')).toBe(false)
      expect(cache.has('c')).toBe(false)
    })

    it('应该处理容量为 1 的缓存', () => {
      const smallCache = new LRUCache<string, number>(1)
      
      smallCache.set('a', 1)
      expect(smallCache.get('a')).toBe(1)
      
      smallCache.set('b', 2)
      expect(smallCache.has('a')).toBe(false)
      expect(smallCache.get('b')).toBe(2)
      expect(smallCache.size()).toBe(1)
    })

    it('应该处理不存在的键', () => {
      expect(cache.get('nonexistent')).toBeUndefined()
      expect(cache.has('nonexistent')).toBe(false)
    })

    it('应该正确处理复杂的访问模式', () => {
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3)
      
      // 访问顺序：c(newest) -> b -> a(oldest)
      cache.get('a') // a -> newest, 顺序：a -> c -> b
      cache.get('b') // b -> newest, 顺序：b -> a -> c
      cache.set('d', 4) // 移除 c，顺序：d -> b -> a
      
      expect(cache.has('a')).toBe(true)
      expect(cache.has('b')).toBe(true)
      expect(cache.has('c')).toBe(false)
      expect(cache.has('d')).toBe(true)
    })

    it('应该支持不同的键值类型', () => {
      const objCache = new LRUCache<object, string>(2)
      const key1 = { id: 1 }
      const key2 = { id: 2 }
      
      objCache.set(key1, 'value1')
      objCache.set(key2, 'value2')
      
      expect(objCache.get(key1)).toBe('value1')
      expect(objCache.get(key2)).toBe('value2')
      
      const key3 = { id: 3 }
      objCache.set(key3, 'value3')
      
      expect(objCache.has(key1)).toBe(false) // 应该被移除
      expect(objCache.get(key3)).toBe('value3')
    })

    it('应该处理 null 和 undefined 值', () => {
      cache.set('null', null as any)
      cache.set('undefined', undefined as any)
      
      expect(cache.get('null')).toBeNull()
      expect(cache.get('undefined')).toBeUndefined()
      expect(cache.has('null')).toBe(true)
      expect(cache.has('undefined')).toBe(true)
    })

    it('应该维护正确的插入顺序', () => {
      const cache = new LRUCache<string, number>(5)
      
      // 按顺序插入
      cache.set('first', 1)
      cache.set('second', 2)
      cache.set('third', 3)
      cache.set('fourth', 4)
      cache.set('fifth', 5)
      
      // 添加第六个元素，应该移除第一个
      cache.set('sixth', 6)
      
      expect(cache.has('first')).toBe(false)
      expect(cache.has('second')).toBe(true)
      expect(cache.has('sixth')).toBe(true)
      expect(cache.size()).toBe(5)
    })
  })

  describe('createCache 函数', () => {
    it('应该创建 LRU 缓存实例', () => {
      const cache = createCache<string, number>(5)
      expect(cache).toBeInstanceOf(LRUCache)
    })

    it('应该支持类型推断', () => {
      const stringCache = createCache<string, string>(3)
      const numberCache = createCache<number, boolean>(3)
      
      stringCache.set('key', 'value')
      numberCache.set(123, true)
      
      expect(stringCache.get('key')).toBe('value')
      expect(numberCache.get(123)).toBe(true)
    })

    it('应该创建独立的实例', () => {
      const cache1 = createCache<string, number>(2)
      const cache2 = createCache<string, number>(2)
      
      cache1.set('shared', 1)
      cache2.set('shared', 2)
      
      expect(cache1.get('shared')).toBe(1)
      expect(cache2.get('shared')).toBe(2)
    })

    it('应该使用指定的容量', () => {
      const cache = createCache<string, number>(2)
      
      cache.set('a', 1)
      cache.set('b', 2)
      cache.set('c', 3) // 应该移除 'a'
      
      expect(cache.has('a')).toBe(false)
      expect(cache.has('b')).toBe(true)
      expect(cache.has('c')).toBe(true)
      expect(cache.size()).toBe(2)
    })
  })
})
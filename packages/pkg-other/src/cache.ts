/**
 * LRU 缓存实现
 */

/**
 * 最近最少使用缓存
 */
export class LRUCache<K, V> {
  private capacity: number
  private cache: Map<K, V> = new Map()

  constructor(capacity: number) {
    this.capacity = capacity
  }

  /**
   * 获取缓存值
   */
  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      // 移到最后（最近使用）
      const value = this.cache.get(key)!
      this.cache.delete(key)
      this.cache.set(key, value)
      return value
    }
    return undefined
  }

  /**
   * 设置缓存值
   */
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      // 更新现有值
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      // 删除最旧的项
      const firstKey = this.cache.keys().next().value as K
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }
    this.cache.set(key, value)
  }

  /**
   * 检查是否存在
   */
  has(key: K): boolean {
    return this.cache.has(key)
  }

  /**
   * 删除缓存项
   */
  delete(key: K): boolean {
    return this.cache.delete(key)
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * 获取缓存大小
   */
  size(): number {
    return this.cache.size
  }
}

/**
 * 创建 LRU 缓存实例
 */
export function createCache<K, V>(capacity: number): LRUCache<K, V> {
  return new LRUCache<K, V>(capacity)
}
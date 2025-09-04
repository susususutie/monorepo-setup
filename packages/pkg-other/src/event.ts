/**
 * 事件发射器
 */

import type { EventHandler } from './types'

/**
 * 类型安全的事件发射器
 */
export class EventEmitter<T extends Record<string, any> = Record<string, any>> {
  private listeners: { [K in keyof T]?: EventHandler<T[K]>[] } = {}

  /**
   * 监听事件
   */
  on<K extends keyof T>(event: K, handler: EventHandler<T[K]>): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(handler)
    
    // 返回取消订阅函数
    return () => this.off(event, handler)
  }

  /**
   * 取消监听
   */
  off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
    const handlers = this.listeners[event]
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  /**
   * 发射事件
   */
  emit<K extends keyof T>(event: K, data: T[K]): void {
    const handlers = this.listeners[event]
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data)
        } catch (error) {
          console.error(`事件处理器错误 ${String(event)}:`, error)
        }
      })
    }
  }

  /**
   * 一次性监听
   */
  once<K extends keyof T>(event: K, handler: EventHandler<T[K]>): () => void {
    const onceHandler: EventHandler<T[K]> = (data) => {
      handler(data)
      this.off(event, onceHandler)
    }
    return this.on(event, onceHandler)
  }

  /**
   * 移除所有监听器
   */
  removeAllListeners<K extends keyof T>(event?: K): void {
    if (event) {
      delete this.listeners[event]
    } else {
      this.listeners = {}
    }
  }
}

/**
 * 创建事件发射器实例
 */
export function createEventEmitter<T extends Record<string, any>>(): EventEmitter<T> {
  return new EventEmitter<T>()
}
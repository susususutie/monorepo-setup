import { describe, expect, it, beforeEach, vi } from 'vitest'
import { EventEmitter, createEventEmitter } from '../src/event'

describe('事件发射器模块', () => {
  describe('EventEmitter 类', () => {
    let emitter: EventEmitter<{ test: string; number: number; object: { data: any } }>

    beforeEach(() => {
      emitter = new EventEmitter<{ test: string; number: number; object: { data: any } }>()
    })

    it('应该创建事件发射器实例', () => {
      expect(emitter).toBeInstanceOf(EventEmitter)
    })

    it('应该正确发送和接收事件', () => {
      const handler = vi.fn()
      emitter.on('test', handler)
      emitter.emit('test', 'hello')
      
      expect(handler).toHaveBeenCalledWith('hello')
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('应该支持多个监听器', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn()
      
      emitter.on('test', handler1)
      emitter.on('test', handler2)
      emitter.on('test', handler3)
      
      emitter.emit('test', 'broadcast')
      
      expect(handler1).toHaveBeenCalledWith('broadcast')
      expect(handler2).toHaveBeenCalledWith('broadcast')
      expect(handler3).toHaveBeenCalledWith('broadcast')
    })

    it('应该正确取消监听', () => {
      const handler = vi.fn()
      const unsubscribe = emitter.on('test', handler)
      
      emitter.emit('test', 'first')
      expect(handler).toHaveBeenCalledTimes(1)
      
      unsubscribe()
      emitter.emit('test', 'second')
      expect(handler).toHaveBeenCalledTimes(1) // 不应该再被调用
    })

    it('应该支持手动取消监听', () => {
      const handler = vi.fn()
      emitter.on('test', handler)
      
      emitter.emit('test', 'before')
      expect(handler).toHaveBeenCalledTimes(1)
      
      emitter.off('test', handler)
      emitter.emit('test', 'after')
      expect(handler).toHaveBeenCalledTimes(1) // 不应该再被调用
    })

    it('once 应该只触发一次', () => {
      const handler = vi.fn()
      emitter.once('test', handler)
      
      emitter.emit('test', 'first')
      emitter.emit('test', 'second')
      emitter.emit('test', 'third')
      
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith('first')
    })

    it('once 应该返回取消订阅函数', () => {
      const handler = vi.fn()
      const unsubscribe = emitter.once('test', handler)
      
      unsubscribe() // 在触发前取消
      emitter.emit('test', 'test')
      
      expect(handler).not.toHaveBeenCalled()
    })

    it('应该处理不同类型的事件数据', () => {
      const stringHandler = vi.fn()
      const numberHandler = vi.fn()
      const objectHandler = vi.fn()
      
      emitter.on('test', stringHandler)
      emitter.on('number', numberHandler)
      emitter.on('object', objectHandler)
      
      emitter.emit('test', 'string value')
      emitter.emit('number', 42)
      emitter.emit('object', { data: { nested: 'value' } })
      
      expect(stringHandler).toHaveBeenCalledWith('string value')
      expect(numberHandler).toHaveBeenCalledWith(42)
      expect(objectHandler).toHaveBeenCalledWith({ data: { nested: 'value' } })
    })

    it('应该处理事件处理器中的错误', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const workingHandler = vi.fn()
      const errorHandler = vi.fn(() => { throw new Error('Handler error') })
      
      emitter.on('test', workingHandler)
      emitter.on('test', errorHandler)
      
      emitter.emit('test', 'test data')
      
      expect(workingHandler).toHaveBeenCalledWith('test data')
      expect(errorHandler).toHaveBeenCalledWith('test data')
      expect(consoleErrorSpy).toHaveBeenCalled()
      
      consoleErrorSpy.mockRestore()
    })

    it('应该移除所有指定事件的监听器', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn()
      
      emitter.on('test', handler1)
      emitter.on('test', handler2)
      emitter.on('number', handler3)
      
      emitter.removeAllListeners('test')
      
      emitter.emit('test', 'test')
      emitter.emit('number', 42)
      
      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
      expect(handler3).toHaveBeenCalledWith(42)
    })

    it('应该移除所有事件的监听器', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      
      emitter.on('test', handler1)
      emitter.on('number', handler2)
      
      emitter.removeAllListeners()
      
      emitter.emit('test', 'test')
      emitter.emit('number', 42)
      
      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })

    it('应该处理不存在的事件', () => {
      // 发送不存在的事件不应该抛出错误
      expect(() => {
        emitter.emit('test', 'test')
      }).not.toThrow()
    })

    it('应该处理多次取消同一个监听器', () => {
      const handler = vi.fn()
      emitter.on('test', handler)
      
      // 多次取消应该不会出错
      emitter.off('test', handler)
      emitter.off('test', handler)
      emitter.off('test', handler)
      
      emitter.emit('test', 'test')
      expect(handler).not.toHaveBeenCalled()
    })

    it('应该支持异步事件处理器', async () => {
      let asyncResult = ''
      const asyncHandler = async (data: string) => {
        await new Promise(resolve => setTimeout(resolve, 10))
        asyncResult = `processed: ${data}`
      }
      
      emitter.on('test', asyncHandler)
      emitter.emit('test', 'async test')
      
      // 事件应该立即发送，不等待异步处理
      expect(asyncResult).toBe('')
      
      // 等待异步处理完成
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(asyncResult).toBe('processed: async test')
    })
  })

  describe('createEventEmitter 函数', () => {
    it('应该创建事件发射器实例', () => {
      const emitter = createEventEmitter<{ test: string }>()
      expect(emitter).toBeInstanceOf(EventEmitter)
    })

    it('应该支持类型推断', () => {
      const emitter = createEventEmitter<{ message: string; count: number }>()
      
      const messageHandler = vi.fn()
      const countHandler = vi.fn()
      
      emitter.on('message', messageHandler)
      emitter.on('count', countHandler)
      
      emitter.emit('message', 'hello')
      emitter.emit('count', 42)
      
      expect(messageHandler).toHaveBeenCalledWith('hello')
      expect(countHandler).toHaveBeenCalledWith(42)
    })

    it('应该创建独立的实例', () => {
      const emitter1 = createEventEmitter<{ test: string }>()
      const emitter2 = createEventEmitter<{ test: string }>()
      
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      
      emitter1.on('test', handler1)
      emitter2.on('test', handler2)
      
      emitter1.emit('test', 'emitter1')
      
      expect(handler1).toHaveBeenCalledWith('emitter1')
      expect(handler2).not.toHaveBeenCalled()
    })
  })
})
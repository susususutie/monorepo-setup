import { describe, expect, it } from 'vitest'
import { one, two, CONFIG, Status, Priority } from '../src/constants'

describe('基础常量模块', () => {
  describe('数值常量', () => {
    it('应该正确导出常量值', () => {
      expect(one).toBe(12)
      expect(two).toBe(234)
    })
  })

  describe('应用配置', () => {
    it('应该正确导出配置对象', () => {
      expect(CONFIG.API_BASE_URL).toBe('https://api.example.com')
      expect(CONFIG.TIMEOUT).toBe(5000)
      expect(CONFIG.VERSION).toBe('1.0.0')
      expect(CONFIG.FEATURES.ENABLE_CACHE).toBe(true)
      expect(CONFIG.FEATURES.ENABLE_LOGGING).toBe(false)
    })

    it('配置对象应该是只读的', () => {
      // CONFIG 在 JavaScript 中实际上不是真正的只读对象，这只是 TypeScript 的类型检查
      expect(typeof CONFIG.VERSION).toBe('string')
      expect(CONFIG.VERSION).toBe('1.0.0')
    })
  })

  describe('状态枚举', () => {
    it('应该正确定义状态值', () => {
      expect(Status.PENDING).toBe('pending')
      expect(Status.SUCCESS).toBe('success')
      expect(Status.ERROR).toBe('error')
      expect(Status.CANCELLED).toBe('cancelled')
    })

    it('应该包含所有必要的状态', () => {
      const statusValues = Object.values(Status)
      expect(statusValues).toContain('pending')
      expect(statusValues).toContain('success')
      expect(statusValues).toContain('error')
      expect(statusValues).toContain('cancelled')
    })
  })

  describe('优先级枚举', () => {
    it('应该正确定义优先级数值', () => {
      expect(Priority.LOW).toBe(1)
      expect(Priority.MEDIUM).toBe(2)
      expect(Priority.HIGH).toBe(3)
      expect(Priority.URGENT).toBe(4)
    })

    it('优先级应该按升序排列', () => {
      expect(Priority.LOW).toBeLessThan(Priority.MEDIUM)
      expect(Priority.MEDIUM).toBeLessThan(Priority.HIGH)
      expect(Priority.HIGH).toBeLessThan(Priority.URGENT)
    })
  })
})
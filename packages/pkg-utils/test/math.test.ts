import { describe, expect, it } from 'vitest'
import { clamp, randomBetween, round, percentage, average } from '../src/math'

describe('数学工具模块', () => {
  describe('clamp 函数', () => {
    it('应该限制数值在指定范围内', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('应该处理边界值', () => {
      expect(clamp(0, 0, 10)).toBe(0)
      expect(clamp(10, 0, 10)).toBe(10)
    })

    it('应该处理负数范围', () => {
      expect(clamp(-15, -10, -5)).toBe(-10)
      expect(clamp(-3, -10, -5)).toBe(-5)
      expect(clamp(-7, -10, -5)).toBe(-7)
    })

    it('应该处理浮点数', () => {
      expect(clamp(2.5, 1.0, 3.0)).toBe(2.5)
      expect(clamp(0.5, 1.0, 3.0)).toBe(1.0)
      expect(clamp(3.5, 1.0, 3.0)).toBe(3.0)
    })
  })

  describe('randomBetween 函数', () => {
    it('应该生成指定范围内的随机整数', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomBetween(1, 10)
        expect(result).toBeGreaterThanOrEqual(1)
        expect(result).toBeLessThanOrEqual(10)
        expect(Number.isInteger(result)).toBe(true)
      }
    })

    it('应该处理相同最小值和最大值', () => {
      expect(randomBetween(5, 5)).toBe(5)
    })

    it('应该处理负数范围', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomBetween(-10, -5)
        expect(result).toBeGreaterThanOrEqual(-10)
        expect(result).toBeLessThanOrEqual(-5)
        expect(Number.isInteger(result)).toBe(true)
      }
    })

    it('应该处理大范围', () => {
      const result = randomBetween(1, 1000000)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(1000000)
      expect(Number.isInteger(result)).toBe(true)
    })
  })

  describe('round 函数', () => {
    it('应该正确四舍五入到指定小数位', () => {
      expect(round(3.14159, 2)).toBe(3.14)
      expect(round(3.14159, 3)).toBe(3.142)
      expect(round(3.14159, 4)).toBe(3.1416)
    })

    it('应该使用默认小数位数', () => {
      expect(round(3.14159)).toBe(3.14)
    })

    it('应该处理整数', () => {
      expect(round(5, 2)).toBe(5)
      expect(round(10)).toBe(10)
    })

    it('应该处理负数', () => {
      expect(round(-3.14159, 2)).toBe(-3.14)
      expect(round(-3.16159, 2)).toBe(-3.16)
    })

    it('应该处理零小数位', () => {
      expect(round(3.14159, 0)).toBe(3)
      expect(round(3.84159, 0)).toBe(4)
    })
  })

  describe('percentage 函数', () => {
    it('应该正确计算百分比', () => {
      expect(percentage(25, 100)).toBe(25)
      expect(percentage(1, 3)).toBe(33.33)
      expect(percentage(2, 3)).toBe(66.67)
    })

    it('应该处理零值', () => {
      expect(percentage(0, 100)).toBe(0)
      expect(percentage(50, 0)).toBe(0)
    })

    it('应该处理完整百分比', () => {
      expect(percentage(100, 100)).toBe(100)
    })

    it('应该处理超过100%的情况', () => {
      expect(percentage(150, 100)).toBe(150)
    })

    it('应该处理小数', () => {
      expect(percentage(0.5, 2)).toBe(25)
      expect(percentage(1.5, 3)).toBe(50)
    })
  })

  describe('average 函数', () => {
    it('应该正确计算平均值', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3)
      expect(average([10, 20, 30])).toBe(20)
      expect(average([1, 3])).toBe(2)
    })

    it('应该处理空数组', () => {
      expect(average([])).toBe(0)
    })

    it('应该处理单个元素', () => {
      expect(average([42])).toBe(42)
    })

    it('应该处理负数', () => {
      expect(average([-1, -2, -3])).toBe(-2)
      expect(average([-5, 5])).toBe(0)
    })

    it('应该处理浮点数', () => {
      expect(average([1.5, 2.5, 3.5])).toBe(2.5)
      expect(average([1.1, 1.2, 1.3])).toBe(1.2)
    })

    it('应该四舍五入到两位小数', () => {
      expect(average([1, 2, 2])).toBe(1.67)
      expect(average([1, 1, 2])).toBe(1.33)
    })
  })
})
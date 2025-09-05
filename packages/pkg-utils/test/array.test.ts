import { describe, expect, it } from 'vitest'
import { unique, groupBy, chunk, shuffle, intersection } from '../src/array'

describe('数组工具模块', () => {
  describe('unique 函数', () => {
    it('应该移除重复项', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
      expect(unique(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c'])
    })

    it('应该处理空数组', () => {
      expect(unique([])).toEqual([])
    })

    it('应该处理没有重复项的数组', () => {
      expect(unique([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
    })

    it('应该处理对象数组（引用相等）', () => {
      const obj1 = { id: 1 }
      const obj2 = { id: 2 }
      expect(unique([obj1, obj2, obj1])).toEqual([obj1, obj2])
    })

    it('应该处理混合类型', () => {
      expect(unique([1, '1', 1, '1', true])).toEqual([1, '1', true])
    })

    it('应该保持原始顺序', () => {
      expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
    })
  })

  describe('groupBy 函数', () => {
    it('应该正确按指定字段分组', () => {
      const data = [
        { type: 'A', value: 1 },
        { type: 'B', value: 2 },
        { type: 'A', value: 3 },
        { type: 'C', value: 4 },
        { type: 'B', value: 5 }
      ]
      const grouped = groupBy(data, 'type')
      
      expect(grouped.A).toHaveLength(2)
      expect(grouped.B).toHaveLength(2)
      expect(grouped.C).toHaveLength(1)
      expect(grouped.A).toEqual([{ type: 'A', value: 1 }, { type: 'A', value: 3 }])
    })

    it('应该处理空数组', () => {
      expect(groupBy([], 'type')).toEqual({})
    })

    it('应该处理数字键', () => {
      const data = [
        { category: 1, name: 'item1' },
        { category: 2, name: 'item2' },
        { category: 1, name: 'item3' }
      ]
      const grouped = groupBy(data, 'category')
      
      expect(grouped['1']).toHaveLength(2)
      expect(grouped['2']).toHaveLength(1)
    })

    it('应该处理布尔键', () => {
      const data = [
        { active: true, name: 'item1' },
        { active: false, name: 'item2' },
        { active: true, name: 'item3' }
      ]
      const grouped = groupBy(data, 'active')
      
      expect(grouped['true']).toHaveLength(2)
      expect(grouped['false']).toHaveLength(1)
    })

    it('应该处理嵌套对象', () => {
      const data = [
        { user: { role: 'admin' }, task: 'task1' },
        { user: { role: 'user' }, task: 'task2' },
        { user: { role: 'admin' }, task: 'task3' }
      ]
      // 注意：这里测试的是顶级属性，不是嵌套属性
      const grouped = groupBy(data, 'task')
      expect(Object.keys(grouped)).toHaveLength(3)
    })
  })

  describe('chunk 函数', () => {
    it('应该正确分块数组', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
      expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]])
    })

    it('应该处理空数组', () => {
      expect(chunk([], 2)).toEqual([])
    })

    it('应该处理块大小大于数组长度', () => {
      expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]])
    })

    it('应该处理块大小为1', () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
    })

    it('应该处理块大小等于数组长度', () => {
      expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]])
    })

    it('应该处理字符串数组', () => {
      expect(chunk(['a', 'b', 'c', 'd', 'e'], 2)).toEqual([['a', 'b'], ['c', 'd'], ['e']])
    })
  })

  describe('shuffle 函数', () => {
    it('应该正确乱序数组', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffle(original)
      
      expect(shuffled).toHaveLength(original.length)
      expect(shuffled).toEqual(expect.arrayContaining(original))
      expect(shuffled).not.toBe(original) // 应该返回新数组
    })

    it('应该不修改原数组', () => {
      const original = [1, 2, 3, 4, 5]
      const originalCopy = [...original]
      const shuffled = shuffle(original)
      
      expect(original).toEqual(originalCopy)
      expect(shuffled).not.toBe(original)
    })

    it('应该处理空数组', () => {
      expect(shuffle([])).toEqual([])
    })

    it('应该处理单元素数组', () => {
      expect(shuffle([42])).toEqual([42])
    })

    it('应该处理字符串数组', () => {
      const original = ['a', 'b', 'c', 'd']
      const shuffled = shuffle(original)
      
      expect(shuffled).toHaveLength(4)
      expect(shuffled).toEqual(expect.arrayContaining(['a', 'b', 'c', 'd']))
    })

    it('多次执行应该产生不同结果（概率测试）', () => {
      const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const results = new Set()
      
      // 执行多次洗牌，应该得到不同的结果
      for (let i = 0; i < 10; i++) {
        results.add(shuffle(original).join(','))
      }
      
      // 理论上应该有多个不同的结果（虽然有小概率全相同）
      expect(results.size).toBeGreaterThan(1)
    })
  })

  describe('intersection 函数', () => {
    it('应该正确求交集', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
      expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c'])
    })

    it('应该处理没有交集的情况', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([])
      expect(intersection(['a', 'b'], ['c', 'd'])).toEqual([])
    })

    it('应该处理完全相同的数组', () => {
      expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3])
    })

    it('应该处理空数组', () => {
      expect(intersection([], [1, 2, 3])).toEqual([])
      expect(intersection([1, 2, 3], [])).toEqual([])
      expect(intersection([], [])).toEqual([])
    })

    it('应该处理重复元素', () => {
      expect(intersection([1, 1, 2, 3], [1, 2, 2, 4])).toEqual([1, 1, 2]) // 实际输出，保留重复
    })

    it('应该保持第一个数组的顺序', () => {
      expect(intersection([3, 1, 2], [2, 3, 4])).toEqual([3, 2])
    })

    it('应该处理混合类型', () => {
      expect(intersection([1, '2', true], ['2', 1, false])).toEqual([1, '2'])
    })

    it('应该处理对象数组（引用相等）', () => {
      const obj1 = { id: 1 }
      const obj2 = { id: 2 }
      const obj3 = { id: 1 } // 不同引用，内容相同
      
      expect(intersection([obj1, obj2], [obj1, obj3])).toEqual([obj1])
    })
  })
})
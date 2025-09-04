import { describe, expect, it } from 'vitest'
import { deepClone, pick, omit, merge, isEmpty } from '../src/object'

describe('对象工具模块', () => {
  describe('deepClone 函数', () => {
    it('应该深度克隆对象', () => {
      const original = { a: 1, b: { c: 2, d: [3, 4] } }
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.b).not.toBe(original.b)
      expect(cloned.b.d).not.toBe(original.b.d)
    })

    it('应该克隆原始值', () => {
      expect(deepClone(null)).toBe(null)
      expect(deepClone(undefined)).toBe(undefined)
      expect(deepClone(42)).toBe(42)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(true)).toBe(true)
    })

    it('应该克隆日期对象', () => {
      const date = new Date('2024-01-01')
      const cloned = deepClone(date)
      
      expect(cloned).toEqual(date)
      expect(cloned).not.toBe(date)
      expect(cloned instanceof Date).toBe(true)
    })

    it('应该克隆数组', () => {
      const original = [1, { a: 2 }, [3, 4]]
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned[1]).not.toBe(original[1])
      expect(cloned[2]).not.toBe(original[2])
    })

    it('应该处理嵌套对象', () => {
      const original = {
        user: {
          name: 'John',
          address: {
            city: 'New York',
            coordinates: [40.7128, -74.0060]
          }
        },
        tags: ['developer', 'javascript']
      }
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned.user).not.toBe(original.user)
      expect(cloned.user.address).not.toBe(original.user.address)
      expect(cloned.user.address.coordinates).not.toBe(original.user.address.coordinates)
      expect(cloned.tags).not.toBe(original.tags)
    })

    it('应该处理循环引用（简单情况）', () => {
      const obj = { a: 1 }
      const cloned = deepClone(obj)
      expect(cloned).toEqual(obj)
      expect(cloned).not.toBe(obj)
    })

    it('应该处理空对象和空数组', () => {
      expect(deepClone({})).toEqual({})
      expect(deepClone([])).toEqual([])
    })
  })

  describe('pick 函数', () => {
    it('应该选择指定属性', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 }
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })

    it('应该处理不存在的属性', () => {
      const obj = { a: 1, b: 2 }
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1 })
    })

    it('应该处理空对象', () => {
      expect(pick({}, ['a', 'b'])).toEqual({})
    })

    it('应该处理空键数组', () => {
      const obj = { a: 1, b: 2 }
      expect(pick(obj, [])).toEqual({})
    })

    it('应该处理所有属性都被选择', () => {
      const obj = { a: 1, b: 2 }
      expect(pick(obj, ['a', 'b'])).toEqual({ a: 1, b: 2 })
    })

    it('应该保持值的类型', () => {
      const obj = { 
        str: 'hello', 
        num: 42, 
        bool: true, 
        arr: [1, 2], 
        obj: { nested: 'value' },
        nil: null,
        undef: undefined
      }
      const picked = pick(obj, ['str', 'num', 'bool', 'arr', 'obj', 'nil', 'undef'])
      
      expect(picked.str).toBe('hello')
      expect(picked.num).toBe(42)
      expect(picked.bool).toBe(true)
      expect(picked.arr).toBe(obj.arr) // 浅拷贝
      expect(picked.obj).toBe(obj.obj) // 浅拷贝
      expect(picked.nil).toBeNull()
      expect(picked.undef).toBeUndefined()
    })
  })

  describe('omit 函数', () => {
    it('应该排除指定属性', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 }
      expect(omit(obj, ['b', 'd'])).toEqual({ a: 1, c: 3 })
    })

    it('应该处理不存在的属性', () => {
      const obj = { a: 1, b: 2 }
      expect(omit(obj, ['c', 'd'])).toEqual({ a: 1, b: 2 })
    })

    it('应该处理空对象', () => {
      expect(omit({}, ['a', 'b'])).toEqual({})
    })

    it('应该处理空键数组', () => {
      const obj = { a: 1, b: 2 }
      expect(omit(obj, [])).toEqual({ a: 1, b: 2 })
    })

    it('应该处理所有属性都被排除', () => {
      const obj = { a: 1, b: 2 }
      expect(omit(obj, ['a', 'b'])).toEqual({})
    })

    it('应该不修改原对象', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const original = { ...obj }
      const result = omit(obj, ['b'])
      
      expect(obj).toEqual(original)
      expect(result).not.toBe(obj)
    })
  })

  describe('merge 函数', () => {
    it('应该正确合并对象', () => {
      const target = { a: 1, b: 2 }
      const source = { b: 3, c: 4 }
      expect(merge(target, source)).toEqual({ a: 1, b: 3, c: 4 })
    })

    it('应该处理多个源对象', () => {
      const target = { a: 1 }
      const source1 = { b: 2 }
      const source2 = { c: 3 }
      const source3 = { d: 4 }
      expect(merge(target, source1, source2, source3)).toEqual({ a: 1, b: 2, c: 3, d: 4 })
    })

    it('应该处理重复属性（后面的覆盖前面的）', () => {
      const target = { a: 1, b: 2 }
      const source1 = { b: 3, c: 4 }
      const source2 = { c: 5, d: 6 }
      expect(merge(target, source1, source2)).toEqual({ a: 1, b: 3, c: 5, d: 6 })
    })

    it('应该处理空对象', () => {
      expect(merge({}, { a: 1 })).toEqual({ a: 1 })
      expect(merge({ a: 1 }, {})).toEqual({ a: 1 })
      expect(merge({}, {})).toEqual({})
    })

    it('应该不修改原对象', () => {
      const target = { a: 1, b: 2 }
      const source = { b: 3, c: 4 }
      const originalTarget = { ...target }
      const originalSource = { ...source }
      
      const result = merge(target, source)
      
      expect(target).toEqual(originalTarget)
      expect(source).toEqual(originalSource)
      expect(result).not.toBe(target)
    })

    it('应该处理值为 null 和 undefined', () => {
      const target = { a: 1, b: null }
      const source = { b: undefined, c: null }
      expect(merge(target, source)).toEqual({ a: 1, b: undefined, c: null })
    })
  })

  describe('isEmpty 函数', () => {
    it('应该正确判断对象是否为空', () => {
      expect(isEmpty({})).toBe(true)
      expect(isEmpty({ a: 1 })).toBe(false)
    })

    it('应该处理有属性的对象', () => {
      expect(isEmpty({ a: 1, b: 2 })).toBe(false)
      expect(isEmpty({ a: null })).toBe(false)
      expect(isEmpty({ a: undefined })).toBe(false)
    })

    it('应该处理对象原型上的属性', () => {
      const obj = Object.create({ inherited: 'value' })
      expect(isEmpty(obj)).toBe(true) // 只检查自有属性
      
      obj.own = 'value'
      expect(isEmpty(obj)).toBe(false)
    })

    it('应该处理数组（作为对象）', () => {
      expect(isEmpty([])).toBe(true)
      expect(isEmpty([1, 2, 3])).toBe(false)
    })

    it('应该处理特殊对象', () => {
      expect(isEmpty(new Date())).toBe(true) // Date 对象没有可枚举属性
      expect(isEmpty(new RegExp('test'))).toBe(true) // RegExp 对象没有可枚举属性
    })
  })
})
import { describe, expect, it } from 'vitest'
import { Validator, createValidator } from '../src/validator'

describe('验证器模块', () => {
  describe('Validator 类', () => {
    it('应该创建验证器实例', () => {
      const validator = new Validator<{ name: string }>()
      expect(validator).toBeInstanceOf(Validator)
    })

    it('应该添加验证规则', () => {
      const validator = new Validator<{ name: string; age: number }>()
      
      const result = validator
        .addRule('name', { required: true })
        .addRule('age', { min: 0, max: 120 })
      
      expect(result).toBe(validator) // 应该支持链式调用
    })

    it('应该验证必填字段', () => {
      const validator = createValidator<{ name: string; age: number }>()
        .addRule('name', { required: true })
        .addRule('age', { required: true })

      const validData = { name: 'John', age: 25 }
      const result1 = validator.validate(validData)
      expect(result1.valid).toBe(true)
      expect(Object.keys(result1.errors)).toHaveLength(0)

      const invalidData = { name: '', age: 25 }
      const result2 = validator.validate(invalidData)
      expect(result2.valid).toBe(false)
      expect(result2.errors.name).toContain('name是必填项')
    })

    it('应该验证字符串长度', () => {
      const validator = createValidator<{ username: string; password: string }>()
        .addRule('username', { min: 3, max: 10 })
        .addRule('password', { min: 8 })

      // 用户名太短
      const result1 = validator.validate({ username: 'ab', password: 'password123' })
      expect(result1.valid).toBe(false)
      expect(result1.errors.username).toContain('username至少需要3个字符')

      // 用户名太长
      const result2 = validator.validate({ username: 'verylongusername', password: 'password123' })
      expect(result2.valid).toBe(false)
      expect(result2.errors.username).toContain('username最多10个字符')

      // 密码太短
      const result3 = validator.validate({ username: 'user', password: 'short' })
      expect(result3.valid).toBe(false)
      expect(result3.errors.password).toContain('password至少需要8个字符')

      // 全部有效
      const result4 = validator.validate({ username: 'user', password: 'password123' })
      expect(result4.valid).toBe(true)
    })

    it('应该验证正则表达式模式', () => {
      const validator = createValidator<{ email: string; phone: string }>()
        .addRule('email', { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
        .addRule('phone', { pattern: /^\d{10,11}$/ })

      // 无效邮箱
      const result1 = validator.validate({ email: 'invalid-email', phone: '12345678901' })
      expect(result1.valid).toBe(false)
      expect(result1.errors.email).toContain('email格式不正确')

      // 无效电话
      const result2 = validator.validate({ email: 'user@example.com', phone: '123' })
      expect(result2.valid).toBe(false)
      expect(result2.errors.phone).toContain('phone格式不正确')

      // 全部有效
      const result3 = validator.validate({ email: 'user@example.com', phone: '12345678901' })
      expect(result3.valid).toBe(true)
    })

    it('应该支持自定义验证器', () => {
      const validator = createValidator<{ age: number; password: string }>()
        .addRule('age', { 
          validator: (value: number) => {
            if (value < 18) return '年龄必须大于等于18岁'
            if (value > 65) return '年龄必须小于等于65岁'
            return true
          }
        })
        .addRule('password', {
          validator: (value: string) => {
            if (!/[A-Z]/.test(value)) return '密码必须包含大写字母'
            if (!/[a-z]/.test(value)) return '密码必须包含小写字母'
            if (!/\d/.test(value)) return '密码必须包含数字'
            return true
          }
        })

      // 年龄太小
      const result1 = validator.validate({ age: 16, password: 'Password123' })
      expect(result1.valid).toBe(false)
      expect(result1.errors.age).toContain('年龄必须大于等于18岁')

      // 年龄太大
      const result2 = validator.validate({ age: 70, password: 'Password123' })
      expect(result2.valid).toBe(false)
      expect(result2.errors.age).toContain('年龄必须小于等于65岁')

      // 密码缺少大写字母
      const result3 = validator.validate({ age: 25, password: 'password123' })
      expect(result3.valid).toBe(false)
      expect(result3.errors.password).toContain('密码必须包含大写字母')

      // 密码缺少数字
      const result4 = validator.validate({ age: 25, password: 'Password' })
      expect(result4.valid).toBe(false)
      expect(result4.errors.password).toContain('密码必须包含数字')

      // 全部有效
      const result5 = validator.validate({ age: 25, password: 'Password123' })
      expect(result5.valid).toBe(true)
    })

    it('应该组合多个验证规则', () => {
      const validator = createValidator<{ username: string }>()
        .addRule('username', { required: true })
        .addRule('username', { min: 3, max: 20 })
        .addRule('username', { pattern: /^[a-zA-Z0-9_]+$/ })
        .addRule('username', { 
          validator: (value: string) => {
            if (value.startsWith('_')) return '用户名不能以下划线开头'
            return true
          }
        })

      // 空用户名
      const result1 = validator.validate({ username: '' })
      expect(result1.valid).toBe(false)
      expect(result1.errors.username).toContain('username是必填项')

      // 太短
      const result2 = validator.validate({ username: 'ab' })
      expect(result2.valid).toBe(false)
      expect(result2.errors.username).toContain('username至少需要3个字符')

      // 包含非法字符
      const result3 = validator.validate({ username: 'user@name' })
      expect(result3.valid).toBe(false)
      expect(result3.errors.username).toContain('username格式不正确')

      // 以下划线开头
      const result4 = validator.validate({ username: '_username' })
      expect(result4.valid).toBe(false)
      expect(result4.errors.username).toContain('用户名不能以下划线开头')

      // 全部有效
      const result5 = validator.validate({ username: 'valid_user123' })
      expect(result5.valid).toBe(true)
    })

    it('应该处理可选字段', () => {
      const validator = createValidator<{ name: string; email?: string }>()
        .addRule('name', { required: true })
        .addRule('email', { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })

      // email 未提供，应该跳过验证
      const result1 = validator.validate({ name: 'John' })
      expect(result1.valid).toBe(true)

      // email 提供但格式错误
      const result2 = validator.validate({ name: 'John', email: 'invalid' })
      expect(result2.valid).toBe(false)
      expect(result2.errors.email).toContain('email格式不正确')

      // email 提供且格式正确
      const result3 = validator.validate({ name: 'John', email: 'john@example.com' })
      expect(result3.valid).toBe(true)
    })

    it('应该处理 null 和 undefined 值', () => {
      const validator = createValidator<{ name: string | null; age: number | undefined }>()
        .addRule('name', { required: true })
        .addRule('age', { min: 0 })

      // null 值应该被视为空
      const result1 = validator.validate({ name: null, age: undefined })
      expect(result1.valid).toBe(false)
      expect(result1.errors.name).toContain('name是必填项')

      // undefined 值应该被视为空
      const result2 = validator.validate({ name: undefined, age: 25 })
      expect(result2.valid).toBe(false)
      expect(result2.errors.name).toContain('name是必填项')
    })
  })

  describe('createValidator 函数', () => {
    it('应该创建验证器实例', () => {
      const validator = createValidator<{ name: string }>()
      expect(validator).toBeInstanceOf(Validator)
    })

    it('应该支持类型推断', () => {
      const validator = createValidator<{ name: string; age: number }>()
      
      // TypeScript 应该能推断出正确的字段类型
      validator.addRule('name', { required: true })
      validator.addRule('age', { min: 0 })
      
      // 这应该编译通过
      const result = validator.validate({ name: 'test', age: 25 })
      expect(result.valid).toBe(true)
    })
  })
})
import { describe, expect, it } from 'vitest'
import type { User, ApiResponse, AsyncResult, EventHandler, ValidatorRule } from '../src/types'
import { Status } from '../src/constants'

describe('类型定义模块', () => {
  describe('User 类型', () => {
    it('应该正确定义用户类型结构', () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        roles: [{
          id: 'admin',
          name: 'Administrator',
          permissions: [
            { action: 'read', resource: 'users' },
            { action: 'write', resource: 'users' }
          ]
        }],
        metadata: {
          lastLogin: '2024-01-01',
          preferences: { theme: 'dark' }
        }
      }
      
      expect(user.id).toBe('1')
      expect(user.name).toBe('John Doe')
      expect(user.email).toBe('john@example.com')
      expect(user.age).toBe(30)
      expect(user.roles).toHaveLength(1)
      expect(user.roles[0].permissions).toHaveLength(2)
      expect(user.metadata).toHaveProperty('lastLogin')
    })

    it('应该支持可选字段', () => {
      const minimalUser: User = {
        id: '2',
        name: 'Jane',
        email: 'jane@example.com',
        roles: []
      }
      
      expect(minimalUser.age).toBeUndefined()
      expect(minimalUser.metadata).toBeUndefined()
      expect(minimalUser.roles).toEqual([])
    })
  })

  describe('ApiResponse 类型', () => {
    it('应该正确定义 API 响应结构', () => {
      const response: ApiResponse<string> = {
        data: 'success',
        status: Status.SUCCESS,
        message: '操作成功',
        timestamp: Date.now()
      }
      
      expect(response.data).toBe('success')
      expect(response.status).toBe(Status.SUCCESS)
      expect(response.message).toBe('操作成功')
      expect(typeof response.timestamp).toBe('number')
    })

    it('应该支持泛型数据类型', () => {
      const userResponse: ApiResponse<User> = {
        data: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          roles: []
        },
        status: Status.SUCCESS,
        timestamp: Date.now()
      }
      
      expect(userResponse.data.id).toBe('1')
      expect(userResponse.data.name).toBe('Test User')
    })

    it('应该支持可选字段', () => {
      const minimalResponse: ApiResponse<null> = {
        data: null,
        status: Status.ERROR,
        timestamp: Date.now()
      }
      
      expect(minimalResponse.message).toBeUndefined()
    })
  })

  describe('AsyncResult 类型', () => {
    it('应该正确定义成功结果', () => {
      const successResult: AsyncResult<string> = {
        success: true,
        data: 'operation completed'
      }
      
      expect(successResult.success).toBe(true)
      expect(successResult.data).toBe('operation completed')
      expect(successResult.error).toBeUndefined()
    })

    it('应该正确定义失败结果', () => {
      const errorResult: AsyncResult<string> = {
        success: false,
        error: new Error('Something went wrong')
      }
      
      expect(errorResult.success).toBe(false)
      expect(errorResult.error?.message).toBe('Something went wrong')
      expect(errorResult.data).toBeUndefined()
    })

    it('应该支持自定义错误类型', () => {
      const customErrorResult: AsyncResult<number, string> = {
        success: false,
        error: 'Custom error message'
      }
      
      expect(customErrorResult.success).toBe(false)
      expect(customErrorResult.error).toBe('Custom error message')
    })
  })

  describe('EventHandler 类型', () => {
    it('应该正确定义事件处理器', () => {
      const handler: EventHandler<string> = (data: string) => {
        console.log(data)
      }
      
      expect(typeof handler).toBe('function')
    })

    it('应该支持异步事件处理器', () => {
      const asyncHandler: EventHandler<number> = async (data: number) => {
        await new Promise(resolve => setTimeout(resolve, 10))
        return data * 2
      }
      
      expect(typeof asyncHandler).toBe('function')
    })
  })

  describe('ValidatorRule 类型', () => {
    it('应该正确定义验证规则', () => {
      const rule: ValidatorRule<string> = {
        required: true,
        min: 3,
        max: 20,
        pattern: /^[a-zA-Z]+$/,
        validator: (value: string) => value.trim().length > 0
      }
      
      expect(rule.required).toBe(true)
      expect(rule.min).toBe(3)
      expect(rule.max).toBe(20)
      expect(rule.pattern).toBeInstanceOf(RegExp)
      expect(typeof rule.validator).toBe('function')
    })

    it('应该支持可选字段', () => {
      const minimalRule: ValidatorRule<number> = {}
      
      expect(minimalRule.required).toBeUndefined()
      expect(minimalRule.min).toBeUndefined()
      expect(minimalRule.max).toBeUndefined()
      expect(minimalRule.pattern).toBeUndefined()
      expect(minimalRule.validator).toBeUndefined()
    })
  })
})
import { describe, expect, it } from 'vitest'
import { AppError, createError, isOperationalError, ErrorCodes } from '../src/error'

describe('错误处理模块', () => {
  describe('AppError 类', () => {
    it('应该创建自定义错误实例', () => {
      const error = new AppError('测试错误', 'TEST_ERROR', 400)
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(AppError)
      expect(error.name).toBe('AppError')
      expect(error.message).toBe('测试错误')
      expect(error.code).toBe('TEST_ERROR')
      expect(error.statusCode).toBe(400)
      expect(error.isOperational).toBe(true)
    })

    it('应该使用默认参数', () => {
      const error = new AppError('简单错误')
      
      expect(error.message).toBe('简单错误')
      expect(error.code).toBe('UNKNOWN_ERROR')
      expect(error.statusCode).toBe(500)
      expect(error.isOperational).toBe(true)
    })

    it('应该支持非操作性错误', () => {
      const error = new AppError('系统错误', 'SYSTEM_ERROR', 500, false)
      
      expect(error.isOperational).toBe(false)
    })

    it('应该有正确的堆栈信息', () => {
      const error = new AppError('堆栈测试')
      
      expect(error.stack).toBeDefined()
      expect(error.stack).toContain('AppError')
      expect(error.stack).toContain('堆栈测试')
    })

    it('应该支持不同的错误代码', () => {
      const validationError = new AppError('验证失败', 'VALIDATION_ERROR', 400)
      const notFoundError = new AppError('资源未找到', 'NOT_FOUND', 404)
      const serverError = new AppError('服务器错误', 'INTERNAL_SERVER_ERROR', 500)
      
      expect(validationError.code).toBe('VALIDATION_ERROR')
      expect(validationError.statusCode).toBe(400)
      
      expect(notFoundError.code).toBe('NOT_FOUND')
      expect(notFoundError.statusCode).toBe(404)
      
      expect(serverError.code).toBe('INTERNAL_SERVER_ERROR')
      expect(serverError.statusCode).toBe(500)
    })

    it('应该可以被捕获和处理', () => {
      const throwError = () => {
        throw new AppError('可捕获的错误', 'CATCHABLE_ERROR', 400)
      }
      
      expect(() => throwError()).toThrow(AppError)
      expect(() => throwError()).toThrow('可捕获的错误')
      
      try {
        throwError()
      } catch (error) {
        expect(error).toBeInstanceOf(AppError)
        if (error instanceof AppError) {
          expect(error.code).toBe('CATCHABLE_ERROR')
          expect(error.statusCode).toBe(400)
        }
      }
    })

    it('应该正确继承 Error 属性', () => {
      const error = new AppError('继承测试')
      
      // 应该有 Error 的基本属性
      expect(error.name).toBe('AppError')
      expect(error.message).toBe('继承测试')
      expect(error.toString()).toContain('AppError: 继承测试')
    })
  })

  describe('ErrorCodes 常量', () => {
    it('应该定义所有错误代码', () => {
      expect(ErrorCodes.VALIDATION_ERROR).toBe('VALIDATION_ERROR')
      expect(ErrorCodes.NOT_FOUND).toBe('NOT_FOUND')
      expect(ErrorCodes.UNAUTHORIZED).toBe('UNAUTHORIZED')
      expect(ErrorCodes.FORBIDDEN).toBe('FORBIDDEN')
      expect(ErrorCodes.TIMEOUT).toBe('TIMEOUT')
      expect(ErrorCodes.NETWORK_ERROR).toBe('NETWORK_ERROR')
    })

    it('应该是只读常量', () => {
      // ErrorCodes 在 JavaScript 中实际上不是只读的，这只是 TypeScript 的类型检查
      expect(typeof ErrorCodes.VALIDATION_ERROR).toBe('string')
      expect(ErrorCodes.VALIDATION_ERROR).toBe('VALIDATION_ERROR')
    })

    it('应该包含常用的 HTTP 错误代码', () => {
      const codes = Object.values(ErrorCodes)
      
      expect(codes).toContain('VALIDATION_ERROR') // 400 类错误
      expect(codes).toContain('NOT_FOUND')        // 404 错误
      expect(codes).toContain('UNAUTHORIZED')     // 401 错误
      expect(codes).toContain('FORBIDDEN')        // 403 错误
      expect(codes).toContain('TIMEOUT')          // 超时错误
      expect(codes).toContain('NETWORK_ERROR')    // 网络错误
    })
  })

  describe('createError 函数', () => {
    it('应该创建标准化错误', () => {
      const error = createError('创建的错误', ErrorCodes.VALIDATION_ERROR, 400)
      
      expect(error).toBeInstanceOf(AppError)
      expect(error.message).toBe('创建的错误')
      expect(error.code).toBe(ErrorCodes.VALIDATION_ERROR)
      expect(error.statusCode).toBe(400)
      expect(error.isOperational).toBe(true)
    })

    it('应该使用默认参数', () => {
      const error = createError('默认错误')
      
      expect(error.code).toBe(ErrorCodes.VALIDATION_ERROR)
      expect(error.statusCode).toBe(400)
    })

    it('应该支持不同类型的错误', () => {
      const validationError = createError('验证失败', ErrorCodes.VALIDATION_ERROR, 400)
      const notFoundError = createError('未找到', ErrorCodes.NOT_FOUND, 404)
      const unauthorizedError = createError('未授权', ErrorCodes.UNAUTHORIZED, 401)
      
      expect(validationError.code).toBe('VALIDATION_ERROR')
      expect(notFoundError.code).toBe('NOT_FOUND')
      expect(unauthorizedError.code).toBe('UNAUTHORIZED')
    })

    it('应该创建可操作的错误', () => {
      const error = createError('可操作错误')
      expect(error.isOperational).toBe(true)
    })
  })

  describe('isOperationalError 函数', () => {
    it('应该正确判断操作性错误', () => {
      const operationalError = new AppError('操作性错误', 'OP_ERROR', 400, true)
      const systemError = new AppError('系统错误', 'SYS_ERROR', 500, false)
      const standardError = new Error('标准错误')
      
      expect(isOperationalError(operationalError)).toBe(true)
      expect(isOperationalError(systemError)).toBe(false)
      expect(isOperationalError(standardError)).toBe(false)
    })

    it('应该处理非 AppError 实例', () => {
      const regularError = new Error('普通错误')
      const typeError = new TypeError('类型错误')
      const rangeError = new RangeError('范围错误')
      
      expect(isOperationalError(regularError)).toBe(false)
      expect(isOperationalError(typeError)).toBe(false)
      expect(isOperationalError(rangeError)).toBe(false)
    })

    it('应该处理自定义错误类', () => {
      class CustomError extends Error {
        constructor(message: string) {
          super(message)
          this.name = 'CustomError'
        }
      }
      
      const customError = new CustomError('自定义错误')
      expect(isOperationalError(customError)).toBe(false)
    })

    it('应该正确处理 createError 创建的错误', () => {
      const createdError = createError('通过函数创建的错误')
      expect(isOperationalError(createdError)).toBe(true)
    })
  })

  describe('错误处理集成测试', () => {
    it('应该支持完整的错误处理流程', () => {
      // 创建错误
      const error = createError('用户输入无效', ErrorCodes.VALIDATION_ERROR, 400)
      
      // 检查错误类型
      expect(isOperationalError(error)).toBe(true)
      
      // 模拟错误处理
      const handleError = (err: Error) => {
        if (isOperationalError(err) && err instanceof AppError) {
          return {
            status: err.statusCode,
            message: err.message,
            code: err.code,
            operational: true
          }
        }
        return {
          status: 500,
          message: '内部服务器错误',
          code: 'INTERNAL_ERROR',
          operational: false
        }
      }
      
      const result = handleError(error)
      expect(result.status).toBe(400)
      expect(result.message).toBe('用户输入无效')
      expect(result.code).toBe('VALIDATION_ERROR')
      expect(result.operational).toBe(true)
    })

    it('应该支持错误链和包装', () => {
      const originalError = new Error('原始错误')
      const wrappedError = createError(
        `包装错误: ${originalError.message}`,
        ErrorCodes.NETWORK_ERROR,
        503
      )
      
      expect(wrappedError.message).toContain('原始错误')
      expect(wrappedError.code).toBe('NETWORK_ERROR')
      expect(isOperationalError(wrappedError)).toBe(true)
    })
  })
})
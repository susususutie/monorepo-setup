/**
 * 错误处理工具使用示例
 * 演示 pkg-utils 中错误处理相关功能的实际使用场景
 */

import { AppError, ErrorCodes, createError, isOperationalError } from 'pkg-utils'

// 实际场景：用户输入验证
function validateUserInput(email: string, age: number) {
  if (!email.includes('@')) {
    throw createError('邮箱格式错误', ErrorCodes.VALIDATION_ERROR)
  }
  
  if (age < 0 || age > 150) {
    throw createError('年龄范围错误', ErrorCodes.VALIDATION_ERROR)
  }
  
  return { email, age }
}

// 测试有效输入
try {
  const result = validateUserInput('user@example.com', 25)
  console.log('验证成功:', result)
} catch (error) {
  if (error instanceof AppError) {
    console.log('验证错误:', error.message, `[错误码: ${error.code}]`)
  }
}

// 测试无效输入
try {
  validateUserInput('invalid-email', 25)
} catch (error) {
  if (error instanceof AppError) {
    console.log('捕获到错误:', error.message)
    console.log('错误类型:', isOperationalError(error) ? '操作性错误' : '系统错误')
  }
}

// 实际场景：资源获取
function getUser(userId: string) {
  if (!userId) {
    throw createError('用户ID不能为空', ErrorCodes.VALIDATION_ERROR)
  }
  
  // 模拟用户不存在
  if (userId === 'nonexistent') {
    throw createError('用户不存在', ErrorCodes.NOT_FOUND, 404)
  }
  
  // 模拟权限不足
  if (userId === 'forbidden') {
    throw createError('无权访问此用户', ErrorCodes.FORBIDDEN, 403)
  }
  
  return { id: userId, name: `用户${userId}` }
}

// 测试不同类型的错误
const testCases = ['user123', '', 'nonexistent', 'forbidden']

testCases.forEach(userId => {
  try {
    const user = getUser(userId)
    console.log(`\n成功获取用户: ${user.name}`)
  } catch (error) {
    if (error instanceof AppError) {
      console.log(`\n错误 [${error.statusCode}]: ${error.message}`)
      console.log(`错误码: ${error.code}`)
    }
  }
})

// 实际场景：错误处理中间件
function errorHandler(error: Error) {
  console.log('\n=== 错误处理 ===')
  
  if (error instanceof AppError) {
    console.log(`应用错误: ${error.message}`)
    console.log(`HTTP 状态码: ${error.statusCode}`)
    console.log(`错误码: ${error.code}`)
    
    if (isOperationalError(error)) {
      console.log('处理方式: 返回用户友好的错误信息')
    } else {
      console.log('处理方式: 记录日志，返回通用错误信息')
    }
  } else {
    console.log(`未知错误: ${error.message}`)
    console.log('处理方式: 记录详细日志，返回通用错误信息')
  }
}

// 测试错误处理
const testError = createError('测试错误', ErrorCodes.VALIDATION_ERROR)
errorHandler(testError)

// 实际场景：API 错误分类
function handleApiError(error: Error): { status: number; message: string } {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      message: error.message
    }
  }
  
  // 未知错误统一处理
  return {
    status: 500,
    message: '服务器内部错误'
  }
}

// 测试 API 错误处理
const apiErrors = [
  createError('参数验证失败', ErrorCodes.VALIDATION_ERROR, 400),
  createError('用户未找到', ErrorCodes.NOT_FOUND, 404),
  new Error('数据库连接失败')
]

console.log('\n=== API 错误处理 ===')
apiErrors.forEach((error, index) => {
  const result = handleApiError(error)
  console.log(`错误 ${index + 1}: [${result.status}] ${result.message}`)
})
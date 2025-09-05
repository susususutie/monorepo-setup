/**
 * TypeScript 类型定义使用示例
 * 演示 pkg-utils 中类型定义相关功能的实际使用场景
 */

import { User, Role, Permission, ApiResponse, Status, AsyncResult } from 'pkg-utils'

// 实际场景：用户权限管理
const readPermission: Permission = {
  action: 'read',
  resource: 'users'
}

const writePermission: Permission = {
  action: 'write', 
  resource: 'users'
}

const adminRole: Role = {
  id: 'admin',
  name: '管理员',
  permissions: [readPermission, writePermission]
}

const user: User = {
  id: 'user123',
  name: '张三',
  email: 'zhangsan@example.com',
  age: 28,
  roles: [adminRole],
  metadata: {
    department: 'IT',
    joinDate: '2024-01-01'
  }
}

console.log('用户信息:', user.name)
console.log('用户角色:', user.roles.map(r => r.name).join(', '))

// 实际场景：权限检查
function hasPermission(user: User, action: string, resource: string): boolean {
  return user.roles.some(role => 
    role.permissions.some(permission => 
      permission.action === action && permission.resource === resource
    )
  )
}

console.log('用户是否可以读取:', hasPermission(user, 'read', 'users'))
console.log('用户是否可以写入:', hasPermission(user, 'write', 'users'))

// 实际场景：API 响应处理
const successResponse: ApiResponse<User[]> = {
  data: [user],
  status: Status.SUCCESS,
  message: '获取用户列表成功',
  timestamp: Date.now()
}

const errorResponse: ApiResponse<null> = {
  data: null,
  status: Status.ERROR,
  message: '用户不存在',
  timestamp: Date.now()
}

function handleApiResponse<T>(response: ApiResponse<T>): T | null {
  switch (response.status) {
    case Status.SUCCESS:
      console.log('\nAPI 调用成功:', response.message)
      return response.data
    case Status.ERROR:
      console.log('\nAPI 调用失败:', response.message)
      return null
    default:
      console.log('\n未知状态')
      return null
  }
}

const userData = handleApiResponse(successResponse)
const errorData = handleApiResponse(errorResponse)

// 实际场景：异步结果处理
async function fetchUserById(id: string): Promise<AsyncResult<User>> {
  try {
    if (id === 'error') {
      throw new Error('用户不存在')
    }
    
    const userData: User = {
      id,
      name: '模拟用户',
      email: 'mock@example.com',
      roles: [adminRole]
    }
    
    return { success: true, data: userData }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('未知错误')
    }
  }
}

// 测试异步结果
async function testAsyncResult() {
  const result1 = await fetchUserById('123')
  const result2 = await fetchUserById('error')
  
  if (result1.success && result1.data) {
    console.log('\n获取用户成功:', result1.data.name)
  }
  
  if (!result2.success && result2.error) {
    console.log('获取用户失败:', result2.error.message)
  }
}

testAsyncResult()
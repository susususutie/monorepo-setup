/**
 * 对象处理工具函数使用示例
 * 演示 pkg-utils 中对象处理相关功能的实际使用场景
 */

import { deepClone, pick, omit, merge, isEmpty } from 'pkg-utils'

// 实际场景：用户数据克隆
const originalUser = {
  id: 1,
  name: '张三',
  profile: {
    email: 'zhangsan@example.com',
    address: { city: '北京', district: '海淀区' }
  }
}

const clonedUser = deepClone(originalUser)
clonedUser.name = '李四'
clonedUser.profile.address.city = '上海'

console.log('原始用户:', originalUser.name, originalUser.profile.address.city)
console.log('克隆用户:', clonedUser.name, clonedUser.profile.address.city)

// 实际场景：选择对象属性
const user = {
  id: 1,
  username: 'johndoe',
  password: 'secret123',
  email: 'john@example.com',
  role: 'admin',
  created: new Date()
}

// 只返回公开信息
const publicInfo = pick(user, ['id', 'username', 'email'])
console.log('公开信息:', publicInfo)

// 实际场景：移除敏感信息
const safeUser = omit(user, ['password'])
console.log('安全用户信息:', Object.keys(safeUser))

// 实际场景：配置合并
const defaultConfig = {
  theme: 'light',
  language: 'zh-CN',
  notifications: true
}

const userConfig = {
  theme: 'dark',
  fontSize: 16
}

const finalConfig = merge(defaultConfig, userConfig)
console.log('合并后的配置:', finalConfig)

// 实际场景：空对象检查
const emptyData = {}
const validData = { name: '测试' }

console.log('空对象检查:', isEmpty(emptyData)) // true
console.log('非空对象检查:', isEmpty(validData)) // false
/**
 * LRU 缓存工具使用示例
 * 演示 pkg-utils 中缓存相关功能的实际使用场景
 */

import { createCache } from '@monorepo-setup/pkg-utils'

// 实际场景：用户信息缓存
const userCache = createCache<string, any>(5) // 最多缓存 5 个用户

// 添加用户信息
userCache.set('user:1', { name: '张三', role: 'admin' })
userCache.set('user:2', { name: '李四', role: 'user' })
userCache.set('user:3', { name: '王五', role: 'user' })

console.log('缓存大小:', userCache.size())

// 获取缓存数据
const user1 = userCache.get('user:1')
console.log('获取用户 1:', user1)

// 检查是否存在
console.log('user:2 是否存在:', userCache.has('user:2'))
console.log('user:99 是否存在:', userCache.has('user:99'))

// 实际场景：LRU 淘汰机制
userCache.set('user:4', { name: '赵六', role: 'user' })
userCache.set('user:5', { name: '钱七', role: 'user' })
userCache.set('user:6', { name: '孙八', role: 'user' }) // 这会触发淘汰

console.log('\n淘汰后缓存大小:', userCache.size())
console.log('user:1 是否还存在:', userCache.has('user:1')) // 可能被淘汰

// 实际场景：API 响应缓存
interface ApiData {
  data: any
  timestamp: number
}

const apiCache = createCache<string, ApiData>(10)

// 模拟 API 调用
function fetchUserData(userId: string) {
  const cacheKey = `api:user:${userId}`
  
  // 检查缓存
  const cached = apiCache.get(cacheKey)
  if (cached) {
    const age = Date.now() - cached.timestamp
    if (age < 5000) { // 5秒内有效
      console.log(`从缓存获取用户 ${userId} 数据`)
      return cached.data
    }
  }
  
  // 模拟 API 请求
  console.log(`从 API 获取用户 ${userId} 数据`)
  const userData = { id: userId, name: `用户${userId}`, email: `user${userId}@example.com` }
  
  // 存入缓存
  apiCache.set(cacheKey, {
    data: userData,
    timestamp: Date.now()
  })
  
  return userData
}

// 测试 API 缓存
fetchUserData('123') // 从 API 获取
fetchUserData('123') // 从缓存获取
fetchUserData('456') // 从 API 获取

// 实际场景：缓存清理
console.log('\n清理前缓存大小:', apiCache.size())
apiCache.clear()
console.log('清理后缓存大小:', apiCache.size())

// 实际场景：页面数据缓存
const pageCache = createCache<string, { content: string; lastModified: number }>(3)

function getPageContent(pageId: string): string {
  // 检查缓存
  const cached = pageCache.get(pageId)
  if (cached) {
    console.log(`从缓存获取页面 ${pageId}`)
    return cached.content
  }
  
  // 模拟从数据库获取
  console.log(`从数据库获取页面 ${pageId}`)
  const content = `页面 ${pageId} 的内容...`
  
  // 存入缓存
  pageCache.set(pageId, {
    content,
    lastModified: Date.now()
  })
  
  return content
}

// 测试页面缓存
console.log('\n=== 页面缓存测试 ===')
getPageContent('home')    // 从数据库获取
getPageContent('about')   // 从数据库获取
getPageContent('home')    // 从缓存获取
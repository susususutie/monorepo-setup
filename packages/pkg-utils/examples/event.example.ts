/**
 * 事件发射器使用示例
 * 演示 pkg-utils 中事件系统相关功能的实际使用场景
 */

import { createEventEmitter } from 'pkg-utils'

// 实际场景：用户行为跟踪
interface UserEvents {
  login: { userId: string; timestamp: Date }
  logout: { userId: string; reason: string }
  pageView: { userId: string; page: string }
}

const userEmitter = createEventEmitter<UserEvents>()

// 注册事件监听器
userEmitter.on('login', (event) => {
  console.log(`用户 ${event.userId} 在 ${event.timestamp.toLocaleTimeString()} 登入`)
})

userEmitter.on('logout', (event) => {
  console.log(`用户 ${event.userId} 登出，原因: ${event.reason}`)
})

userEmitter.on('pageView', (event) => {
  console.log(`用户 ${event.userId} 访问了 ${event.page}`)
})

// 触发事件
userEmitter.emit('login', {
  userId: 'user123',
  timestamp: new Date()
})

userEmitter.emit('pageView', {
  userId: 'user123',
  page: '/dashboard'
})

userEmitter.emit('logout', {
  userId: 'user123',
  reason: '用户主动登出'
})

// 实际场景：一次性监听器
interface SystemEvents {
  startup: { service: string; port: number }
  shutdown: { service: string }
}

const systemEmitter = createEventEmitter<SystemEvents>()

// 一次性监听器（只执行一次）
systemEmitter.once('startup', (event) => {
  console.log(`\n系统启动完成: ${event.service} 运行在端口 ${event.port}`)
})

// 普通监听器
systemEmitter.on('startup', (event) => {
  console.log(`记录日志: 服务 ${event.service} 已启动`)
})

// 多次触发事件
systemEmitter.emit('startup', { service: 'API Server', port: 3000 })
systemEmitter.emit('startup', { service: 'API Server', port: 3000 }) // 一次性监听器不会再次执行

// 实际场景：移除监听器
const messageEmitter = createEventEmitter<{ message: string }>()

const tempHandler = (data: string) => {
  console.log(`\n临时处理: ${data}`)
}

// 注册并获取取消函数
const unsubscribe = messageEmitter.on('message', tempHandler)

messageEmitter.emit('message', '第一条消息')

// 移除监听器
unsubscribe()

messageEmitter.emit('message', '第二条消息（不会被处理）')

// 实际场景：购物车事件
interface CartEvents {
  addItem: { productId: string; quantity: number }
  removeItem: { productId: string }
  checkout: { total: number }
}

const cartEmitter = createEventEmitter<CartEvents>()

// 购物车监听器
cartEmitter.on('addItem', (event) => {
  console.log(`\n添加商品到购物车: ${event.productId} x${event.quantity}`)
})

cartEmitter.on('removeItem', (event) => {
  console.log(`从购物车移除: ${event.productId}`)
})

cartEmitter.on('checkout', (event) => {
  console.log(`结账完成，总金额: ¥${event.total}`)
})

// 模拟购物流程
cartEmitter.emit('addItem', { productId: 'laptop-001', quantity: 1 })
cartEmitter.emit('addItem', { productId: 'mouse-002', quantity: 2 })
cartEmitter.emit('removeItem', { productId: 'mouse-002' })
cartEmitter.emit('checkout', { total: 5999 })
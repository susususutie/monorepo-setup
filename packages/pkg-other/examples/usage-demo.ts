/**
 * pkg-other 使用演示
 * 
 * 展示不同的导入方式和 tree-shaking 效果
 */

// ====================================
// 1. 完整导入（从主入口）
// ====================================
console.log('=== 1. 完整导入示例 ===')
import * as utils from '../src/index'

console.log('clamp(15, 0, 10):', utils.clamp(15, 0, 10))
console.log('capitalize("hello"):', utils.capitalize('hello'))
console.log('unique([1,2,2,3]):', utils.unique([1, 2, 2, 3]))

// ====================================
// 2. 按需导入（推荐，支持 tree-shaking）
// ====================================
console.log('\n=== 2. 按需导入示例 ===')
import { clamp, capitalize, unique, Status } from '../src/index'

console.log('clamp(15, 0, 10):', clamp(15, 0, 10))
console.log('capitalize("world"):', capitalize('world'))
console.log('unique([1,2,2,3]):', unique([1, 2, 2, 3]))
console.log('Status.SUCCESS:', Status.SUCCESS)

// ====================================
// 3. 模块化导入（最佳 tree-shaking）
// ====================================
console.log('\n=== 3. 模块化导入示例 ===')
import { round, percentage } from '../src/math'
import { slugify, truncate } from '../src/string'
import { chunk, groupBy } from '../src/array'
import { createCache } from '../src/cache'
import { createEventEmitter } from '../src/event'

// 数学工具
console.log('round(3.14159, 2):', round(3.14159, 2))
console.log('percentage(75, 100):', percentage(75, 100))

// 字符串工具
console.log('slugify("Hello World!"):', slugify('Hello World!'))
console.log('truncate("Long text", 8):', truncate('Long text', 8))

// 数组工具
console.log('chunk([1,2,3,4,5], 2):', chunk([1, 2, 3, 4, 5], 2))
const data = [
  { type: 'A', value: 1 },
  { type: 'B', value: 2 },
  { type: 'A', value: 3 }
]
console.log('groupBy(data, "type"):', groupBy(data, 'type'))

// 缓存系统
const cache = createCache<string, number>(5)
cache.set('key1', 100)
cache.set('key2', 200)
console.log('cache.get("key1"):', cache.get('key1'))
console.log('cache.size():', cache.size())

// 事件系统
const emitter = createEventEmitter<{ test: string }>()
emitter.on('test', (data) => {
  console.log('收到事件:', data)
})
emitter.emit('test', 'Hello Events!')

// ====================================
// 4. 混合导入示例
// ====================================
console.log('\n=== 4. 混合导入示例 ===')
import { test } from '../src/index'  // 从主入口
import { randomBetween } from '../src/math'  // 从数学模块
import { CONFIG } from '../src/constants'  // 从常量模块

console.log('test(1, 2):', test(1, 2))
console.log('randomBetween(1, 10):', randomBetween(1, 10))
console.log('CONFIG.VERSION:', CONFIG.VERSION)

// ====================================
// 5. 实际应用场景
// ====================================
console.log('\n=== 5. 实际应用场景 ===')

// 场景1: 用户数据处理
import { pick, omit } from '../src/object'
import { createValidator } from '../src/validator'

const userData = { 
  id: 1, 
  name: 'Alice', 
  email: 'alice@example.com', 
  password: 'secret123',
  age: 25 
}

// 提取公开信息
const publicInfo = omit(userData, ['password'])
console.log('公开信息:', publicInfo)

// 提取关键字段
const keyInfo = pick(userData, ['id', 'name', 'email'])
console.log('关键信息:', keyInfo)

// 数据验证
const validator = createValidator<typeof userData>()
  .addRule('name', { required: true, min: 2 })
  .addRule('age', { required: true, min: 0, max: 120 })
  .addRule('email', { pattern: /^[^@]+@[^@]+\.[^@]+$/ })

const validationResult = validator.validate(userData)
console.log('验证结果:', validationResult.valid ? '通过' : '失败')

// 场景2: 异步操作
import { sleep, retry, createSafeAsync } from '../src/async'

const asyncExample = async () => {
  console.log('\n--- 异步操作示例 ---')
  
  // 延迟执行
  console.log('开始延迟...')
  await sleep(100)
  console.log('延迟结束')
  
  // 重试机制
  let attempts = 0
  const unreliableOperation = async () => {
    attempts++
    if (attempts < 3) {
      throw new Error('临时失败')
    }
    return '操作成功'
  }
  
  try {
    const result = await retry(unreliableOperation, 3, 50)
    console.log('重试结果:', result)
  } catch (error) {
    console.log('重试失败:', error.message)
  }
  
  // 安全包装器
  const safeOperation = createSafeAsync(() => {
    if (Math.random() > 0.5) {
      throw new Error('随机错误')
    }
    return '随机成功'
  })
  
  const safeResult = await safeOperation()
  console.log('安全操作结果:', safeResult)
}

// 运行异步示例
asyncExample().catch(console.error)

console.log('\n=== 演示完成 ===')
console.log('这些示例展示了 pkg-other 的各种使用方式和 tree-shaking 能力。')
console.log('在实际项目中，推荐使用模块化导入以获得最佳的包大小优化效果。')
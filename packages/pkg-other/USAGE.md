# pkg-other 使用指南

pkg-other 是一个模块化的 TypeScript 工具函数库，支持 tree-shaking 和多种导入方式。

## 🌳 Tree-shaking 支持

本包完全支持 tree-shaking，您可以按需导入所需的功能，减少最终包的大小。

## 📦 安装

```bash
# 在 monorepo 内使用
pnpm add pkg-other

# 或者使用 workspace 引用
pnpm add pkg-other@workspace:*
```

## 🚀 导入方式

### 1. 完整导入（从主入口）

```typescript
// 导入所有功能
import * as utils from 'pkg-other'

// 使用功能
const result = utils.clamp(10, 0, 5)
const formatted = utils.capitalize('hello world')
```

### 2. 按需导入（推荐，支持 tree-shaking）

```typescript
// 只导入需要的功能，其他功能不会被包含在最终包中
import { clamp, capitalize, unique } from 'pkg-other'

const result = clamp(10, 0, 5)
const formatted = capitalize('hello world')
const uniqueItems = unique([1, 2, 2, 3])
```

### 3. 模块化导入（最佳 tree-shaking 效果）

```typescript
// 从具体模块导入，实现最佳的 tree-shaking 效果
import { clamp, round } from 'pkg-other/math'
import { capitalize, slugify } from 'pkg-other/string'
import { unique, chunk } from 'pkg-other/array'
import { LRUCache } from 'pkg-other/cache'
import { EventEmitter } from 'pkg-other/event'
```

### 4. 混合导入

```typescript
// 可以同时使用多种导入方式
import { test } from 'pkg-other'  // 从主入口
import { clamp } from 'pkg-other/math'  // 从具体模块
import { Status } from 'pkg-other/constants'  // 常量

// 使用
console.log(test(1, 2))  // 4
console.log(clamp(10, 0, 5))  // 5
console.log(Status.SUCCESS)  // 'success'
```

## 📝 可用模块

| 模块 | 导入路径 | 主要功能 |
|------|----------|----------|
| 常量 | `pkg-other/constants` | 基础常量、配置、枚举 |
| 类型 | `pkg-other/types` | TypeScript 类型定义 |
| 数学 | `pkg-other/math` | 数学计算工具函数 |
| 字符串 | `pkg-other/string` | 字符串处理工具函数 |
| 数组 | `pkg-other/array` | 数组操作工具函数 |
| 对象 | `pkg-other/object` | 对象处理工具函数 |
| 异步 | `pkg-other/async` | 异步操作工具函数 |
| 日期 | `pkg-other/date` | 日期处理工具函数 |
| 验证器 | `pkg-other/validator` | 数据验证类和函数 |
| 事件 | `pkg-other/event` | 事件发射器类和函数 |
| 缓存 | `pkg-other/cache` | LRU 缓存类和函数 |
| 错误 | `pkg-other/error` | 错误处理类和函数 |

## 🎯 使用示例

### 数学工具

```typescript
import { clamp, round, percentage } from 'pkg-other/math'

// 限制数值范围
const score = clamp(105, 0, 100)  // 100

// 四舍五入
const rounded = round(3.14159, 2)  // 3.14

// 计算百分比
const percent = percentage(75, 100)  // 75
```

### 字符串处理

```typescript
import { capitalize, slugify, truncate } from 'pkg-other/string'

// 首字母大写
const title = capitalize('hello world')  // 'Hello world'

// URL 友好字符串
const slug = slugify('Hello World!')  // 'hello-world'

// 截断字符串
const short = truncate('Very long text', 10)  // 'Very lo...'
```

### 数组操作

```typescript
import { unique, groupBy, chunk } from 'pkg-other/array'

// 去重
const uniqueItems = unique([1, 2, 2, 3])  // [1, 2, 3]

// 分组
const grouped = groupBy([
  { type: 'A', value: 1 },
  { type: 'B', value: 2 },
  { type: 'A', value: 3 }
], 'type')
// { A: [...], B: [...] }

// 分块
const chunks = chunk([1, 2, 3, 4, 5], 2)  // [[1, 2], [3, 4], [5]]
```

### 缓存系统

```typescript
import { createCache } from 'pkg-other/cache'

// 创建 LRU 缓存
const cache = createCache<string, any>(100)

cache.set('key1', 'value1')
const value = cache.get('key1')  // 'value1'
```

### 事件系统

```typescript
import { createEventEmitter } from 'pkg-other/event'

// 创建类型安全的事件发射器
const emitter = createEventEmitter<{
  userLogin: { userId: string }
  dataUpdate: { data: any[] }
}>()

// 监听事件
emitter.on('userLogin', (event) => {
  console.log(`User ${event.userId} logged in`)
})

// 发射事件
emitter.emit('userLogin', { userId: '123' })
```

### 数据验证

```typescript
import { createValidator } from 'pkg-other/validator'

// 创建验证器
const validator = createValidator<{
  name: string
  age: number
  email: string
}>()
  .addRule('name', { required: true, min: 2 })
  .addRule('age', { required: true, min: 0, max: 120 })
  .addRule('email', { pattern: /^[^@]+@[^@]+\\.[^@]+$/ })

// 验证数据
const result = validator.validate({
  name: 'John',
  age: 25,
  email: 'john@example.com'
})

if (result.valid) {
  console.log('数据验证通过')
} else {
  console.log('验证错误:', result.errors)
}
```

## 🏗️ 构建格式

本包支持多种构建格式：

- **ESM**: `.mjs` 文件，用于现代 JavaScript 环境
- **CommonJS**: `.cjs` 文件，用于 Node.js 环境
- **TypeScript**: `.d.ts` 文件，提供完整的类型定义

## 📊 Bundle 分析

每个模块都被单独构建，支持最佳的 tree-shaking 效果：

- 主入口: ~2.1KB (gzipped)
- 各个模块: 500B - 2KB (gzipped)
- 总大小: ~14KB (完整导入时)

## 💡 最佳实践

1. **推荐使用模块化导入**，获得最佳的 tree-shaking 效果
2. **避免导入整个包**，除非确实需要所有功能
3. **利用 TypeScript 类型**，获得更好的开发体验
4. **按功能组织导入**，保持代码清晰

```typescript
// ✅ 推荐
import { clamp } from 'pkg-other/math'
import { capitalize } from 'pkg-other/string'

// ❌ 不推荐（除非需要很多功能）
import * as utils from 'pkg-other'
```
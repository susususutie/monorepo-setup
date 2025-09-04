# pkg-other

一个全面的 TypeScript 工具库，专为 monorepo 项目设计，展示各种前端开发场景的最佳实践。

## 🚀 特性

### 📊 基础常量和配置
- **常量导出**: `one`, `two`
- **配置对象**: `CONFIG` - 包含 API URL、超时、版本等
- **枚举类型**: `Status`, `Priority` - 状态和优先级管理

### 🧩 TypeScript 类型定义
- **接口**: `User`, `Role`, `Permission` - 用户权限系统
- **泛型类型**: `ApiResponse<T>`, `AsyncResult<T>`, `EventHandler<T>`
- **工具类型**: `ValidatorRule<T>` - 验证规则配置

### 🛠️ 工具函数库

#### 数学工具
```typescript
clamp(5, 0, 10)          // 5 - 限制数值范围
randomBetween(1, 10)     // 随机整数
round(3.14159, 2)        // 3.14 - 四舍五入
```

#### 字符串工具
```typescript
capitalize('hello')               // 'Hello'
slugify('Hello World!')           // 'hello-world'
truncate('Long text', 5)          // 'Lo...'
```

#### 数组工具
```typescript
unique([1, 2, 2, 3])             // [1, 2, 3]
groupBy(users, 'role')            // 按角色分组
chunk([1, 2, 3, 4], 2)           // [[1, 2], [3, 4]]
```

#### 对象工具
```typescript
deepClone(obj)                    // 深度克隆
pick(obj, ['name', 'email'])      // 选择属性
omit(obj, ['password'])           // 排除属性
```

### ⚡ 异步工具
```typescript
await sleep(1000)                 // 延迟执行
await timeout(promise, 5000)      // 超时控制
await retry(fn, 3, 1000)          // 重试机制
await batchProcess(items, fn, 10) // 批量处理
```

### 🏗️ 高级类和服务

#### 数据验证器
```typescript
const validator = createValidator<User>()
  .addRule('name', { required: true, min: 2 })
  .addRule('email', { required: true, pattern: /\S+@\S+/ })

const result = validator.validate(user)
if (!result.valid) {
  console.log(result.errors)
}
```

#### 事件系统
```typescript
const emitter = createEventEmitter<{
  userLogin: User
  userLogout: string
}>()

const unsubscribe = emitter.on('userLogin', (user) => {
  console.log(`Welcome ${user.name}!`)
})

emitter.emit('userLogin', user)
```

#### LRU 缓存
```typescript
const cache = createCache<string, any>(100) // 容量 100
cache.set('user:123', userData)
const user = cache.get('user:123')
```

#### 性能监控
```typescript
const monitor = PerformanceMonitor.getInstance()
monitor.startTimer('api-call')
// ... API 调用
const duration = monitor.endTimer('api-call')
const metrics = monitor.getMetrics('api-call')
```

### 📅 日期工具
```typescript
formatDate(new Date(), 'YYYY-MM-DD HH:mm')  // '2024-03-15 10:30'
isWeekend(new Date())                       // boolean
addDays(new Date(), 7)                      // 一周后
diffInDays(date1, date2)                    // 日期差
```

### 🚨 错误处理
```typescript
// 自定义错误类
throw new AppError('Invalid input', 'VALIDATION_ERROR', 400)

// 安全函数包装
const safeFunction = createErrorHandler(riskyFunction)
const result = await safeFunction(params)
if (!result.success) {
  console.error(result.error)
}
```

### 🎨 装饰器工具
```typescript
class ApiService {
  @measureTime
  async fetchUser(id: string) {
    // 自动测量执行时间
    return await api.get(`/users/${id}`)
  }
}
```

## 📦 使用方式

### 命名导入
```typescript
import {
  test,
  capitalize,
  unique,
  sleep,
  Validator,
  EventEmitter,
  LRUCache,
  Status,
  CONFIG
} from 'pkg-other'
```

### 默认导入
```typescript
import pkgOther from 'pkg-other'

pkgOther.test(1, 2)        // 4
pkgOther.capitalize('hi')  // 'Hi'
```

### 便捷创建函数
```typescript
import {
  createValidator,
  createEventEmitter,
  createCache,
  createErrorHandler
} from 'pkg-other'
```

## 🧪 测试

包含 40+ 个全面的单元测试，覆盖所有功能模块：

```bash
pnpm test              # 运行测试
pnpm test:watch        # 监听模式
pnpm test:coverage     # 测试覆盖率
```

## 🏗️ 构建

```bash
pnpm build             # 构建发布版本
pnpm dev               # 开发模式构建
```

## 💡 Monorepo 使用场景

这个包展示了以下 monorepo 开发场景：

1. **跨包类型共享** - TypeScript 接口和类型定义
2. **工具函数库** - 可复用的业务逻辑
3. **异步操作** - Promise 处理和错误管理
4. **状态管理** - 事件系统和缓存机制
5. **性能优化** - 监控和测量工具
6. **数据验证** - 类型安全的验证框架
7. **错误处理** - 统一的错误管理策略
8. **单元测试** - 完整的测试覆盖
9. **构建系统** - unbuild 配置和自动构建
10. **API 设计** - 既支持命名导入又支持默认导入

## 📋 API 文档

详细的 API 文档请参考源码中的 TypeScript 类型定义和 JSDoc 注释。所有导出的函数、类和类型都包含完整的类型信息。

## 🤝 贡献

欢迎提交 PR 和 Issue！这个包旨在展示 monorepo 最佳实践，任何改进建议都很宝贵。

# pkg-utils

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

### 🛠️ 功能模块

- **数学工具** - 数值计算、范围限制、随机数生成
- **字符串工具** - 格式化、转换、截断处理
- **数组工具** - 去重、分组、分块操作
- **对象工具** - 深拷贝、属性选择、数据转换
- **异步工具** - 延迟、超时、重试、批量处理
- **数据验证** - 类型安全的验证框架
- **事件系统** - 类型安全的事件发射器
- **缓存系统** - LRU 缓存实现
- **错误处理** - 自定义错误类和安全包装
- **日期工具** - 格式化、计算、判断
- **性能监控** - 执行时间测量和指标收集

## 📦 安装和使用

```bash
# 在 monorepo 内使用
pnpm add pkg-utils@workspace:*
```

### 基本用法

```typescript
// 按需导入（推荐）
import { clamp, capitalize, unique } from '@monorepo-setup/pkg-utils'

// 模块化导入（最佳 tree-shaking）
import { clamp } from '@monorepo-setup/pkg-utils/math'
import { capitalize } from '@monorepo-setup/pkg-utils/string'
```

## 📋 文档和示例

- **[examples/](./examples/)** - 完整使用示例
- **[src/](./src/)** - 源码和 TypeScript 类型定义
- **[test/](./test/)** - 单元测试覆盖

## 🧪 开发

```bash
pnpm test              # 运行测试
pnpm build             # 构建发布版本
```

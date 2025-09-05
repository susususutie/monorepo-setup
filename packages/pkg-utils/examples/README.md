# pkg-utils 使用示例

本文件夹包含了 pkg-utils 工具库的详细使用示例。每个源代码模块都有对应的示例文件，展示具体用法和最佳实践。

## 📁 文件结构

```
examples/
├── README.md               # 示例说明文档
├── index.ts               # 示例索引文件
├── array.example.ts       # 数组处理工具函数示例
├── async.example.ts       # 异步操作工具函数示例
├── cache.example.ts       # LRU 缓存工具示例
├── constants.example.ts   # 基础常量定义示例
├── date.example.ts        # 日期处理工具函数示例
├── error.example.ts       # 错误处理工具示例
├── event.example.ts       # 事件发射器示例
├── math.example.ts        # 数学相关工具函数示例
├── object.example.ts      # 对象处理工具函数示例
├── string.example.ts      # 字符串处理工具函数示例
├── types.example.ts       # TypeScript 类型定义示例
├── validator.example.ts   # 数据验证器示例
└── tree-shaking-demo.ts   # Tree Shaking 演示
```

## 🗂️ 模块对应关系

| 源代码模块 | 示例文件 | 说明 |
|-----------|----------|------|
| `src/array.ts` | `array.example.ts` | 数组处理：去重、分组、分块、乱序、交集 |
| `src/async.ts` | `async.example.ts` | 异步工具：延迟、超时、重试、安全包装 |
| `src/cache.ts` | `cache.example.ts` | LRU缓存：创建、获取、设置、淘汰机制 |
| `src/constants.ts` | `constants.example.ts` | 常量定义：数值、配置、状态枚举、优先级 |
| `src/date.ts` | `date.example.ts` | 日期处理：格式化、周末判断、日期计算 |
| `src/error.ts` | `error.example.ts` | 错误处理：自定义错误、错误码、错误分类 |
| `src/event.ts` | `event.example.ts` | 事件系统：发射器、监听器、一次性事件 |
| `src/math.ts` | `math.example.ts` | 数学工具：限制、随机数、四舍五入、百分比 |
| `src/object.ts` | `object.example.ts` | 对象处理：深克隆、属性选择、合并、检查 |
| `src/string.ts` | `string.example.ts` | 字符串处理：大小写、URL化、截断、命名转换 |
| `src/types.ts` | `types.example.ts` | 类型定义：用户、API响应、事件处理器等 |
| `src/validator.ts` | `validator.example.ts` | 数据验证：规则定义、表单验证、动态验证 |

## 🚀 快速开始

### 1. 运行单个示例

```bash
# 运行数组处理示例
ts-node examples/array.example.ts

# 运行字符串处理示例
ts-node examples/string.example.ts

# 运行验证器示例
ts-node examples/validator.example.ts
```

### 2. 查看示例索引

```bash
# 查看所有可用示例
ts-node examples/index.ts
```

### 3. 在项目中使用

```typescript
// 导入特定模块的示例
import { ArrayExamples } from 'pkg-utils/examples'

// 或者导入所有示例
import * as Examples from 'pkg-utils/examples'

// 运行特定示例
ArrayExamples.basicArrayExample()
```

## 💡 示例特点

- **全面覆盖**：每个源代码模块都有对应的示例文件
- **实际应用**：展示真实场景下的使用方法
- **最佳实践**：包含推荐的使用模式和注意事项
- **错误处理**：演示常见错误和正确的处理方式
- **类型安全**：充分利用 TypeScript 的类型系统
- **详细注释**：提供中文注释说明每个示例的用途

## 📚 推荐学习顺序

1. **基础工具**：`constants` → `math` → `string` → `array`
2. **对象处理**：`object` → `types`
3. **异步编程**：`async` → `cache`
4. **高级功能**：`event` → `error` → `validator`
5. **实用工具**：`date`

## 🤝 贡献指南

如果您发现示例中的问题或有改进建议：

1. 每个示例文件都应该包含完整的功能演示
2. 提供实际应用场景的用法
3. 包含错误情况的处理示例
4. 使用清晰的中文注释
5. 遵循统一的代码风格

## 📖 更多资源

- [pkg-utils 主文档](../README.md)
- [API 文档](../docs/)
- [源代码](../src/)
- [测试用例](../test/)
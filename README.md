# monorepo-setup

基于 pnpm 的现代化 monorepo 项目示例，展示单仓库管理最佳实践。

## ✨ 特性

- 🚀 **现代工具链**：pnpm workspace + catalog 依赖管理
- 📦 **模块化架构**：支持 tree-shaking 的工具库
- 🔧 **实时开发**：热更新和类型同步
- 🎯 **多种导入**：完整/按需/模块化导入
- 🏗️ **多框架支持**：React/Vue/TypeScript 示例应用

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 运行测试
pnpm test

# 启动开发环境
pnpm dev
```

访问示例应用：

- React TypeScript: http://localhost:5173
- Vue TypeScript: http://localhost:5175
- Vanilla TypeScript: http://localhost:5176

## 📦 主要包

### pkg-utils - 工具函数库

13 个独立模块，完整的 TypeScript 工具库：

```typescript
// 按需导入（推荐）
import { clamp, capitalize, unique } from 'pkg-utils'

// 模块化导入（最佳 tree-shaking）
import { clamp } from 'pkg-utils/math'
import { capitalize } from 'pkg-utils/string'
import { LRUCache } from 'pkg-utils/cache'

// 使用示例
const result = clamp(10, 0, 5) // 5
const title = capitalize('hello') // 'Hello'
const cache = new LRUCache<string, any>(100)
```

**功能模块**：math、string、array、object、async、date、validator、event、cache、error、constants、types

### pkg-react-ui - React UI 组件库

基于 React 18 + Ant Design 的 UI 组件库。

### pkg-vue-ui - Vue UI 组件库

基于 Vue 3 + TypeScript 的 UI 组件库。

## 🛠️ 开发指南

### Catalog 依赖管理

```bash
# 1. 根目录安装新依赖
pnpm add -D eslint-plugin-react

# 2. 更新 pnpm-workspace.yaml
catalog:
  eslint-plugin-react: ^7.37.5

# 3. 子项目引用
pnpm --filter vite-react-ts add -D eslint-plugin-react
```

### 实时开发配置

```typescript
// playground/vite-react-ts/vite.config.ts
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'pkg-react-ui': resolve(__dirname, '../../packages/pkg-react-ui/src'),
      'pkg-vue-ui': resolve(__dirname, '../../packages/pkg-vue-ui/src'),
      'pkg-utils': resolve(__dirname, '../../packages/pkg-utils/src'),
    },
  },
})
```

```json
// playground/vite-react-ts/tsconfig.app.json
{
  "compilerOptions": {
    "paths": {
      "pkg-react-ui": ["../../packages/pkg-react-ui/src"],
      "pkg-vue-ui": ["../../packages/pkg-vue-ui/src"],
      "pkg-utils": ["../../packages/pkg-utils/src"]
    }
  }
}
```

### 常用命令

```bash
# 构建
pnpm build                                    # 所有包
pnpm --filter pkg-utils build                # 指定包
pnpm --filter "./packages/*" -r --parallel run build  # 并行构建

# 测试
pnpm test                                     # 所有测试
pnpm --filter pkg-utils test:coverage        # 覆盖率报告

# 开发
pnpm dev                                      # 所有应用
pnpm --filter vite-react-ts dev              # 指定应用

# 依赖管理
pnpm --filter pkg-utils add lodash           # 添加依赖
pnpm -r clean                                # 清理缓存
```

## 🕰️ 最佳实践

- **模块化设计**: 每个模块独立功能，避免耦合
- **Tree-shaking**: 配置 `sideEffects: false` 和 exports 字段
- **版本管理**: Catalog 统一管理，React 18.3.1 一致性
- **测试策略**: 全面覆盖，边界测试，Tree-shaking 验证

## 🤝 贡献

1. Fork 项目并克隆到本地
2. 安装依赖: `pnpm install`
3. 创建分支: `git checkout -b feature/your-feature`
4. 进行开发并运行测试: `pnpm test`
5. 提交并创建 Pull Request

## 📄 许可证

MIT License

---

🎆 **现代化 monorepo 管理最佳实践，从 workspace 配置到 tree-shaking 优化的一站式学习资源。**

/**
 * Tree-shaking 效果演示
 * 展示如何通过不同导入方式实现最佳的 bundle 优化
 */

// ===== ❌ 不推荐：导入整个库 =====
// import * as utils from '@monorepo-setup/pkg-utils'
// const result = utils.clamp(10, 0, 5)
// 结果：整个库都会被打包，约 14KB

// ===== ✅ 推荐：按需导入 =====
import { clamp } from '@monorepo-setup/pkg-utils'
// 结果：只有 clamp 函数和其依赖会被打包，约 500B

// ===== ✅ 最佳：模块化导入 =====
import { clamp as mathClamp } from 'pkg-utils/math'
// 结果：最佳的 tree-shaking 效果，约 200B

// ===== Bundle 大小对比 =====
console.log(`
Tree-shaking 效果对比：

📦 完整导入 (import * as utils)
├── 包含所有模块
├── Bundle 大小: ~14KB (gzipped)
└── 适用场景: 需要使用大部分功能

📦 按需导入 (import { clamp })  
├── 只包含使用的函数
├── Bundle 大小: ~500B-2KB (gzipped)
└── 适用场景: 使用部分功能

📦 模块化导入 (import { clamp } from 'pkg-utils/math')
├── 最精确的导入
├── Bundle 大小: ~200B-1KB (gzipped)
└── 适用场景: 追求最小 bundle 大小

💡 最佳实践：
1. 优先使用模块化导入
2. 避免导入未使用的功能
3. 利用构建工具的 tree-shaking 分析
`)

// ===== 实际使用示例 =====
const value = 105
const min = 0
const max = 100

// 使用 tree-shaking 友好的导入
const clampedValue = mathClamp(value, min, max)

console.log('Tree-shaking 示例结果:', {
  原始值: value,
  限制后: clampedValue,
  bundleSize: '约 200B (仅 clamp 函数)'
})

export { clampedValue }
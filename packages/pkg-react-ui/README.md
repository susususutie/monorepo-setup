# @monorepo-setup/pkg-react-ui

基于 React 和 Ant Design 的 UI 组件库。

> **注意**: 这是一个无打包的源码库，需要配合构建工具（如 Vite、Webpack）使用。

## 安装

```bash
pnpm add @monorepo-setup/pkg-react-ui
```

## 使用

### 基础组件

```typescript
import { Demo, ListDemo } from '@monorepo-setup/pkg-react-ui'

function App() {
  return (
    <div>
      <Demo />
      <ListDemo />
    </div>
  )
}
```

### 表格列转换器

```typescript
import { 
  tableColumnsTransformer, 
  registerTransformer, 
  type ColumnTransformer,
  ValueTypes,
  Params
} from '@monorepo-setup/pkg-react-ui'

// 注册百分比转换器
const percentageTransformer: ColumnTransformer = (column, params = {}) => {
  const { precision = 2 } = params
  return {
    ...column,
    render: (value: number) => `${(value * 100).toFixed(precision)}%`,
  }
}

registerTransformer('percentage', percentageTransformer)

const columns = [
  // 使用内置转换器 - 支持类型提示
  {
    title: '金额',
    dataIndex: 'amount',
    valueType: ValueTypes.MONEY, // 类型安全的常量
    valueParams: Params.money({ prefix: '¥', precision: 2 }), // 类型安全的参数
  },
  {
    title: '日期',
    dataIndex: 'createTime',
    valueType: ValueTypes.DATE,
    valueParams: Params.date({ format: 'YYYY-MM-DD' }),
  },
  // 使用自定义转换器
  {
    title: '完成率',
    dataIndex: 'completion',
    valueType: 'percentage', // 自定义类型
    valueParams: { precision: 1 },
  },
]

const transformedColumns = tableColumnsTransformer(columns)
```

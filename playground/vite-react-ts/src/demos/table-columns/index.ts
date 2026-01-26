// 类型导出
export type {
  TableDataRow,
  ScenarioConfig,
  ScenarioKey,
  PersonInfo,
  ContactInfo,
  AddressInfo,
  WorkInfo,
  AccountInfo,
  FinanceInfo,
  OrderInfo,
  ProductInfo,
  NetworkInfo,
  Timestamps,
  ContentInfo,
  Identifiers,
  VisualInfo,
  Flags,
  Statistics,
  MiscInfo,
  Metadata,
} from './types'

// 数据生成器
export { generateDataSource } from './dataGenerator'

// 场景配置
export { scenarios } from './scenarios'

// Columns 配置
export * from './columns'

// Table 组件
export { default } from './TableDemo'

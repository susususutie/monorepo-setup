import { moneyTransformer } from './transformer/money'
import { dateTransformer } from './transformer/date'
import { statusTransformer } from './transformer/status'
import { numberTransformer } from './transformer/number'
import { booleanTransformer } from './transformer/boolean'
import { ellipsisTransformer } from './transformer/ellipsis'
// 导入所有 transformer 的参数类型
import { type MoneyParams } from './transformer/money'
import { type DateParams } from './transformer/date'
import { type StatusParams } from './transformer/status'
import { type NumberParams } from './transformer/number'
import { type BooleanParams } from './transformer/boolean'
import { type EllipsisParams } from './transformer/ellipsis'
import { registerTransformers } from './registry'

function registerDefaultTransformers(): void {
  const defaultTransformers = {
    money: moneyTransformer,
    currency: moneyTransformer, // 别名
    date: dateTransformer,
    datetime: dateTransformer, // 别名
    status: statusTransformer,
    number: numberTransformer,
    boolean: booleanTransformer,
    bool: booleanTransformer, // 别名
    ellipsis: ellipsisTransformer,
    text: ellipsisTransformer, // 别名
  }

  registerTransformers(defaultTransformers)
}

registerDefaultTransformers()

// 导出核心功能
export { default as tableColumnsTransformer } from './transformer'

// 导出注册相关功能
export { type ColumnTransformer, registerTransformer } from './registry'

// 支持的 valueType 类型
export type SupportedValueType =
  | 'money'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'status'
  | 'number'
  | 'boolean'
  | 'bool'
  | 'ellipsis'
  | 'text'

// 根据 valueType 推断对应的参数类型
export type ValueParams<T extends SupportedValueType> = T extends 'money' | 'currency'
  ? MoneyParams
  : T extends 'date' | 'datetime'
  ? DateParams
  : T extends 'status'
  ? StatusParams
  : T extends 'number'
  ? NumberParams
  : T extends 'boolean' | 'bool'
  ? BooleanParams
  : T extends 'ellipsis' | 'text'
  ? EllipsisParams
  : never

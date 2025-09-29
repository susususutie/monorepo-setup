import { type ColumnType } from 'antd/es/table'

// 内置的 valueType 类型
export type BuiltinValueType = 
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

// 动态扩展的 valueType 类型
export type CustomValueType = string & {}

// 所有可能的 valueType 类型
export type AllValueType = BuiltinValueType | CustomValueType

// 导入所有 transformer 的参数类型
import { type MoneyParams } from './transformer/money'
import { type DateParams } from './transformer/date'
import { type StatusParams } from './transformer/status'
import { type NumberParams } from './transformer/number'
import { type BooleanParams } from './transformer/boolean'
import { type EllipsisParams } from './transformer/ellipsis'

// 根据 valueType 推断对应的参数类型
export type ValueParams<T extends AllValueType> = 
  T extends 'money' | 'currency' ? MoneyParams :
  T extends 'date' | 'datetime' ? DateParams :
  T extends 'status' ? StatusParams :
  T extends 'number' ? NumberParams :
  T extends 'boolean' | 'bool' ? BooleanParams :
  T extends 'ellipsis' | 'text' ? EllipsisParams :
  Record<string, any> // 自定义 transformer 的参数类型

// 增强的列类型，支持类型安全的 valueType 和 valueParams
export type ColumnWithExtra<RecordType, T extends AllValueType = AllValueType> = 
  ColumnType<RecordType> & {
    valueType?: T
    valueParams?: ValueParams<T>
  }

// 类型安全的列数组
export type TypedColumns<RecordType, T extends AllValueType = AllValueType> = 
  Array<ColumnWithExtra<RecordType, T> | false | null | undefined>

// 通用类型定义
export interface TransformerParams {
  [key: string]: any
}

export type ColumnTransformer = (column: ColumnType<any>, params?: TransformerParams) => ColumnType<any>

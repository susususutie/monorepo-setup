import { type ColumnType as AntdColumnType } from 'antd/es/table'
import { type AnyObject } from 'antd/es/_util/type'

// 导入所有 transformer 的参数类型
import { type MoneyParams } from './transformer/money'
import { type DateParams } from './transformer/date'
import { type StatusParams } from './transformer/status'
import { type NumberParams } from './transformer/number'
import { type BooleanParams } from './transformer/boolean'
import { type EllipsisParams } from './transformer/ellipsis'
import { type TextParams, textValueType } from './transformer/text'

// 增强的列类型，支持类型安全的 valueType 和 valueParams
type ColumnWithExtra<RecordType = AnyObject, T extends ValueType = ValueType> = AntdColumnType<RecordType> & {
  valueType?: T
  valueParams?: ValueParams<T>
}

type Falsy = false | null | undefined

type RawColumn<T = AnyObject> = Falsy | ColumnWithExtra<T, ValueType>

type RawColumns<T = AnyObject> = Array<RawColumn<T>>

type BuiltinValueType =
  | typeof textValueType
  | 'money'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'status'
  | 'number'
  | 'boolean'
  | 'bool'
  | 'ellipsis'
type CustomValueType = string & {}

type ValueType = BuiltinValueType | CustomValueType

type CustomValueParams = Record<string, any>

type ValueParams<T extends ValueType> = T extends typeof textValueType
  ? TextParams
  : T extends 'money' | 'currency'
  ? MoneyParams
  : T extends 'date' | 'datetime'
  ? DateParams
  : T extends 'status'
  ? StatusParams
  : T extends 'number'
  ? NumberParams
  : T extends 'boolean' | 'bool'
  ? BooleanParams
  : T extends 'ellipsis'
  ? EllipsisParams
  : CustomValueParams

type ColumnTransformer<T = AnyObject> = (
  column: AntdColumnType<T>,
  params?: ValueParams<ValueType>
) => AntdColumnType<T>

export {
  type AnyObject,
  type AntdColumnType,
  type ValueType,
  type ValueParams,
  type RawColumns,
  type ColumnWithExtra,
  type ColumnTransformer,
}

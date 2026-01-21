import { type ColumnType } from 'antd/es/table'

// 导入所有 transformer 的参数类型
import { type MoneyParams } from './transformer/money'
import { type DateParams } from './transformer/date'
import { type StatusParams } from './transformer/status'
import { type NumberParams } from './transformer/number'
import { type BooleanParams } from './transformer/boolean'
import { type EllipsisParams } from './transformer/ellipsis'
import { type TextParams } from './transformer/text'

export type AnyObject = Record<PropertyKey, any> // 'antd/es/_util/type'

/* 2. 内置形状 */
export interface BuiltInValueParamsMap {
  money: MoneyParams
  currency: MoneyParams // 别名
  date: DateParams
  datetime: DateParams // 别名
  status: StatusParams
  number: NumberParams
  boolean: BooleanParams
  bool: BooleanParams // 别名
  ellipsis: EllipsisParams
  text: TextParams
}
export interface CustomValueParamsMap {}
export type ValueParamsMap = BuiltInValueParamsMap & CustomValueParamsMap

// 增强的列类型，支持类型安全的 valueType 和 valueParams
export type ColumnPlusType<RecordType = AnyObject> = ColumnType<RecordType> &
  Partial<
    {
      [K in keyof ValueParamsMap]: {
        valueType: K
        valueParams: ValueParamsMap[K]
      }
    }[keyof ValueParamsMap]
  >

type Falsy = false | null | undefined

export type ColumnGroupPlusType<RecordType = AnyObject> = Omit<ColumnPlusType<RecordType>, 'dataIndex'> & {
  children: ColumnsTypePlus<RecordType>
}

export type ColumnsTypePlus<RecordType = AnyObject> = readonly (
  | Falsy
  | ColumnGroupPlusType<RecordType>
  | ColumnPlusType<RecordType>
)[]
export type ColumnTransformer<Params = unknown, RecordType = AnyObject> = (
  params: Params,
  column: ColumnType<RecordType>
) => ColumnType<RecordType>

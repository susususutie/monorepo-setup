import { type ColumnGroupType, type ColumnType, type ColumnsType } from 'antd/es/table'
import { booleanTransformer } from './transformer/boolean'
import { dateTransformer } from './transformer/date'
import { ellipsisTransformer } from './transformer/ellipsis'
import { moneyTransformer } from './transformer/money'
import { numberTransformer } from './transformer/number'
import { statusTransformer } from './transformer/status'
import { textTransformer } from './transformer/text'
import actionsTransformer from './transformer/actions'
import { type AnyObject, type BuiltInValueParamsMap, type ColumnTransformer, type ColumnsTypePlus } from './types'

export default function createHelper() {
  /* 1. 私有注册表 */
  const transformerStore = new Map<string, ColumnTransformer>()

  /* 2. 内置策略（只读） */
  const builtInTransformer = {
    money: moneyTransformer,
    currency: moneyTransformer, // 别名
    date: dateTransformer,
    datetime: dateTransformer, // 别名
    status: statusTransformer,
    number: numberTransformer,
    boolean: booleanTransformer,
    bool: booleanTransformer, // 别名
    ellipsis: ellipsisTransformer,
    text: textTransformer,
    actions: actionsTransformer,
  } as Record<keyof BuiltInValueParamsMap, ColumnTransformer>

  const transformColumnsPlus = <RecordType = AnyObject>(cols: ColumnsTypePlus<RecordType>): ColumnsType<RecordType> => {
    return cols
      .filter(col => !!col)
      .map(col => {
        const { valueType, valueParams, ...rest } = col

        if (!('dataIndex' in rest) && 'children' in rest) {
          const newChildren = transformColumnsPlus<RecordType>(rest.children)
          return { ...rest, children: newChildren } as ColumnGroupType<RecordType>
        }

        if (!valueType) return rest as ColumnType<RecordType>

        const columnsTransformer = (transformerStore.get(valueType) ??
          builtInTransformer[valueType]) as ColumnTransformer<unknown, RecordType>
        if (typeof columnsTransformer !== 'function') return rest as ColumnType<RecordType>

        return columnsTransformer(valueParams, rest) as ColumnType<RecordType>
      })
  }

  /* 3. 真正被导出的对象 */
  return Object.freeze({
    registerValueType<P = any, RecordType = AnyObject>(
      valueType: string,
      transformer: ColumnTransformer<P, RecordType>
    ) {
      transformerStore.set(valueType, transformer as ColumnTransformer)
    },

    transformTableColumns<RecordType = AnyObject>(cols: ColumnsTypePlus<RecordType>): ColumnsType<RecordType> {
      return transformColumnsPlus(cols)
    },
  })
}

import { getTransformer } from './registry'
import {
  type ColumnWithExtra,
  type ValueType,
  type RawColumns,
  type AnyObject,
  type AntdColumnType,
  type ValueParams,
} from './types'

/**
 * 表格列转换器 - 支持通过 valueType 和 valueParams 自动转换列配置
 * @param columns 包含 valueType 和 valueParams 的列配置数组
 * @returns 转换后的标准 antd ColumnType 数组
 */
export default function tableColumnsTransformer<T = AnyObject>(columns: RawColumns<T>): AntdColumnType<T>[] {
  return columns
    .filter((c): c is ColumnWithExtra<T, ValueType> => Boolean(c))
    .map((column): AntdColumnType<T> => {
      if (column.valueType) {
        const { valueType, valueParams, ...antdColumn } = column
        const oldColumn = antdColumn as AntdColumnType<T>

        // 获取对应的 transformer
        const transformer = getTransformer<ValueType>(valueType)

        if (transformer) {
          // 使用 transformer 转换列配置
          // 通过类型断言避开 title 的泛型不兼容问题
          return transformer(
            oldColumn as unknown as AntdColumnType<AnyObject>,
            valueParams as ValueParams<ValueType>
          ) as AntdColumnType<T>
        } else {
          // 如果没有找到对应的 transformer，发出警告并返回原始列配置
          console.warn(`[tableColumnsTransformer] 未找到 valueType "${valueType}" 对应的转换器，将使用原始列配置。`)
          return oldColumn
        }
      }

      // 没有 valueType 的列直接返回
      return column as AntdColumnType<T>
    })
}

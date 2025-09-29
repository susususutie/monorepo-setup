import { type ColumnType } from 'antd/es/table'
import { getTransformer } from './registry'
import { type ColumnWithExtra, type AllValueType } from './types'

type Falsy = false | null | undefined

/**
 * 表格列转换器 - 支持通过 valueType 和 valueParams 自动转换列配置
 * @param columns 包含 valueType 和 valueParams 的列配置数组
 * @returns 转换后的标准 antd ColumnType 数组
 */
export default function tableColumnsTransformer<T>(
  columns: Array<Falsy | ColumnWithExtra<T, AllValueType>>
): ColumnType<T>[] {
  return columns
    .filter((c): c is ColumnWithExtra<T, AllValueType> => Boolean(c))
    .map(column => {
      if (column.valueType) {
        const { valueType, valueParams, ...newColumn } = column

        // 获取对应的 transformer
        const transformer = getTransformer(valueType)

        if (transformer) {
          // 使用 transformer 转换列配置
          return transformer(newColumn, valueParams)
        } else {
          // 如果没有找到对应的 transformer，发出警告并返回原始列配置
          console.warn(`[tableColumnsTransformer] 未找到 valueType "${valueType}" 对应的转换器，将使用原始列配置。`)
          return newColumn
        }
      }

      // 没有 valueType 的列直接返回
      return column
    })
}

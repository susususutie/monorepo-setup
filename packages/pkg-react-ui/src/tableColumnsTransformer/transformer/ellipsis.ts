import { type ColumnType } from 'antd/es/table'

export interface EllipsisParams {
  maxLength?: number
  suffix?: string
}

export type EllipsisTransformer = (column: ColumnType<any>, params?: EllipsisParams) => ColumnType<any>

// 文本截断
export const ellipsisTransformer: EllipsisTransformer = (column, params = {}) => {
  const { maxLength = 50, suffix = '...' } = params

  return {
    ...column,
    render: (value: string) => {
      if (!value) {
        return '-'
      }

      if (value.length <= maxLength) {
        return value
      }

      return value.slice(0, maxLength) + suffix
    },
  }
}

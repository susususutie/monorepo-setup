import { type ColumnTransformer } from '../types'

export interface EllipsisParams {
  maxLength?: number
  suffix?: string
}

// 文本截断
export const ellipsisTransformer: ColumnTransformer<EllipsisParams> = (params = {}, column) => {
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

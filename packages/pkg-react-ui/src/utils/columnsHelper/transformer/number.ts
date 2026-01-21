import { type ColumnTransformer } from '../types'

export interface NumberParams {
  precision?: number
  thousandsSeparator?: boolean
}

// 数字格式化
export const numberTransformer: ColumnTransformer<NumberParams> = (params = {}, column) => {
  const { precision = 2, thousandsSeparator = true } = params

  return {
    ...column,
    render: (value: number | string) => {
      if (value === null || value === undefined || value === '') {
        return '-'
      }

      const numValue = typeof value === 'string' ? parseFloat(value) : value
      if (isNaN(numValue)) {
        return value
      }

      if (thousandsSeparator) {
        return numValue.toLocaleString('zh-CN', {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        })
      }

      return numValue.toFixed(precision)
    },
  }
}

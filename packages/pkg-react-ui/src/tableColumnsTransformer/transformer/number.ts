import { type ColumnType } from 'antd/es/table'

export interface NumberParams {
  precision?: number
  thousandsSeparator?: boolean
}

export type NumberTransformer = (column: ColumnType<any>, params?: NumberParams) => ColumnType<any>

// 数字格式化
export const numberTransformer: NumberTransformer = (column, params = {}) => {
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
          maximumFractionDigits: precision
        })
      }
      
      return numValue.toFixed(precision)
    }
  }
}

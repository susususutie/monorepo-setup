import { type ColumnTransformer } from '../types'

export interface DateParams {
  format?: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'MM-DD' | 'HH:mm:ss'
}

// 日期格式化
export const dateTransformer: ColumnTransformer<DateParams> = (params = {}, column) => {
  const { format = 'YYYY-MM-DD' } = params

  return {
    ...column,
    render: (value: string | Date | number) => {
      if (!value) {
        return '-'
      }

      const date = new Date(value)
      if (isNaN(date.getTime())) {
        return String(value)
      }

      // 简单的日期格式化实现
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      switch (format) {
        case 'YYYY-MM-DD':
          return `${year}-${month}-${day}`
        case 'YYYY-MM-DD HH:mm:ss':
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        case 'MM-DD':
          return `${month}-${day}`
        case 'HH:mm:ss':
          return `${hours}:${minutes}:${seconds}`
        default:
          return date.toLocaleDateString('zh-CN')
      }
    },
  }
}

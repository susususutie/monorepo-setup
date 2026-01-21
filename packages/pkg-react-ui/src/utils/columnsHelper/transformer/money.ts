import { type ColumnTransformer } from '../types'

/**
 * 货币格式化参数接口
 * @interface MoneyParams
 * @property {string} [prefix='¥'] - 货币前缀，默认为 '¥'
 * @property {string} [suffix=''] - 货币后缀，默认为空字符串
 * @property {number} [precision=2] - 小数位数，默认为 2
 *
 * @example
 * ```typescript
 * const params: MoneyParams = {
 *   prefix: '$',
 *   precision: 2,
 *   suffix: ' USD'
 * }
 * ```
 */
export interface MoneyParams {
  prefix?: string
  suffix?: string
  precision?: number
}

/**
 * 货币格式化转换器
 *
 * 将数值转换为格式化的货币字符串，支持自定义前缀、后缀和小数位数。
 * 自动处理千分位分隔符（使用中文格式）。
 *
 * @param {ColumnType<any>} column - 原始列配置
 * @param {MoneyParams} [params={}] - 格式化参数
 * @returns {ColumnType<any>} 转换后的列配置
 *
 * @example
 * ```typescript
 * // 基本使用
 * const column = {
 *   title: '金额',
 *   dataIndex: 'amount',
 *   valueType: 'money',
 *   valueParams: {
 *     prefix: '¥',
 *     precision: 2
 *   }
 * }
 *
 * // 美元格式
 * const dollarColumn = {
 *   title: 'Price',
 *   dataIndex: 'price',
 *   valueType: 'money',
 *   valueParams: {
 *     prefix: '$',
 *     precision: 2,
 *     suffix: ' USD'
 *   }
 * }
 *
 * // 日元格式（无小数位）
 * const yenColumn = {
 *   title: 'JPY Amount',
 *   dataIndex: 'jpyAmount',
 *   valueType: 'money',
 *   valueParams: {
 *     prefix: '¥',
 *     precision: 0,
 *     suffix: ' JPY'
 *   }
 * }
 * ```
 */
export const moneyTransformer: ColumnTransformer<MoneyParams> = (params = {}, column) => {
  const { prefix = '¥', precision = 2, suffix = '' } = params

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

      const formatted = numValue.toLocaleString('zh-CN', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      })

      return `${prefix}${formatted}${suffix}`
    },
  }
}

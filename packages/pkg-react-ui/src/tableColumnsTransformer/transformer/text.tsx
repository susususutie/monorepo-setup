import { type ColumnType } from 'antd/es/table'
import { Tooltip, type TooltipProps } from 'antd'
import { Fragment } from 'react'

export const textValueType = 'text' as const

export type TextParams = {
  /**
   * 是否多行显示, 默认单行显示, 如果为 true, 则在 \n 处换行
   */
  multiple?: boolean
  /**
   * 气泡框位置, 默认 topLeft
   */
  placement?: TooltipProps['placement']
}

export type TextTransformer = (column: ColumnType<any>, params?: TextParams) => ColumnType<any>

export const textTransformer: TextTransformer = (column, params = {}) => {
  const { multiple = false } = params
  // TODO: 空值占位应该来源于全局配置（tableColumnsTransformer.nillPlaceholder）
  const nillPlaceholder = '-'

  return {
    ...column,
    render: (value: string, record: any, index: number) => {
      let formattedValue
      if (multiple && typeof value === 'string' && value.includes('\n')) {
        formattedValue = value.split('\n').map((line, index) => (
          <Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))
      } else {
        formattedValue = value
      }
      return (
        <Tooltip placement='topLeft' title={formattedValue}>
          {formattedValue ?? nillPlaceholder}
        </Tooltip>
      )
    },
  }
}

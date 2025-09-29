import { type ColumnType } from 'antd/es/table'

export type StatusParams = Record<string | number, string | number>

export type StatusTransformer = (column: ColumnType<any>, params?: StatusParams) => ColumnType<any>

// 状态转换器
export const statusTransformer: StatusTransformer = (column, params = {}) => {
  return {
    ...column,
    render: (value: any) => params[value] ?? '-',
  }
}

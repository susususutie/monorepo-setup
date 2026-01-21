import { type ColumnTransformer } from '../types'

export type StatusParams = Record<string | number, string | number>

// 状态转换器
export const statusTransformer: ColumnTransformer<StatusParams> = (params = {}, column) => {
  return {
    ...column,
    render: (value: any) => params[value] ?? '-',
  }
}

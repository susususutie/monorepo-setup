import { type ColumnType } from 'antd/es/table'

export interface BooleanParams {
  trueText?: string
  falseText?: string
}

export type BooleanTransformer = (column: ColumnType<any>, params?: BooleanParams) => ColumnType<any>

// 布尔值转换器
export const booleanTransformer: BooleanTransformer = (column, params = {}) => {
  const { trueText = '是', falseText = '否' } = params

  return {
    ...column,
    render: (value: boolean) => {
      if (value) {
        return trueText
      } else {
        return falseText
      }
    },
  }
}

import { type ColumnTransformer } from '../types'

export interface BooleanParams {
  trueText?: string
  falseText?: string
}

// 布尔值转换器
export const booleanTransformer: ColumnTransformer<BooleanParams> = (params = {}, column) => {
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

import { type ColumnTransformer } from '../types'
import { isValidElement } from 'react'
import { Space, SpaceProps } from 'antd'

export type ActionsParams = {
  size?: SpaceProps['size']
  split?: SpaceProps['split']
}

// 操作转换器
const actionsTransformer: ColumnTransformer<ActionsParams> = (params = {}, column) => {
  const { size = 'small', split = null } = params
  const originalRender = column.render

  return {
    ...column,
    render: (value, record, index) => {
      const originalChildren = originalRender?.(value, record, index)
      if (!originalChildren) {
        return '-'
      }

      if (Array.isArray(originalChildren)) {
        if (originalChildren.filter(isValidElement).length > 0) {
          return (
            <Space size={size} split={split}>
              {originalChildren.map(item => (isValidElement(item) ? item : null))}
            </Space>
          )
        }
        return '-'
      } else {
        return originalChildren
      }
    },
  }
}

export default actionsTransformer

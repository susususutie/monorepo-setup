import type { ScenarioConfig } from './types'
import {
  userManagementColumnsPlus,
  userManagementColumns,
  orderManagementColumnsPlus,
  orderManagementColumns,
  productManagementColumnsPlus,
  productManagementColumns,
  financeAccountColumnsPlus,
  financeAccountColumns,
  contentManagementColumnsPlus,
  contentManagementColumns,
} from './columns'

export const scenarios: ScenarioConfig[] = [
  {
    key: 'user',
    label: '用户管理系统',
    columnsPlus: userManagementColumnsPlus,
    columns: userManagementColumns,
  },
  {
    key: 'order',
    label: '订单管理系统',
    columnsPlus: orderManagementColumnsPlus,
    columns: orderManagementColumns,
  },
  {
    key: 'product',
    label: '产品管理系统',
    columnsPlus: productManagementColumnsPlus,
    columns: productManagementColumns,
  },
  {
    key: 'finance',
    label: '金融账户系统',
    columnsPlus: financeAccountColumnsPlus,
    columns: financeAccountColumns,
  },
  {
    key: 'content',
    label: '内容管理系统',
    columnsPlus: contentManagementColumnsPlus,
    columns: contentManagementColumns,
  },
]

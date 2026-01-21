import createHelper from './createHelper'

// 单例
const helper = createHelper()
export const registerValueType = helper.registerValueType.bind(helper)
export const tableColumnsTransformer = helper.transformTableColumns.bind(helper)
export { helper as columnsHelper }
export default helper
export { type ColumnsTypePlus, type ColumnPlusType, type ColumnGroupPlusType, type CustomValueParamsMap } from './types'

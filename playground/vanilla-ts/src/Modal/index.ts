import CountModal, { IdCountModal, type ICountModal } from './CountModal'
import LayoutModal, { IdLayoutModal, type ILayoutModal } from './LayoutModal'
import MessageModal, { IdMessageModal, type IMessageModal } from './MessageModal'
import ThemeModal, { IdThemeModal, type IThemeModal } from './ThemeModal'

// modal包含两种：1. xxModal 纯状态；2. xxVModal 视图能力接口
// 所有modal只能依赖modal，可能存在交叉依赖
// 交叉依赖通过懒加载+使用时实例化来解决

export {
  IdCountModal,
  IdLayoutModal,
  IdThemeModal,
  CountModal,
  LayoutModal,
  ThemeModal,
  type ICountModal,
  type ILayoutModal,
  type IThemeModal,
  IdMessageModal,
  MessageModal,
  type IMessageModal,
}

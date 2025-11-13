import modalManager from './ModalManager'
import CountModal, { ID_COUNT_MODAL, type ICountModal } from './CountModal'
import ThemeModal, { ID_THEME_MODAL, type IThemeModal } from './ThemeModal'

// modal包含两种：1. xxModal 纯状态；2. xxVModal 视图能力接口
// 所有modal只能依赖modal，可能存在交叉依赖
// 交叉依赖通过懒加载+使用时实例化来解决

function registerModals() {
  modalManager.register(ID_COUNT_MODAL, CountModal)
  modalManager.register(ID_THEME_MODAL, ThemeModal)
}

export {
  modalManager,
  registerModals,
  ID_COUNT_MODAL,
  ID_THEME_MODAL,
  CountModal,
  ThemeModal,
  type ICountModal,
  type IThemeModal,
}

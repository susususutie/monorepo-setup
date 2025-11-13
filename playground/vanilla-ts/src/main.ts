import di, { InstantiationType } from './InstantiationService'
import { CountModal, IdCountModal, IdLayoutModal, IdMessageModal, IdThemeModal, LayoutModal, MessageModal, ThemeModal } from './Modal'
import './style.css'
import { ButtonView, OutlineView, SearchView, TerminalView, ViewDescriptor } from './View/index.ts'
import {
  ActivitybarPart,
  AuxiliarybarPart,
  EditorPart,
  FooterbarPart,
  PanelPart,
  SidebarPart,
  TitlebarPart,
} from './View/Parts/index.ts'
import type { IPart } from './View/Parts/Part'
import Registry from './View/Registry'
import Message from './Widget/Message'

function renderApp() {
  // 1. 注册 modal
  di.register(IdCountModal, CountModal)
  di.register(IdThemeModal, ThemeModal)
  di.register(IdLayoutModal, LayoutModal, InstantiationType.Eager)
  di.register(IdMessageModal, MessageModal);
  di.register('ToastWidget', Message);
  // 立刻渲染 Message 组件
  di.get('ToastWidget')

  // Part 类定义
  Registry.as(ViewDescriptor.Parts).push(
    { id: 'titlebar', ctor: TitlebarPart },
    { id: 'activitybar', ctor: ActivitybarPart },
    { id: 'sidebar', ctor: SidebarPart },
    { id: 'editor', ctor: EditorPart },
    { id: 'panel', ctor: PanelPart },
    { id: 'auxiliarybar', ctor: AuxiliarybarPart },
    { id: 'footerbar', ctor: FooterbarPart }
  )

  // 其余 View 定义
  Registry.as(ViewDescriptor.Views).push(
    { id: 'search', containerId: 'sidebar', ctor: SearchView },
    { id: 'outline', containerId: 'sidebar', ctor: OutlineView },
    { id: 'terminal', containerId: 'panel', ctor: TerminalView },
    { id: 'inc', containerId: 'sidebar', ctor: ButtonView }

  )

  /* Part 实例化 —— 内部所有 View 由 DI 在 createInstance 时自动套娃 */
  Registry.as(ViewDescriptor.Parts).forEach(({ id, ctor }: { id: string; ctor: any }) => {
    const container = document.getElementById(id)
    if (!container) {
      throw new Error(`renderApp: 未找到 id 为 ${id} 的容器节点`)
    }
    const part = di.createInstance<IPart>(ctor, container)
    part.create()
  })
}

renderApp()

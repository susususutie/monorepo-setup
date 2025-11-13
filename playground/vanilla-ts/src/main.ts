import { registerModals } from './Modal'
import { ButtonView, OutlineView, SearchView, TerminalView, ViewDescriptor } from './View/index.ts'
import { EditorPart, PanelPart, SidebarPart, TitlebarPart } from './View/Parts/index.ts'
import Registry from './View/Registry'

/* ---------- 全局 view 和 part 注册 ---------- */
Registry.as(ViewDescriptor.Parts).push(
  { id: 'titlebar', ctor: TitlebarPart },
  { id: 'sidebar', ctor: SidebarPart },
  { id: 'editor', ctor: EditorPart },
  { id: 'panel', ctor: PanelPart }
)
Registry.as(ViewDescriptor.Views).push(
  { id: 'search', containerId: 'sidebar', ctor: SearchView },
  { id: 'outline', containerId: 'sidebar', ctor: OutlineView },
  { id: 'terminal', containerId: 'editor', ctor: TerminalView },
  { id: 'inc', containerId: 'sidebar', ctor: ButtonView }
)

// modal 注册
registerModals()

function renderApp(root: HTMLElement) {
  Registry.dump().forEach(([kind, list]) => {
    if (kind !== ViewDescriptor.Parts) return
    list.forEach(({ id, ctor }: { id: string; ctor: any }) => {
      const div = document.createElement('div')
      div.id = id
      root.appendChild(div)
      new ctor(div).create() // ← 只在这里 new 一次
    })
  })
}

renderApp(document.getElementById('app')!)

import Part from './Part'

type ActivityItem = {
  id: string
  label: string
  icon: string
  toggleTarget?: string
  section: 'top' | 'bottom'
}

const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: 'explorer', label: '资源管理器', icon: '📁', toggleTarget: 'sidebar', section: 'top' },
  { id: 'search', label: '全局搜索', icon: '🔍', section: 'top' },
  { id: 'source-control', label: '源代码管理', icon: '🔀', section: 'top' },
  { id: 'run', label: '运行调试', icon: '🐞', section: 'top' },
  { id: 'extensions', label: '扩展管理', icon: '🧩', section: 'top' },
  { id: 'outline', label: '辅助栏', icon: '🧭', toggleTarget: 'auxiliarybar', section: 'bottom' },
  { id: 'panel', label: '面板', icon: '🧪', toggleTarget: 'panel', section: 'bottom' },
  { id: 'settings', label: '首选项', icon: '⚙️', section: 'bottom' },
]

export default class ActivitybarPart extends Part {
  #activeId: string | null = null

  create() {
    this.node.classList.add('activitybar-part')
    this.node.innerHTML = ''

    const topSection = document.createElement('nav')
    topSection.className = 'activitybar-actions'

    const bottomSection = document.createElement('div')
    bottomSection.className = 'activitybar-bottom'

    const buttons = new Map<string, HTMLButtonElement>()

    const setActive = (id: string | null) => {
      this.#activeId = id
      buttons.forEach((button, buttonId) => {
        const item = ACTIVITY_ITEMS.find(entry => entry.id === buttonId)
        if (!item) return
        if (item.toggleTarget) return // 由显隐状态驱动
        button.classList.toggle('is-active', buttonId === id)
      })
    }

    ACTIVITY_ITEMS.forEach(item => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'activitybar-item'
      button.textContent = item.icon
      button.title = item.label
      button.setAttribute('aria-label', item.label)

      if (item.toggleTarget) {
        const update = (visible: boolean) => {
          button.classList.toggle('is-active', visible)
          button.setAttribute('aria-pressed', visible ? 'true' : 'false')
        }

        update(this.layoutModal.isVisible(item.toggleTarget))
        this.layoutModal.onDidChange(({ partId, visible }) => {
          if (partId === item.toggleTarget) update(visible)
        })

        button.onclick = () => this.layoutModal.toggle(item.toggleTarget!)
      } else {
        button.onclick = () => {
          if (this.#activeId === item.id) {
            setActive(null)
          } else {
            setActive(item.id)
          }
        }
      }

      buttons.set(item.id, button)
      if (item.section === 'top') {
        topSection.appendChild(button)
      } else {
        bottomSection.appendChild(button)
      }
    })

    setActive('explorer')

    this.node.appendChild(topSection)
    this.node.appendChild(bottomSection)

    this.bindVisibility()
  }
}
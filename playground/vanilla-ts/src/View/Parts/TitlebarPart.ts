import { IdMessageModal, IMessageModal } from '../../Modal'
import { Button } from '../../Widget'
import Part from './Part'
import di from '../../InstantiationService'

const TOGGLE_TARGETS = [
  { id: 'activitybar', label: '活动栏' },
  { id: 'sidebar', label: '侧边栏' },
  { id: 'panel', label: '底部面板' },
  { id: 'auxiliarybar', label: '辅助栏' },
  { id: 'footerbar', label: '状态栏' },
]

export default class TitlebarPart extends Part {
  create() {
    this.node.classList.add('titlebar-part')
    this.node.innerHTML = ''

    const title = document.createElement('div')
    title.className = 'title'
    title.textContent = 'VSCode 布局预览'

    const actions = document.createElement('div')
    actions.className = 'actions'

    this.node.appendChild(title)
    this.node.appendChild(actions)

    TOGGLE_TARGETS.forEach(({ id, label }) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.textContent = label
      button.dataset.partId = id
      button.onclick = () => this.layoutModal.toggle(id)

      const update = (visible: boolean) => {
        button.classList.toggle('is-inactive', !visible)
        button.setAttribute('aria-pressed', visible ? 'true' : 'false')
      }

      update(this.layoutModal.isVisible(id))
      this.layoutModal.onDidChange(({ partId, visible }) => {
        if (partId === id) update(visible)
      })

      actions.appendChild(button)
    })

    this.bindVisibility()

    new Button(actions, {
      label: 'message info',
      onClick: () => {
        console.log('message 测试')
        di.get<IMessageModal>(IdMessageModal).info('这是一个测试消息')
      },
    })
    new Button(actions, {
      label: 'message error',
      onClick: () => {
        console.log('message 测试')
        di.get<IMessageModal>(IdMessageModal).error('这是一个测试消息')
      },
    })
  }
}

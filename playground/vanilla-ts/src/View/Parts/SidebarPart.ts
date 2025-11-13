import Part from './Part'

export default class SidebarPart extends Part {
  create() {
    this.node.classList.add('sidebar-part')
    this.node.innerHTML = ''

    const header = document.createElement('div')
    header.className = 'part-header'

    const title = document.createElement('span')
    title.className = 'part-title'
    title.textContent = '资源管理器'

    const toggleButton = document.createElement('button')
    toggleButton.type = 'button'
    toggleButton.className = 'part-toggle'
    toggleButton.onclick = () => this.layoutModal.toggle('sidebar')

    header.appendChild(title)
    header.appendChild(toggleButton)

    const content = document.createElement('div')
    content.className = 'part-content'

    this.node.appendChild(header)
    this.node.appendChild(content)

    const update = (visible: boolean) => {
      toggleButton.textContent = visible ? '隐藏' : '显示'
    }

    update(this.layoutModal.isVisible('sidebar'))
    this.layoutModal.onDidChange(({ partId, visible }) => {
      if (partId === 'sidebar') update(visible)
    })

    this.renderViews(content)
    this.bindVisibility()
  }
}

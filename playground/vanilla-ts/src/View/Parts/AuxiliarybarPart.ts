import Part from './Part'

export default class AuxiliarybarPart extends Part {
  create() {
    this.node.classList.add('auxiliarybar-part')
    this.node.innerHTML = ''

    const header = document.createElement('div')
    header.className = 'part-header'

    const title = document.createElement('span')
    title.className = 'part-title'
    title.textContent = '辅助栏'

    const toggleButton = document.createElement('button')
    toggleButton.type = 'button'
    toggleButton.className = 'part-toggle'
    toggleButton.onclick = () => this.layoutModal.toggle('auxiliarybar')

    header.appendChild(title)
    header.appendChild(toggleButton)

    const content = document.createElement('div')
    content.className = 'part-content'

    this.node.appendChild(header)
    this.node.appendChild(content)

    const update = (visible: boolean) => {
      toggleButton.textContent = visible ? '隐藏' : '显示'
    }

    update(this.layoutModal.isVisible('auxiliarybar'))
    this.layoutModal.onDidChange(({ partId, visible }) => {
      if (partId === 'auxiliarybar') update(visible)
    })

    this.renderViews(content)

    if (!content.hasChildNodes()) {
      const placeholder = document.createElement('div')
      placeholder.className = 'component'
      placeholder.textContent = '🧭 辅助栏占位内容'
      content.appendChild(placeholder)
    }

    this.bindVisibility()
  }
}


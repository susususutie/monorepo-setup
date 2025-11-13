import Part from './Part'

export default class FooterbarPart extends Part {
  create() {
    this.node.classList.add('footerbar-part')
    this.node.innerHTML = ''

    const leftSection = document.createElement('div')
    leftSection.className = 'footer-section footer-left'

    const rightSection = document.createElement('div')
    rightSection.className = 'footer-section footer-right'

    const workspaces = document.createElement('span')
    workspaces.className = 'footer-indicator'
    workspaces.textContent = '🔰 Monorepo Playground'

    const gitStatus = document.createElement('span')
    gitStatus.className = 'footer-indicator'
    gitStatus.textContent = ' main'

    const panelToggle = document.createElement('button')
    panelToggle.type = 'button'
    panelToggle.className = 'footer-action'
    panelToggle.textContent = '面板'
    panelToggle.onclick = () => this.layoutModal.toggle('panel')

    const auxiliaryToggle = document.createElement('button')
    auxiliaryToggle.type = 'button'
    auxiliaryToggle.className = 'footer-action'
    auxiliaryToggle.textContent = '辅助栏'
    auxiliaryToggle.onclick = () => this.layoutModal.toggle('auxiliarybar')

    const clock = document.createElement('span')
    clock.className = 'footer-indicator'
    clock.textContent = new Date().toLocaleTimeString()

    const updatePanel = (visible: boolean) => {
      panelToggle.classList.toggle('is-active', visible)
    }
    const updateAuxiliary = (visible: boolean) => {
      auxiliaryToggle.classList.toggle('is-active', visible)
    }

    updatePanel(this.layoutModal.isVisible('panel'))
    updateAuxiliary(this.layoutModal.isVisible('auxiliarybar'))

    this.layoutModal.onDidChange(({ partId, visible }) => {
      if (partId === 'panel') updatePanel(visible)
      if (partId === 'auxiliarybar') updateAuxiliary(visible)
    })

    leftSection.appendChild(workspaces)
    leftSection.appendChild(gitStatus)

    rightSection.appendChild(auxiliaryToggle)
    rightSection.appendChild(panelToggle)
    rightSection.appendChild(clock)

    this.node.appendChild(leftSection)
    this.node.appendChild(rightSection)

    this.startClock(clock)
    this.bindVisibility()
  }

  private startClock(label: HTMLElement) {
    const update = () => {
      label.textContent = new Date().toLocaleTimeString()
    }
    update()
    setInterval(update, 1000)
  }
}


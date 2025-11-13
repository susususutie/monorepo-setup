export default class TerminalView {
  render(parent: HTMLElement) {
    const d = document.createElement('div')
    d.className = 'component'
    d.textContent = '🖥 TerminalView'
    parent.appendChild(d)
  }
}
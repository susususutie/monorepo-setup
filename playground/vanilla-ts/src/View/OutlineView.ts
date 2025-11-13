export default class OutlineView {
  render(parent: HTMLElement) {
    const d = document.createElement('div')
    d.className = 'component'
    d.textContent = '📄 OutlineView'
    parent.appendChild(d)
  }
}

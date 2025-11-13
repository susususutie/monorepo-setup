/* ---------- 通用 Button Widget（无 DI、无单例） ---------- */
export default class Button {
  node: HTMLButtonElement
  constructor(container: HTMLElement, opts: { label: string; onClick: () => void }) {
    this.node = document.createElement('button')
    this.node.textContent = opts.label
    this.node.onclick = opts.onClick
    container.appendChild(this.node)
  }
  dispose() {
    this.node.remove()
    this.node.onclick = null
  }
}

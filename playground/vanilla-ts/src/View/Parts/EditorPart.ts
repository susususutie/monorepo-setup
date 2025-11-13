import Part from './Part'

export default class EditorPart extends Part {
  create() {
    this.node.classList.add('editor-part')
    this.node.innerHTML = ''

    this.renderViews(this.node)

    if (!this.node.hasChildNodes()) {
      const placeholder = document.createElement('div')
      placeholder.className = 'editor-placeholder'
      placeholder.textContent = '打开文件以查看内容'
      this.node.appendChild(placeholder)
    }
  }
}

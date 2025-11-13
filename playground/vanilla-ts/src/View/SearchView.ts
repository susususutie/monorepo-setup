export default class SearchView {
  render(parent: HTMLElement) {
    const d = document.createElement('div')
    d.className = 'component'
    d.textContent = '🔍 SearchView'
    parent.appendChild(d)
  }
}
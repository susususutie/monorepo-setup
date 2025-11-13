import { ICountModal, ID_COUNT_MODAL } from '../Modal'
import { type IView } from './View'

export default class ButtonView implements IView {
  static deps = [ID_COUNT_MODAL]
  element: HTMLButtonElement
  modal: ICountModal
  constructor(modal: ICountModal) {
    this.element = document.createElement('button')
    this.modal = modal

    this.element.textContent = `${this.modal.count}`
    this.element.onclick = () => this.modal.increment()
    this.modal.onDidChange(count => {
      this.element.textContent = `${count}`
    })
  }

  render(parent: HTMLElement) {
    parent.appendChild(this.element)
  }
}

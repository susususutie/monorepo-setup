import Registry from '../Registry'
import ViewDescriptor from '../ViewDescriptor'
import di from '../../InstantiationService'
import type { ILayoutModal } from '../../Modal/LayoutModal'
import { IdLayoutModal } from '../../Modal/LayoutModal'
import type { IView } from '../View.ts'

export interface IPart {
  node: HTMLElement
  create: () => void
}

/**
 * Part 基类
 */
export default class Part implements IPart {
  node: HTMLElement
  protected readonly layoutModal: ILayoutModal
  constructor(node: HTMLElement) {
    this.node = node
    this.layoutModal = di.get<ILayoutModal>(IdLayoutModal)
  }
  protected bindVisibility(partId: string = this.node.id) {
    const apply = (visible: boolean) => {
      this.node.classList.toggle('is-hidden', !visible)
      if (!visible) {
        this.node.setAttribute('aria-hidden', 'true')
      } else {
        this.node.removeAttribute('aria-hidden')
      }
    }
    apply(this.layoutModal.isVisible(partId))
    this.layoutModal.onDidChange(({ partId: changedId, visible }) => {
      if (changedId === partId) apply(visible)
    })
  }
  protected renderViews(container: HTMLElement) {
    Registry.as(ViewDescriptor.Views)
      .filter((d: any) => d.containerId === this.node.id)
      .forEach((d: any) => {
        const view = di.createInstance<IView>(d.ctor)
        view.render(container, ...(d.extra || []))
      })
  }
  create() {
    this.node.innerHTML = ''
    this.renderViews(this.node)
  }
}

import Registry from '../Registry'
import ViewDescriptor from '../ViewDescriptor'
import { modalManager } from '../../Modal'

export interface IPart {
  node: HTMLElement
  create: () => void
}

/**
 * Part 基类
 */
export default class Part implements IPart {
  node: HTMLElement
  constructor(node: HTMLElement) {
    this.node = node
  }
  create() {
    // 找到当前 part 下的所有视图，统一渲染
    Registry.as(ViewDescriptor.Views)
      .filter((d: any) => d.containerId === this.node.id)
      .forEach((d: any) => {
        const view = modalManager.createInstance(d.ctor)
        view.render(this.node, ...(d.extra || []))
      })
  }
}

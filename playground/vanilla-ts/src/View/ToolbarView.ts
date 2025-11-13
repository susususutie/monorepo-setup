import { Button } from '../Widget'
import type { IView } from './View'

export default class ToolbarView implements IView {
  container: HTMLElement
  children: Button[]
  constructor(container: HTMLElement) {
    this.container = container
    this.children = [] // 保存子 Widget 引用
  }
  render() {
    // 每次刷新都重新创建按钮
    this.children.forEach(c => c.dispose())
    this.children.length = 0

    const saveBtn = new Button(this.container, {
      label: 'Save',
      onClick: () => console.log('Saved'),
    })
    this.children.push(saveBtn)

    const delBtn = new Button(this.container, {
      label: 'Delete',
      onClick: () => console.log('Deleted'),
    })
    this.children.push(delBtn)
  }
  dispose() {
    this.children.forEach(c => c.dispose())
  }
}

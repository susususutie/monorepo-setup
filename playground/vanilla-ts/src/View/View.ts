export interface IView {
  render(parent: HTMLElement, ...args: any[]): void
}

export default class View implements IView {
  static deps: symbol[] = []
  constructor() {}
  render(_parent: HTMLElement, ..._args: any[]) {}
}

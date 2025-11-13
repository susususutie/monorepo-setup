export interface IView {
  render(parent: HTMLElement): void
}

export default class View implements IView {
  static deps: symbol[] = []
  constructor() {}
  render(parent: HTMLElement) {
  }
}

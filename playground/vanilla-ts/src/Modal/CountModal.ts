export interface ICountModal {
  count: number
  increment: () => void
  decrement: () => void
  onDidChange: (l: (count: number) => void) => void
  offDidChange: (fn: (count: number) => void) => void
}

export const IdCountModal = Symbol('CountModal')

export default class CountModal implements ICountModal {
  _count: number = 0
  _listeners: ((count: number) => void)[] = []
  constructor() {}
  get count() {
    return this._count
  }
  set count(value: number) {
    this._count = value
  }
  increment() {
    this._count++
    this._fire()
  }
  decrement() {
    this._count--
    this._fire()
  }
  _fire() {
    this._listeners.forEach(l => l(this._count))
  }
  onDidChange(l: (count: number) => void) {
    this._listeners.push(l)
  }
  offDidChange(fn: (count: number) => void) {
    this._listeners = this._listeners.filter(l => l !== fn)
  }
}

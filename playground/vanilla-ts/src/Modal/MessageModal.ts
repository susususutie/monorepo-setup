export const IdMessageModal = Symbol('MessageModal')

export interface IMessageModal {
  info(message: string): void
  error(message: string): void
  show(severity: string, message: string, sticky?: boolean): number
  hide(id: number): void
  onDidChange(addListener: (item: { id: number; severity: string; message: string; sticky: boolean }) => void, removeListener: (id: number) => void): void
  }

export default class MessageModal implements IMessageModal {
  _counter: number = 0
  _list: { id: number; severity: string; message: string; sticky: boolean }[] = []
  _listeners: {
    add: (item: { id: number; severity: string; message: string; sticky: boolean }) => void
    remove: (id: number) => void
  }[] = []
  constructor() {
    this._counter = 0
    this._list = []
    this._listeners = []
  }
  show(severity: string, message: string, sticky: boolean = false) {
    const id = ++this._counter
    const item = { id, severity, message, sticky }
    this._list.push(item)
    this._fire(item)
    if (!sticky) {
      setTimeout(() => this.hide(id), 3000)
    }
    return id
  }
  info(message: string) {
    this.show('info', message, false)
  }
  error(message: string) {
    this.show('error', message, false)
  }
  hide(id: number) {
    const idx = this._list.findIndex(i => i.id === id)
    if (idx === -1) return
    this._list.splice(idx, 1)
    this._fire(null, id)
  }
  onDidChange(
    addListener: (item: { id: number; severity: string; message: string; sticky: boolean }) => void,
    removeListener: (id: number) => void
  ) {
    this._listeners.push({ add: addListener, remove: removeListener })
  }
  _fire(added: { id: number; severity: string; message: string; sticky: boolean } | null, removedId?: number) {
    this._listeners.forEach(l => {
      if (added) l.add(added)
      if (removedId) l.remove(removedId)
    })
  }
}

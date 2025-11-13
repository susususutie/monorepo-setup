export type LayoutPartId = string

export interface LayoutVisibilityChangeEvent {
  partId: LayoutPartId
  visible: boolean
}

export interface ILayoutModal {
  isVisible(partId: LayoutPartId): boolean
  setVisible(partId: LayoutPartId, visible: boolean): void
  toggle(partId: LayoutPartId): void
  onDidChange(listener: (event: LayoutVisibilityChangeEvent) => void): () => void
}

export const IdLayoutModal = Symbol('LayoutModal')

export default class LayoutModal implements ILayoutModal {
  private readonly _state = new Map<LayoutPartId, boolean>()
  private readonly _listeners = new Set<(event: LayoutVisibilityChangeEvent) => void>()

  isVisible(partId: LayoutPartId): boolean {
    if (!this._state.has(partId)) {
      this._state.set(partId, true)
    }
    return this._state.get(partId)!
  }

  setVisible(partId: LayoutPartId, visible: boolean) {
    const previous = this._state.get(partId)
    if (previous === visible) return

    this._state.set(partId, visible)
    this._emit({ partId, visible })
  }

  toggle(partId: LayoutPartId) {
    const next = !this.isVisible(partId)
    this.setVisible(partId, next)
  }

  onDidChange(listener: (event: LayoutVisibilityChangeEvent) => void): () => void {
    this._listeners.add(listener)
    return () => this._listeners.delete(listener)
  }

  private _emit(event: LayoutVisibilityChangeEvent) {
    this._listeners.forEach(listener => listener(event))
  }
}



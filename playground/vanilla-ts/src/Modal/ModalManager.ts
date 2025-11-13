class ModalManager {
  private _ctor: Map<symbol, any>
  private _inst: Map<symbol, any>
  constructor() {
    this._ctor = new Map()
    this._inst = new Map()
  }
  register(id: symbol, cls: any) {
    this._ctor.set(id, cls)
  }
  get(id: symbol) {
    if (!this._inst.has(id)) {
      const Cls = this._ctor.get(id)
      const args = (Cls.deps || []).map((dep: symbol) => this.get(dep)) // 递归
      this._inst.set(id, new Cls(...args))
    }
    return this._inst.get(id)
  }
  createInstance(Cls: any) {
    // 实例化任意类
    const args = (Cls.deps || []).map((dep: symbol) => this.get(dep))
    return new Cls(...args)
  }
}

const modalManager = new ModalManager()
export default modalManager

type LifecycleKind = 'Delayed' | 'Eager' | 'Transient'
type Identifier = string | symbol

interface RegistrationDescriptor {
  cls: any
  type: LifecycleKind
}

class InstantiationService {
  private readonly _singleton: Map<Identifier, unknown>
  private readonly _registry: Map<Identifier, RegistrationDescriptor>

  constructor() {
    this._singleton = new Map()
    this._registry = new Map()
  }

  register(id: Identifier, cls: any, type: LifecycleKind = 'Delayed') {
    if (!cls) {
      throw new Error(`InstantiationService.register: 无效的类，id=${String(id)}`)
    }

    this._registry.set(id, { cls, type })

    if (type === 'Eager') {
      this._singleton.set(id, this._instantiate(cls))
    } else if (type === 'Transient') {
      this._singleton.delete(id)
    }

    return this
  }

  get<T = unknown>(id: Identifier): T {
    const descriptor = this._registry.get(id)
    if (!descriptor) {
      throw new Error(`InstantiationService.get: 未注册的 id=${String(id)}`)
    }

    const { cls, type } = descriptor

    if (type === 'Transient') {
      return this._instantiate(cls)
    }

    if (!this._singleton.has(id)) {
      this._singleton.set(id, this._instantiate(cls))
    }

    return this._singleton.get(id) as T
  }

  createInstance<T = unknown>(Cls: any): T {
    if (!Cls) {
      throw new Error('InstantiationService.createInstance: 无效的类')
    }
    return this._instantiate(Cls)
  }

  private _instantiate<T>(Cls: any): T {
    const deps: Identifier[] = Array.isArray(Cls.deps) ? Cls.deps : []
    const args = deps.map((dep) => this.get(dep))
    return new Cls(...args)
  }
}

const instantiationService = new InstantiationService()
export default instantiationService

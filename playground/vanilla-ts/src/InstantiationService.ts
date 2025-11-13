export enum InstantiationType {
  Delayed = 'Delayed',
  Eager = 'Eager',
  Transient = 'Transient',
}

type Identifier = symbol | string

/**
 * 全局单例
 * @example
 *
 * di.register(IThemeService, ThemeService, InstantiationType.Delayed); // 懒加载
 * di.register(IOutputService, OutputService, InstantiationType.Eager); // 立即初始化
 */
class InstantiationService {
  /** 单例实例 (Delayed / Eager) */
  private readonly _singleton: Map<Identifier, unknown>
  /** 注册表, id → {cls, type} */
  private readonly _registry: Map<Identifier, { cls: any; type: InstantiationType }>
  constructor() {
    this._singleton = new Map()
    this._registry = new Map()
  }
  register(id: Identifier, cls: any, type: InstantiationType = InstantiationType.Delayed) {
    if (!cls) {
      throw new Error(`InstantiationService.register: 无效的类，id=${String(id)}`)
    }
    this._registry.set(id, { cls, type })
    if (type === InstantiationType.Eager) {
      this._singleton.set(id, this._instantiate(cls))
    } else if (type === InstantiationType.Transient) {
      this._singleton.delete(id)
    }
  }
  /* 关键：根据策略决定「是否缓存」 */
  get<T = unknown>(id: Identifier): T {
    const descriptor = this._registry.get(id)
    if (!descriptor) {
      throw new Error(`InstantiationService.get: 未注册的 id=${String(id)}`)
    }
    const { cls, type } = descriptor
    if (type === InstantiationType.Transient) {
      // 每次全新实例
      return this._instantiate(cls)
    }
    // 单例逻辑（Delayed 懒加载 / Eager 立即）
    if (!this._singleton.has(id)) {
      this._singleton.set(id, this._instantiate(cls))
    }
    return this._singleton.get(id) as T
  }
  /* 任意类递归注入（不经过注册表，总是瞬态） */
  createInstance<T = unknown>(Cls: any, ...rest: unknown[]): T {
    if (!Cls) {
      throw new Error('InstantiationService.createInstance: 无效的类')
    }
    return this._instantiate(Cls, rest)
  }
  private _instantiate<T>(Cls: any, extra: unknown[] = []): T {
    const deps: Identifier[] = Array.isArray(Cls.deps) ? Cls.deps : []
    const resolved = deps.map(dep => this.get(dep))
    return new Cls(...resolved, ...extra)
  }
}

export default new InstantiationService()

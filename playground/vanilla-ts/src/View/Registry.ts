/**
 * 全局 Registry
 */
export default class Registry {
  static #data = new Map()
  static as(id: string) {
    if (!this.#data.has(id)) this.#data.set(id, [])
    return this.#data.get(id)
  }
  static dump() {
    return [...this.#data.entries()]
  }
}

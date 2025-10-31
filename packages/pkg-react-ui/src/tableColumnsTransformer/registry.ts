import { type AnyObject, type AntdColumnType, type ValueType, type ValueParams, type ColumnTransformer } from './types'

// Transformer 注册表
const valueTypeRegistry = new Map<string, ColumnTransformer>()

// 类型安全的注册表接口
interface TypedRegistry {
  get<T extends string>(valueType: T): ColumnTransformer | undefined
  set<T extends string>(valueType: T, transformer: ColumnTransformer): void
  has<T extends string>(valueType: T): boolean
  delete<T extends string>(valueType: T): boolean
  keys(): string[]
}

const typedRegistry = valueTypeRegistry as unknown as TypedRegistry

// 获取 transformer
export function getTransformer<T extends string>(valueType: T): ColumnTransformer | undefined {
  return typedRegistry.get(valueType)
}

// 类型安全的注册 transformer
export function registerTransformer<T extends string>(valueType: T, transformer: ColumnTransformer): void {
  if (typeof valueType !== 'string' || valueType.trim() === '') {
    throw new Error('valueType 必须是非空字符串')
  }
  if (typeof transformer !== 'function') {
    throw new Error('transformer 必须是函数')
  }
  typedRegistry.set(valueType, transformer)
}

// 注销 transformer
export function unregisterTransformer<T extends string = string>(valueType: T): boolean {
  return typedRegistry.delete(valueType)
}

// 获取所有已注册的 transformer 类型
export function getRegisteredTypes(): string[] {
  return typedRegistry.keys()
}

// 检查是否已注册某个 transformer
export function hasTransformer<T extends string = string>(valueType: T): boolean {
  return typedRegistry.has(valueType)
}

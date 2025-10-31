import { moneyTransformer } from './transformer/money'
import { dateTransformer } from './transformer/date'
import { statusTransformer } from './transformer/status'
import { numberTransformer } from './transformer/number'
import { booleanTransformer } from './transformer/boolean'
import { ellipsisTransformer } from './transformer/ellipsis'
import { registerTransformer } from './registry'
// 已验证无误
import { textValueType, textTransformer } from './transformer/text'
import { ColumnTransformer, ValueType } from './types'

function registerBuiltinTransformers(): void {
  const builtinTransformers = {
    money: moneyTransformer,
    currency: moneyTransformer, // 别名
    date: dateTransformer,
    datetime: dateTransformer, // 别名
    status: statusTransformer,
    number: numberTransformer,
    boolean: booleanTransformer,
    bool: booleanTransformer, // 别名
    ellipsis: ellipsisTransformer,
    [textValueType]: textTransformer,
  }

  Object.entries(builtinTransformers).forEach(([key, transformer]) => {
    registerTransformer(key as ValueType, transformer as ColumnTransformer)
  })
}

registerBuiltinTransformers()

// 导出核心功能
export { default as tableColumnsTransformer } from './transformer'

// 导出注册相关功能
export { registerTransformer } from './registry'

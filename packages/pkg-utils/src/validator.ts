/**
 * 数据验证器
 */

import type { ValidatorRule } from './types'

/**
 * 通用验证器类
 */
export class Validator<T> {
  private rules: Record<keyof T, ValidatorRule<any>[]> = {} as Record<keyof T, ValidatorRule<any>[]>

  /**
   * 添加验证规则
   */
  addRule<K extends keyof T>(field: K, rule: ValidatorRule<T[K]>): this {
    if (!this.rules[field]) {
      this.rules[field] = []
    }
    this.rules[field].push(rule)
    return this
  }

  /**
   * 执行验证
   */
  validate(data: T): { valid: boolean; errors: Record<string, string[]> } {
    const errors: Record<string, string[]> = {}
    
    for (const field in this.rules) {
      const fieldRules = this.rules[field]
      const value = data[field]
      const fieldErrors: string[] = []
      
      for (const rule of fieldRules) {
        if (rule.required && (value === undefined || value === null || value === '')) {
          fieldErrors.push(`${String(field)}是必填项`)
          continue
        }
        
        if (value !== undefined && value !== null) {
          if (rule.min !== undefined && String(value).length < rule.min) {
            fieldErrors.push(`${String(field)}至少需要${rule.min}个字符`)
          }
          
          if (rule.max !== undefined && String(value).length > rule.max) {
            fieldErrors.push(`${String(field)}最多${rule.max}个字符`)
          }
          
          if (rule.pattern && !rule.pattern.test(String(value))) {
            fieldErrors.push(`${String(field)}格式不正确`)
          }
          
          if (rule.validator) {
            const result = rule.validator(value)
            if (typeof result === 'string') {
              fieldErrors.push(result)
            } else if (!result) {
              fieldErrors.push(`${String(field)}不符合要求`)
            }
          }
        }
      }
      
      if (fieldErrors.length > 0) {
        errors[String(field)] = fieldErrors
      }
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    }
  }
}

/**
 * 创建验证器实例
 */
export function createValidator<T>(): Validator<T> {
  return new Validator<T>()
}
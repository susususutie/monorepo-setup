/**
 * 数据验证器使用示例
 * 演示 pkg-utils 中数据验证相关功能的实际使用场景
 */

import { createValidator } from 'pkg-utils'

// 实际场景：用户注册表单验证
interface UserRegistration {
  username: string
  email: string
  password: string
  age: number
}

const userValidator = createValidator<UserRegistration>()
  .addRule('username', { required: true, min: 3, max: 20 })
  .addRule('email', { 
    required: true, 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  })
  .addRule('password', { 
    required: true, 
    min: 8,
    validator: (value) => {
      if (!/(?=.*[a-z])/.test(value)) return '密码必须包含小写字母'
      if (!/(?=.*[A-Z])/.test(value)) return '密码必须包含大写字母'
      if (!/(?=.*\d)/.test(value)) return '密码必须包含数字'
      return true
    }
  })
  .addRule('age', { required: true, min: 18, max: 100 })

// 测试数据
const validUser = {
  username: 'johndoe',
  email: 'john@example.com',
  password: 'SecurePass123',
  age: 25
}

const invalidUser = {
  username: 'jo', // 太短
  email: 'invalid-email', // 格式错误
  password: 'weak', // 不符合要求
  age: 16 // 小于最小值
}

// 验证有效用户
const validResult = userValidator.validate(validUser)
console.log('有效用户验证:', validResult.valid ? '通过' : '失败')

// 验证无效用户
const invalidResult = userValidator.validate(invalidUser)
console.log('无效用户验证:', invalidResult.valid ? '通过' : '失败')

if (!invalidResult.valid) {
  console.log('验证错误:')
  Object.entries(invalidResult.errors).forEach(([field, errors]) => {
    console.log(`  ${field}: ${errors.join(', ')}`)
  })
}

// 实际场景：商品信息验证
interface Product {
  name: string
  price: number
  category: string
}

const productValidator = createValidator<Product>()
  .addRule('name', { required: true, min: 2, max: 100 })
  .addRule('price', { 
    required: true, 
    min: 0,
    validator: (value) => value > 0 ? true : '价格必须大于0'
  })
  .addRule('category', { 
    required: true,
    validator: (value) => {
      const validCategories = ['电子产品', '服装', '书籍', '家居']
      return validCategories.includes(value) ? true : '无效的商品分类'
    }
  })

const product = {
  name: 'iPhone 15',
  price: 6999,
  category: '电子产品'
}

const productResult = productValidator.validate(product)
console.log('\n商品验证:', productResult.valid ? '通过' : '失败')

// 实际场景：表单数据验证
const formData = {
  username: '',
  email: 'test@example.com',
  password: 'TestPass123',
  age: 25
}

const formResult = userValidator.validate(formData)
if (!formResult.valid) {
  console.log('\n表单验证失败:')
  Object.entries(formResult.errors).forEach(([field, errors]) => {
    console.log(`${field}: ${errors.join(', ')}`)
  })
}
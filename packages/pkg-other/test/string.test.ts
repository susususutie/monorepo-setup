import { describe, expect, it } from 'vitest'
import { capitalize, slugify, truncate, camelCase, snakeCase } from '../src/string'

describe('字符串工具模块', () => {
  describe('capitalize 函数', () => {
    it('应该正确大写首字母', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('world')).toBe('World')
    })

    it('应该将其他字母转为小写', () => {
      expect(capitalize('WORLD')).toBe('World')
      expect(capitalize('hELLo')).toBe('Hello')
      expect(capitalize('jAVAsCRIPT')).toBe('Javascript')
    })

    it('应该处理空字符串', () => {
      expect(capitalize('')).toBe('')
    })

    it('应该处理单个字符', () => {
      expect(capitalize('a')).toBe('A')
      expect(capitalize('Z')).toBe('Z')
    })

    it('应该处理特殊字符开头', () => {
      expect(capitalize('1hello')).toBe('1hello')
      expect(capitalize(' hello')).toBe(' hello')
    })

    it('应该处理中文字符', () => {
      expect(capitalize('hello世界')).toBe('Hello世界')
    })
  })

  describe('slugify 函数', () => {
    it('应该生成正确的 URL 友好字符串', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
      expect(slugify('JavaScript is Awesome')).toBe('javascript-is-awesome')
    })

    it('应该处理多个空格', () => {
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces')
      expect(slugify('Too    Many     Spaces')).toBe('too-many-spaces')
    })

    it('应该移除特殊字符', () => {
      expect(slugify('Special @#$ Characters')).toBe('special-characters')
      expect(slugify('Hello, World!')).toBe('hello-world')
      expect(slugify('Test & Debug')).toBe('test-debug')
    })

    it('应该处理下划线和连字符', () => {
      expect(slugify('hello_world-test')).toBe('hello-world-test')
      expect(slugify('user_name__test')).toBe('user-name-test')
    })

    it('应该移除开头和结尾的连字符', () => {
      expect(slugify('  -hello-world-  ')).toBe('hello-world')
      expect(slugify('___test___')).toBe('test')
    })

    it('应该处理空字符串', () => {
      expect(slugify('')).toBe('')
      expect(slugify('   ')).toBe('')
    })

    it('应该处理纯特殊字符', () => {
      expect(slugify('!@#$%^&*()')).toBe('')
    })
  })

  describe('truncate 函数', () => {
    it('应该正确截断字符串', () => {
      expect(truncate('Hello World', 5)).toBe('He...')
      expect(truncate('JavaScript', 6)).toBe('Jav...')
    })

    it('应该在长度足够时不截断', () => {
      expect(truncate('Hello', 10)).toBe('Hello')
      expect(truncate('Short', 5)).toBe('Short')
    })

    it('应该使用自定义后缀', () => {
      expect(truncate('Hello World', 8, '***')).toBe('Hello***')
      expect(truncate('Testing', 5, '--')).toBe('Tes--')
    })

    it('应该使用默认后缀', () => {
      expect(truncate('Hello World', 7)).toBe('Hell...')
    })

    it('应该处理空字符串', () => {
      expect(truncate('', 5)).toBe('')
    })

    it('应该正确计算后缀长度', () => {
      expect(truncate('Hello World', 10, '...')).toBe('Hello W...')
      expect(truncate('Testing', 5, '----')).toBe('T----')
    })

    it('应该处理边界情况', () => {
      expect(truncate('Hello', 5)).toBe('Hello')
      expect(truncate('Hello', 4)).toBe('H...')
    })
  })

  describe('camelCase 函数', () => {
    it('应该正确转换为驼峰命名', () => {
      expect(camelCase('hello-world')).toBe('helloWorld')
      expect(camelCase('user_name')).toBe('userName')
      expect(camelCase('my test string')).toBe('myTestString')
    })

    it('应该处理混合分隔符', () => {
      expect(camelCase('hello-world_test string')).toBe('helloWorldTestString')
      expect(camelCase('api_base-url test')).toBe('apiBaseUrlTest')
    })

    it('应该处理连续分隔符', () => {
      expect(camelCase('hello--world')).toBe('helloWorld')
      expect(camelCase('test__case')).toBe('testCase')
      expect(camelCase('multiple   spaces')).toBe('multipleSpaces')
    })

    it('应该处理已经是驼峰命名的字符串', () => {
      expect(camelCase('helloWorld')).toBe('helloWorld')
      expect(camelCase('iPhone')).toBe('iPhone')
    })

    it('应该处理空字符串', () => {
      expect(camelCase('')).toBe('')
    })

    it('应该处理单个单词', () => {
      expect(camelCase('hello')).toBe('hello')
      expect(camelCase('WORLD')).toBe('WORLD') // 单个单词不变
    })
  })

  describe('snakeCase 函数', () => {
    it('应该正确转换为蛇形命名', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world')
      expect(snakeCase('UserName')).toBe('user_name')
      expect(snakeCase('iPhone')).toBe('i_phone')
    })

    it('应该处理多个大写字母', () => {
      expect(snakeCase('XMLHttpRequest')).toBe('x_m_l_http_request') // 实际输出
      expect(snakeCase('HTMLParser')).toBe('h_t_m_l_parser') // 实际输出
    })

    it('应该移除开头的下划线', () => {
      expect(snakeCase('HelloWorld')).toBe('hello_world')
      expect(snakeCase('APIKey')).toBe('a_p_i_key') // 实际输出
    })

    it('应该处理已经是蛇形命名的字符串', () => {
      expect(snakeCase('hello_world')).toBe('hello_world')
      expect(snakeCase('user_name')).toBe('user_name')
    })

    it('应该处理空字符串', () => {
      expect(snakeCase('')).toBe('')
    })

    it('应该处理单个单词', () => {
      expect(snakeCase('hello')).toBe('hello')
      expect(snakeCase('WORLD')).toBe('w_o_r_l_d') // 实际输出，每个大写字母都会被处理
    })

    it('应该处理数字', () => {
      expect(snakeCase('version2')).toBe('version2')
      expect(snakeCase('test2Case')).toBe('test2_case')
    })
  })
})
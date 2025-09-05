/**
 * 字符串处理工具函数使用示例
 * 演示 pkg-utils 中字符串处理相关功能的实际使用场景
 */

import { capitalize, slugify, truncate, camelCase, snakeCase } from 'pkg-utils'

// 实际场景：用户输入格式化
const userName = 'john doe'
const formattedName = capitalize(userName)
console.log('用户名格式化:', formattedName)

// 实际场景：生成 URL 友好的 slug
const articleTitle = 'Introduction to JavaScript!'
const urlSlug = slugify(articleTitle)
console.log('文章标题:', articleTitle)
console.log('URL slug:', urlSlug)

// 实际场景：文章摘要截断
const longText = '这是一篇非常长的文章内容，需要在列表页面中显示摘要。它包含了很多详细的信息和描述。'
const summary = truncate(longText, 30)
console.log('原文:', longText)
console.log('摘要:', summary)

// 实际场景：API 字段转换
const apiField = 'user_profile_data'
const jsProperty = camelCase(apiField)
console.log('API 字段:', apiField)
console.log('JS 属性:', jsProperty)

// 实际场景：数据库字段转换
const jsVar = 'firstName'
const dbField = snakeCase(jsVar)
console.log('JS 变量:', jsVar)
console.log('数据库字段:', dbField)

// 综合场景：博客文章处理
const blogPost = {
  title: 'Getting Started with React',
  content: 'React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components...'
}

const processedPost = {
  title: capitalize(blogPost.title.toLowerCase()),
  slug: slugify(blogPost.title),
  excerpt: truncate(blogPost.content, 80),
  wordCount: blogPost.content.split(' ').length
}

console.log('\n处理后的博客文章:')
console.log('标题:', processedPost.title)
console.log('Slug:', processedPost.slug)
console.log('摘要:', processedPost.excerpt)
console.log('字数:', processedPost.wordCount)
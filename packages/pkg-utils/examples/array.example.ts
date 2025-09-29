/**
 * 数组处理工具函数使用示例
 * 演示 pkg-utils 中数组处理相关功能的实际使用场景
 */

import { unique, groupBy, chunk, shuffle } from '@monorepo-setup/pkg-utils'

// 实际场景：处理用户标签数据
const userTags = ['前端', '后端', '前端', 'UI', '后端', '测试', 'UI']
const uniqueTags = unique(userTags)
console.log('去重后的标签:', uniqueTags)

// 实际场景：按部门分组员工
interface Employee {
  name: string
  department: string
}

const employees: Employee[] = [
  { name: '张三', department: '技术部' },
  { name: '李四', department: '销售部' },
  { name: '王五', department: '技术部' },
  { name: '赵六', department: '销售部' }
]

const groupedByDept = groupBy(employees, 'department')
console.log('按部门分组:', groupedByDept)

// 实际场景：分页处理大量数据
const largeDataset = Array.from({ length: 23 }, (_, i) => i + 1)
const pages = chunk(largeDataset, 5) // 每页5条
console.log(`数据分为 ${pages.length} 页，每页最多 5 条`)
console.log('第一页:', pages[0])
console.log('最后一页:', pages[pages.length - 1])

// 实际场景：随机推荐功能
const products = ['商品A', '商品B', '商品C', '商品D', '商品E']
const recommendations = shuffle(products).slice(0, 3)
console.log('随机推荐 3 个商品:', recommendations)
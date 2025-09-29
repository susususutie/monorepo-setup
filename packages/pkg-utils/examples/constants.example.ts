/**
 * 基础常量定义使用示例
 * 演示 pkg-utils 中常量相关功能的实际使用场景
 */

import { CONFIG, Status, Priority } from '@monorepo-setup/pkg-utils'

// 实际场景：使用应用配置
console.log('应用配置:')
console.log('API 地址:', CONFIG.API_BASE_URL)
console.log('请求超时:', CONFIG.TIMEOUT)
console.log('应用版本:', CONFIG.VERSION)
console.log('缓存功能:', CONFIG.FEATURES.ENABLE_CACHE ? '启用' : '禁用')

// 实际场景：任务状态管理
interface Task {
  id: number
  name: string
  status: Status
}

const tasks: Task[] = [
  { id: 1, name: '完成项目文档', status: Status.SUCCESS },
  { id: 2, name: '代码审查', status: Status.PENDING },
  { id: 3, name: '部署上线', status: Status.ERROR }
]

console.log('\n任务状态:')
tasks.forEach(task => {
  let statusText = ''
  switch (task.status) {
    case Status.PENDING:
      statusText = '等待中'
      break
    case Status.SUCCESS:
      statusText = '已完成'
      break
    case Status.ERROR:
      statusText = '错误'
      break
    case Status.CANCELLED:
      statusText = '已取消'
      break
  }
  console.log(`任务 ${task.id}: ${task.name} - ${statusText}`)
})

// 实际场景：优先级管理
interface Bug {
  id: string
  title: string
  priority: Priority
}

const bugs: Bug[] = [
  { id: 'BUG-001', title: '系统崩溃', priority: Priority.URGENT },
  { id: 'BUG-002', title: '界面显示问题', priority: Priority.LOW },
  { id: 'BUG-003', title: '性能问题', priority: Priority.HIGH }
]

// 按优先级排序
const sortedBugs = bugs.sort((a, b) => b.priority - a.priority)

console.log('\nBug 优先级排序:')
sortedBugs.forEach(bug => {
  let priorityText = ''
  switch (bug.priority) {
    case Priority.LOW:
      priorityText = '低'
      break
    case Priority.MEDIUM:
      priorityText = '中'
      break
    case Priority.HIGH:
      priorityText = '高'
      break
    case Priority.URGENT:
      priorityText = '紧急'
      break
  }
  console.log(`${bug.id}: ${bug.title} [优先级: ${priorityText}]`)
})

// 实际场景：根据配置初始化服务
function initializeApp() {
  console.log('\n初始化应用...')
  console.log(`连接到 API: ${CONFIG.API_BASE_URL}`)
  console.log(`超时设置: ${CONFIG.TIMEOUT}ms`)
  
  if (CONFIG.FEATURES.ENABLE_CACHE) {
    console.log('启用缓存功能')
  }
  
  if (CONFIG.FEATURES.ENABLE_LOGGING) {
    console.log('启用日志功能')
  }
  
  console.log(`应用版本: ${CONFIG.VERSION}`)
}

initializeApp()
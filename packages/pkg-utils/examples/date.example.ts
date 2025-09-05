/**
 * 日期处理工具函数使用示例
 * 演示 pkg-utils 中日期处理相关功能的实际使用场景
 */

import { formatDate, isWeekend, addDays, diffInDays, getDaysInMonth } from 'pkg-utils'

// 实际场景：日期格式化显示
const now = new Date()
console.log('当前日期:', formatDate(now, 'YYYY-MM-DD'))
console.log('当前时间:', formatDate(now, 'YYYY-MM-DD HH:mm:ss'))

const birthday = new Date('1990-06-15')
console.log('生日格式:', formatDate(birthday, 'MM月DD日'))

// 实际场景：工作日判断
const today = new Date()
const tomorrow = addDays(today, 1)

console.log('今天是否周末:', isWeekend(today) ? '是' : '不是')
console.log('明天是否周末:', isWeekend(tomorrow) ? '是' : '不是')

// 实际场景：任务截止日期
const taskStart = new Date('2024-01-01')
const deadline = addDays(taskStart, 30) // 30天后
console.log('任务开始:', formatDate(taskStart))
console.log('任务截止:', formatDate(deadline))

// 实际场景：计算日期间隔
const projectStart = new Date('2024-01-01')
const projectEnd = new Date('2024-03-31')
const duration = diffInDays(projectStart, projectEnd)
console.log(`项目周期: ${duration} 天`)

// 实际场景：月份天数查询
const currentYear = new Date().getFullYear()
const februaryDays = getDaysInMonth(currentYear, 2)
console.log(`${currentYear}年二月有 ${februaryDays} 天`)

// 综合场景：生日提醒
function getBirthdayReminder(birthday: Date) {
  const today = new Date()
  const thisYear = today.getFullYear()
  const birthdayThisYear = new Date(thisYear, birthday.getMonth(), birthday.getDate())
  
  if (birthdayThisYear < today) {
    // 今年生日已过，计算下年的
    birthdayThisYear.setFullYear(thisYear + 1)
  }
  
  const daysUntil = diffInDays(today, birthdayThisYear)
  return `距离下次生日还有 ${daysUntil} 天`
}

console.log(getBirthdayReminder(new Date('1990-12-25')))

// 实际场景：工作日统计
function getWorkdaysInRange(startDate: Date, endDate: Date): number {
  let workdays = 0
  let current = new Date(startDate)
  
  while (current <= endDate) {
    if (!isWeekend(current)) {
      workdays++
    }
    current = addDays(current, 1)
  }
  
  return workdays
}

const rangeStart = new Date('2024-01-01')
const rangeEnd = new Date('2024-01-31')
const workdayCount = getWorkdaysInRange(rangeStart, rangeEnd)
console.log(`一月份工作日: ${workdayCount} 天`)

// 实际场景：合同到期提醒
const contractStart = new Date('2023-01-01')
const contractDuration = 365 // 一年
const contractEnd = addDays(contractStart, contractDuration)
const daysToExpiry = diffInDays(today, contractEnd)

console.log(`合同到期日: ${formatDate(contractEnd)}`)
console.log(`距离到期: ${daysToExpiry} 天`)

if (daysToExpiry <= 30) {
  console.log('⚠️ 合同即将到期，请及时续签')
}
import { describe, expect, it } from 'vitest'
import { formatDate, isWeekend, addDays, diffInDays, getDaysInMonth } from '../src/date'

describe('日期工具模块', () => {
  describe('formatDate 函数', () => {
    it('应该正确格式化日期', () => {
      const date = new Date('2024-03-15T10:30:45')
      
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-03-15')
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 10:30:45')
    })

    it('应该使用默认格式', () => {
      const date = new Date('2024-03-15')
      expect(formatDate(date)).toBe('2024-03-15')
    })

    it('应该处理单数月份和日期', () => {
      const date = new Date('2024-01-05T08:05:03')
      
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-05')
      expect(formatDate(date, 'HH:mm:ss')).toBe('08:05:03')
    })

    it('应该处理年底日期', () => {
      const date = new Date('2024-12-31T23:59:59')
      
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-12-31 23:59:59')
    })

    it('应该处理年初日期', () => {
      const date = new Date('2024-01-01T00:00:00')
      
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-01 00:00:00')
    })

    it('应该处理部分格式字符串', () => {
      const date = new Date('2024-03-15T10:30:45')
      
      expect(formatDate(date, 'YYYY年MM月DD日')).toBe('2024年03月15日')
      expect(formatDate(date, 'MM/DD/YYYY')).toBe('03/15/2024')
      expect(formatDate(date, 'HH时mm分ss秒')).toBe('10时30分45秒')
    })

    it('应该处理不包含时间格式的字符串', () => {
      const date = new Date('2024-03-15T10:30:45')
      
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-03-15')
      expect(formatDate(date, 'MM-DD')).toBe('03-15')
    })

    it('应该处理不包含日期格式的字符串', () => {
      const date = new Date('2024-03-15T10:30:45')
      
      expect(formatDate(date, 'HH:mm:ss')).toBe('10:30:45')
      expect(formatDate(date, 'HH:mm')).toBe('10:30')
    })
  })

  describe('isWeekend 函数', () => {
    it('应该正确判断周末', () => {
      const saturday = new Date('2024-03-16') // 周六
      const sunday = new Date('2024-03-17')   // 周日
      const monday = new Date('2024-03-18')   // 周一
      const friday = new Date('2024-03-15')   // 周五
      
      expect(isWeekend(saturday)).toBe(true)
      expect(isWeekend(sunday)).toBe(true)
      expect(isWeekend(monday)).toBe(false)
      expect(isWeekend(friday)).toBe(false)
    })

    it('应该处理工作日', () => {
      const workdays = [
        new Date('2024-03-18'), // 周一
        new Date('2024-03-19'), // 周二
        new Date('2024-03-20'), // 周三
        new Date('2024-03-21'), // 周四
        new Date('2024-03-22')  // 周五
      ]
      
      workdays.forEach(date => {
        expect(isWeekend(date)).toBe(false)
      })
    })

    it('应该处理不同月份的周末', () => {
      expect(isWeekend(new Date('2024-01-06'))).toBe(true) // 1月周六
      expect(isWeekend(new Date('2024-02-04'))).toBe(true) // 2月周日
      expect(isWeekend(new Date('2024-12-01'))).toBe(true) // 12月周日
    })

    it('应该处理闰年的周末', () => {
      expect(isWeekend(new Date('2024-02-29'))).toBe(false) // 2024年2月29日是周四
      expect(isWeekend(new Date('2024-03-02'))).toBe(true)  // 2024年3月2日是周六
    })
  })

  describe('addDays 函数', () => {
    it('应该正确添加天数', () => {
      const date = new Date('2024-03-15')
      const result = addDays(date, 5)
      
      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(2) // 3月是索引 2
      expect(result.getDate()).toBe(20)
    })

    it('应该处理跨月添加', () => {
      const date = new Date('2024-03-30')
      const result = addDays(date, 5)
      
      expect(result.getMonth()).toBe(3) // 4月是索引 3
      expect(result.getDate()).toBe(4)
    })

    it('应该处理跨年添加', () => {
      const date = new Date('2024-12-30')
      const result = addDays(date, 5)
      
      expect(result.getFullYear()).toBe(2025)
      expect(result.getMonth()).toBe(0) // 1月是索引 0
      expect(result.getDate()).toBe(4)
    })

    it('应该处理负数天数（减少）', () => {
      const date = new Date('2024-03-15')
      const result = addDays(date, -10)
      
      expect(result.getMonth()).toBe(2) // 仍在3月
      expect(result.getDate()).toBe(5)
    })

    it('应该处理零天数', () => {
      const date = new Date('2024-03-15')
      const result = addDays(date, 0)
      
      expect(result.getTime()).toBe(date.getTime())
      expect(result).not.toBe(date) // 应该返回新的日期对象
    })

    it('应该不修改原日期对象', () => {
      const originalDate = new Date('2024-03-15')
      const originalTime = originalDate.getTime()
      
      addDays(originalDate, 10)
      
      expect(originalDate.getTime()).toBe(originalTime)
    })

    it('应该处理闰年2月', () => {
      const date = new Date('2024-02-27') // 闰年
      const result = addDays(date, 3)
      
      expect(result.getMonth()).toBe(2) // 3月
      expect(result.getDate()).toBe(1)
    })
  })

  describe('diffInDays 函数', () => {
    it('应该正确计算日期差', () => {
      const date1 = new Date('2024-03-15')
      const date2 = new Date('2024-03-20')
      
      expect(diffInDays(date1, date2)).toBe(5)
      expect(diffInDays(date2, date1)).toBe(5) // 应该返回绝对值
    })

    it('应该处理相同日期', () => {
      const date = new Date('2024-03-15')
      expect(diffInDays(date, date)).toBe(0)
    })

    it('应该处理跨月日期', () => {
      const date1 = new Date('2024-02-28')
      const date2 = new Date('2024-03-05')
      
      expect(diffInDays(date1, date2)).toBe(6) // 2024年是闰年，2月29天
    })

    it('应该处理跨年日期', () => {
      const date1 = new Date('2023-12-25')
      const date2 = new Date('2024-01-05')
      
      expect(diffInDays(date1, date2)).toBe(11)
    })

    it('应该处理闰年', () => {
      const date1 = new Date('2024-02-28')
      const date2 = new Date('2024-03-01')
      
      expect(diffInDays(date1, date2)).toBe(2) // 经过2月29日
    })

    it('应该处理带时间的日期', () => {
      const date1 = new Date('2024-03-15T10:30:00')
      const date2 = new Date('2024-03-16T14:45:00')
      
      expect(diffInDays(date1, date2)).toBe(2) // 实际计算结果
    })

    it('应该处理大的日期差', () => {
      const date1 = new Date('2024-01-01')
      const date2 = new Date('2024-12-31')
      
      expect(diffInDays(date1, date2)).toBe(365) // 2024年是闰年，366天 - 1
    })
  })

  describe('getDaysInMonth 函数', () => {
    it('应该正确计算月份天数', () => {
      expect(getDaysInMonth(2024, 1)).toBe(31) // 1月
      expect(getDaysInMonth(2024, 4)).toBe(30) // 4月
      expect(getDaysInMonth(2024, 6)).toBe(30) // 6月
      expect(getDaysInMonth(2024, 12)).toBe(31) // 12月
    })

    it('应该正确处理闰年2月', () => {
      expect(getDaysInMonth(2024, 2)).toBe(29) // 闰年二月
      expect(getDaysInMonth(2020, 2)).toBe(29) // 闰年二月
    })

    it('应该正确处理平年2月', () => {
      expect(getDaysInMonth(2023, 2)).toBe(28) // 平年二月
      expect(getDaysInMonth(2021, 2)).toBe(28) // 平年二月
      expect(getDaysInMonth(1900, 2)).toBe(28) // 1900年不是闰年
    })

    it('应该处理闰年判断的边界情况', () => {
      expect(getDaysInMonth(2000, 2)).toBe(29) // 2000年是闰年（400的倍数）
      expect(getDaysInMonth(1900, 2)).toBe(28) // 1900年不是闰年（100的倍数但不是400的倍数）
      expect(getDaysInMonth(2004, 2)).toBe(29) // 2004年是闰年（4的倍数）
    })

    it('应该处理所有月份', () => {
      const daysInMonth2024 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      
      for (let month = 1; month <= 12; month++) {
        expect(getDaysInMonth(2024, month)).toBe(daysInMonth2024[month - 1])
      }
    })

    it('应该处理不同年份', () => {
      // 测试几个不同的年份
      expect(getDaysInMonth(2019, 2)).toBe(28)
      expect(getDaysInMonth(2020, 2)).toBe(29)
      expect(getDaysInMonth(2021, 2)).toBe(28)
      expect(getDaysInMonth(2022, 2)).toBe(28)
      expect(getDaysInMonth(2023, 2)).toBe(28)
      expect(getDaysInMonth(2024, 2)).toBe(29)
    })
  })
})
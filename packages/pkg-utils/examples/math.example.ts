/**
 * 数学相关工具函数使用示例
 * 演示 pkg-utils 中数学工具相关功能的实际使用场景
 */

import { clamp, randomBetween, round, percentage, average } from 'pkg-utils'

// 实际场景：输入值限制
const userScore = clamp(105, 0, 100) // 限制在 0-100 范围
console.log('用户分数限制:', userScore)

const ageInput = clamp(-5, 0, 120) // 年龄限制
console.log('年龄输入限制:', ageInput)

// 实际场景：随机数生成
const diceRoll = randomBetween(1, 6)
console.log('骰子点数:', diceRoll)

const randomPercent = randomBetween(0, 100)
console.log('随机百分比:', randomPercent)

// 实际场景：价格计算
const price = 99.999
const finalPrice = round(price, 2)
console.log('商品价格:', finalPrice)

const taxAmount = 156.7834
const displayTax = round(taxAmount, 2)
console.log('税费金额:', displayTax)

// 实际场景：进度计算
const completed = 75
const total = 100
const progress = percentage(completed, total)
console.log(`任务进度: ${progress}%`)

const correctAnswers = 18
const totalQuestions = 20
const accuracy = percentage(correctAnswers, totalQuestions)
console.log(`答题准确率: ${accuracy}%`)

// 实际场景：成绩统计
const studentScores = [85, 92, 78, 88, 95, 76, 89]
const avgScore = average(studentScores)
console.log('学生平均分:', avgScore)

const monthlyRevenue = [12000, 15000, 18000, 14000, 16000]
const avgRevenue = average(monthlyRevenue)
console.log('月均收入:', avgRevenue)

// 实际场景：游戏数据
const gameStats = {
  playerLevel: clamp(25, 1, 100),
  damage: randomBetween(50, 100),
  accuracy: round(87.456, 1),
  winRate: percentage(18, 25),
  avgScore: average([1250, 1180, 1350, 1420, 1090])
}

console.log('\n游戏统计数据:')
console.log('玩家等级:', gameStats.playerLevel)
console.log('攻击伤害:', gameStats.damage)
console.log('准确率:', `${gameStats.accuracy}%`)
console.log('胜率:', `${gameStats.winRate}%`)
console.log('平均分数:', gameStats.avgScore)

// 实际场景：电商价格处理
function processProductPrice(basePrice: number, discount: number) {
  const discountAmount = basePrice * (discount / 100)
  const discountedPrice = basePrice - discountAmount
  const finalPrice = round(discountedPrice, 2)
  const savings = round(discountAmount, 2)
  
  return {
    original: round(basePrice, 2),
    discount: clamp(discount, 0, 100),
    final: finalPrice,
    savings: savings,
    discountPercent: percentage(savings, basePrice)
  }
}

const product = processProductPrice(199.99, 15)
console.log('\n商品价格处理:')
console.log(`原价: ¥${product.original}`)
console.log(`折扣: ${product.discount}%`)
console.log(`现价: ¥${product.final}`)
console.log(`节省: ¥${product.savings} (${product.discountPercent}%)`)

// 实际场景：数据分析
const salesData = [1200, 1850, 2100, 1650, 1980, 2350, 1750]
const analysis = {
  total: salesData.reduce((sum, val) => sum + val, 0),
  average: average(salesData),
  highest: Math.max(...salesData),
  lowest: Math.min(...salesData)
}

console.log('\n销售数据分析:')
console.log('总销售额:', analysis.total)
console.log('平均销售额:', analysis.average)
console.log('最高销售额:', analysis.highest)
console.log('最低销售额:', analysis.lowest)
console.log('高于平均值的天数:', salesData.filter(val => val > analysis.average).length)
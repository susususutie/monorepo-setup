/**
 * 异步操作工具函数使用示例
 * 演示 pkg-utils 中异步操作相关功能的实际使用场景
 */

import { sleep, timeout, retry, createSafeAsync } from '@monorepo-setup/pkg-utils'

// 实际场景：网络请求延时
async function delayedRequest() {
  console.log('开始网络请求...')
  await sleep(1000) // 模拟网络延时
  console.log('请求完成')
}

delayedRequest()

// 实际场景：请求超时控制
async function apiWithTimeout() {
  const slowApi = new Promise(resolve => {
    setTimeout(() => resolve('数据返回'), 3000)
  })
  
  try {
    const result = await timeout(slowApi, 2000)
    console.log('接收到数据:', result)
  } catch (error) {
    console.log('请求超时')
  }
}

apiWithTimeout()

// 实际场景：不稳定网络重试
async function unstableNetworkCall() {
  let attempts = 0
  const fetchData = async () => {
    attempts++
    console.log(`第 ${attempts} 次尝试...`)
    if (attempts < 3) {
      throw new Error('网络不稳定')
    }
    return '数据获取成功'
  }
  
  try {
    const result = await retry(fetchData, 5, 500)
    console.log('结果:', result)
  } catch (error) {
    console.log('重试失败')
  }
}

unstableNetworkCall()

// 实际场景：安全的异步操作
const riskyOperation = async (value: number) => {
  if (value < 0) throw new Error('负数不允许')
  return value * 2
}

const safeOperation = createSafeAsync(riskyOperation)

async function testSafeOperation() {
  const result1 = await safeOperation(5)
  const result2 = await safeOperation(-1)
  
  console.log('正常结果:', result1.success ? result1.data : '失败')
  console.log('错误结果:', result2.success ? result2.data : result2.error?.message)
}

testSafeOperation()

// 实际场景：文件上传重试
async function uploadFileWithRetry(fileName: string) {
  const uploadFn = async () => {
    // 模拟上传失败率
    if (Math.random() > 0.7) {
      throw new Error('上传失败')
    }
    return `${fileName} 上传成功`
  }
  
  try {
    const result = await retry(uploadFn, 3, 1000)
    console.log('\n文件上传:', result)
  } catch (error) {
    console.log('\n文件上传失败:', error.message)
  }
}

uploadFileWithRetry('document.pdf')

// 实际场景：API 调用链
async function apiCallChain() {
  const steps = [
    () => timeout(Promise.resolve('步骤1完成'), 1000),
    () => timeout(Promise.resolve('步骤2完成'), 800),
    () => timeout(Promise.resolve('步骤3完成'), 1200)
  ]
  
  for (const [index, step] of steps.entries()) {
    try {
      const result = await step()
      console.log(`\nAPI 调用步骤 ${index + 1}:`, result)
      await sleep(500) // 步骤间延时
    } catch (error) {
      console.log(`步骤 ${index + 1} 失败:`, error.message)
      break
    }
  }
}
import { unique } from '@monorepo-setup/pkg-utils'

const userTags = ['前端', '后端', '前端', 'UI', '后端', '测试', 'UI']
const uniqueTags = unique(userTags)
console.log('去重后的标签:', uniqueTags)

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

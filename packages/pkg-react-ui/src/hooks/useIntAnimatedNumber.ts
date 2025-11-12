import { useEffect, useRef, useState } from 'react'

/**
 * 整数动画钩子
 */
export default function useIntAnimatedNumber(
  /**
   * 目标值, 必须为整数
   */
  targetValue: number,
  options?: {
    /**
     * 总时长（ms）
     */
    duration?: number
    /**
     * 更新回调
     */
    onUpdate?: (value: number) => void
    /**
     * 完成回调
     */
    onComplete?: () => void
  }
) {
  if (typeof targetValue !== 'number' || !Number.isSafeInteger(targetValue)) {
    throw new Error('targetValue must be a safe integer between -9007199254740991 and 9007199254740991')
  }

  const { duration = 800, onUpdate, onComplete } = options ?? {}
  const [current, setCurrent] = useState(() => Math.round(targetValue))
  const rafRef = useRef<number>()
  const currentRef = useRef(current)
  
  // 使用 ref 存储回调和时长，避免依赖问题和闭包陷阱
  const callbacksRef = useRef({ onUpdate, onComplete })
  const durationRef = useRef(duration)

  // 保持 ref 为最新值
  useEffect(() => {
    callbacksRef.current = { onUpdate, onComplete }
    durationRef.current = duration
  }, [onUpdate, onComplete, duration])

  // 同步 currentRef 与 state
  useEffect(() => {
    currentRef.current = current
  }, [current])

  useEffect(() => {
    // 取消正在进行的动画
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = undefined
    }

    // 从 ref 获取起始值，避免闭包陷阱
    const start = Math.round(currentRef.current)
    const distance = targetValue - start
    if (distance === 0) {
      // 无需动画时确保到达目标值
      setCurrent(targetValue)
      currentRef.current = targetValue
      return
    }

    const startTime = performance.now()
    const currentDuration = durationRef.current

    const tick = () => {
      const elapsed = performance.now() - startTime
      const t = Math.min(elapsed / currentDuration, 1) // 动画进度 0~1

      // 线性插值后取整，保证方向正确
      const raw = start + distance * t
      const next = distance > 0 ? Math.ceil(raw) : Math.floor(raw)

      setCurrent(next)
      currentRef.current = next
      callbacksRef.current.onUpdate?.(next)

      // 动画完成：进度达到 1 或已到达目标值
      if (t >= 1 || next === targetValue) {
        // 确保最终值精确为目标值
        const finalValue = targetValue
        setCurrent(finalValue)
        currentRef.current = finalValue
        callbacksRef.current.onUpdate?.(finalValue)
        callbacksRef.current.onComplete?.()
        rafRef.current = undefined
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = undefined
      }
    }
  }, [targetValue])

  return current
}

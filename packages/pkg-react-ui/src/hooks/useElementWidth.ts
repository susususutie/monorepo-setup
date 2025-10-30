import { useEffect, useRef, useState } from 'react'

/**
 * @description 获取元素宽度
 */
export default function useElementWidth<T extends HTMLElement = HTMLDivElement>(opts?: {
  /**
   * 防抖时间，默认 120ms
   */
  debounceMs?: number
}): {
  /**
   * 元素 ref
   */
  ref: React.RefObject<T>
  /**
   * 元素宽度
   */
  width?: number
} {
  const { debounceMs = 120 } = opts ?? {}
  const ref = useRef<T>(null)
  const [width, setWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let timer: number
    const ro = new ResizeObserver(([entry]) => {
      // 取内容区宽度（不含滚动条、padding、border）
      const w = entry.contentRect.width
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        setWidth(w)
      }, debounceMs)
    })
    ro.observe(el)
    return () => {
      ro.disconnect()
      window.clearTimeout(timer)
    }
  }, [debounceMs])

  return { ref, width }
}

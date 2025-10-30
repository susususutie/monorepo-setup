import { useEffect, useRef, useState } from 'react'

type Strategy = 'conservative' | 'greedy' | 'compress'

import useElementWidth from './useElementWidth'

function getOptimalCols(opts: {
  /**
   * 父元素宽度
   */
  parentWidth: number
  /**
   * 单个元素的理想宽度
   */
  itemIdealWidth: number
  /**
   * 间距
   */
  gap: number
  /**
   * 策略
   */
  strategy: Strategy
  /**
   * 压缩比例
   */
  compressRatio?: number
}): {
  /**
   * 列数
   */
  cols: number
  /**
   * 单个元素的宽度
   */
  itemWidth: number
} {
  const { parentWidth, itemIdealWidth, gap, strategy, compressRatio } = opts
  if (parentWidth <= itemIdealWidth) return { cols: 1, itemWidth: itemIdealWidth }
  if (strategy !== 'compress') {
    const cols =
      strategy === 'greedy'
        ? Math.max(1, Math.floor(parentWidth / (itemIdealWidth + gap)))
        : Math.max(1, Math.floor((parentWidth + gap) / (itemIdealWidth + gap)))
    return { cols, itemWidth: (parentWidth - (cols - 1) * gap) / cols }
  }

  /* ---------- 2. 可压缩策略 ---------- */
  const minItemWidth = itemIdealWidth * compressRatio!
  // 先按理想宽度算“最大可能列数”
  let cols = Math.floor((parentWidth + gap) / (itemIdealWidth + gap))
  cols = Math.max(1, cols)

  // 剩余空间
  let remainder = parentWidth - cols * (itemIdealWidth + gap) + gap
  // 能否再塞一列？（即使压缩到 minItemWidth）
  if (remainder >= minItemWidth) {
    cols += 1
    remainder = parentWidth - cols * (itemIdealWidth + gap) + gap
  }

  // 计算等比压缩后的宽度
  const totalGap = (cols - 1) * gap
  const itemWidth = (parentWidth - totalGap) / cols

  // 如果压缩后仍小于最小宽度，则退回上一列
  if (itemWidth < minItemWidth) {
    cols -= 1
    const newTotalGap = (cols - 1) * gap
    return {
      cols,
      itemWidth: (parentWidth - newTotalGap) / cols,
    }
  }
  return { cols, itemWidth }
}

/**
 * @description 计算最佳列数布局
 * @example
 * ```jsx
 * const { ref, cols, itemWidth } = useOptimalCols(380, 16, 'compress');
 * <div ref={ref} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', overflow: 'hidden' }}>
 *   {list?.map((item, index) => (
 *     <div key={index} style={{ width: itemWidth }}>xxx</div>
 *   ))}
 * </div>
 * ```
 */
export default function useOptimalCols<T extends HTMLElement = HTMLDivElement>(
  /**
   * 单个元素的理想宽度
   */
  itemIdealWidth: number = 256,
  /**
   * 间距
   */
  gap: number = 16,
  /**
   * 策略：conservative（保守，默认）、greedy（贪婪）、compress（可压缩）
   */
  strategy: Strategy = 'conservative',
  /**
   * 压缩比例：0.8（默认允许压缩到 80%，仅当 strategy = 'compress' 时生效）
   */
  compressRatio: number = 0.8
): {
  ref: React.RefObject<T>
  cols: number
  itemWidth: number
  parentWidth: number
} {
  const { ref, width = 0 } = useElementWidth<T>()
  const { cols, itemWidth } = getOptimalCols({ parentWidth: width, itemIdealWidth, compressRatio, gap, strategy })
  return { ref, cols, itemWidth, parentWidth: width }
}

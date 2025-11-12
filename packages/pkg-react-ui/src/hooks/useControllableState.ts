import { useState, useCallback, Dispatch, SetStateAction, useRef } from 'react'

/**
 * 同时支持受控 & 非受控的 State
 * @param controlledValue - 外部受控值
 * @param onChange - 值变化时的回调函数
 * @param defaultValue - 非受控时的默认值
 * @returns [value, setValue] - 无论受控还是非受控，都能直接解构使用
 */
function useControllableState<T>(
  controlledValue: T | undefined,
  onChange?: (value: T) => void,
  defaultValue?: T
): [T, Dispatch<SetStateAction<T>>] {
  // 使用 useRef 来记忆是否为受控模式，避免渲染期间变化
  const isControlledRef = useRef(controlledValue !== undefined)

  // 非受控状态 - 使用 defaultValue 或 undefined 作为初始值
  const [uncontrolledValue, setUncontrolledValue] = useState(() => defaultValue as T)

  // 当前值：受控模式下使用外部值，非受控模式下使用内部状态
  const value = isControlledRef.current ? (controlledValue as T) : uncontrolledValue

  // 统一的 setter 函数
  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    newValue => {
      const resolvedValue = newValue instanceof Function ? newValue(value) : newValue

      // 非受控模式：更新内部状态
      if (!isControlledRef.current) {
        setUncontrolledValue(resolvedValue)
      }

      // 调用 onChange 回调（如果提供）
      onChange?.(resolvedValue)
    },
    [value, onChange]
  )

  return [value, setValue]
}

export default useControllableState

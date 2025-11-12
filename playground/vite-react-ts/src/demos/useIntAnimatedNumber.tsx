import { useRef, useState } from 'react'
import { useIntAnimatedNumber } from '@monorepo-setup/pkg-react-ui/hooks'

export default function Demo() {
  const [targetCount, setTargetCount] = useState<number | undefined>(undefined)
  const animatedCount = useIntAnimatedNumber(targetCount ?? 0, { duration: 1000 })

  const inputRef = useRef<HTMLInputElement>(null)
  const handleChangeCount = () => {
    if (inputRef.current) {
      setTargetCount(Number(inputRef.current.value))
    }
  }

  return (
    <div>
      <h1>useIntAnimatedNumber</h1>
      <p>animatedCount: {typeof targetCount === 'number' ? animatedCount : '--'}</p>
      <p>
        change count:
        <input type='number' ref={inputRef} />
      </p>
      <button onClick={handleChangeCount}>change count</button>
    </div>
  )
}

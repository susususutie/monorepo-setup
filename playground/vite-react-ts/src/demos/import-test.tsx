import { version as viteVersion } from 'vite/package.json'
import { one, test, capitalize, formatDate, Status, CONFIG } from '@monorepo-setup/pkg-utils'
import { useState, version } from 'react'

export default function Demo() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h3>
        Vite@{viteVersion} + React@{version}
      </h3>
      <p>pkg-utils/formatDate: {formatDate(new Date(), 'YYYY-MM-DD HH:mm')}</p>
      <p>pkg-utils/capitalize: {capitalize('monorepo demo')}</p>
      <p>pkg-utils/Status: {Status.SUCCESS}</p>
      <p>pkg-utils/test: {test(one, 1)}</p>
      <p>pkg-utils/CONFIG.API_BASE_URL: {CONFIG.API_BASE_URL}</p>
      <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
    </div>
  )
}

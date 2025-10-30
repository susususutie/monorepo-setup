import { version as viteVersion } from 'vite/package.json'
import { useState, version } from 'react'
import './App.css'
import { one, test, capitalize, formatDate, Status, CONFIG } from '@monorepo-setup/pkg-utils'
import UseOptimalCols from './demos/useOptimalCols'

function App() {
  const [count, setCount] = useState(0)
  const currentDate = formatDate(new Date(), 'YYYY-MM-DD HH:mm')
  const appName = capitalize('monorepo demo')
  const mathResult = test(one, 1)

  return (
    <>
      <h1>
        {appName} - Vite@{viteVersion} + React@{version}
      </h1>
      <p>Current time: {currentDate}</p>
      <p>App status: {Status.SUCCESS}</p>
      <UseOptimalCols />
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
          <br />
          Math result: {mathResult} | API URL: {CONFIG.API_BASE_URL}
        </p>
      </div>
    </>
  )
}

export default App

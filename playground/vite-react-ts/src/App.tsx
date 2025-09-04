import { version as viteVersion } from 'vite/package.json'
import { useState, version } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { one, test, capitalize, formatDate, Status, CONFIG } from 'pkg-other'
import { Demo } from 'pkg-components'

function App() {
  const [count, setCount] = useState(0)
  const currentDate = formatDate(new Date(), 'YYYY-MM-DD HH:mm')
  const appName = capitalize('monorepo demo')
  const mathResult = test(one, 1)

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>
        {appName} - Vite@{viteVersion} + React@{version}
      </h1>
      <p>Current time: {currentDate}</p>
      <p>App status: {Status.SUCCESS}</p>
      <Demo />
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR<br/>
          Math result: {mathResult} | API URL: {CONFIG.API_BASE_URL}
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App

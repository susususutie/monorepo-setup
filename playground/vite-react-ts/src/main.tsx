import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import ImportTest from './demos/import-test'
// import UseOptimalCols from './demos/useOptimalCols'
import TableDemo from './demos/table-columns/TableDemo'
// import UseIntAnimatedNumber from './demos/useIntAnimatedNumber'
// import KimiLayout from './demos/KimiLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableDemo/>
  </StrictMode>
)

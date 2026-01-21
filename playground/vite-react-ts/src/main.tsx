import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import ImportTest from './demos/import-test'
// import UseOptimalCols from './demos/useOptimalCols'
import TableColumnsTransformer from './demos/tableColumnsTransformer'
// import UseIntAnimatedNumber from './demos/useIntAnimatedNumber'
// import KimiLayout from './demos/KimiLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableColumnsTransformer/>
  </StrictMode>
)

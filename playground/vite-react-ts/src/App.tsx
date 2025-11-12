import ImportTest from './demos/import-test'
import UseOptimalCols from './demos/useOptimalCols'
import TableColumnsTransformer from './demos/tableColumnsTransformer'
import UseIntAnimatedNumber from './demos/useIntAnimatedNumber'
import KimiLayout from './demos/KimiLayout'

export default function App({ showAll }: { showAll?: boolean }) {
  return (
    <>
      {showAll && <ImportTest />}
      {showAll && <UseOptimalCols />}
      {showAll && <TableColumnsTransformer />}
      {showAll && <UseIntAnimatedNumber />}
      <KimiLayout />
    </>
  )
}

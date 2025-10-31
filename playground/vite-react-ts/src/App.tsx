import ImportTest from './demos/import-test'
import UseOptimalCols from './demos/useOptimalCols'
import TableColumnsTransformer from './demos/tableColumnsTransformer'

export default function App({ showAll }: { showAll?: boolean }) {
  return (
    <>
      {showAll && <ImportTest />}
      {showAll && <UseOptimalCols />}
      <TableColumnsTransformer />
    </>
  )
}

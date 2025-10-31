import ImportTest from './demos/import-test'
import UseOptimalCols from './demos/useOptimalCols'

function App({ showAll }: { showAll: boolean }) {
  return (
    <>
      {showAll && <ImportTest />}
      {showAll && <UseOptimalCols />}
    </>
  )
}

export default App

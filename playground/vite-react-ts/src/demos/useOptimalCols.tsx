import { useOptimalCols } from '@monorepo-setup/pkg-react-ui/hooks'

function DemoCode() {
  const { ref, itemWidth } = useOptimalCols(200, 16, 'compress')

  return (
    <section ref={ref} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', overflow: 'hidden' }}>
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} style={{ width: itemWidth, height: 100, backgroundColor: 'rgb(250 250 250)' }}>
          {index}
        </div>
      ))}
    </section>
  )
}

export default function Demo() {
  return (
    <div>
      <h3>UseOptimalCols</h3>
      <pre style={{ backgroundColor: 'rgb(240 240 240)', padding: 16 }}>
        <code>
          {`function DemoCode() {
  const { ref, itemWidth } = useOptimalCols(200, 16, 'compress')

  return (
    <section ref={ref} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', overflow: 'hidden' }}>
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} style={{ width: itemWidth, height: 100, backgroundColor: 'rgb(250 250 250)' }}>
          {index}
        </div>
      ))}
    </section>
  )
}
`}
        </code>
      </pre>
      <DemoCode />
    </div>
  )
}

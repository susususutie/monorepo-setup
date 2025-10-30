import { useOptimalCols } from '@monorepo-setup/pkg-react-ui/hooks'

export default function Demo() {
  const { ref, cols, itemWidth, parentWidth } = useOptimalCols(200, 16, 'compress')

  return (
    <div>
      UseOptimalCols
      <pre>
        <code style={{ backgroundColor: 'rgb(240 240 240)' }}>
          {`
      import { useOptimalCols } from '@monorepo-setup/pkg-react-ui/hooks'
      const { ref, cols, itemWidth, parentWidth } = useOptimalCols(200, 16, 'compress')
`}
        </code>
      </pre>
      <p>
        cols: {cols} itemWidth: {itemWidth} parentWidth: {parentWidth}
      </p>
      <section ref={ref} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', overflow: 'hidden' }}>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} style={{ width: itemWidth, height: 100, backgroundColor: 'rgb(250 250 250)' }}>
            {index}
          </div>
        ))}
      </section>
    </div>
  )
}

import { useState } from 'react'
import { Table, Typography, Space, Select, Radio } from 'antd'
import { tableColumnsTransformer } from '@monorepo-setup/pkg-react-ui'
import type { TableDataRow, ScenarioKey } from './types'
import { scenarios } from './scenarios'
import { generateDataSource } from './dataGenerator'

interface TableDemoProps {
  initialScenario?: ScenarioKey
  initialUsePlus?: boolean
  dataLength?: number
}

export default function TableDemo({
  initialScenario = 'user',
  initialUsePlus = true,
  dataLength = 10,
}: TableDemoProps) {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>(initialScenario)
  const [usePlus, setUsePlus] = useState(initialUsePlus)
  const [dataSource, setDataSource] = useState<TableDataRow[]>(() => generateDataSource(dataLength))

  const currentScenario = scenarios.find(s => s.key === activeScenario)

  if (!currentScenario) {
    return <div>场景配置不存在</div>
  }

  const handleRegenerateData = () => {
    setDataSource(generateDataSource(dataLength))
  }

  const handleChangeScenario = (key: string) => {
    setActiveScenario(key as ScenarioKey)
  }

  return (
    <div style={{ margin: 24 }}>
      <Space direction='vertical' style={{ width: '100%' }} size='large'>
        <Typography.Title level={4}>表格列配置场景演示</Typography.Title>

        <Space>
          <Typography.Text>切换场景:</Typography.Text>
          <Select
            value={activeScenario}
            onChange={handleChangeScenario}
            style={{ width: 200 }}
            options={scenarios.map(s => ({
              label: s.label,
              value: s.key,
            }))}
          />
          <Typography.Text>切换模式:</Typography.Text>
          <Radio.Group
            value={usePlus ? 'plus' : 'antd'}
            optionType='button'
            onChange={e => setUsePlus(e.target.value === 'plus')}
            options={[
              { label: 'Columns Plus', value: 'plus' },
              { label: 'Antd Columns', value: 'antd' },
            ]}
          />
          <Typography.Link onClick={handleRegenerateData}>重新生成数据</Typography.Link>
        </Space>

        <Table<TableDataRow>
          rowKey='id'
          scroll={{ x: 'max-content' }}
          dataSource={dataSource}
          columns={usePlus ? tableColumnsTransformer(currentScenario.columnsPlus) : currentScenario.columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`,
          }}
        />
      </Space>
    </div>
  )
}

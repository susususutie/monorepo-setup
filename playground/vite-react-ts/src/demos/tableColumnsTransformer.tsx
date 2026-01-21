import { tableColumnsTransformer, registerValueType, type TableColumnsTypePlus } from '@monorepo-setup/pkg-react-ui'
import { Table, type TableColumnsType } from 'antd'

registerValueType<{ count: 2 | 3 } | undefined>('myValueType', (params, column) => {
  return { ...column, title: `更新${params?.count ?? 0}次` }
})

const dataSource = Array.from({ length: 27 }, (_, index) => ({
  id: index,
  name: `Name ${index}`.repeat(Math.round(Math.random() * 10)),
  age: Math.round(Math.random() * 100),
  email: `email${index}@example.com`,
  description: `Description ${index}\nDescription ${index}\nDescription ${index}`,
  status: Math.random() > 0.5 ? 'success' : 'error',
  created_at: new Date(),
  updated_at: new Date(),
}))
type DataType = (typeof dataSource)[number]
const columnsPlus: TableColumnsTypePlus<DataType> = [
  false, // false,null,undefined会被自动过滤
  {
    key: 'group',
    title: 'group',
    children: [
      false,
      null,
      undefined, // children 中的 false,null,undefined 也会被过滤，但 children 空数组会保留，以保持与 antd 一致
      { title: 'Name', dataIndex: 'name', width: 100, valueType: 'text' },
      { title: 'Age', dataIndex: 'age', width: 80, valueType: 'text' },
      {
        key: 'sub group',
        title: ' 嵌套group',
        children: [
          { title: 'Email', dataIndex: 'email', width: 80, valueType: 'text' },
          {
            title: '多行文本',
            dataIndex: 'description',
            width: 80,
            valueType: 'text',
            valueParams: { multiple: true },
          },
        ],
      },
    ],
  },
  { key: 'name', title: 'Name', dataIndex: 'name', valueType: 'text' },
  { key: 'age', title: 'Age', dataIndex: 'age', valueType: 'text' },
  { key: 'email', title: 'Email', dataIndex: 'email', valueType: 'text' },
  { title: '多行文本', dataIndex: 'description', valueType: 'text', valueParams: { multiple: true } },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    valueType: 'status',
    valueParams: { success: '成功', error: '失败' },
  },
  { title: '创建', dataIndex: ['created_at'], valueType: 'date', valueParams: { format: 'YYYY-MM-DD' } },
  { title: '更新', dataIndex: ['updated_at'], valueType: 'myValueType' }, // 自定义 valueType 需要在 d.ts 文件中扩展 CustomValueParamsMap 类型，才有类型提示
]
const antdColumns: TableColumnsType<DataType> = [
  {
    key: 'group',
    title: 'group',
    children: [
      { title: 'Name', dataIndex: 'name', width: 100 },
      { title: 'Age', dataIndex: 'age', width: 80 },
      {
        key: 'sub group',
        title: ' 嵌套group',
        children: [
          { title: 'Email', dataIndex: 'email', width: 80 },
          { title: '多行文本', dataIndex: 'description', width: 80 },
        ],
      },
    ],
  },
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { title: '多行文本', dataIndex: 'description' },
  { key: 'status', title: 'Status', dataIndex: 'status' },
  { title: '创建', dataIndex: ['created_at'] },
  { title: '更新', dataIndex: ['updated_at'] },
]
const columns = tableColumnsTransformer<DataType>(columnsPlus)

export default function Demo() {
  return (
    <div style={{ margin: 24 }}>
      <Table rowKey='id' scroll={{ x: 'max-content' }} dataSource={dataSource} columns={columns} />
      <Table rowKey='id' scroll={{ x: 'max-content' }} dataSource={dataSource} columns={antdColumns} />
    </div>
  )
}

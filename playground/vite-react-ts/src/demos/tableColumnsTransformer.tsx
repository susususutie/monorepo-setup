import { tableColumnsTransformer, type RawColumns } from '@monorepo-setup/pkg-react-ui'
import { Table } from 'antd'
// import { useState } from 'react'

const data = Array.from({ length: 27 }, (_, index) => ({
  id: index,
  name: `Name ${index}`.repeat(Math.round(Math.random() * 10)),
  age: Math.round(Math.random() * 100),
  email: `email${index}@example.com`,
  description: `Description ${index}\nDescription ${index}\nDescription ${index}`,
  status: Math.random() > 0.5 ? 'success' : 'error',
}))
type Data = (typeof data)[number]
const rawColumns: RawColumns<Data> = [
  { key: 'name', title: 'Name', dataIndex: 'name', valueType: 'text' },
  { key: 'age', title: 'Age', dataIndex: 'age', valueType: 'text' },
  { key: 'email', title: 'Email', dataIndex: 'email', valueType: 'text' },
  { title: 'Description', dataIndex: 'description', valueType: 'text', valueParams: { multiple: true } },
  { key: 'status', title: 'Status', dataIndex: 'status', valueType: 'status' },
]
const columns = tableColumnsTransformer<Data>(rawColumns)

export default function Demo() {
  return <Table rowKey='id' scroll={{ x: 'max-content' }} dataSource={data} columns={columns} />
}

import type { TableColumnsType } from 'antd'
import type { TableColumnsTypePlus } from '@monorepo-setup/pkg-react-ui'
import { Typography, Tag, Space } from 'antd'
import type { TableDataRow } from '../types'

export const productManagementColumnsPlus: TableColumnsTypePlus<TableDataRow> = [
  {
    title: '产品图片',
    dataIndex: ['visual', 'imageUrl'],
    width: 100,
    fixed: 'left',
    render: (url: string) => (
      <img src={url} alt='product' style={{ width: 60, height: 60, objectFit: 'cover' }} />
    ),
  },
  {
    title: '产品信息',
    key: 'productInfo',
    children: [
      {
        title: '产品名称',
        dataIndex: ['product', 'name'],
        width: 200,
        valueType: 'text',
      },
      {
        title: 'SKU',
        dataIndex: ['product', 'sku'],
        width: 120,
        valueType: 'text',
      },
      {
        title: '条形码',
        dataIndex: ['product', 'barcode'],
        width: 150,
        valueType: 'text',
      },
      {
        title: '品牌',
        dataIndex: ['product', 'brand'],
        width: 120,
        valueType: 'text',
      },
      {
        title: '分类',
        dataIndex: ['product', 'category'],
        width: 100,
        valueType: 'text',
      },
    ],
  },
  {
    title: '价格信息',
    key: 'priceInfo',
    children: [
      {
        title: '原价',
        dataIndex: ['product', 'originalPrice'],
        width: 100,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
      {
        title: '现价',
        dataIndex: ['product', 'price'],
        width: 100,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
    ],
  },
  {
    title: '库存信息',
    key: 'stockInfo',
    children: [
      {
        title: '库存状态',
        dataIndex: ['product', 'inStock'],
        width: 100,
        valueType: 'boolean',
        render: (inStock: boolean) => (
          <Tag color={inStock ? 'green' : 'red'}>{inStock ? '有货' : '缺货'}</Tag>
        ),
      },
      {
        title: '库存数量',
        dataIndex: ['product', 'stockQuantity'],
        width: 100,
        valueType: 'number',
      },
    ],
  },
  {
    title: '产品属性',
    key: 'productAttr',
    children: [
      {
        title: '颜色',
        dataIndex: ['product', 'color'],
        width: 100,
        valueType: 'text',
      },
      {
        title: '尺寸',
        dataIndex: ['product', 'size'],
        width: 100,
        valueType: 'text',
      },
      {
        title: '材质',
        dataIndex: ['product', 'material'],
        width: 100,
        valueType: 'text',
      },
      {
        title: '重量(kg)',
        dataIndex: ['product', 'weight'],
        width: 100,
        valueType: 'number',
        valueParams: { precision: 2 },
      },
    ],
  },
  {
    title: '评价信息',
    key: 'reviewInfo',
    children: [
      {
        title: '评分',
        dataIndex: ['product', 'rating'],
        width: 100,
        render: (rating: number) => (
          <Space>
            <span>{rating.toFixed(1)}</span>
            <Tag color='gold'>⭐</Tag>
          </Space>
        ),
      },
      {
        title: '评价数',
        dataIndex: ['product', 'reviewCount'],
        width: 100,
        valueType: 'number',
      },
    ],
  },
  {
    title: '产品描述',
    dataIndex: ['product', 'description'],
    width: 250,
    valueType: 'text',
    valueParams: { multiple: true },
  },
  {
    title: '创建时间',
    dataIndex: ['timestamps', 'created_at'],
    width: 160,
    valueType: 'date',
    valueParams: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 180,
    render: () => (
      <Space>
        <Typography.Link>编辑</Typography.Link>
        <Typography.Link>复制</Typography.Link>
        <Typography.Link type='danger'>删除</Typography.Link>
      </Space>
    ),
  },
]

export const productManagementColumns: TableColumnsType<TableDataRow> = [
  {
    title: '产品图片',
    dataIndex: ['visual', 'imageUrl'],
    width: 100,
    fixed: 'left',
    render: (url: string) => (
      <img src={url} alt='product' style={{ width: 60, height: 60, objectFit: 'cover' }} />
    ),
  },
  {
    title: '产品信息',
    key: 'productInfo',
    children: [
      {
        title: '产品名称',
        dataIndex: ['product', 'name'],
        width: 200,
      },
      {
        title: 'SKU',
        dataIndex: ['product', 'sku'],
        width: 120,
      },
      {
        title: '条形码',
        dataIndex: ['product', 'barcode'],
        width: 150,
      },
      {
        title: '品牌',
        dataIndex: ['product', 'brand'],
        width: 120,
      },
      {
        title: '分类',
        dataIndex: ['product', 'category'],
        width: 100,
      },
    ],
  },
  {
    title: '价格信息',
    key: 'priceInfo',
    children: [
      {
        title: '原价',
        dataIndex: ['product', 'originalPrice'],
        width: 100,
        render: (price: string) => `¥${parseFloat(price).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      {
        title: '现价',
        dataIndex: ['product', 'price'],
        width: 100,
        render: (price: string) => `¥${parseFloat(price).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
    ],
  },
  {
    title: '库存信息',
    key: 'stockInfo',
    children: [
      {
        title: '库存状态',
        dataIndex: ['product', 'inStock'],
        width: 100,
        render: (inStock: boolean) => (
          <Tag color={inStock ? 'green' : 'red'}>{inStock ? '有货' : '缺货'}</Tag>
        ),
      },
      {
        title: '库存数量',
        dataIndex: ['product', 'stockQuantity'],
        width: 100,
      },
    ],
  },
  {
    title: '产品属性',
    key: 'productAttr',
    children: [
      {
        title: '颜色',
        dataIndex: ['product', 'color'],
        width: 100,
      },
      {
        title: '尺寸',
        dataIndex: ['product', 'size'],
        width: 100,
      },
      {
        title: '材质',
        dataIndex: ['product', 'material'],
        width: 100,
      },
      {
        title: '重量(kg)',
        dataIndex: ['product', 'weight'],
        width: 100,
        render: (weight: number) => weight.toFixed(2),
      },
    ],
  },
  {
    title: '评价信息',
    key: 'reviewInfo',
    children: [
      {
        title: '评分',
        dataIndex: ['product', 'rating'],
        width: 100,
        render: (rating: number) => (
          <Space>
            <span>{rating.toFixed(1)}</span>
            <Tag color='gold'>⭐</Tag>
          </Space>
        ),
      },
      {
        title: '评价数',
        dataIndex: ['product', 'reviewCount'],
        width: 100,
      },
    ],
  },
  {
    title: '产品描述',
    dataIndex: ['product', 'description'],
    width: 250,
    render: (desc: string) => (
      <Typography.Text ellipsis={{ tooltip: desc }}>{desc}</Typography.Text>
    ),
  },
  {
    title: '创建时间',
    dataIndex: ['timestamps', 'created_at'],
    width: 160,
    render: (date: Date) => new Date(date).toLocaleString('zh-CN'),
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 180,
    render: () => (
      <Space>
        <Typography.Link>编辑</Typography.Link>
        <Typography.Link>复制</Typography.Link>
        <Typography.Link type='danger'>删除</Typography.Link>
      </Space>
    ),
  },
]

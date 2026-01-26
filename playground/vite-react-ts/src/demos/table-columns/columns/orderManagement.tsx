import type { TableColumnsType } from 'antd'
import type { TableColumnsTypePlus } from '@monorepo-setup/pkg-react-ui'
import { Typography, Tag, Space } from 'antd'
import type { TableDataRow } from '../types'

export const orderManagementColumnsPlus: TableColumnsTypePlus<TableDataRow> = [
  {
    title: '订单号',
    dataIndex: ['order', 'orderId'],
    width: 150,
    fixed: 'left',
    valueType: 'text',
  },
  {
    title: '订单信息',
    key: 'orderInfo',
    children: [
      {
        title: '订单金额',
        dataIndex: ['order', 'orderAmount'],
        width: 120,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
      {
        title: '折扣',
        dataIndex: ['order', 'discount'],
        width: 100,
        render: (discount: number) => `${(discount * 100).toFixed(1)}%`,
      },
      {
        title: '实付金额',
        dataIndex: ['order', 'finalAmount'],
        width: 120,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
      {
        title: '数量',
        dataIndex: ['order', 'orderQuantity'],
        width: 80,
        valueType: 'number',
      },
    ],
  },
  {
    title: '订单状态',
    dataIndex: ['order', 'orderStatus'],
    width: 120,
    valueType: 'status',
    valueParams: {
      pending: '待处理',
      processing: '处理中',
      shipped: '已发货',
      delivered: '已送达',
      cancelled: '已取消',
      refunded: '已退款',
    },
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        pending: 'orange',
        processing: 'blue',
        shipped: 'cyan',
        delivered: 'green',
        cancelled: 'default',
        refunded: 'red',
      }
      return <Tag color={colorMap[status]}>{status}</Tag>
    },
  },
  {
    title: '支付信息',
    key: 'paymentInfo',
    children: [
      {
        title: '支付状态',
        dataIndex: ['order', 'paymentStatus'],
        width: 100,
        valueType: 'status',
        valueParams: {
          unpaid: '未支付',
          paid: '已支付',
          refunding: '退款中',
          refunded: '已退款',
          failed: '支付失败',
        },
      },
      {
        title: '支付方式',
        dataIndex: ['order', 'paymentMethod'],
        width: 120,
        valueType: 'status',
        valueParams: {
          alipay: '支付宝',
          wechat: '微信支付',
          credit_card: '信用卡',
          bank_transfer: '银行转账',
          cash: '现金',
        },
      },
      {
        title: '支付时间',
        dataIndex: ['order', 'paymentTime'],
        width: 160,
        valueType: 'date',
        valueParams: { format: 'YYYY-MM-DD HH:mm:ss' },
      },
    ],
  },
  {
    title: '物流信息',
    key: 'shippingInfo',
    children: [
      {
        title: '配送方式',
        dataIndex: ['order', 'shippingMethod'],
        width: 100,
        valueType: 'status',
        valueParams: {
          standard: '标准配送',
          express: '快递',
          overnight: '次日达',
          pickup: '自提',
        },
      },
      {
        title: '物流单号',
        dataIndex: ['order', 'trackingNumber'],
        width: 150,
        valueType: 'text',
      },
      {
        title: '预计送达',
        dataIndex: ['order', 'estimatedDelivery'],
        width: 120,
        valueType: 'date',
        valueParams: { format: 'YYYY-MM-DD' },
      },
      {
        title: '实际送达',
        dataIndex: ['order', 'actualDelivery'],
        width: 120,
        valueType: 'date',
        valueParams: { format: 'YYYY-MM-DD' },
      },
    ],
  },
  {
    title: '收货地址',
    dataIndex: ['order', 'shippingAddress'],
    width: 200,
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
    width: 200,
    render: (_value: unknown, record: TableDataRow) => (
      <Space>
        <Typography.Link>查看</Typography.Link>
        {record.order.orderStatus === 'pending' && (
          <Typography.Link>处理</Typography.Link>
        )}
        {record.order.orderStatus === 'shipped' && (
          <Typography.Link>确认收货</Typography.Link>
        )}
        {['pending', 'processing'].includes(record.order.orderStatus) && (
          <Typography.Link type='danger'>取消</Typography.Link>
        )}
      </Space>
    ),
  },
]

export const orderManagementColumns: TableColumnsType<TableDataRow> = [
  {
    title: '订单号',
    dataIndex: ['order', 'orderId'],
    width: 150,
    fixed: 'left',
  },
  {
    title: '订单信息',
    key: 'orderInfo',
    children: [
      {
        title: '订单金额',
        dataIndex: ['order', 'orderAmount'],
        width: 120,
        render: (amount: number) => `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      {
        title: '折扣',
        dataIndex: ['order', 'discount'],
        width: 100,
        render: (discount: number) => `${(discount * 100).toFixed(1)}%`,
      },
      {
        title: '实付金额',
        dataIndex: ['order', 'finalAmount'],
        width: 120,
        render: (amount: number) => `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      {
        title: '数量',
        dataIndex: ['order', 'orderQuantity'],
        width: 80,
      },
    ],
  },
  {
    title: '订单状态',
    dataIndex: ['order', 'orderStatus'],
    width: 120,
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        pending: 'orange',
        processing: 'blue',
        shipped: 'cyan',
        delivered: 'green',
        cancelled: 'default',
        refunded: 'red',
      }
      const textMap: Record<string, string> = {
        pending: '待处理',
        processing: '处理中',
        shipped: '已发货',
        delivered: '已送达',
        cancelled: '已取消',
        refunded: '已退款',
      }
      return <Tag color={colorMap[status]}>{textMap[status]}</Tag>
    },
  },
  {
    title: '支付信息',
    key: 'paymentInfo',
    children: [
      {
        title: '支付状态',
        dataIndex: ['order', 'paymentStatus'],
        width: 100,
        render: (status: string) => {
          const textMap: Record<string, string> = {
            unpaid: '未支付',
            paid: '已支付',
            refunding: '退款中',
            refunded: '已退款',
            failed: '支付失败',
          }
          return textMap[status] || status
        },
      },
      {
        title: '支付方式',
        dataIndex: ['order', 'paymentMethod'],
        width: 120,
        render: (method: string) => {
          const textMap: Record<string, string> = {
            alipay: '支付宝',
            wechat: '微信支付',
            credit_card: '信用卡',
            bank_transfer: '银行转账',
            cash: '现金',
          }
          return textMap[method] || method
        },
      },
      {
        title: '支付时间',
        dataIndex: ['order', 'paymentTime'],
        width: 160,
        render: (date: Date | null) => (date ? new Date(date).toLocaleString('zh-CN') : '-'),
      },
    ],
  },
  {
    title: '物流信息',
    key: 'shippingInfo',
    children: [
      {
        title: '配送方式',
        dataIndex: ['order', 'shippingMethod'],
        width: 100,
        render: (method: string) => {
          const textMap: Record<string, string> = {
            standard: '标准配送',
            express: '快递',
            overnight: '次日达',
            pickup: '自提',
          }
          return textMap[method] || method
        },
      },
      {
        title: '物流单号',
        dataIndex: ['order', 'trackingNumber'],
        width: 150,
      },
      {
        title: '预计送达',
        dataIndex: ['order', 'estimatedDelivery'],
        width: 120,
        render: (date: Date) => new Date(date).toLocaleDateString('zh-CN'),
      },
      {
        title: '实际送达',
        dataIndex: ['order', 'actualDelivery'],
        width: 120,
        render: (date: Date | null) => (date ? new Date(date).toLocaleDateString('zh-CN') : '-'),
      },
    ],
  },
  {
    title: '收货地址',
    dataIndex: ['order', 'shippingAddress'],
    width: 200,
    render: (address: string) => (
      <Typography.Text ellipsis={{ tooltip: address }}>{address}</Typography.Text>
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
    width: 200,
    render: (_value: unknown, record: TableDataRow) => (
      <Space>
        <Typography.Link>查看</Typography.Link>
        {record.order.orderStatus === 'pending' && (
          <Typography.Link>处理</Typography.Link>
        )}
        {record.order.orderStatus === 'shipped' && (
          <Typography.Link>确认收货</Typography.Link>
        )}
        {['pending', 'processing'].includes(record.order.orderStatus) && (
          <Typography.Link type='danger'>取消</Typography.Link>
        )}
      </Space>
    ),
  },
]

import type { TableColumnsType } from 'antd'
import type { TableColumnsTypePlus } from '@monorepo-setup/pkg-react-ui'
import { Typography, Tag, Space } from 'antd'
import type { TableDataRow } from '../types'

export const financeAccountColumnsPlus: TableColumnsTypePlus<TableDataRow> = [
  {
    title: '账户信息',
    key: 'accountInfo',
    fixed: 'left',
    children: [
      {
        title: '账户名',
        dataIndex: ['person', 'cname'],
        width: 120,
        valueType: 'text',
      },
      {
        title: '账户号',
        dataIndex: ['account', 'accountNumber'],
        width: 180,
        valueType: 'text',
      },
      {
        title: 'IBAN',
        dataIndex: ['finance', 'iban'],
        width: 200,
        valueType: 'text',
      },
    ],
  },
  {
    title: '余额信息',
    key: 'balanceInfo',
    children: [
      {
        title: '账户余额',
        dataIndex: ['finance', 'balance'],
        width: 150,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
      {
        title: '货币类型',
        dataIndex: ['finance', 'currency'],
        width: 100,
        valueType: 'text',
      },
    ],
  },
  {
    title: '信用信息',
    key: 'creditInfo',
    children: [
      {
        title: '信用评分',
        dataIndex: ['finance', 'creditScore'],
        width: 120,
        render: (score: number) => {
          let color = 'red'
          if (score >= 700) color = 'green'
          else if (score >= 600) color = 'orange'
          return <Tag color={color}>{score}</Tag>
        },
      },
      {
        title: '信用额度',
        dataIndex: ['finance', 'creditLimit'],
        width: 150,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
      {
        title: '可用额度',
        dataIndex: ['finance', 'availableCredit'],
        width: 150,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
    ],
  },
  {
    title: '收支统计',
    key: 'incomeExpense',
    children: [
      {
        title: '总收入',
        dataIndex: ['finance', 'totalIncome'],
        width: 150,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
      {
        title: '总支出',
        dataIndex: ['finance', 'totalExpense'],
        width: 150,
        valueType: 'money',
        valueParams: { prefix: '¥', precision: 2 },
      },
      {
        title: '净收入',
        dataIndex: ['finance', 'totalIncome'],
        width: 150,
        render: (_value: number, record: TableDataRow) => {
          const net = record.finance.totalIncome - record.finance.totalExpense
          return (
            <span style={{ color: net >= 0 ? 'green' : 'red' }}>
              ¥{net.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )
        },
      },
    ],
  },
  {
    title: '银行卡信息',
    key: 'cardInfo',
    children: [
      {
        title: '卡号',
        dataIndex: ['finance', 'creditCard', 'number'],
        width: 200,
        render: (cardNumber: string) => {
          const masked = cardNumber.replace(/(\d{4})(\d{8})(\d{4})/, '$1 **** **** $3')
          return <Typography.Text copyable={{ text: cardNumber }}>{masked}</Typography.Text>
        },
      },
      {
        title: '发卡行',
        dataIndex: ['finance', 'creditCard', 'issuer'],
        width: 120,
        valueType: 'text',
      },
      {
        title: '有效期',
        dataIndex: ['finance', 'creditCard', 'expiryDate'],
        width: 120,
        valueType: 'date',
        valueParams: { format: 'YYYY-MM-DD' },
      },
    ],
  },
  {
    title: '银行账户',
    key: 'bankAccount',
    children: [
      {
        title: '银行名称',
        dataIndex: ['finance', 'bankAccount', 'bankName'],
        width: 150,
        valueType: 'text',
      },
      {
        title: '账户类型',
        dataIndex: ['finance', 'bankAccount', 'accountType'],
        width: 120,
        valueType: 'text',
      },
      {
        title: '账户名',
        dataIndex: ['finance', 'bankAccount', 'accountName'],
        width: 120,
        valueType: 'text',
      },
    ],
  },
  {
    title: '交易类型',
    dataIndex: ['finance', 'transactionType'],
    width: 120,
    valueType: 'text',
  },
  {
    title: '最后交易时间',
    dataIndex: ['timestamps', 'updated_at'],
    width: 160,
    valueType: 'date',
    valueParams: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 150,
    render: () => (
      <Space>
        <Typography.Link>查看明细</Typography.Link>
        <Typography.Link>转账</Typography.Link>
      </Space>
    ),
  },
]

export const financeAccountColumns: TableColumnsType<TableDataRow> = [
  {
    title: '账户信息',
    key: 'accountInfo',
    fixed: 'left',
    children: [
      {
        title: '账户名',
        dataIndex: ['person', 'cname'],
        width: 120,
      },
      {
        title: '账户号',
        dataIndex: ['account', 'accountNumber'],
        width: 180,
      },
      {
        title: 'IBAN',
        dataIndex: ['finance', 'iban'],
        width: 200,
      },
    ],
  },
  {
    title: '余额信息',
    key: 'balanceInfo',
    children: [
      {
        title: '账户余额',
        dataIndex: ['finance', 'balance'],
        width: 150,
        render: (balance: number) => `¥${balance.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      {
        title: '货币类型',
        dataIndex: ['finance', 'currency'],
        width: 100,
      },
    ],
  },
  {
    title: '信用信息',
    key: 'creditInfo',
    children: [
      {
        title: '信用评分',
        dataIndex: ['finance', 'creditScore'],
        width: 120,
        render: (score: number) => {
          let color = 'red'
          if (score >= 700) color = 'green'
          else if (score >= 600) color = 'orange'
          return <Tag color={color}>{score}</Tag>
        },
      },
      {
        title: '信用额度',
        dataIndex: ['finance', 'creditLimit'],
        width: 150,
        render: (limit: number) => `¥${limit.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      {
        title: '可用额度',
        dataIndex: ['finance', 'availableCredit'],
        width: 150,
        render: (credit: number) => `¥${credit.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
    ],
  },
  {
    title: '收支统计',
    key: 'incomeExpense',
    children: [
      {
        title: '总收入',
        dataIndex: ['finance', 'totalIncome'],
        width: 150,
        render: (income: number) => `¥${income.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      {
        title: '总支出',
        dataIndex: ['finance', 'totalExpense'],
        width: 150,
        render: (expense: number) => `¥${expense.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      {
        title: '净收入',
        dataIndex: ['finance', 'totalIncome'],
        width: 150,
        render: (_value: number, record: TableDataRow) => {
          const net = record.finance.totalIncome - record.finance.totalExpense
          return (
            <span style={{ color: net >= 0 ? 'green' : 'red' }}>
              ¥{net.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )
        },
      },
    ],
  },
  {
    title: '银行卡信息',
    key: 'cardInfo',
    children: [
      {
        title: '卡号',
        dataIndex: ['finance', 'creditCard', 'number'],
        width: 200,
        render: (cardNumber: string) => {
          const masked = cardNumber.replace(/(\d{4})(\d{8})(\d{4})/, '$1 **** **** $3')
          return <Typography.Text copyable={{ text: cardNumber }}>{masked}</Typography.Text>
        },
      },
      {
        title: '发卡行',
        dataIndex: ['finance', 'creditCard', 'issuer'],
        width: 120,
      },
      {
        title: '有效期',
        dataIndex: ['finance', 'creditCard', 'expiryDate'],
        width: 120,
        render: (date: Date) => new Date(date).toLocaleDateString('zh-CN'),
      },
    ],
  },
  {
    title: '银行账户',
    key: 'bankAccount',
    children: [
      {
        title: '银行名称',
        dataIndex: ['finance', 'bankAccount', 'bankName'],
        width: 150,
      },
      {
        title: '账户类型',
        dataIndex: ['finance', 'bankAccount', 'accountType'],
        width: 120,
      },
      {
        title: '账户名',
        dataIndex: ['finance', 'bankAccount', 'accountName'],
        width: 120,
      },
    ],
  },
  {
    title: '交易类型',
    dataIndex: ['finance', 'transactionType'],
    width: 120,
  },
  {
    title: '最后交易时间',
    dataIndex: ['timestamps', 'updated_at'],
    width: 160,
    render: (date: Date) => new Date(date).toLocaleString('zh-CN'),
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 150,
    render: () => (
      <Space>
        <Typography.Link>查看明细</Typography.Link>
        <Typography.Link>转账</Typography.Link>
      </Space>
    ),
  },
]
